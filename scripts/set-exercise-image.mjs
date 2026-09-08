#!/usr/bin/env node
// scripts/set-exercise-image.mjs
//
// Egyszerű karbantartó script egy gyakorlat "image" vagy "image_right"
// mezőjének közvetlen átírására a Netlify Blobs store-ban - pl. amikor
// egy beágyazott (base64) kép valójában megegyezik egy már meglévő
// images/ fájllal, és nem akarunk felesleges duplikátumot tárolni,
// hanem inkább a meglévő fájlra akarunk hivatkozni.
//
// Ugyanúgy a Blobs API-t hívja közvetlenül (siteID + személyes Netlify
// API token), mint a scripts/extract-base64-images.mjs, mert a site
// HTTP végpontjai SSO mögött vannak.
//
// Használat:
//   NETLIFY_API_TOKEN=<token> node scripts/set-exercise-image.mjs <exerciseId> <field> <relativeImagePath>
//     -> dry run: kiírja, mi változna, de nem ír vissza semmit.
//
//   NETLIFY_API_TOKEN=<token> node scripts/set-exercise-image.mjs <exerciseId> <field> <relativeImagePath> --apply
//     -> ténylegesen frissíti a Blobs store-t.
//
// Példa:
//   node scripts/set-exercise-image.mjs csipoemeles-labdaval image images/csipoemeleslabdaval.webp --apply

import { getStore } from '@netlify/blobs';

const DEFAULT_SITE_ID = '6e23b95b-cd72-426f-a214-24d5bd8234e4';
const BLOBS_STORE_NAME = 'derekbarat-adatok';
const BLOBS_KEY = 'trainings';

const rawArgs = process.argv.slice(2);
const APPLY = rawArgs.includes('--apply');
const positional = rawArgs.filter((a) => !a.startsWith('--'));
const [exerciseId, field, value] = positional;

function getFlag(name) {
  const idx = rawArgs.indexOf(`--${name}`);
  return idx === -1 ? null : rawArgs[idx + 1] || null;
}
const SITE_ID = getFlag('site-id') || process.env.NETLIFY_SITE_ID || DEFAULT_SITE_ID;
const TOKEN = getFlag('token') || process.env.NETLIFY_API_TOKEN;

if (!exerciseId || !field || !value) {
  console.error('Használat: node scripts/set-exercise-image.mjs <exerciseId> <image|image_right> <relatívÚtvonal> [--apply]');
  process.exit(1);
}
if (!['image', 'image_right'].includes(field)) {
  console.error(`Ismeretlen mező: ${field} (csak "image" vagy "image_right" lehet)`);
  process.exit(1);
}
if (!TOKEN) {
  console.error('Hiányzik a Netlify API token. Add meg NETLIFY_API_TOKEN env varként vagy --token argumentumként.');
  process.exit(1);
}

async function main() {
  const store = getStore({ name: BLOBS_STORE_NAME, siteID: SITE_ID, token: TOKEN });

  const data = await store.get(BLOBS_KEY, { type: 'json' });
  if (!data) throw new Error('Nincs adat a Blobs store-ban ezen a kulcson.');

  const ex = data.exercises?.[exerciseId];
  if (!ex) throw new Error(`Nincs ilyen gyakorlat: "${exerciseId}"`);

  const oldValue = ex[field];
  console.log(`${exerciseId}.${field}:`);
  console.log(`  régi: ${oldValue ? (oldValue.startsWith('data:') ? `[beágyazott kép, ${oldValue.length} karakter]` : oldValue) : '(nincs)'}`);
  console.log(`  új:   ${value}`);

  if (!APPLY) {
    console.log('\nDry run - nincs írás. Futtasd --apply kapcsolóval a tényleges frissítéshez.');
    return;
  }

  ex[field] = value;
  await store.setJSON(BLOBS_KEY, data);
  console.log('\nKész - a Blobs store frissítve.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
