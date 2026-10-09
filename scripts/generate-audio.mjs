#!/usr/bin/env node
// scripts/generate-audio.mjs
//
// A gyakorlat-nevek bemondásához hangfájlokat készít az `audio/` mappába a
// macOS `say` paranccsal (magyar hang, pl. Tünde), és AAC (.m4a) formátumra
// tömöríti őket. Az időzítő (index.html) ezeket játssza le a sípolással egy
// hangsávon, mert az élő felolvasás (speechSynthesis) iOS 27-en kiüti az
// oldal többi hangját.
//
// Használat (Macen, a repó gyökeréből):
//   node scripts/generate-audio.mjs              # csak a hiányzó fájlokat készíti el
//   node scripts/generate-audio.mjs --dry-run    # kiírja, mit készítene (bármely gépen)
//   node scripts/generate-audio.mjs --force      # mindent újragenerál
//   node scripts/generate-audio.mjs --voice "Tünde (Prémium)"   # konkrét hang
//   node scripts/generate-audio.mjs --list-voices                # a magyar hangok listája
//
// Új gyakorlat felvétele után elég újra futtatni: csak a hiányzókat generálja.
// Utána: `node scripts/build-data.mjs`, majd az `audio/` mappa commitolása.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  EXERCISES_DIR,
  AUDIO_DIR,
  AUDIO_EXT,
  audioSlug,
  spokenNames,
} from '../lib/data-schema.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

function collectTexts() {
  const dir = path.join(REPO_ROOT, EXERCISES_DIR);
  const bySlug = new Map();
  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.json')) continue;
    const ex = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    for (const text of spokenNames(ex)) {
      const slug = audioSlug(text);
      if (!slug) continue;
      const prev = bySlug.get(slug);
      if (prev && prev !== text) {
        console.error(`✗ Fájlnév-ütközés: "${prev}" és "${text}" ugyanarra a névre (${slug}) képződik le.`);
        process.exit(1);
      }
      bySlug.set(slug, text);
    }
  }
  return bySlug;
}

// A `say -v '?'` kimenetének sorai: "Tünde   hu_HU    # Szia! ..."
function hungarianVoices() {
  const out = execFileSync('say', ['-v', '?'], { encoding: 'utf8' });
  const voices = [];
  for (const line of out.split('\n')) {
    const m = line.match(/^(.+?)\s{2,}([a-z]{2}_[A-Z]{2})\s+#/);
    if (m && m[2] === 'hu_HU') voices.push(m[1].trim());
  }
  return voices;
}

function pickVoice(voices) {
  const requested = option('--voice');
  if (requested) return requested;
  if (!voices.length) return null;
  // A jobb minőségű (letöltött) változatot részesítjük előnyben.
  const premium = voices.find((v) => /pr[eé]mium|enhanced|kiterjesztett|jav[ií]tott/i.test(v));
  return premium || voices[0];
}

function main() {
  const texts = collectTexts();
  const audioDir = path.join(REPO_ROOT, AUDIO_DIR);
  const todo = [...texts].filter(
    ([slug]) => flag('--force') || !fs.existsSync(path.join(audioDir, slug + AUDIO_EXT))
  );

  console.log(`${texts.size} bemondott szöveg, ebből ${todo.length} hiányzik az ${AUDIO_DIR}/ mappából.`);

  if (flag('--dry-run')) {
    for (const [slug, text] of todo) console.log(`  ${slug}${AUDIO_EXT}  <-  "${text}"`);
    return;
  }

  if (process.platform !== 'darwin') {
    console.error('✗ Ez a szkript macOS-t igényel (a `say` és az `afconvert` parancs miatt).');
    console.error('  Előnézet bármely gépen: --dry-run');
    process.exit(1);
  }

  const voices = hungarianVoices();

  if (flag('--list-voices')) {
    console.log(voices.length ? voices.map((v) => `  ${v}`).join('\n') : '  (nincs magyar hang telepítve)');
    return;
  }

  const voice = pickVoice(voices);
  if (!voice) {
    console.error('✗ Nincs telepített magyar hang. Töltsd le:');
    console.error('  (magyar macOS)  Rendszerbeállítások → Kisegítő lehetőségek → Felolvasott tartalom →');
    console.error('                  Rendszerhang → Hangok kezelése… → Magyar → Tünde');
    console.error('  (angol macOS)   System Settings → Accessibility → Spoken Content →');
    console.error('                  System Voice → Manage Voices… → Hungarian → Tünde');
    console.error('  Ellenőrzés: say -v \'?\' | grep hu_HU');
    process.exit(1);
  }
  console.log(`Hang: ${voice}` + (voices.length > 1 ? `  (magyar hangok: ${voices.join(', ')})` : ''));

  if (!todo.length) {
    console.log('Nincs teendő.');
    return;
  }

  fs.mkdirSync(audioDir, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'edzes-audio-'));
  let done = 0;
  try {
    for (const [slug, text] of todo) {
      const aiff = path.join(tmp, slug + '.aiff');
      const out = path.join(audioDir, slug + AUDIO_EXT);
      // Tömbös argumentumok, shell nélkül: a szöveg nem értelmeződik parancsként.
      execFileSync('say', ['-v', voice, '-o', aiff, '--', text]);
      execFileSync('afconvert', ['-f', 'm4af', '-d', 'aac', aiff, out]);
      fs.rmSync(aiff, { force: true });
      done++;
      console.log(`  [${done}/${todo.length}] ${slug}${AUDIO_EXT}  "${text}"`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }

  console.log(`\nKész: ${done} fájl az ${AUDIO_DIR}/ mappában.`);
  console.log('Következő lépés: node scripts/build-data.mjs, majd az audio/ mappa commitolása.');
}

main();
