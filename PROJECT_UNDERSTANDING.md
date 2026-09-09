# Project Understanding — Derékbarát edzés (Back-friendly Workout App)

Generated: 2026-09-08. Understanding based on reading source files directly — treat as a snapshot, re-verify against code before relying on specifics.

## What this is

A small, single-purpose Hungarian-language web app for guiding a user (likely someone with back issues — "derékbarát" = "back-friendly") through timed exercise routines (warmup → main → cooldown, in rounds), plus a companion admin editor to manage the exercise library and workout programs. No frontend framework or build step — plain HTML/CSS/JS files deployed as static assets, backed by a couple of Netlify serverless functions and Netlify Blobs as the datastore.

## Repo layout

- `index.html` (~129KB) — **the trainer/timer app**, the main deployed page. Identical to `20260808-1056-derekbarat-edzes-idozito.html` (a dated snapshot/backup left in the repo root).
- `szerkeszto.html` (~41KB) — **the admin editor app**, for CRUD on exercises and programs. `20260808-1056-derekbarat-edzes-szerkeszto.html` is an older, now-diverged snapshot of this file (also left in repo root).
- `images/` — `.webp` illustrations for exercises, referenced by relative path from the JSON data (e.g. `images/birddog.webp`).
- `netlify/functions/` — the only backend code:
  - `trainings.mjs` — GET/PUT/POST `/api/trainings`, backed by Netlify Blobs (store `derekbarat-adatok`, key `trainings`). GET is public/unauthenticated (both apps need it on load). PUT/POST require header `x-edit-token` matching `process.env.EDIT_TOKEN`; on first-ever GET with empty store it seeds from `_seed-data.mjs`.
  - `apply-pending.mjs` — `/api/apply-pending`, an idempotent importer: reads `pending-content/exercises/*.json` and `pending-content/programs/*.json` from the `main` branch via the GitHub Contents API (needs `GITHUB_TOKEN`, read-only fine-grained PAT) and merges any not-yet-present items into the Blobs store. Supports `?mode=preview` (dry run) and `?mode=apply`. Same `x-edit-token` auth as above.
  - `_seed-data.mjs` — static fallback/seed dataset (`constants`, `exercises` object keyed by slug, `programs` array), used only to initialize an empty Blobs store.
- `netlify.toml` — `functions = "netlify/functions"`, `publish = "."` (whole repo root is the publish directory).
- `package.json` — deps only: `@netlify/blobs`, `@netlify/functions`. No build/test scripts, no bundler.
- No README, no tests, no CI config found.

## Data model

Central JSON document (served via `/api/trainings`, edited via `szerkeszto.html`, consumed by `index.html`):

```
{
  constants: { work_sec, rest_sec, quick_rest_sec, round_rest_sec, prep_sec, block_transition_sec, rounds_min, rounds_max },
  exercises: {
    "<slug-id>": {
      name, category ("warmup"|"main"|"cooldown"), equipment: [],
      description, image, duration_sec?, subtitle?, quick_rest_default,
      mirror, sided, side_labels?: {left, right}, description_switch?,
      image_right?, muscle_groups: [...], legacy_pose_a/b? (old inline SVG stick-figure poses, superseded by images),
      source_reference?
    }, ...
  },
  programs: [
    { id, name, rounds, blocks: { warmup: [...], main: [...], cooldown: [...] } }
    // each block item: { exerciseId, quickRest?, durationOverride?, sided? }
    // main block items only: variants?: ["exId2", "exId3", ...]
  ]
}
```

- **Per-round exercise variation (`variants`)**: a `main` block item may carry `variants: [...]` — a list of extra exercise slugs. The "variant chain" is `[exerciseId, ...variants]`; round *N* (1-based) uses chain index `(N-1) % chain.length`, so the exercises cycle round to round (2 variants ⇒ A, B, A, B…). Timer-side this is resolved lazily/cached by `makeMainResolver` in `index.html` (`mainItem(i, round)` replaces the old `MAIN[i]`). The editor enforces that every exercise in one chain shares the same `sided` flag, so the per-position step count stays constant across rounds. Warmup/cooldown do not support this (they run once).

- Exercise IDs are slugs generated from the Hungarian name (accent-stripped, lowercased, hyphenated) — same `slugify` logic duplicated in `szerkeszto.html` and `apply-pending.mjs`.
- `sided` exercises (e.g. side plank, single-arm stretch) get expanded into two timer steps (left/right) at runtime by `index.html`'s `expandBlockItem`.
- Editors can add content out-of-band as JSON files under `pending-content/exercises/` or `pending-content/programs/` committed to `main`, then trigger `/api/apply-pending` to merge them in without hand-editing the live Blobs data.

