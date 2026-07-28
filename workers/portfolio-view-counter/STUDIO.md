# Studio — conversational CMS

Owner-mode Ask Shirley is the primary CMS for artworks, photo collections, and dreams. There is no separate admin app. The LLM proposes drafts; only the Worker tool/API layer writes to D1/R2.

## Architecture

| Content | Storage |
| --- | --- |
| Artwork / photo metadata, captions, visibility | D1 |
| Private uploads + published media | R2 (`PRIVATE_MEDIA`, `PUBLIC_MEDIA`) |
| Dream full text | D1 (private; public excerpt optional) |
| Dream Atlas structure | Proposal drafts + review (not auto-merged) |
| Monograph layouts / D3 atlas UI | Git (unchanged) |

Public visitors hit read-only routes:

- `GET /api/content/artworks`
- `GET /api/content/photo-collections`
- `GET /api/media/public/...`

Owner routes under `/api/owner/*` require the owner session cookie.

## Deploy checklist

1. Enable R2 once in the Cloudflare Dashboard (R2 → Enable / Purchase), then create buckets:

```bash
wrangler r2 bucket create portfolio-private-media
wrangler r2 bucket create portfolio-public-media
```

Uncomment the `[[r2_buckets]]` bindings in `wrangler.toml` and redeploy.

2. Run the CMS migration:

```bash
npm run db:migrate:cms
# or local: npm run db:migrate:cms:local
```

3. Deploy the Worker:

```bash
npm run deploy
```

4. Rebuild/publish the site SPA so Studio UI + Art/Photo hydrate ship.

## Owner workflow

1. Unlock owner mode in Ask Shirley (`/owner …`).
2. Attach images in chat (or paste/drop), then ask to draft an artwork / collection / dream.
3. Review the draft in chat or the **Studio** tab (Private tools).
4. Confirm publish (`publish …` / Studio **Publish**). Requires explicit confirmation.
5. Use **Recent changes** / rollback tools for supported status ops.

Dreams stay private by default. Publishing never exposes `raw_private_text` on public APIs.

## Env / bindings

Already declared in `wrangler.toml`:

- `DB` — D1 `portfolio-views`
- `PRIVATE_MEDIA` → `portfolio-private-media`
- `PUBLIC_MEDIA` → `portfolio-public-media`

Secrets unchanged from Ask Shirley (owner hash, OpenAI, etc.).
