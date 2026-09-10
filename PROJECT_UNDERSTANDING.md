# Project Understanding — Derékbarát edzés (Back-friendly Workout App)

Updated: 2026-09-10. Based on reading source directly — treat as a snapshot, re-verify against code before relying on specifics.

## What this is

A small, single-purpose Hungarian-language web app for guiding a user (likely someone with back issues — "derékbarát" = "back-friendly") through timed exercise routines (warmup → main → cooldown, in rounds), plus a companion admin editor to manage the exercise library and workout programs. No frontend framework or bundler — plain HTML/CSS/JS deployed as static assets on Netlify, with one serverless function used only by the editor to commit changes.

## Source of truth: the `data/` directory

**All training data lives in the git repo** as many small JSON files under `data/`. There is no runtime database. The old Netlify Blobs store and the `/api/trainings` + `/api/apply-pending` functions were removed in favour of this.

```
data/
  constants.json              timer constants (work_sec, rest_sec, …, rounds_min/max)
  muscle-groups.json          muscle_group_taxonomy: { "<key>": "<magyar címke>" }
  exercises/<id>.json         one exercise; the FILENAME is the id (no "id" field in the body)
  programs/_order.json        ["<program-id>", …] — the display order of programs
  programs/<id>.json          one program; filename is the id
  trainings.json              GENERATED at deploy time, gitignored — do not edit or commit
```

`lib/data-schema.mjs` is the single place that knows how to split the dataset into files
(`datasetToFiles`), reassemble it (`filesToDataset`), and validate it (`validate`). The
build script, the save function, and the migration script all import it.

## Build

`scripts/build-data.mjs` reads `data/**`, validates, and writes `data/trainings.json`.
It is the Netlify build command (`netlify.toml`). It runs on every deploy (production and
PR deploy previews) and can be run locally with `node scripts/build-data.mjs`.

**On a validation error the build exits non-zero, so the deploy fails and the previous
working version stays live.** Broken exercise references, missing image files, `data:` URLs,
and slug/filename mismatches all fail the build.

The generated file carries a `_meta` block (`{ context, commit, generated_at }`) filled
from Netlify's `CONTEXT` / `COMMIT_REF` env vars. The editor reads it to know whether it is
running on a PR preview (can save) or production (read-only), and which commit it loaded.

## Editing workflow

The editor (`szerkeszto.html`) only allows saving when served from a **`dev` → `main` PR
deploy preview** (or a `dev` branch deploy, if one is ever enabled). Production is read-only.

1. Open (or keep open) a PR from `dev` to `main`.
2. Edit on the PR's deploy preview URL. **Save** POSTs the whole dataset to `/api/save-data`.
3. `save-data.mjs` diffs it against the current `dev` tree and pushes ONE atomic commit to
   `dev` via the GitHub Git Data API (blob → tree → commit → ref). Changed JSON files and
   any newly uploaded images land in the same commit.
4. The PR preview rebuilds (~1 min) and shows the change. The PR diff is the content change,
   reviewable.
5. Merge the PR → production deploy.

Concurrency: the editor loads the `dev` head SHA and sends it as `baseSha`. If `dev` moved
(another save, or a running build), the function returns 409 and the editor tells you to
reload. New exercises can also be added by hand: drop a `data/exercises/<slug>.json` file
and commit it.

## Data model

```
constants: { work_sec, rest_sec, quick_rest_sec, round_rest_sec, prep_sec,
             block_transition_sec, rounds_min, rounds_max }
exercises: {
  "<slug-id>": {
    name, category ("warmup"|"main"|"cooldown"), equipment: [],
    description, image, duration_sec?, subtitle?, quick_rest_default,
    mirror, sided, side_labels?: {left, right}, description_switch?,
    image_right?, muscle_groups: [...],
    legacy_pose_a/b? (old inline SVG stick-figure poses, superseded by images),
    source_reference?
  }, ...
}
programs: [
  { id, name, rounds, blocks: { warmup: [...], main: [...], cooldown: [...] } }
  // each block item: { exerciseId, quickRest?, durationOverride?, sided? }
  // main block items only: variants?: ["exId2", "exId3", ...]
]
```

- **Per-round exercise variation (`variants`)**: a `main` block item may carry `variants: [...]`.
  The "variant chain" is `[exerciseId, ...variants]`; round *N* (1-based) uses chain index
  `(N-1) % chain.length`, so exercises cycle round to round. Timer-side this is resolved by
  `makeMainResolver` in `index.html`. `validate` enforces that every exercise in one chain
  shares the same `sided` flag, so the per-position step count stays constant across rounds.
- Exercise IDs are slugs of the Hungarian name (accent-stripped, lowercased, hyphenated) —
  `slugify` in `lib/data-schema.mjs`, the one remaining copy.
- `sided` exercises get expanded into two timer steps (left/right) at runtime by
  `index.html`'s `expandBlockItem`.

## `index.html` — the timer app

- Single-file app: inline `<style>` + inline `<script>`.
- On load, fetches `data/trainings.json` (`cache: 'no-cache'`). On failure it shows an error
  banner and stops — there is no embedded fallback copy any more (the JSON ships from the
  same deploy as the HTML, so if the page loaded, the data loads).
- Runtime concepts unchanged: `WORKOUTS` / `WORKOUT_ORDER` from `programs`, a flattened
  `queue` of phases from `buildQueue()`, circular SVG progress ring, Web Audio beeps,
  Hungarian text-to-speech, Wake Lock + silent-media keep-awake hack.
- No auth — the public-facing page.

## `szerkeszto.html` — the editor app

- Single-file, inline CSS + JS.
- Loads `data/trainings.json` plus `GET /api/save-data` (returns the `dev` head SHA).
  A context bar shows whether saving is possible and whether a build is in progress.
- Auth: prompts for the edit token on first save, stored in `localStorage['szerkeszto_token']`,
  sent as `x-edit-token` on POST to `/api/save-data`; cleared on 401.
- Panels: program list (`renderMid`), program editor (`renderLeft`), computed preview
  (`renderRight`), exercise library (`renderLibraryPanel`), exercise editor modal
  (`renderExerciseForm`).
- Image upload: resized client-side to a webp Blob (jpeg fallback), staged in `pendingImages`,
  committed as a real file in `images/` on save. No `data:` URLs — the record only ever holds
  a path.

## Backend

`netlify/functions/save-data.mjs` — `/api/save-data`.
- `GET` → `{ branch: "dev", headSha }`, unauthenticated (only a commit SHA).
- `POST { baseSha, data, images?, message? }` → atomic commit to `dev`, or 409 / 400.
- Env vars (must be scoped to include Deploy previews): `EDIT_TOKEN` (the editor password),
  `GITHUB_TOKEN` (fine-grained PAT for `gergog76/personal-trainer`, **Contents: Read and write**).
- The function never writes to `main`.

## Deployment / ops

- Hosted on Netlify, GitHub-connected. `netlify.toml`: build command `node scripts/build-data.mjs`,
  `functions = "netlify/functions"`, `publish = "."`.
- Deploy previews for PRs against `main` must be enabled (Netlify default).
- Migration: `scripts/export-blobs-to-repo.mjs` was the one-time export of the live Blobs
  document into `data/**`. It and the `@netlify/blobs` dependency can be removed once the
  cutover is confirmed.
- `package.json` still has no scripts block; `node` runs the `.mjs` files directly.
