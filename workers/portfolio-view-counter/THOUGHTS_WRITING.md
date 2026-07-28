# Thoughts + Writing archive

Living personal archive: **Passing Thoughts** (encountered scraps) and **Writing** (composed long-form). Chat captures and organizes; the Tiptap editor is for writing.

## Deploy

```bash
cd workers/portfolio-view-counter
npm run db:migrate:archive          # remote D1 migration 005
# or: npm run db:migrate:archive:local
npm run deploy
```

Then rebuild/publish the SPA (`scripts/publish-pages.sh --force-root` + push `main`).

## Routes

| Path | Audience |
| --- | --- |
| `/thoughts` | Foyer — temporary vs longer |
| `/thoughts/passing` | Public desk + owner scrap archive |
| `/thoughts/longer` | Filed long-form index (+ owner drawers) |
| `/writing` | Redirects to `/thoughts/longer` |
| `/writing/:slug` | Public article permalink |
| `/writing/edit/:id` | Owner editor only |

## Public APIs

- `GET /api/thoughts/public?limit=&exclude=&context=`
- `POST /api/thoughts/encounter` `{ id }` — aggregate only
- `GET /api/writing`
- `GET /api/writing/:slug`

Owner mutations under `/api/owner/thoughts*` and `/api/owner/writing*` require the owner session cookie.

## Encounter state

Visitor encounters are stored in `localStorage` key `sz_thought_encounters`. Closing a thought removes it from that visit’s desk; the D1 row is never deleted by encounter.

## Chat tools (owner)

`create_thought`, `search_thoughts`, `set_thought_visibility`, `set_thought_behavior`, `archive_thought`, `delete_thought` (confirm), `resurface_thought`, `thoughts_to_writing_draft`, `create_writing_draft`, `list_writing`, `open_writing`, `publish_writing` / `unpublish_writing` (confirm).

## Writing images

Editor accepts image URLs. R2 Studio uploads apply once R2 bindings are enabled (see `STUDIO.md`).
