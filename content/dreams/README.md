# Dreams archive (recovery)

This folder is the **canonical word-for-word recovery store** for redacted dream texts.

## Where to look

| Path | Purpose |
|------|---------|
| `archive/dreams-full.json` | All dreams: `{ id, date, dateSource, dateProvenance, title, fullText, sourceNote, importedAt }` |
| `archive/by-date/YYYY-MM-DD_<id>.txt` | One file per dream, keyed by date then Notes id |
| `raw/` | Gitignored unredacted Notes exports (private); do not commit |

`fullText` in `dreams-full.json` is canonical for recovery. The website UI shows **excerpts/snippets** only (`excerpt` in `src/work/dreams/dreams-data.ts`).

## Find a dream by date

1. Open `archive/dreams-full.json` and filter on `"date"`, **or**
2. Open `archive/by-date/` and pick `YYYY-MM-DD_<notesId>.txt`.

Dates are primarily **Apple Notes metadata** (`ZCREATIONDATE*` / `ZMODIFICATIONDATE*`), i.e. when the note was created or last edited — not necessarily the night of the dream. See each record’s `dateSource` / `dateProvenance`.

## Link from website snippet → archive

Each dream’s `id` / `archiveId` / `notesId` matches the archive `id` (Notes `Z_PK`). Snippet `dateLabel` matches archive `date` when known.

## Named note status

Search for a Notes title like **“dreams from somewhere else”** was run against local `NoteStore.sqlite` (titles, snippets, bodies, fuzzy match). **Not found** on this Mac at import time — likely unsynced from another device. Re-sync iCloud Notes and re-run the import script if that compilation note appears.

## Privacy

Committed archive text is **name-redacted** (`[friend]`, `[idol]`, `[dog]`, `[L—]`, etc.). Unredacted raw exports stay in gitignored `raw/`.

## Dreams from somewhere else (2026-07-20 import)

- Source copy (redacted): `sources/dreams-from-somewhere-else.md`
- Separated **50** individual dreams from the compilation markdown (48 new, 2 duplicate of existing archive).
- Boundary method: in-text date headers → blank-line blocks → secondary dream-cue splits (prefer over-splitting).
- Dates are **in-text** (`dateProvenance: in_text_dated_compilation`), not Notes metadata.
- New archive ids: `dfse01`… (see `fromBatch: dreams-from-somewhere-else`).
