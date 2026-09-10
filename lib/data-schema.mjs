// lib/data-schema.mjs
//
// A tréning-adat egyetlen forrása a `data/` mappa a repóban. Ez a modul köti
// össze a három fogyasztót, hogy pontosan ugyanazt a szerializálást és
// validálást használják:
//   - scripts/build-data.mjs        (deploykor a data/** -> data/trainings.json)
//   - netlify/functions/save-data.mjs (a szerkesztő mentése -> git commit)
//   - scripts/export-blobs-to-repo.mjs (egyszeri migráció a Blobs-ból)
//
// Se fs, se hálózat: minden I/O a hívóé. Így ugyanaz a kód fut Node-ban és a
// Netlify function futásidőben is.
//
// Adatmodell (a mai _seed-data.mjs / Blobs dokumentum alakja):
//   {
//     constants: { work_sec, rest_sec, quick_rest_sec, round_rest_sec,
//                  prep_sec, block_transition_sec, rounds_min, rounds_max },
//     exercises: { "<slug-id>": { name, category, equipment, description, ... } },
//     programs:  [ { id, name, rounds, blocks: { warmup:[], main:[], cooldown:[] } } ],
//     muscle_group_taxonomy: { "<key>": "<címke>" }
//   }
//
// Fájlszerkezet a repóban:
//   data/constants.json        -> constants
//   data/muscle-groups.json    -> muscle_group_taxonomy
//   data/exercises/<id>.json   -> egy exercise objektum, "id" mező NÉLKÜL (a fájlnév az id)
//   data/programs/_order.json  -> ["<program-id>", ...] a megjelenítési sorrend
//   data/programs/<id>.json    -> egy program objektum, "id" mező NÉLKÜL

export const DATA_DIR = 'data';
export const EXERCISES_DIR = 'data/exercises';
export const PROGRAMS_DIR = 'data/programs';
export const ORDER_FILE = 'data/programs/_order.json';
export const CONSTANTS_FILE = 'data/constants.json';
export const MUSCLE_GROUPS_FILE = 'data/muscle-groups.json';
export const GENERATED_FILE = 'data/trainings.json';

export const REQUIRED_CONSTANTS = [
  'work_sec', 'rest_sec', 'quick_rest_sec', 'round_rest_sec',
  'prep_sec', 'block_transition_sec', 'rounds_min', 'rounds_max',
];

const BLOCK_KEYS = ['warmup', 'main', 'cooldown'];

