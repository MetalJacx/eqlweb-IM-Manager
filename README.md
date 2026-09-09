# eqlweb-IM-Manager

Read-only local web app for EverQuest Legends inventory analysis.

A static, frontend-only site — no backend, no API, no server component. Everything runs client-side in the browser.

## What this project does

- Parses EQL `/outputfile inventory` exports
- Finds duplicate gear by item ID
- Separates confirmed merge candidates from possible +0 duplicates
- Projects merge XP and tier progress
- Runs analysis fully in your browser using JavaScript
- Provides a browser UI for file upload and result viewing
- Supports drag-and-drop inventory file upload
- Includes filters for Hide already +10 and Hide Sky turn-ins

## Safety boundaries

- Read-only behavior only
- No gameplay automation
- No backend, no API calls, no data ever leaves your browser

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
