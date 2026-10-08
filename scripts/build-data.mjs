#!/usr/bin/env node
// scripts/build-data.mjs
//
// A `data/` mappa sok kis fájljából egyetlen `data/trainings.json`-t generál,
// amit az időzítő app (index.html) és a szerkesztő (szerkeszto.html) letölt.
//
// Ez a Netlify build parancsa (lásd netlify.toml). Lefut:
//   - minden deploykor (produkció és PR deploy preview egyaránt),
//   - kézzel: `node scripts/build-data.mjs`.
//
// Ha a validálás hibát talál, NEM nulla exit kóddal áll le -> a Netlify deploy
// elbukik, és a korábbi (működő) verzió marad élesben. Törött hivatkozás így
// sosem kerül ki.
//
// A generált fájl NINCS verziókövetve (lásd .gitignore).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  filesToDataset,
  validate,
  serialize,
  GENERATED_FILE,
  DATA_DIR,
  AUDIO_DIR,
  AUDIO_EXT,
  audioSlug,
  spokenNames,
} from '../lib/data-schema.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readDataFiles() {
  const map = new Map();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(path.join(REPO_ROOT, dir), { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        walk(rel);
      } else if (entry.name.endsWith('.json') && rel !== GENERATED_FILE) {
        map.set(rel, fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8'));
      }
    }
  };
  walk(DATA_DIR);
  return map;
}

function listImages() {
  const dir = path.join(REPO_ROOT, 'images');
  if (!fs.existsSync(dir)) return new Set();
  return new Set(fs.readdirSync(dir).map((f) => `images/${f}`));
}

// Az `audio/` mappában lévő bemondás-fájlok slugjai (lásd scripts/generate-audio.mjs).
function listAudio() {
  const dir = path.join(REPO_ROOT, AUDIO_DIR);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(AUDIO_EXT))
    .map((f) => f.slice(0, -AUDIO_EXT.length))
    .sort();
}

function main() {
  const fileMap = readDataFiles();
  const { data, errors: parseErrors, warnings: parseWarnings } = filesToDataset(fileMap);
  const { errors: semErrors, warnings: semWarnings } = validate(data, { imagesOnDisk: listImages() });

  const errors = [...parseErrors, ...semErrors];
  const warnings = [...parseWarnings, ...semWarnings];

  for (const w of warnings) console.warn(`  figyelmeztetés: ${w}`);

  if (errors.length) {
    console.error(`\n${errors.length} hiba a data/ mappában – a build leáll:\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    console.error('');
    process.exit(1);
  }

  // Az időzítő ebből tudja, melyik névhez van hangfájl; ahol nincs, élő
  // felolvasásra esik vissza. A hiányzók csak figyelmeztetést érdemelnek.
  data.audio = listAudio();
  const have = new Set(data.audio);
  const missingAudio = new Set();
  for (const ex of Object.values(data.exercises)) {
    for (const text of spokenNames(ex)) {
      if (!have.has(audioSlug(text))) missingAudio.add(text);
    }
  }
  if (missingAudio.size) {
    console.warn(
      `  figyelmeztetés: ${missingAudio.size} bemondott névhez nincs hangfájl az ${AUDIO_DIR}/ mappában ` +
        '(élő felolvasás lesz helyette) – készítsd el: node scripts/generate-audio.mjs'
    );
  }

  data._meta = {
    context: process.env.CONTEXT || 'local',
    commit: process.env.COMMIT_REF || null,
    generated_at: new Date().toISOString(),
  };

  fs.writeFileSync(path.join(REPO_ROOT, GENERATED_FILE), serialize(data));

  const exCount = Object.keys(data.exercises).length;
  const prCount = data.programs.length;
  console.log(
    `${GENERATED_FILE} kész: ${exCount} gyakorlat, ${prCount} program` +
      `, ${data.audio.length} hangfájl` +
      (warnings.length ? `, ${warnings.length} figyelmeztetés` : '')
  );
}

main();
