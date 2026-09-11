#!/usr/bin/env node
// scripts/export-blobs-to-repo.mjs
//
// EGYSZERI MIGRÁCIÓ. Az ÉLES Netlify Blobs dokumentumot (a mai igazságot)
// szétbontja a `data/` mappa fájljaira. Ezután a git lesz az egyetlen
// adatforrás, és ez a script, a Blobs, meg az /api/trainings + /api/apply-pending
// functionök törölhetők.
//
// A site Netlify SSO mögött van, ezért a HTTP végpont sima fetch-csel nem
// érhető el – a script közvetlenül a Blobs API-t hívja "manual" módban
// (siteID + személyes Netlify API token), ugyanúgy, mint az
// extract-base64-images.mjs.
//
// Netlify API token: Netlify dashboard -> User settings -> Applications -> New access token
//
// Használat:
//   NETLIFY_API_TOKEN=<token> node scripts/export-blobs-to-repo.mjs
//     -> dry run: kiírja, mely fájlok jönnének létre / változnának / törlődnének
//        a data/ mappában, lefuttatja a validálást, de NEM ír a lemezre.
//
//   NETLIFY_API_TOKEN=<token> node scripts/export-blobs-to-repo.mjs --apply
//     -> ténylegesen kiírja a data/ fájlokat.
//
// Ha az élő adatban BÁRHOL data: URL-t talál egy kép mezőben, MEGTAGADJA az
// írást és kilistázza őket – előbb az extract-base64-images.mjs --apply kell.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getStore } from '@netlify/blobs';
import { datasetToFiles, filesToDataset, validate, DATA_DIR } from '../lib/data-schema.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const DEFAULT_SITE_ID = '6e23b95b-cd72-426f-a214-24d5bd8234e4';
const BLOBS_STORE_NAME = 'derekbarat-adatok';
const BLOBS_KEY = 'trainings';

const args = process.argv.slice(2);
const getArg = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? null : args[i + 1] || null;
};
const APPLY = args.includes('--apply');
const SITE_ID = getArg('site-id') || process.env.NETLIFY_SITE_ID || DEFAULT_SITE_ID;
const TOKEN = getArg('token') || process.env.NETLIFY_API_TOKEN;

if (!TOKEN) {
  console.error('Hiányzik a Netlify API token (NETLIFY_API_TOKEN env var vagy --token).');
  process.exit(1);
}

function findDataUrls(data) {
  const hits = [];
  for (const [id, ex] of Object.entries(data.exercises || {})) {
    for (const field of ['image', 'image_right']) {
      if (typeof ex[field] === 'string' && ex[field].startsWith('data:')) hits.push(`${id}.${field}`);
    }
  }
  return hits;
}

function currentDataFiles() {
  const map = new Map();
  const dir = path.join(REPO_ROOT, DATA_DIR);
  if (!fs.existsSync(dir)) return map;
  const walk = (d) => {
    for (const entry of fs.readdirSync(path.join(REPO_ROOT, d), { withFileTypes: true })) {
      const rel = `${d}/${entry.name}`;
      if (entry.isDirectory()) walk(rel);
      else if (entry.name.endsWith('.json') && rel !== `${DATA_DIR}/trainings.json`) {
        map.set(rel, fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8'));
      }
    }
  };
  walk(DATA_DIR);
  return map;
}

async function main() {
  const store = getStore({ name: BLOBS_STORE_NAME, siteID: SITE_ID, token: TOKEN });
  console.log(`Olvasás a Blobs store-ból (site ${SITE_ID}, key "${BLOBS_KEY}")…`);
  const data = await store.get(BLOBS_KEY, { type: 'json' });
  if (!data) throw new Error('Nincs adat a Blobs store-ban ezen a kulcson.');

  const dataUrls = findDataUrls(data);
  if (dataUrls.length) {
    console.error('\nAz élő adat beágyazott data: URL képeket tartalmaz:');
    dataUrls.forEach((h) => console.error(`  - ${h}`));
    console.error('\nFuttasd előbb: NETLIFY_API_TOKEN=… node scripts/extract-base64-images.mjs --apply');
    process.exit(1);
  }

  const want = datasetToFiles(data);
  const have = currentDataFiles();

  const created = [];
  const changed = [];
  const deleted = [];
  for (const [p, content] of want) {
    if (!have.has(p)) created.push(p);
    else if (have.get(p) !== content) changed.push(p);
  }
  for (const p of have.keys()) if (!want.has(p)) deleted.push(p);

  console.log(`\nÚj: ${created.length}, változó: ${changed.length}, törlendő: ${deleted.length}`);
  created.forEach((p) => console.log(`  + ${p}`));
  changed.forEach((p) => console.log(`  ~ ${p}`));
  deleted.forEach((p) => console.log(`  - ${p}`));

  // Validálás a Blobs-adatból visszaépített dokumentumon.
  const rebuilt = filesToDataset(want);
  const imgs = new Set(
    fs.existsSync(path.join(REPO_ROOT, 'images'))
      ? fs.readdirSync(path.join(REPO_ROOT, 'images')).map((f) => `images/${f}`)
      : []
  );
  const v = validate(rebuilt.data, { imagesOnDisk: imgs });
  const allErrors = [...rebuilt.errors, ...v.errors];
  if (v.warnings.length) {
    console.log(`\n${v.warnings.length} figyelmeztetés:`);
    v.warnings.forEach((w) => console.log(`  ! ${w}`));
  }
  if (allErrors.length) {
    console.log(`\n${allErrors.length} HIBA (a build ezekkel elbukna, javítsd migráció után):`);
    allErrors.forEach((e) => console.log(`  ✗ ${e}`));
  }

  if (!APPLY) {
    console.log('\nDry run – a lemezre semmi nem íródott. Futtasd --apply kapcsolóval a kiíráshoz.');
    return;
  }

  for (const p of deleted) fs.rmSync(path.join(REPO_ROOT, p));
  for (const [p, content] of want) {
    const abs = path.join(REPO_ROOT, p);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content);
  }
  console.log(`\nKész. A data/ mappa mostantól az élő Blobs-adatot tükrözi.`);
  if (allErrors.length) console.log('FIGYELEM: a fenti hibákat javítsd, mielőtt a PR-t mergeled.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
