"""FastAPI starter for a public EQL Inventory Cleaner web backend."""

from __future__ import annotations

import os

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from core.analysis import analyze_inventory_text
from web_api.quest_selector import router as quest_selector_router


class AnalyzeTextRequest(BaseModel):
    inventory_text: str = Field(min_length=1)
    filename: str = Field(default="uploaded-inventory.txt", min_length=1)


app = FastAPI(
    title="eqlweb-IM-Manager API",
    version="0.1.0",
    description=(
        "Read-only analysis API for EverQuest Legends inventory exports. "
        "No data persistence is performed by this service."
    ),
)


def _allowed_origins() -> list[str]:
    raw = os.environ.get(
        "API_ALLOWED_ORIGINS",
        "http://127.0.0.1:4173,http://localhost:4173,http://127.0.0.1:8000",
    ).strip()
    if not raw:
        return ["http://127.0.0.1:4173"]
    return [part.strip() for part in raw.split(",") if part.strip()]


app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quest_selector_router)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/")
def root() -> dict:
    return {
        "service": "eqlweb-IM-Manager API",
        "docs": "/docs",
        "health": "/health",
    }


@app.post("/analyze-text")
def analyze_text(payload: AnalyzeTextRequest) -> dict:
    try:
        return analyze_inventory_text(payload.inventory_text, payload.filename)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/analyze-file")
async def analyze_file(file: UploadFile = File(...)) -> dict:
    try:
        raw = await file.read()
    except OSError as exc:
        raise HTTPException(status_code=400, detail="Could not read upload.") from exc

    if not raw:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    text = None
    if raw.startswith(b"\xff\xfe") or raw.startswith(b"\xfe\xff"):
        text = raw.decode("utf-16")
    else:
        try:
            text = raw.decode("utf-8-sig")
        except UnicodeDecodeError:
            try:
                text = raw.decode("utf-16")
            except UnicodeDecodeError as exc:
                raise HTTPException(
                    status_code=400,
                    detail="Unsupported encoding. Use UTF-8 or UTF-16 inventory exports.",
                ) from exc

    try:
        return analyze_inventory_text(text, file.filename or "uploaded-inventory.txt")
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
