# Portfolio view counter (Cloudflare Worker + D1 + Resend)

Private session counter for the GitHub Pages portfolio. The frontend posts once per browser session; the Worker increments a durable total and emails you at every multiple of five. The browser never receives the count.

## Architecture

| Piece | Role |
| --- | --- |
| Portfolio (`VITE_VIEW_COUNTER_ENDPOINT`) | Silent `POST /view` once per `sessionStorage` key; `POST /event` for `contact_reveal` |
| Cloudflare Worker | CORS, rate limit, increment, threshold email, event store |
| Cloudflare D1 | Atomic `total` + `last_notified`; optional `events` rows |
| Resend | Transactional email |

Secrets never ship in the frontend bundle.

---

## Ask Shirley API (same Worker)

`POST /api/ask-shirley` — OpenAI Responses API with curated system prompt from `src/ask-shirley/*`.

### Extra secrets / vars

```bash
wrangler secret put OPENAI_API_KEY
# optional if not using [vars]:
# wrangler secret put OPENAI_MODEL
```

In `wrangler.toml` `[vars]`:

```toml
OPENAI_MODEL = "gpt-4.1-mini"
ASK_SHIRLEY_RATE_MAX = "30"
```

Local `.dev.vars` must include `OPENAI_API_KEY` and `ALLOWED_ORIGIN` matching the Vite origin (`http://localhost:8080` for this portfolio).

### Frontend env

```bash
# portfolio root .env.local
VITE_ASK_SHIRLEY_ENDPOINT=http://127.0.0.1:8787
# or reuse the view-counter host:
# VITE_VIEW_COUNTER_ENDPOINT=http://127.0.0.1:8787
```

### Curl smoke test

```bash
curl -s -X POST http://127.0.0.1:8787/api/ask-shirley \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:8080" \
  -d '{"message":"Are you actually Shirley?","history":[]}'
```

Expect JSON: `{ "answer", "grounding", "relatedTopics" }`.

Do not log full conversations; the handler only logs coarse error codes.

---

## 1. Create the Worker project (already in-repo)


```bash
cd workers/portfolio-view-counter
npm install
```

Install Wrangler globally if needed: `npm i -g wrangler` then `wrangler login`.

---

## 2. Create D1 storage

```bash
wrangler d1 create portfolio-views
```

Copy the printed `database_id` into `wrangler.toml` under `database_id`.

Apply schema (remote):

```bash
npm run db:init
```

For local testing:

```bash
npm run db:init:local
```

---

## 3. Set Worker secrets and vars

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put EMAIL_TO          # your inbox
wrangler secret put EMAIL_FROM        # e.g. Portfolio <views@your-verified-domain.com>
wrangler secret put ALLOWED_ORIGIN    # https://xinyuezhang-shirley.github.io
```

Confirm production vars in `wrangler.toml`:

```toml
[vars]
ALLOW_DEV_RESET = "false"
```

**Never** set `ALLOW_DEV_RESET = "true"` in production. The `/dev/*` routes return 404 unless it is exactly `"true"`.

Optional local-only secret for reset testing:

```bash
# only in .dev.vars for local wrangler — do not put in production
echo 'DEV_RESET_SECRET=local-test-secret' >> .dev.vars
echo 'ALLOW_DEV_RESET=true' >> .dev.vars
# also set the other secrets in .dev.vars for `wrangler dev`
```

Example `.dev.vars` (gitignored):

```
RESEND_API_KEY=re_xxx
EMAIL_TO=you@example.com
EMAIL_FROM=Portfolio <onboarding@resend.dev>
ALLOWED_ORIGIN=http://localhost:5173
ALLOW_DEV_RESET=true
DEV_RESET_SECRET=local-test-secret
```

> For local frontend testing against a local Worker, `ALLOWED_ORIGIN` must match the Vite origin (e.g. `http://localhost:5173`). Production must use the GitHub Pages origin only.

---

## 4. Verify sending domain in Resend

1. Create a [Resend](https://resend.com) account.
2. Add and verify your domain (DNS records Resend provides).
3. Use a from-address on that domain for `EMAIL_FROM`.
4. During early testing you may use Resend’s onboarding sender if your account allows it; switch to your domain before relying on production alerts.

---

## 5. Deploy the Worker

```bash
npm run deploy
```

Note the URL, e.g. `https://portfolio-view-counter.<account>.workers.dev`.

---

## 6. Configure the frontend

In the portfolio root (not the Worker folder), create `.env.production` (gitignored):

```bash
VITE_VIEW_COUNTER_ENDPOINT=https://portfolio-view-counter.<account>.workers.dev
```

Rebuild and deploy GitHub Pages as usual (`npm run build` / your existing Pages workflow).

For local Vite against a local Worker (optional):

```bash
# portfolio root .env.local
VITE_VIEW_COUNTER_ENDPOINT=http://127.0.0.1:8787
```

Remember: the frontend **skips** `localhost` / `127.0.0.1` hosts by design. To exercise the Worker without the site, use `curl` (below).

---

## 7. Test counts 1–6 without emailing real visitors

### A. Local Worker only (recommended)

```bash
cd workers/portfolio-view-counter
npm run db:init:local
# put secrets in .dev.vars with ALLOW_DEV_RESET=true
npm run dev
```

Reset:

```bash
curl -s -X POST http://127.0.0.1:8787/dev/reset \
  -H "X-Dev-Reset-Secret: local-test-secret" \
  -H "Origin: http://localhost:5173"
```

Simulate five visits (use the same Origin as `ALLOWED_ORIGIN` in `.dev.vars`):

```bash
for i in 1 2 3 4 5 6; do
  curl -s -X POST http://127.0.0.1:8787/view \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:5173" \
    -d '{}'
  echo "  #$i"
done
```

Check status (dev only):

```bash
curl -s http://127.0.0.1:8787/dev/status \
  -H "X-Dev-Reset-Secret: local-test-secret"
```

Expect:
- responses `{ "ok": true }` (no totals on `/view`)
- one Resend email when `$i` hits 5
- visit 6 does not send another email

To avoid emailing yourself during dry runs, temporarily point `EMAIL_TO` at a Resend test inbox or comment out the Resend call only in a private branch — do not deploy that change.

### B. Production smoke test

1. Confirm `ALLOW_DEV_RESET=false` in production.
2. Open the live portfolio in a fresh browser / private window once → one session.
3. Clear site data / new private window for each additional session until 5.
4. Confirm one email: `Portfolio reached 5 visits`.

---

## API summary

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/view` | Increment once (CORS: production origin only). Returns `{ "ok": true }` — **never** the total. |
| `OPTIONS` | `/view` | CORS preflight |
| `POST` | `/dev/reset` | Zero counters — **only** if `ALLOW_DEV_RESET=true` + secret header |
| `GET` | `/dev/status` | Read totals — **only** if `ALLOW_DEV_RESET=true` + secret header |

### Abuse protection

- Origin must match `ALLOWED_ORIGIN`.
- Soft rate limit: ~12 POSTs / minute / hashed client (IP hashed, not logged).
- Threshold emails claimed with a conditional D1 update so concurrent hits cannot double-send.
- Failed Resend delivery rolls back `last_notified` so the threshold can retry safely.

### Privacy

- No cookies, fingerprinting, or analytics SDKs.
- No page content, forms, UA history, or precise location collected.
- Worker does not log raw IPs or visitor-identifying payloads.
