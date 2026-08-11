// netlify/functions/apply-pending.mjs
//
// Idempotens import: beolvassa a `pending-content/exercises/*.json` és
// `pending-content/programs/*.json` fájlokat a `main` branch-ről GitHub API-n
// keresztül, és amelyik még nem szerepel a live Blobs adatban, azt
// hozzáadja. Tetszőlegesen sokszor meghívható anélkül, hogy duplikációt
// okozna.
//
// FONTOS - a repo valós sémájához igazítva (ellenőrizve trainings.mjs és
// _seed-data.mjs alapján):
//   - data.exercises: OBJEKTUM, a kulcs maga a slug ID
//       pl. { "karkorzes-elore": { name, category, equipment, ... } }
//   - data.programs: TÖMB, minden elemnek van "id" mezője
//       pl. [{ id: "core-alap", name: "...", rounds: 2, blocks: {...} }]
//
// Pending fájl konvenció:
//   pending-content/exercises/*.json
//     -> egy exercise objektum, opcionális "id" mezővel (ez lesz a kulcs
//        neve a data.exercises objektumban; mentéskor eltávolítjuk a
//        mezőt, hogy megegyezzen a többi exercise alakjával, aminek nincs
//        saját "id" mezője). Ha az "id" mezőt üresen hagyod, a function a
//        `name` mezőből generál egyet (ugyanaz a slugify logika, mint a
//        szerkesztőben).
//   pending-content/programs/*.json
//     -> egy teljes program objektum, "id" mezővel (ugyanaz a séma, mint a
//        data.programs tömb elemei - egy az egyben bemásolható).
//
// Szükséges env varok (Netlify Site configuration → Environment variables):
//   EDIT_TOKEN    - UGYANAZ az érték, mint a trainings.mjs-ben hardcode-olt
//                   EDIT_TOKEN konstans. (Érdemes lenne mindkét helyen
//                   env var-ra váltani, hogy ne kelljen szinkronban tartani
//                   két helyen a forráskódban - ez egy régóta halasztott
//                   feladat, jó alkalom most megcsinálni egyben.)
//   GITHUB_TOKEN  - fine-grained PAT, csak erre a repóra, "Contents:
//                   Read-only" scope-pal. Írásra nincs szükség (nincs
//                   automatikus archiválás).

import { getStore } from '@netlify/blobs';

const GITHUB_OWNER = 'gergog76';
const GITHUB_REPO = 'personal-trainer';
const GITHUB_BRANCH = 'main';
const BLOBS_STORE_NAME = 'derekbarat-adatok';
const BLOBS_KEY = 'trainings';

const PENDING_PATHS = {
  exercises: 'pending-content/exercises',
  programs: 'pending-content/programs',
};

const EDIT_TOKEN = process.env.EDIT_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const jsonHeaders = { 'content-type': 'application/json; charset=utf-8' };

// Ugyanaz a slugify logika, mint a szerkeszto.html-ben (243. sor), hogy az
// automatikusan generált ID-k konzisztensek legyenek a kézzel létrehozottakkal.
const slugify = (s) =>
  (s || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), { status, headers: jsonHeaders });
}

async function githubListDir(path) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  if (res.status === 404) return []; // a mappa még nem létezik - ez nem hiba
  if (!res.ok) {
    throw new Error(`GitHub lista hiba (${path}): ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function githubGetFileJson(downloadUrl, fileName) {
  const res = await fetch(downloadUrl, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`GitHub fájl letöltési hiba (${fileName}): ${res.status}`);
  }
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Hibás JSON (${fileName}): ${err.message}`);
  }
}

async function collectPendingFiles() {
  const result = { exercises: [], programs: [], errors: [] };
  for (const [key, path] of Object.entries(PENDING_PATHS)) {
    let files;
    try {
      files = await githubListDir(path);
    } catch (err) {
      result.errors.push({ file: path, error: err.message });
      continue;
    }
    for (const file of files) {
      if (file.type !== 'file' || !file.name.endsWith('.json')) continue;
      try {
        const data = await githubGetFileJson(file.download_url, file.name);
        result[key].push({ file: file.name, data });
      } catch (err) {
        result.errors.push({ file: file.name, error: err.message });
      }
    }
  }
  return result;
}

