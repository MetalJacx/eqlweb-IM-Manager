# eqlweb-IM-Manager

Read-only web backend for EverQuest Legends inventory analysis.

This project is split from the desktop app so web releases can move independently without affecting the desktop binary workflow.

## What this API does

- Parses EQL `/outputfile inventory` exports
- Finds duplicate gear by item ID
- Separates confirmed merge candidates from possible +0 duplicates
- Projects merge XP and tier progress
- Returns structured JSON and report text

## Safety boundaries

- Read-only behavior only
- No gameplay automation
- No file persistence required by the app

## Endpoints

- `GET /health`
- `POST /analyze-text`
- `POST /analyze-file`

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

## Tests

```bash
python -m unittest tests/test_core_analysis.py
```
