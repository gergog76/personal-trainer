// netlify/functions/save-data.mjs
//
// A szerkesztő (szerkeszto.html) mentése. Egyetlen atomi git commitot tol a
// `dev` branchre a GitHub Git Data API-val (blob -> tree -> commit -> ref).
// Több megváltozott fájl (JSON + képek) egy commitba, egy deployba kerül.
//
// A `main`-re EZ A FUNCTION SOHA NEM ÍR. Oda csak PR merge visz tartalmat.
//
// Végpont: /api/save-data
//   GET               -> { headSha }         a dev branch feje (a szerkesztő ezt tölti be base-nek)
//   POST { baseSha, data, images?, message? }
//                     -> { ok, commit, changed[], deleted[] }  vagy 409 / 400
//
// Env varok (Netlify Site configuration -> Environment variables, "Deploy
// previews" scope is bepipálva):
//   EDIT_TOKEN    - ugyanaz a szerkesztő-jelszó, mint eddig (x-edit-token fejléc)
//   GITHUB_TOKEN  - fine-grained PAT erre a repóra, "Contents: Read and write"

import { createHash } from 'node:crypto';
import { datasetToFiles, validate } from '../../lib/data-schema.mjs';

const GITHUB_OWNER = 'gergog76';
const GITHUB_REPO = 'personal-trainer';
const TARGET_BRANCH = 'dev';
const API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

const EDIT_TOKEN = process.env.EDIT_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // teljes bejövő kép-payload (a 6 MB-os body limit alatt)

const jsonHeaders = { 'content-type': 'application/json; charset=utf-8' };
const json = (body, status = 200) =>
  new Response(JSON.stringify(body, null, 2), { status, headers: jsonHeaders });

async function gh(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(opts.body ? { 'content-type': 'application/json' } : {}),
      ...opts.headers,
    },
  });
  const text = await res.text();
  let parsed;
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(`GitHub ${res.status} ${path}: ${parsed.message || text}`);
    err.status = res.status;
    err.body = parsed;
    throw err;
  }
  return parsed;
}

const gitBlobSha = (buf) => {
  const h = createHash('sha1');
  h.update(`blob ${buf.length}\0`);
  h.update(buf);
  return h.digest('hex');
};

async function getHeadSha() {
  const ref = await gh(`/git/ref/heads/${TARGET_BRANCH}`);
  return ref.object.sha;
}

