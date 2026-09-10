# Átállás: GitHub mint egyetlen adatforrás

Ez a dokumentum az egyszeri átállás lépéseit írja le. Ha kész, törölhető, és
vele együtt a `scripts/export-blobs-to-repo.mjs`, a `@netlify/blobs` függőség,
és ez a fájl is.

## Mi változott

- Minden tréning-adat a `data/` mappában él, gyakorlatonként / programonként egy
  JSON fájlban. A `data/trainings.json` deploykor generálódik (`scripts/build-data.mjs`),
  nincs verziókövetve.
- Az időzítő app (`index.html`) ezt a statikus fájlt tölti be, nem hív functiont.
- A szerkesztő (`szerkeszto.html`) mentése a `dev` branchre commitol egyetlen
  atomi committal, a `netlify/functions/save-data.mjs` functionön keresztül.
  Csak a `dev` → `main` PR deploy preview URL-jén enged menteni.
- Törölve: `netlify/functions/trainings.mjs`, `apply-pending.mjs`, `_seed-data.mjs`,
  `pending-content/`, a base64-tisztító scriptek, a két `20260808-1056-*.html` snapshot.

## FONTOS: a `data/` mappa jelenlegi tartalma NEM az élő adat

A commitolt `data/**` a régi `_seed-data.mjs`-ből készült, ami a saját fejléce
szerint is elavulhat az élő Blobs-hoz képest (a szerkesztőben tett módosítások
sosem kerültek vissza a seedbe). A 9 nem létező képhivatkozás ki lett ürítve,
hogy a build átmenjen, és a 2 `pending-content` gyakorlat be lett emelve.

**Merge előtt le KELL futtatni a Blobs-exportot**, hogy az élő igazság kerüljön be.

## Lépések

### 1. Netlify API token

Netlify dashboard → User settings → Applications → New access token. Ez csak a
migrációhoz kell, lokálisan.

### 2. Base64 képek kiürítése az élő adatból (ha van)

A `@netlify/blobs` már telepítve van a `node_modules`-ban, `npm install` nem kell.
(Ha mégis kell: PowerShellben `npm.cmd install`, mert a sima `npm` az execution
policy miatt nem fut. Vagy Git Bashből.)

A tokent NE írd fájlba – add meg a parancs elején környezeti változóként:

```
NETLIFY_API_TOKEN=<token> node scripts/extract-base64-images.mjs
# nézd meg a listát, majd:
NETLIFY_API_TOKEN=<token> node scripts/extract-base64-images.mjs --apply
```

Ha azt írja, hogy nincs base64 kép, ugorj tovább.

### 3. Élő Blobs → `data/`

```
NETLIFY_API_TOKEN=<token> node scripts/export-blobs-to-repo.mjs
```

Ez dry-run: kilistázza, mely fájlok jönnének létre / változnának / törlődnének a
seedhez képest, és lefuttatja a validálást. Nézd át a diffet. Ha rendben:

```
NETLIFY_API_TOKEN=<token> node scripts/export-blobs-to-repo.mjs --apply
```

### 4. Validációs hibák javítása

```
node scripts/build-data.mjs
```

Ha hibát ír (jellemzően hiányzó képfájl), akkor vagy tedd be a képet az `images/`
mappába, vagy töröld a hivatkozást az adott `data/exercises/<id>.json`-ból.
Ismételd, amíg a build hibátlanul lefut.

### 5. Commit, push, PR

```
git checkout dev
git merge --ff-only origin/main   # a dev fel lett hozva a main-re
git add -A && git commit
git push origin dev
```

Nyiss PR-t `dev` → `main`. A Netlify csinál egy deploy preview-t.

### 6. Netlify beállítások (a PR preview előtt vagy alatt)

- **GitHub PAT**: a `GITHUB_TOKEN` env var mögötti fine-grained token jogát
  emeld `Contents: Read-only`-ról `Contents: Read and write`-ra (repo:
  `gergog76/personal-trainer`).
- **Env var scope**: az `EDIT_TOKEN` és a `GITHUB_TOKEN` legyen látható a
  "Deploy previews" kontextusban is (Netlify → Environment variables → scope).
- **Deploy previews**: legyen bekapcsolva a PR-ekre (ez a Netlify alapbeállítás).

### 7. Tesztelés a PR preview-n

- A preview `szerkeszto.html`-jén szerkessz valamit, Mentés → nézd meg, hogy egy
  commit jelenik meg a `dev`-en, és ~1 perc múlva látszik a preview időzítőjében.
- Két fül, két mentés → a második 409-et kapjon.
- Képfeltöltés → a commitban valódi `.webp`, nem base64.
- A produkciós `szerkeszto.html`-en a Mentés legyen letiltva.

### 8. Merge

A PR mergével a `main` megkapja a build parancsot és a `save-data.mjs`-t, a régi
functionök eltűnnek. Az élő oldal ekkor áll át.

### 9. Takarítás (merge után)

- Blobs store törlése a Netlify UI-ból (opcionális).
- `npm rm @netlify/blobs`, majd töröld: `scripts/export-blobs-to-repo.mjs`,
  `scripts/extract-base64-images.mjs`, ez a `MIGRATION.md`.
  (Ezek csak a migrációhoz kellenek, a `save-data.mjs` nem használ Blobs-ot.)
