# EQL Item ID Database — Worker

Serverless backend for the "Item Database" tab: a crowdsourced `item_id -> name`
lookup built from loot filter uploads. This is the one part of the project
that has a backend and sends data off the user's device — everything else in
`frontend/` stays fully client-side.

## How trust works

- A mapping only gains a confirmation when a **distinct** submitter (tracked
  by an anonymous client-generated ID, not an account) reports it. Re-uploading
  the same filter twice from the same browser does not count twice.
- Submissions never overwrite an existing mapping. If a new name disagrees
  with the current leader and both have real independent support, the item is
  marked `disputed` instead of silently changing.
- Status thresholds (distinct confirmations behind the leading name):
  `1` unverified, `2-4` emerging, `5+` **and** at least 30 minutes between the
  earliest and latest confirming claim verified. Two or more names each with
  2+ confirmations flips the item to `disputed` regardless of counts.
- The 30-minute span exists because `submitterId` is a self-asserted client
  UUID with no account behind it — without a time requirement, a script could
  fire 5 fake submissions with 5 fake UUIDs in a couple of seconds and get
  something to `verified` instantly. A scheduled Worker Cron Trigger
  (`*/15 * * * *`, see `[triggers]` in `wrangler.toml`) re-checks items stuck
  at `emerging` so they promote to `verified` on their own once enough time
  has passed, without needing another unrelated submission to touch them.

## Deploy

Requires a Cloudflare account and [wrangler](https://developers.cloudflare.com/workers/wrangler/).

```bash
cd worker
npm install
npx wrangler d1 create eql-item-db   # copy the returned database_id into wrangler.toml
npm run db:init:remote               # applies schema.sql to the remote D1 database
npm run deploy
```

Optional hardening before going public:

- `npx wrangler secret put TURNSTILE_SECRET_KEY` — requires a passing
  [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) token
  on every `/api/submit` call. Without this set, submissions are accepted
  unchallenged (fine for local testing, not for a public deployment).
- Set `ALLOWED_ORIGIN` in `wrangler.toml` `[vars]` to your GitHub Pages origin
  instead of leaving CORS open to `*`.
- Tune `MAX_SUBMISSIONS_PER_DAY` (default 20 per submitter ID).

After deploying, put the Worker's URL into `frontend/api-config.js`.

## Local dev

```bash
npm run db:init:local
npm run dev
```

## API

- `POST /api/submit` — `{ submitterId: uuid, entries: [{itemId, name, iconId}], turnstileToken? }`
- `GET /api/items?q=&status=&limit=&page=` — search/browse the aggregated table (used by the site's own Browse panel)
- `GET /api/items/:itemId` — one item plus every competing name claim on record
- `GET /api/export` — full unpaginated dump (`item_id`, `name`, `icon_id`, `confirmations`, `status`, `updated_at` for every item), gated by `EXPORT_TOKEN`
- `GET /api/leaderboard` — top 10 submitters by distinct items contributed, `{ name, server, item_count }`. Only includes submitters who opted into a display name via `POST /api/submit`; anonymous contributions still count toward item confirmations but never appear here.

`POST /api/submit` also accepts optional `displayName` and `server` fields alongside `entries` — providing them opts that submitter ID into the leaderboard (stored in the `submitters` table, keyed by `submitter_id`, upserted on every submission that includes them). Neither field is identity-verified; treat leaderboard names the same as any other self-asserted value in this system.

## Free public bulk access, without the cost risk

`/api/export` is **not** meant to be called by the public directly — it's meant to be called once per
schedule by a GitHub Action, which commits the result as a static file into `frontend/data/` and lets
GitHub Pages serve it to anyone, for free, no matter how many people download it. That keeps third-party
usage from ever touching D1 or counting against Worker request limits: cost is bounded by how often the
Action runs, not by how popular the data becomes.

To wire this up:

1. `npx wrangler secret put EXPORT_TOKEN` — pick a random token, set it on the Worker.
2. In the GitHub repo, add:
   - Repository variable `ITEM_DB_API_BASE` — your deployed Worker URL (e.g. `https://eql-item-db.<subdomain>.workers.dev`)
   - Repository secret `ITEM_DB_EXPORT_TOKEN` — the same value as `EXPORT_TOKEN` above
3. The `.github/workflows/update-item-export.yml` workflow (in the repo root) runs on a schedule, calls
   `/api/export`, writes `frontend/data/items.json` and `frontend/data/items.csv`, and commits them if
   changed. That push then triggers the existing GitHub Pages deploy, so the files go live automatically.

Everyone else — the site's own Browse panel, or any third-party tool — should read `frontend/data/items.json`
/ `.csv` directly (a plain static GET, free and unmetered) rather than calling the Worker for bulk reads.
