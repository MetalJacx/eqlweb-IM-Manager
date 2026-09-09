# eqlweb-IM-Manager

Read-only web app and backend for EverQuest Legends inventory analysis.

This project is split from the desktop app so web releases can move independently without affecting the desktop binary workflow.

## What this project does

- Parses EQL `/outputfile inventory` exports
- Finds duplicate gear by item ID
- Separates confirmed merge candidates from possible +0 duplicates
- Projects merge XP and tier progress
- Returns structured JSON and report text from the API
- Provides a browser UI for file upload and result viewing

## Safety boundaries

- Read-only behavior only
- No gameplay automation
- No file persistence required by the app

## Endpoints

- `GET /health`
- `POST /analyze-text`
- `POST /analyze-file`

## Frontend app

Static frontend files are in [frontend/index.html](frontend/index.html).

Open locally:

```bash
python -m http.server 4173 --directory frontend
```

Then open:

```text
http://127.0.0.1:4173
```

Set API Base URL in the UI (default is `http://127.0.0.1:8000`).

## Local development

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Run the server:

```bash
uvicorn web_api.app:app --reload
```

Open API docs:

```text
http://127.0.0.1:8000/docs
```

Configure CORS for deployed frontend domains:

```text
API_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

Multiple domains can be comma-separated.

## Tests

```bash
python -m unittest tests/test_core_analysis.py
```

## GitHub Actions

- [CI workflow](.github/workflows/ci.yml) runs tests on push and pull requests.
- [Deploy workflow](.github/workflows/deploy-render.yml) triggers Render deploys on `main` pushes when `RENDER_DEPLOY_HOOK_URL` secret is set.

## Free preview deployment

### API on Render

1. In Render, create a new Web Service from this repository.
2. Use [render.yaml](render.yaml) or these values:
	- Build command: `pip install -r requirements.txt`
	- Start command: `uvicorn web_api.app:app --host 0.0.0.0 --port $PORT`
3. Set `API_ALLOWED_ORIGINS` to your frontend domain.
4. Copy the deployed API URL.

### Frontend on Vercel

1. Import this repository into Vercel.
2. Set Root Directory to `frontend`.
3. Deploy and copy the Vercel URL.
4. In the web UI, set API Base URL to your Render API URL.

### Optional auto-deploy hook

To auto-deploy Render from GitHub Actions:

1. Create a Render Deploy Hook.
2. Add GitHub repository secret `RENDER_DEPLOY_HOOK_URL`.
3. Push to `main`.
