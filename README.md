# eqlweb-IM-Manager

Read-only local web app for EverQuest Legends inventory analysis.

A static, frontend-only site — no backend, no API, no server component for the core inventory/loot-filter tools. Everything there runs client-side in the browser.

The one exception is the optional **Item Database** tab ([frontend/item-database.html](frontend/item-database.html)), which talks to a small serverless backend ([worker/](worker/)) to build a crowdsourced `item_id -> name` lookup from loot filter uploads. That tab is opt-in and clearly labeled — nothing is sent unless you explicitly submit, and it only ever sends item IDs, item names, and icon IDs.

## What this project does

- Parses EQL `/outputfile inventory` exports
- Finds duplicate gear by item ID
- Separates confirmed merge candidates from possible +0 duplicates
- Projects merge XP and tier progress
- Runs analysis fully in your browser using JavaScript
- Provides a browser UI for file upload and result viewing
- Supports drag-and-drop inventory file upload
- Includes filters for Hide already +10 and Hide Sky turn-ins
- Optional: contribute to and browse a community item ID database built from loot filter uploads, with a confirmation-count trust model (see [worker/README.md](worker/README.md))
- The full item ID database is also published as a free static download ([frontend/data/items.json](frontend/data/items.json) / `.csv`), refreshed daily by a scheduled GitHub Action — no API key, no rate limit, no server cost regardless of how many people use it

## Safety boundaries

- Read-only behavior only
- No gameplay automation
- No backend, no API calls, no data ever leaves your browser — except the opt-in Item Database tab, which only sends item_id/name/icon_id when you explicitly choose to submit

## Local run

Static frontend files are in [frontend/index.html](frontend/index.html).

Start a local file server:

```bash
python -m http.server 4173 --directory frontend
```

Open in browser:

```text
http://127.0.0.1:4173
```

That is all you need for local usage.

## Release operations

Use [docs/PRODUCTION_RELEASE_CHECKLIST.md](docs/PRODUCTION_RELEASE_CHECKLIST.md) before opening public access.