function planExercises(pendingExercises, currentExercises) {
  const toAdd = {}; // id -> exercise object (id mező nélkül)
  const report = []; // { file, id, name, status }
  const usedIds = new Set(Object.keys(currentExercises));

  for (const { file, data } of pendingExercises) {
    if (!data || typeof data !== 'object') {
      report.push({ file, status: 'error', reason: 'nem objektum' });
      continue;
    }
    if (!data.name || !data.name.trim()) {
      report.push({ file, status: 'error', reason: 'hiányzik a "name" mező' });
      continue;
    }

    let id = data.id && slugify(data.id) ? slugify(data.id) : slugify(data.name);
    if (!id) {
      report.push({ file, status: 'error', reason: 'nem sikerült ID-t generálni' });
      continue;
    }

    if (usedIds.has(id)) {
      // Már létezik (élesben vagy egy másik pending fájlban is ugyanaz az id) - kihagyjuk.
      report.push({ file, id, name: data.name, status: 'skipped', reason: 'már létezik (élesben vagy másik pending fájlban)' });
      continue;
    }

    const { id: _drop, ...rest } = data; // az "id" nem kerül be az exercise objektumba
    toAdd[id] = rest;
    usedIds.add(id);
    report.push({ file, id, name: data.name, status: 'new' });
  }

  return { toAdd, report };
}

function planPrograms(pendingPrograms, currentPrograms) {
  const toAdd = [];
  const report = [];
  const usedIds = new Set(currentPrograms.map((p) => p.id));

  for (const { file, data } of pendingPrograms) {
    if (!data || typeof data !== 'object') {
      report.push({ file, status: 'error', reason: 'nem objektum' });
      continue;
    }
    if (!data.name || !data.name.trim()) {
      report.push({ file, status: 'error', reason: 'hiányzik a "name" mező' });
      continue;
    }

    let id = data.id && slugify(data.id) ? slugify(data.id) : slugify(data.name);
    if (!id) {
      report.push({ file, status: 'error', reason: 'nem sikerült ID-t generálni' });
      continue;
    }

    if (usedIds.has(id)) {
      report.push({ file, id, name: data.name, status: 'skipped', reason: 'már létezik (élesben vagy másik pending fájlban)' });
      continue;
    }

    toAdd.push({ ...data, id });
    usedIds.add(id);
    report.push({ file, id, name: data.name, status: 'new' });
  }

  return { toAdd, report };
}

export default async (req) => {
  if (!EDIT_TOKEN || !GITHUB_TOKEN) {
    return jsonResponse(
      { error: 'Szerver konfigurációs hiba: EDIT_TOKEN vagy GITHUB_TOKEN env var hiányzik.' },
      500
    );
  }

  const providedToken = (req.headers.get('x-edit-token') || '').trim();
  if (providedToken !== EDIT_TOKEN) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const url = new URL(req.url);
  const mode = url.searchParams.get('mode') === 'apply' ? 'apply' : 'preview';

  const store = getStore(BLOBS_STORE_NAME);
  const current = (await store.get(BLOBS_KEY, { type: 'json' })) || { exercises: {}, programs: [] };
  current.exercises = current.exercises || {};
  current.programs = current.programs || [];

  let pending;
  try {
    pending = await collectPendingFiles();
  } catch (err) {
    return jsonResponse({ error: `GitHub olvasási hiba: ${err.message}` }, 502);
  }

  const exercisePlan = planExercises(pending.exercises, current.exercises);
  const programPlan = planPrograms(pending.programs, current.programs);

  const summary = {
    exercises: exercisePlan.report,
    programs: programPlan.report,
    errors: pending.errors,
    newExerciseCount: exercisePlan.report.filter((r) => r.status === 'new').length,
    newProgramCount: programPlan.report.filter((r) => r.status === 'new').length,
  };

  if (mode === 'preview') {
    return jsonResponse({ mode: 'preview', ...summary });
  }

  // mode === 'apply'
  if (summary.newExerciseCount === 0 && summary.newProgramCount === 0) {
    return jsonResponse({ mode: 'apply', applied: false, message: 'Nincs importálandó új elem.', ...summary });
  }

  const updated = {
    ...current,
    exercises: { ...current.exercises, ...exercisePlan.toAdd },
    programs: [...current.programs, ...programPlan.toAdd],
  };

  await store.setJSON(BLOBS_KEY, updated);

  return jsonResponse({ mode: 'apply', applied: true, ...summary });
};

export const config = {
  path: '/api/apply-pending',
};