export default async (req) => {
  if (!EDIT_TOKEN || !GITHUB_TOKEN) {
    return json({ error: 'Szerver konfigurációs hiba: EDIT_TOKEN vagy GITHUB_TOKEN env var hiányzik.' }, 500);
  }

  // GET csak a dev branch fejét adja vissza (nem érzékeny, a szerkesztő ezt
  // tölti be base-nek és a "fut-e épp deploy" jelzéshez) – token nélkül is.
  if (req.method === 'GET') {
    try {
      return json({ branch: TARGET_BRANCH, headSha: await getHeadSha() });
    } catch (err) {
      return json({ error: err.message }, 502);
    }
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  if ((req.headers.get('x-edit-token') || '').trim() !== EDIT_TOKEN) {
    return json({ error: 'Unauthorized' }, 401);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { baseSha, data, images = {}, message } = body || {};
  if (!baseSha || typeof baseSha !== 'string') {
    return json({ error: 'Hiányzó "baseSha" – töltsd újra a szerkesztőt.' }, 400);
  }
  if (!data || typeof data !== 'object' || !data.exercises || !data.programs) {
    return json({ error: 'Hiányzó vagy hibás "data" (exercises / programs).' }, 400);
  }

  // Bejövő képek dekódolása
  const imageBufs = new Map(); // "images/foo.webp" -> Buffer
  let imageBytesTotal = 0;
  for (const [path, b64] of Object.entries(images)) {
    // csak "images/<fájlnév>", alkönyvtár és .. nélkül
    if (!/^images\/[A-Za-z0-9._-]+$/.test(path)) {
      return json({ error: `Érvénytelen kép-útvonal: ${path}` }, 400);
    }
    let buf;
    try {
      buf = Buffer.from(b64, 'base64');
    } catch {
      return json({ error: `Hibás base64 a képnél: ${path}` }, 400);
    }
    imageBytesTotal += buf.length;
    imageBufs.set(path, buf);
  }
  if (imageBytesTotal > MAX_IMAGE_BYTES) {
    return json(
      { error: `Túl sok kép egy mentésben (${(imageBytesTotal / 1048576).toFixed(1)} MB). Ments kevesebb új képpel.` },
      400
    );
  }

  try {
    // 1. Optimista zár: a dev feje még ott van, ahol a szerkesztő betöltötte?
    const headSha = await getHeadSha();
    if (headSha !== baseSha) {
      return json(
        { error: 'A dev branch közben elmozdult (más mentés vagy futó build). Töltsd újra a szerkesztőt.', headSha },
        409
      );
    }

    // 2. Jelenlegi fa
    const headCommit = await gh(`/git/commits/${headSha}`);
    const tree = await gh(`/git/trees/${headCommit.tree.sha}?recursive=1`);
    if (tree.truncated) {
      return json({ error: 'A repo fa túl nagy a rekurzív lekéréshez.' }, 500);
    }
    const treeShaByPath = new Map();
    for (const e of tree.tree) if (e.type === 'blob') treeShaByPath.set(e.path, e.sha);

    // 3. Validálás (a képlétezés a fában lévő + a most feltöltött képekből)
    const imagesOnDisk = new Set([
      ...[...treeShaByPath.keys()].filter((p) => p.startsWith('images/')),
      ...imageBufs.keys(),
    ]);
    const { errors, warnings } = validate(data, { imagesOnDisk });
    if (errors.length) {
      return json({ error: 'Az adat nem valid, a mentés elmaradt.', errors, warnings }, 400);
    }

    // 4. Kívánt data/ fájlok + képek, git blob sha-val
    const desired = new Map(); // path -> Buffer
    for (const [path, content] of datasetToFiles(data)) {
      desired.set(path, Buffer.from(content, 'utf8'));
    }
    for (const [path, buf] of imageBufs) desired.set(path, buf);

    const changed = [];
    const deleted = [];
    const treePatch = [];

    for (const [path, buf] of desired) {
      const want = gitBlobSha(buf);
      if (treeShaByPath.get(path) === want) continue;
      const blob = await gh('/git/blobs', {
        method: 'POST',
        body: JSON.stringify({ content: buf.toString('base64'), encoding: 'base64' }),
      });
      treePatch.push({ path, mode: '100644', type: 'blob', sha: blob.sha });
      changed.push(path);
    }

    // data/*.json törlése, ami a fában van, de már nem kell (képet nem törlünk automatikusan)
    for (const path of treeShaByPath.keys()) {
      if (path.startsWith('data/') && path.endsWith('.json') && path !== 'data/trainings.json' && !desired.has(path)) {
        treePatch.push({ path, mode: '100644', type: 'blob', sha: null });
        deleted.push(path);
      }
    }

    if (treePatch.length === 0) {
      return json({ ok: true, commit: headSha, changed: [], deleted: [], warnings });
    }

    // 5. tree -> commit -> ref
    const newTree = await gh('/git/trees', {
      method: 'POST',
      body: JSON.stringify({ base_tree: headCommit.tree.sha, tree: treePatch }),
    });
    const commit = await gh('/git/commits', {
      method: 'POST',
      body: JSON.stringify({
        message: (message && String(message).trim()) || `Szerkesztő: adatmentés (${changed.length + deleted.length} fájl)`,
        tree: newTree.sha,
        parents: [headSha],
      }),
    });

    try {
      await gh(`/git/refs/heads/${TARGET_BRANCH}`, {
        method: 'PATCH',
        body: JSON.stringify({ sha: commit.sha, force: false }),
      });
    } catch (err) {
      if (err.status === 422) {
        return json({ error: 'A dev branch közben elmozdult. Töltsd újra a szerkesztőt.', headSha: await getHeadSha() }, 409);
      }
      throw err;
    }

    return json({ ok: true, branch: TARGET_BRANCH, commit: commit.sha, changed, deleted, warnings });
  } catch (err) {
    return json({ error: err.message }, err.status && err.status < 500 ? err.status : 502);
  }
};

export const config = {
  path: '/api/save-data',
};
