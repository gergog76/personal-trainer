#!/usr/bin/env node
// scripts/extract-base64-images.mjs
//
// Egyszeri karbantartó script: megkeresi a Netlify Blobs store-ban tárolt
// trainings adatban a base64-kódolt (data: URL) képeket, kiírja őket
// valódi fájlként az images/ mappába, és frissíti a gyakorlat rekordokat,
// hogy a fájl elérési útjára mutassanak a beágyazott adat helyett.
//
// A site egésze Netlify SSO mögött van, ezért a /api/trainings HTTP
// végpont sima fetch-csel nem érhető el innen - a script ehelyett
// közvetlenül a Netlify Blobs API-t hívja "manual" módban (siteID +
// személyes Netlify API token), ami megkerüli az SSO-t.
//
// Előfeltétel:
//   npm install   (a @netlify/blobs csomag a package.json-ban már szerepel)
//
// Netlify API token beszerzése:
//   Netlify dashboard -> User settings -> Applications -> New access token
//
// Használat:
//   NETLIFY_API_TOKEN=<token> node scripts/extract-base64-images.mjs
//     -> dry run: kiírja a képfájlokat az images/ mappába és megmutatja,
//        mi változna, de NEM ír vissza semmit a Blobs store-ba.
//
//   NETLIFY_API_TOKEN=<token> node scripts/extract-base64-images.mjs --apply
//     -> a fentin felül visszaírja a frissített adatot a Blobs store-ba.
//        Csak akkor futtasd, ha az images/ mappába kiírt új fájlokat
//        előtte commitoltad, pusholtad, és a Netlify deploy lefutott -
//        különben a gyakorlatok képei törötten jelennek meg, amíg a
//        deploy be nem ér.
//
// A --site-id argumentummal felülírható a lenti alapértelmezett Site ID,
// ha esetleg más site-ra kellene futtatni.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getStore } from '@netlify/blobs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(REPO_ROOT, 'images');

const DEFAULT_SITE_ID = '6e23b95b-cd72-426f-a214-24d5bd8234e4';
const BLOBS_STORE_NAME = 'derekbarat-adatok';
const BLOBS_KEY = 'trainings';

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1) return null;
  return args[idx + 1] || null;
}
const APPLY = args.includes('--apply');
const SITE_ID = getArg('site-id') || process.env.NETLIFY_SITE_ID || DEFAULT_SITE_ID;
const TOKEN = getArg('token') || process.env.NETLIFY_API_TOKEN;

if (!TOKEN) {
  console.error('Hiányzik a Netlify API token. Add meg NETLIFY_API_TOKEN env varként vagy --token argumentumként.');
  console.error('Beszerzés: Netlify dashboard -> User settings -> Applications -> New access token');
  process.exit(1);
}

const MIME_EXT = {
  'image/webp': 'webp',
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

function parseDataUrl(dataUrl) {
  const m = /^data:([^;,]+)(;charset=[^;,]+)?;base64,(.+)$/s.exec(dataUrl);
  if (!m) return null;
  return { mime: m[1], buffer: Buffer.from(m[3], 'base64') };
}

function extFor(mime) {
  return MIME_EXT[mime] || mime.split('/')[1] || 'bin';
}

function uniqueFilePath(baseName, ext) {
  let candidate = `${baseName}.${ext}`;
  let n = 2;
  while (fs.existsSync(path.join(IMAGES_DIR, candidate))) {
    candidate = `${baseName}-${n}.${ext}`;
    n++;
  }
  return candidate;
}

async function main() {
  const store = getStore({ name: BLOBS_STORE_NAME, siteID: SITE_ID, token: TOKEN });

  console.log(`Olvasás a Blobs store-ból (site ${SITE_ID}, store "${BLOBS_STORE_NAME}", key "${BLOBS_KEY}")...`);
  const data = await store.get(BLOBS_KEY, { type: 'json' });
  if (!data) {
    throw new Error('Nincs adat a Blobs store-ban ezen a kulcson - ellenőrizd a Site ID-t és a tokent.');
  }

  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const changes = [];

  for (const [id, ex] of Object.entries(data.exercises || {})) {
    for (const field of ['image', 'image_right']) {
      const val = ex[field];
      if (typeof val !== 'string' || !val.startsWith('data:')) continue;

      const parsed = parseDataUrl(val);
      if (!parsed) {
        console.warn(`  ! nem sikerült értelmezni a data URL-t: ${id}.${field}`);
        continue;
      }

      const ext = extFor(parsed.mime);
      const baseName = field === 'image_right' ? `${id}-jobb` : id;
      const fileName = uniqueFilePath(baseName, ext);
      const filePath = path.join(IMAGES_DIR, fileName);

      fs.writeFileSync(filePath, parsed.buffer);
      const relPath = `images/${fileName}`;
      changes.push({ id, field, relPath, bytes: parsed.buffer.length });
      ex[field] = relPath;
    }
  }

  if (changes.length === 0) {
    console.log('Nem található base64-kódolt kép az adatban. Nincs teendő.');
    return;
  }

  console.log(`\n${changes.length} beágyazott kép kiírva az images/ mappába:`);
  for (const c of changes) {
    console.log(`  - ${c.id}.${c.field} -> ${c.relPath} (${(c.bytes / 1024).toFixed(1)} KB)`);
  }

  if (!APPLY) {
    console.log('\nDry run - a Blobs store-ban lévő adat egyelőre változatlan.');
    console.log('Ellenőrizd az images/ mappába most kiírt fájlokat, commitold és pushold őket,');
    console.log('várd meg a Netlify deployt, majd futtasd újra --apply kapcsolóval,');
    console.log('hogy a trainings adatban is a fájl elérési útra mutasson a kép mező.');
    return;
  }

  console.log('\nVisszaírás a Blobs store-ba...');
  await store.setJSON(BLOBS_KEY, data);
  console.log('Kész - a live adat mostantól a fájl elérési utakra mutat a beágyazott kép helyett.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