// Ugyanaz a slugify, mint eddig a szerkeszto.html-ben és az apply-pending.mjs-ben
// (most már csak itt az egy példány).
export const slugify = (s) =>
  (s || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

// Determinisztikus formázás: 2 szóköz, záró újsor. A kulcsokat NEM rendezi át,
// hogy a diff a tényleges tartalomváltozást mutassa, ne a kulcssorrend-váltást.
export const serialize = (obj) => JSON.stringify(obj, null, 2) + '\n';

const isPlainObject = (v) => v != null && typeof v === 'object' && !Array.isArray(v);
const stripId = (obj) => {
  const { id: _drop, ...rest } = obj;
  return rest;
};

/**
 * A teljes dokumentumból fájl-térképet készít.
 * @param {object} data
 * @returns {Map<string, string>} útvonal -> fájltartalom (szerializált JSON)
 */
export function datasetToFiles(data) {
  const files = new Map();
  const { _meta: _drop, ...clean } = data || {};

  files.set(CONSTANTS_FILE, serialize(clean.constants || {}));
  files.set(MUSCLE_GROUPS_FILE, serialize(clean.muscle_group_taxonomy || {}));

  const exercises = clean.exercises || {};
  for (const id of Object.keys(exercises).sort()) {
    files.set(`${EXERCISES_DIR}/${id}.json`, serialize(stripId(exercises[id])));
  }

  const programs = Array.isArray(clean.programs) ? clean.programs : [];
  files.set(ORDER_FILE, serialize(programs.map((p) => p.id)));
  for (const p of programs) {
    files.set(`${PROGRAMS_DIR}/${p.id}.json`, serialize(stripId(p)));
  }

  return files;
}

/**
 * Fájl-térképből visszaépíti a dokumentumot.
 * @param {Map<string, string>|Record<string, string>} fileMap útvonal -> nyers JSON szöveg
 * @returns {{ data: object, errors: string[], warnings: string[] }}
 */
export function filesToDataset(fileMap) {
  const map = fileMap instanceof Map ? fileMap : new Map(Object.entries(fileMap));
  const errors = [];
  const warnings = [];

  const parse = (path) => {
    const raw = map.get(path);
    if (raw == null) return undefined;
    try {
      return JSON.parse(raw);
    } catch (err) {
      errors.push(`${path}: hibás JSON – ${err.message}`);
      return undefined;
    }
  };

  const constants = parse(CONSTANTS_FILE) || {};
  const muscle_group_taxonomy = parse(MUSCLE_GROUPS_FILE) || {};

  const exercises = {};
  for (const path of [...map.keys()].sort()) {
    if (!path.startsWith(`${EXERCISES_DIR}/`) || !path.endsWith('.json')) continue;
    const id = path.slice(EXERCISES_DIR.length + 1, -'.json'.length);
    if (id !== slugify(id)) {
      errors.push(`${path}: a fájlnév nem érvényes slug (elvárt: "${slugify(id)}.json")`);
    }
    const body = parse(path);
    if (body === undefined) continue;
    if (!isPlainObject(body)) {
      errors.push(`${path}: a tartalom nem objektum`);
      continue;
    }
    if (body.id != null && slugify(body.id) !== id) {
      errors.push(`${path}: a body "id" mezője ("${body.id}") nem egyezik a fájlnévvel ("${id}")`);
    }
    exercises[id] = stripId(body);
  }

  const programFiles = {};
  for (const path of [...map.keys()].sort()) {
    if (!path.startsWith(`${PROGRAMS_DIR}/`) || !path.endsWith('.json')) continue;
    if (path === ORDER_FILE) continue;
    const id = path.slice(PROGRAMS_DIR.length + 1, -'.json'.length);
    if (id !== slugify(id)) {
      errors.push(`${path}: a fájlnév nem érvényes slug (elvárt: "${slugify(id)}.json")`);
    }
    const body = parse(path);
    if (body === undefined) continue;
    if (!isPlainObject(body)) {
      errors.push(`${path}: a tartalom nem objektum`);
      continue;
    }
    if (body.id != null && slugify(body.id) !== id) {
      errors.push(`${path}: a body "id" mezője ("${body.id}") nem egyezik a fájlnévvel ("${id}")`);
    }
    programFiles[id] = { ...stripId(body), id };
  }

  let order = parse(ORDER_FILE);
  if (!Array.isArray(order)) {
    if (order !== undefined) errors.push(`${ORDER_FILE}: a tartalomnak tömbnek kell lennie`);
    order = Object.keys(programFiles).sort();
  }

  const programs = [];
  const seen = new Set();
  for (const id of order) {
    if (seen.has(id)) {
      warnings.push(`${ORDER_FILE}: "${id}" többször szerepel, a másodikat kihagyom`);
      continue;
    }
    seen.add(id);
    if (!programFiles[id]) {
      errors.push(`${ORDER_FILE}: "${id}" nem létező programra hivatkozik`);
      continue;
    }
    programs.push(programFiles[id]);
  }
  for (const id of Object.keys(programFiles)) {
    if (!seen.has(id)) {
      errors.push(`${ORDER_FILE}: "${id}" program hiányzik a sorrend-listából`);
      programs.push(programFiles[id]);
    }
  }

  return { data: { constants, exercises, programs, muscle_group_taxonomy }, errors, warnings };
}

/**
 * Szemantikai ellenőrzés a teljes dokumentumon. MINDEN hibát összegyűjt.
 * @param {object} data
 * @param {{ imagesOnDisk?: Set<string>|string[] }} [opts]
 *        imagesOnDisk: a létező kép-útvonalak halmaza (pl. "images/foo.webp").
 *        Ha nincs megadva, a kép-létezés ellenőrzése kimarad.
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function validate(data, opts = {}) {
  const errors = [];
  const warnings = [];
  const images = opts.imagesOnDisk
    ? (opts.imagesOnDisk instanceof Set ? opts.imagesOnDisk : new Set(opts.imagesOnDisk))
    : null;

  const constants = data.constants || {};
  for (const key of REQUIRED_CONSTANTS) {
    if (typeof constants[key] !== 'number' || Number.isNaN(constants[key])) {
      errors.push(`constants.${key}: hiányzik vagy nem szám`);
    }
  }

  const exercises = data.exercises || {};
  const taxonomy = data.muscle_group_taxonomy || {};

  for (const [id, ex] of Object.entries(exercises)) {
    const where = `exercises/${id}`;
    if (!isPlainObject(ex)) {
      errors.push(`${where}: a tartalom nem objektum`);
      continue;
    }
    if (!ex.name || !String(ex.name).trim()) {
      errors.push(`${where}: hiányzik a "name" mező`);
    }
    if (!BLOCK_KEYS.includes(ex.category)) {
      errors.push(`${where}: a "category" értéke "${ex.category}" (elvárt: warmup | main | cooldown)`);
    }
    for (const field of ['image', 'image_right']) {
      const val = ex[field];
      if (val == null || val === '') continue;
      if (typeof val !== 'string') {
        errors.push(`${where}.${field}: nem szöveg`);
        continue;
      }
      if (val.startsWith('data:')) {
        errors.push(`${where}.${field}: beágyazott data: URL – valódi fájlnak kell lennie az images/ mappában`);
        continue;
      }
      if (!val.startsWith('images/')) {
        warnings.push(`${where}.${field}: szokatlan útvonal "${val}" (elvárt: images/…)`);
      } else if (images && !images.has(val)) {
        errors.push(`${where}.${field}: a hivatkozott fájl nem létezik: ${val}`);
      }
    }
    for (const mg of ex.muscle_groups || []) {
      if (!taxonomy[mg]) {
        warnings.push(`${where}.muscle_groups: ismeretlen taxonómia-kulcs "${mg}"`);
      }
    }
  }

  const programIds = new Set();
  for (const p of data.programs || []) {
    const where = `programs/${p && p.id ? p.id : '?'}`;
    if (!isPlainObject(p)) {
      errors.push(`${where}: a tartalom nem objektum`);
      continue;
    }
    if (!p.id) errors.push(`${where}: hiányzik az "id"`);
    if (programIds.has(p.id)) errors.push(`${where}: duplikált program-id`);
    programIds.add(p.id);
    if (!p.name || !String(p.name).trim()) errors.push(`${where}: hiányzik a "name"`);
    if (typeof p.rounds !== 'number' || p.rounds < 1) {
      errors.push(`${where}: a "rounds" értéke érvénytelen (${p.rounds})`);
    }
    const blocks = p.blocks || {};
    for (const bk of BLOCK_KEYS) {
      const items = blocks[bk];
      if (items == null) continue;
      if (!Array.isArray(items)) {
        errors.push(`${where}.blocks.${bk}: nem tömb`);
        continue;
      }
      items.forEach((item, i) => {
        const at = `${where}.blocks.${bk}[${i}]`;
        if (!isPlainObject(item) || !item.exerciseId) {
          errors.push(`${at}: hiányzik az "exerciseId"`);
          return;
        }
        if (!exercises[item.exerciseId]) {
          errors.push(`${at}: ismeretlen gyakorlat "${item.exerciseId}"`);
        }
        if (item.variants != null) {
          if (bk !== 'main') {
            warnings.push(`${at}: "variants" csak a "main" blokkban értelmezett`);
          }
          if (!Array.isArray(item.variants)) {
            errors.push(`${at}.variants: nem tömb`);
          } else {
            item.variants.forEach((vid, vi) => {
              if (!exercises[vid]) {
                errors.push(`${at}.variants[${vi}]: ismeretlen gyakorlat "${vid}"`);
              } else if (exercises[vid].sided !== exercises[item.exerciseId].sided) {
                errors.push(`${at}.variants[${vi}]: "${vid}" oldalisága (sided) eltér az alapgyakorlatétól – a lépésszám köröttől függővé válna`);
              }
            });
          }
        }
      });
    }
  }

  return { errors, warnings };
}
