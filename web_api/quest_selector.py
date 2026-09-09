"""Quest selector scaffolding for lootfile append generation."""

from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/quest-selector", tags=["quest-selector"])


class QuestItem(BaseModel):
    item_id: int
    item_name: str
    min_count: int = Field(default=1, ge=1)


class QuestDefinition(BaseModel):
    quest_id: str
    quest_name: str
    zone: str
    npc: str
    items: list[QuestItem]


class LootfileRequest(BaseModel):
    quest_id: str = Field(min_length=1)
    include_comments: bool = True


class LootfileResponse(BaseModel):
    quest_id: str
    quest_name: str
    append_block: str
    lines: list[str]
    item_count: int


QUEST_CATALOG: dict[str, QuestDefinition] = {
    "sky_bard_test": QuestDefinition(
        quest_id="sky_bard_test",
        quest_name="Plane of Sky Bard Test",
        zone="Plane of Sky",
        npc="Bard Quest NPC",
        items=[
            QuestItem(item_id=100001, item_name="Light Woolen Mask", min_count=1),
            QuestItem(item_id=100002, item_name="Crude Wooden Flute", min_count=1),
        ],
    ),
    "sky_warrior_test": QuestDefinition(
        quest_id="sky_warrior_test",
        quest_name="Plane of Sky Warrior Test",
        zone="Plane of Sky",
        npc="Warrior Quest NPC",
        items=[
            QuestItem(item_id=100101, item_name="Azure Ring", min_count=1),
            QuestItem(item_id=100102, item_name="Stone Amulet", min_count=1),
        ],
    ),
}


def list_quests_payload() -> list[dict[str, Any]]:
    payload = []
    for quest in sorted(QUEST_CATALOG.values(), key=lambda q: q.quest_name.casefold()):
        payload.append({
            "quest_id": quest.quest_id,
            "quest_name": quest.quest_name,
            "zone": quest.zone,
            "npc": quest.npc,
            "required_items": len(quest.items),
        })
    return payload


def build_lootfile_append(quest: QuestDefinition, include_comments: bool = True) -> list[str]:
    lines: list[str] = []
    if include_comments:
        lines.append(f"# Quest: {quest.quest_name}")
        lines.append(f"# Zone: {quest.zone} | NPC: {quest.npc}")

    for item in quest.items:
        # Format is intentionally plain text for now; adapt to game-specific lootfile syntax later.
        lines.append(f'additem "{item.item_name}" {item.min_count}')

    return lines


@router.get("/quests")
def list_quests() -> dict[str, Any]:
    return {"quests": list_quests_payload()}


@router.post("/generate-lootfile", response_model=LootfileResponse)
def generate_lootfile(payload: LootfileRequest) -> LootfileResponse:
    quest = QUEST_CATALOG.get(payload.quest_id)
    if quest is None:
        raise HTTPException(status_code=404, detail="Unknown quest_id")

    lines = build_lootfile_append(quest, include_comments=payload.include_comments)
    return LootfileResponse(
        quest_id=quest.quest_id,
        quest_name=quest.quest_name,
        append_block="\n".join(lines) + "\n",
        lines=lines,
        item_count=len(quest.items),
    )