## `index.html` — the timer app

- Single-file app: inline `<style>` (custom CSS variables for a dark green/teal theme, `--bg`, `--work`, `--rest`, `--prep` colors) + inline `<script>` (~2500+ lines).
- On load, fetches `/api/trainings`; on failure falls back to an embedded `FALLBACK_TRAININGS_DATA` constant baked into the page (so the app still works if the API/Blobs is down) and shows an offline banner.
- Core runtime concepts:
  - `WORKOUTS` / `WORKOUT_ORDER` — built from `programs`, switchable via a drawer menu (`renderWorkoutList`, `switchWorkout`).
  - A flattened `queue` of phases (prep, warmup/main/cooldown work + rest steps, round rests, block transitions) built by `buildQueue()`; `qIndex` tracks position.
  - Round count is user-adjustable within `[rounds_min, rounds_max]`, with `rebuildQueueForNewRounds()` re-slicing the queue mid-session.
  - Rendering: circular progress ring (SVG stroke-dashoffset via `CIRC = 2πr`), exercise card with image or legacy inline-SVG stick figure pose, next-exercise hint, session summary modal (`buildSummaryHTML`).
  - Audio/feedback: Web Audio beeps (`beep`, `playProgressBeeps`, tone by frequency), an `<audio>` element pool for beep playback resilience (`elementBeep`, `beepPool`), Hungarian text-to-speech announcing the next exercise (`speechSynthesis`, `pickHuVoice`), and a "keep screen awake" hack using a silent looping `<video>`/`<audio>` plus Wake Lock API fallback (`startKeepAwakeMedia`, `keepAwakeHeartbeat`, `releaseWakeLock`).
  - Play/pause/back/forward controls, mute toggle, rounds +/- controls, hamburger drawer to switch workouts.
- No auth needed — it's the public-facing page anyone doing the workout uses.

## `szerkeszto.html` — the editor app

- Also single-file, inline CSS + JS (~1000+ lines).
- Auth: prompts for an edit token on first write attempt (`ensureEditToken`), stores it in `localStorage['szerkeszto_token']`, sends it as `x-edit-token` header on PUT to `/api/trainings`; clears it from localStorage on a 401.
- Three-pane layout implied by `renderLeft` / `renderMid` / `renderRight`:
  - Mid: list of programs (cards), `programStats` shows totals.
  - Left: edit form for the selected program (name, id, rounds, per-block exercise lists with reorder ↑/↓, edit ✎, remove ✕, duplicate/delete program).
  - Right: computed preview (duration estimate, equipment aggregated across the program, warnings list).
  - Also a library panel (`renderLibraryPanel`, `renderLibList`, tag/equipment filters, tooltip preview) to browse/add existing exercises into a program's block, and an exercise editor modal (`openExerciseEditor`/`renderExerciseForm`) covering name, category, muscle groups, equipment, description (+ switch-side description for `sided` exercises), duration, image (upload with client-side resize via canvas to a data URL, or manual path), mirror flag.
  - An "import pending content" flow (`renderImportSummary`, `fetchImportSummary`) that calls `/api/apply-pending` in preview then apply mode and shows a summary of new/skipped/errored items.
- Saves the whole `{exercises, programs}` (plus presumably `constants`, need to verify) document back via PUT `/api/trainings`; `setDirty`/`dirty` flag gates the Save button.

## Deployment / ops notes (from code comments)

- Hosted on Netlify; GitHub-based deploy (not drag-and-drop) is called out in a comment as the reason `EDIT_TOKEN` is reliably read from env vars now (there's git history of it once being hardcoded, per a comment in `trainings.mjs`).
- `apply-pending.mjs` comments flag known tech debt: `EDIT_TOKEN` is duplicated as a concept across two functions and should really be unified; there's no automatic archiving of `pending-content/*` files after a successful import.
- GitHub owner/repo hardcoded in `apply-pending.mjs`: `gergog76/personal-trainer`, branch `main`.

## Open questions / things not yet verified

- Full contents of `_seed-data.mjs`'s `programs` array beyond `core-alap` (file is long; only partially read).
- Whether `szerkeszto.html`'s save payload includes `constants` or only `exercises`/`programs` (trainings.mjs only validates presence of those two on write).
- Whether the two dated snapshot HTML files in the repo root are intentionally kept (backups) or stale clutter — worth asking before touching them.
