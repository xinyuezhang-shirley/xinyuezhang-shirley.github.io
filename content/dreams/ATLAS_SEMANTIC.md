# Dreams Semantic Atlas — hierarchy & consolidation

The live page at `/creative/dreams` keeps the curated ontology in `src/work/dreams/dreams-atlas.ts` (all nodes and edges). A second layer, `src/work/dreams/atlas-hierarchy.json`, decides **what is visible by default** and how motifs relate to evidence.

## Levels

| Level | Role | Default view |
| --- | --- | --- |
| `core_motif` | Durable cross-dream interpretation | Always (budget ~6–10) |
| `emerging_motif` | Growing pattern | Selective (budget ~5–8) |
| `evidence` | People / places / objects / one-offs | Hidden unless attached to a visible motif, or pin / All Evidence |

States: `new | emerging | active | foundational | dormant | fading | archived`.

## How to review

1. Open **Semantic Atlas** — you should see a small set of large motif labels, not ~80 peers.
2. Pin a motif — dossier lists supporting fragments, dreams, lineage, first/last seen.
3. Open **All Evidence** — former dense research graph.
4. Use **as of** slider to filter motifs by first appearance ordinal.
5. Optional `?atlasDebug` or “tune scores” shows prominence numbers.

## Curation (browser only)

Promote / demote / archive / pin foundational writes to `localStorage` (`dreams-atlas:curation:v1`). Drag positions persist under `dreams-atlas:positions:v{hierarchy.version}`.

**Export curation** downloads JSON you can hand-merge into `atlas-hierarchy.json` and commit. Automated prominence is not overwritten when `manualOverrides: true` on a hierarchy record.

## Consolidation (offline)

```bash
npm run consolidate:dreams          # apply high-confidence updates + write candidates
npm run consolidate:dreams:dry      # report only
npm run test:atlas-semantic         # budget / coverage checks
```

- High confidence → updates `atlas-hierarchy.json` (aliases, parent attach, fading).
- Medium/low → `content/dreams/consolidation-candidates.json` for review.
- **Never deletes** entries from `atlasNodes`.

Import (`scripts/import-dreams-from-somewhere-else.py`) runs consolidation after appending dream IDs.

## Rollback

- Set `USE_SEMANTIC_HIERARCHY = false` in `atlas-semantic.ts` (and restore the previous renderer path if needed), **or**
- Revert `atlas-hierarchy.json` / this layer’s commits.
- Clear browser `localStorage` keys above to drop personal overlays.

## Files

| Path | Role |
| --- | --- |
| `src/work/dreams/dreams-atlas.ts` | Raw curated nodes + edges (source of truth for archive) |
| `src/work/dreams/atlas-hierarchy.json` | Levels, parents, interpretive labels |
| `src/work/dreams/atlas-semantic.ts` | Prominence, decay, display budget |
| `src/pages/CreativeDreams.tsx` | D3 renderer + dossier |
| `scripts/consolidate-dreams-atlas.mjs` | Offline consolidation |
| `content/dreams/consolidation-candidates.json` | Review queue |
