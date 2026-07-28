# Site Insights — first-party analytics

Private analytics for the portfolio + Ask Shirley, gated by owner chatbot login.

## Architecture

```
Browser (SPA)
  ├─ AnalyticsProvider → page_viewed / engagement / clicks
  ├─ POST /api/analytics/events   (public, allowlisted, rate-limited)
  └─ POST /view                   (legacy session counter + email trigger)

Ask Shirley
  └─ records chat_usage_events + redacted visitor_chat_messages (public only)

Owner
  └─ GET /api/owner/analytics/*   (HttpOnly cookie session required)
  └─ /insights UI
```

## What is collected

- Page views, active engagement time (visibility + inactivity cutoff)
- Explicit clicks via `data-analytics-id`
- Referrer **domain** + UTM source/medium/campaign
- Approximate geo from Cloudflare `request.cf` (country/region/city)
- Device/browser family from UA (also bot heuristic)
- Chatbot operational usage (tokens, latency, tools, estimated cost)
- Redacted **public** visitor questions (never owner auth / owner chats)

## What is NOT collected

- Passwords, `/owner` credentials, session tokens, API keys
- Full IP addresses
- Fingerprints, mouse coords, keystrokes, session replay
- Full referrer URLs with query strings
- Private owner conversation contents in visitor analytics
- Arbitrary DOM text

## Migrate + deploy

```bash
cd workers/portfolio-view-counter
npm run db:migrate:analytics:local   # local
npm run db:migrate:analytics         # remote (--remote)
npm run deploy
```

Frontend: rebuild/publish Pages so `/insights` and the tracker ship.

## Verify

1. Visit a few pages on production → Insights → Pages shows views (after owner login).
2. Leave a tab inactive → active time should not grow unbounded.
3. Click a control with `data-analytics-id` → Interactions.
4. Ask a public chatbot question with an email → Visitor questions shows `[email]`.
5. Owner chat does **not** appear under Visitor questions.
6. Every N human `/view` increments → richer Resend email.
7. Chat a few turns → AI usage tokens/cost update (estimated).
8. Logged-out `/insights` redirects to `/ask`; API returns 401.
9. Data controls → cleanup / clear / export.

## Limitations

- Visitor uniqueness is first-party localStorage — clears with storage, not cross-device.
- Bot detection is UA heuristics only.
- Geo is edge-approximate; min-count ≥2 hides rare locations.
- Model cost is local estimate from `model_pricing`, not OpenAI invoices.
- Provider account reconciliation (Phase 5) not implemented yet.
- Charts are table-first (no heavy chart library).
