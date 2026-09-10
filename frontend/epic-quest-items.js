// Class Epic Quest item reference data for the Quest LootFilter tool.
// Item names are curated EQ classic-era epic quest components/rewards, grouped by class.
//
// itemId/icon: cross-referenced against the public EQLFilter item database
// (https://eqlfilter.com/eql-items.json, snapshotted 2026-09-10) by exact name match, then
// topped up against a live LF_*.ini loot filter export a user shared with real in-game item
// IDs (2026-09-10). hasId is false when neither source has a record of the item, meaning it
// has no known Item ID yet and can't usefully be added to a loot filter.
//
// era/notYetLive: cross-referenced against eqlwiki.com's per-page content-era template
// (via its MediaWiki API, snapshotted 2026-09-10). Era templates are a historical/
// chronological tag from original EQ's release timeline, not a live-status flag by
// themselves — e.g. "Fear Era"/"Sky Era"/"Temple Era" all predate Kunark (per their own
// template docs) and Plane of Fear/Sky are explicitly confirmed live in EQL's Classic
// Era by patch notes, so only "Kunark Era"/"Epics Era"/"EpicQuests Era" tags — content
// documented as added post-Kunark, which EQL has not launched yet — count as notYetLive.
//
// hasDrop/category: eqlwiki item pages carry a `dropsfrom` field listing the zone/mob an
// item loots from; hasDrop is true when that field is populated. Items with no dropsfrom
// are only ever handed over directly by a quest NPC and never appear in a loot window, so
// a loot filter entry for them would never trigger. category buckets each item into
// exactly one of:
//   "drop"     — currently drops in a live zone, a loot filter entry is actionable now
//   "not-live" — would drop, but only once Kunark launches (notYetLive)
//   "reward"   — NPC-handed only (no dropsfrom), a filter entry would never trigger
const EPIC_QUEST_CLASS_ORDER = ["Bard", "Berserker", "Cleric", "Druid", "Enchanter", "Magician", "Monk", "Necromancer", "Paladin", "Ranger", "Rogue", "Shadow Knight", "Shaman", "Warrior", "Wizard"];

const EPIC_QUEST_CLASS_ITEMS = {
  "Bard": [
    {
      "name": "Alluring Horn",
      "itemId": 20530,
      "icon": 594,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Amygdalan Tendril",
      "itemId": 5520,
      "icon": 596,
      "hasId": true,
      "era": "Fear Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Chromodrac Gut",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Forpar's Note to Himself",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Kedge Backbone",
      "itemId": 20524,
      "icon": 907,
      "hasId": true,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Maestro's Symphony Page 24 Bottom",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Maestro's Symphony Page 24 Top",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Maestro's Symphony Page 25",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Mahlin's Mystical Bongos",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Maligar's Head",
      "itemId": 0,
      "icon": 982,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Mechanical Doll",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Metal Bits",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Mystical Lute",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Mystical Lute Body",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Note for Baenar",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Note to Forpar Fizfla",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Note to Maligar",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Onyx Drake Gut",
      "itemId": 20529,
      "icon": 853,
      "hasId": true,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Petrified Werewolf Skull",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Proof of Speed",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Red Dragon Scales",
      "itemId": 11622,
      "icon": 1232,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Red Wurm Gut",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Solusek Mining Company Invoice",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Torch of Misty",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Torch of Rathe",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Torch of Ro",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Undead Dragongut Strings",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "White Dragon Scales",
      "itemId": 11602,
      "icon": 1088,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    }
  ],
  "Berserker": [
    {
      "name": "Axe of Lost Souls",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Bag of Image Essence Dust",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Bloodbeast Tooth",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Bone Trinket",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Bore Axes of the Spirit",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Burning Essence of Rage",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Decaying Liver",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Gnashing Kobold Paw",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Image Essence",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Maniac's Garbled Tome",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "McArik Reagent Bag",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "McArik-Crafted Bandage",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Medal of Blood",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Medal of Fervid Rage",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Medal of Hunting",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Medal of Mastery",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Medal of Mirages",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Medal of Strategy",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Note for Treanik",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Philter of Major Translocation",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Scent Gland",
      "itemId": 60208,
      "icon": 819,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Sealed Note for Mardic",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Throwing Axe of the Spirit",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Treaniks Tarnished Axe",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    }
  ],
  "Cleric": [
    {
      "name": "Blood Soaked Plasmatic Priest Robe",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Coral Statue of Tarew",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Damaged Goblin Crown",
      "itemId": 0,
      "icon": 523,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Heart of Zordak Ragefire",
      "itemId": 0,
      "icon": 1003,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Lord Bergurgle's Crown",
      "itemId": 28044,
      "icon": 523,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Lord Gimblox's Signet Ring",
      "itemId": 28018,
      "icon": 1148,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Message to Natasha",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Oil of Fennin Ro",
      "itemId": 28045,
      "icon": 697,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Orb of Clear Water",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Orb of Frozen Water",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Ornate Sea Shell",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Sceptre of Ixiblat Fer",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Shimmering Pearl",
      "itemId": 20863,
      "icon": 953,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Singed Scroll",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    }
  ],
  "Druid": [
    {
      "name": "Ancient Pattern",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Ancient Rock",
      "itemId": 20688,
      "icon": 734,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Bag of Provisions",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Braided Grass Amulet",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Chilled Tundra Root",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Chunk of Tundra",
      "itemId": 0,
      "icon": 1095,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Clean Lakewater",
      "itemId": 0,
      "icon": 584,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Cleansed Spirit of Antonica",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Cleansed Spirit of Faydwer",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Cleansed Spirit of Kunark",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Crushed Pot",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Dark Metal Coin",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Earth Stained Note",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Elaborate Scimitar",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Enchanted Clay",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Faelin's Ring",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Fleshbound Tome",
      "itemId": 0,
      "icon": 865,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Froglok Essence",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Gleaming Unicorn Horn",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Green Heartwood Branch",
      "itemId": 0,
      "icon": 601,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Green Tree Bark",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Grocery List",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Hardened Mixture",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Jade Reaver",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Kedge Cave Crystals",
      "itemId": 0,
      "icon": 959,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Ocean of Tears Seavines",
      "itemId": 0,
      "icon": 1200,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Platinum Speckled Powder",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Pod of Seawater",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Pulsing Green Stone",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Pure Lakewater",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Receipt",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Ripened Heartfruit",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Rose of Firiona",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Runecrested Bowl",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Shiny Tin Bowl",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Silver Chained Locket",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Softly Glowing Stone",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Speckled Molded Mushroom",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Sweetened Mudroot",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Warm Pulsing Treant Heart",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Warmly Glowing Stone",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Wood Painting",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Worn Dark Metal Coin",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Worn note",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    }
  ],
  "Enchanter": [
    {
      "name": "1st Piece of Staff",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "2nd Piece of Staff",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "3rd Piece of Staff",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "4th Piece of Staff",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Bundle of Staves",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Chalice of Kings",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Charm and Sacrifice",
      "itemId": 0,
      "icon": 778,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Copy of Notes",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Empty Ink Vial",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Enchanted Diamond",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Enchanted Emerald",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Enchanted Ruby",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Enchanted Sapphire",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Enchanters Sack",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Essence of a Ghost",
      "itemId": 10623,
      "icon": 528,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Essence of a Vampire",
      "itemId": 10624,
      "icon": 1075,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Gift to Bozlum",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Head of a Prince",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Head of the Serpent",
      "itemId": 10622,
      "icon": 698,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Ink of the Dark",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Innoruuk's Word",
      "itemId": 10607,
      "icon": 789,
      "hasId": true,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Jeb's Seal",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Large Muddy Sandals",
      "itemId": 0,
      "icon": 666,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Lost Scroll",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Mechanical Pen",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Piece of Parchment",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Quill",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Sands of the Mystics",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Scribbled Parchment",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Shining Metallic Robes",
      "itemId": 1360,
      "icon": 929,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Snow Blossoms",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Spoon",
      "itemId": 10614,
      "icon": 618,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "The One Key",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "White Paper",
      "itemId": 0,
      "icon": 504,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Xolion Rod",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    }
  ],
  "Magician": [
    {
      "name": "Blazing Wand",
      "itemId": 10376,
      "icon": 809,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Broom of Trilon",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Burning Embers",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Crown of Elemental Mastery",
      "itemId": 20764,
      "icon": 511,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Dirt of Underfoot",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Element of Earth",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Element of Fire",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Element of Water",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Element of Wind",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Elemental Binder",
      "itemId": 28043,
      "icon": 511,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Pegasus Feather Cloak",
      "itemId": 0,
      "icon": 659,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Power of Earth",
      "itemId": 28038,
      "icon": 767,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Power of Fire",
      "itemId": 28036,
      "icon": 964,
      "hasId": true,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Power of Water",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Power of Wind",
      "itemId": 28037,
      "icon": 966,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Power of the Elements",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Power of the Orb",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Rain of Karana",
      "itemId": 28041,
      "icon": 963,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Shovel of Ponz",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Temple Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Tears of Erollisi",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Token of Mastery",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Torch of the Elements",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Torn Page of Magi'kot pg. 1",
      "itemId": 28000,
      "icon": 504,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Torn Page of Magi'kot pg. 2",
      "itemId": 28001,
      "icon": 504,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Torn Page of Magi'kot pg. 3",
      "itemId": 28002,
      "icon": 504,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Torn Page of Mastery Earth",
      "itemId": 28029,
      "icon": 864,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Torn Page of Mastery Fire",
      "itemId": 28027,
      "icon": 864,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Torn Page of Mastery Water",
      "itemId": 28030,
      "icon": 864,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Torn Page of Mastery Wind",
      "itemId": 28028,
      "icon": 864,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Words of Magi'kot",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Words of Mastery",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    }
  ],
  "Monk": [
    {
      "name": "A Metal Pipe",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Book of Celestial Fists",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Breath of Gwan",
      "itemId": 0,
      "icon": 1155,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Celestial Fists (book)",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Charred Scale",
      "itemId": 0,
      "icon": 1234,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Code of Zan Fi",
      "itemId": 12316,
      "icon": 789,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Danl's Reference",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Demon Fangs",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Eye of Kaiaren",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Immortals",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Needle of the Void",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Purple Headband",
      "itemId": 10114,
      "icon": 936,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Rare Robe Pattern",
      "itemId": 0,
      "icon": 790,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Red Sash of Order",
      "itemId": 10133,
      "icon": 935,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Robe of the Lost Circle",
      "itemId": 12256,
      "icon": 931,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Robe of the Whistling Fists",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Shadow Silk",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Shadow Wolf Pelt",
      "itemId": 13779,
      "icon": 556,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Silk Swatch",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "The Idol",
      "itemId": 12317,
      "icon": 893,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Trunt's Head",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    }
  ],
  "Necromancer": [
    {
      "name": "Apprentice Ring",
      "itemId": 0,
      "icon": 1148,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Black Silk Cape",
      "itemId": 20783,
      "icon": 842,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Cloak of Spiroc Feathers",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Eye of Innoruuk",
      "itemId": 20656,
      "icon": 1130,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Flowing Black Robe",
      "itemId": 1320,
      "icon": 1126,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Gkzzallk in a Box",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Manisi Herb",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Rolling Stone Moss",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Scaled Symbol of the Serpent",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Silver Disc",
      "itemId": 20938,
      "icon": 646,
      "hasId": true,
      "era": "Sky Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Slime Blood of Cazic Thule",
      "itemId": 0,
      "icon": 526,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Spiroc Feathers",
      "itemId": 20782,
      "icon": 1146,
      "hasId": true,
      "era": "Sky Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Tome of Instruction",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Twisted Bone Earring",
      "itemId": 0,
      "icon": 907,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    }
  ],
  "Paladin": [
    {
      "name": "Bucket of Pure Water",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Bucket of Water",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Cold Plate of Beef and Bread",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Fiery Avenger",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Ghoulbane",
      "itemId": 5403,
      "icon": 519,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Gleaming Crested Breastplate",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Gleaming Crested Shield",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Gleaming Crested Sword",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Mark of Atonement",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Pure Crystal",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "SoulFire",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Tainted Darksteel Breastplate",
      "itemId": 29001,
      "icon": 624,
      "hasId": true,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Tainted Darksteel Shield",
      "itemId": 29002,
      "icon": 758,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Tainted Darksteel Sword",
      "itemId": 29000,
      "icon": 577,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    }
  ],
  "Ranger": [
    {
      "name": "Ancient Longsword",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Ancient Pattern",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Bag of Provisions",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Braided Grass Amulet",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Chilled Tundra Root",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Crushed Pot",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Dark Metal Coin",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Dwarven Smiths Hammer",
      "itemId": 0,
      "icon": 567,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Earth Stained Note",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Enchanted Clay",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Faelin's Ring",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Fleshbound Tome",
      "itemId": 0,
      "icon": 865,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Grocery List",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Hammer of the Ancients",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Hardened Mixture",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Jade Reaver",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Platinum Speckled Powder",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Pulsing Green Stone",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Receipt",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Refined Ancient Sword",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Refined Mithril Blade",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Ripened Heartfruit",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Rose of Firiona",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Runecrested Bowl",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Shattered Emerald of Corruption",
      "itemId": 20484,
      "icon": 958,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Shiny Tin Bowl",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Silver Chained Locket",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Small bit of Mithril Ore",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Softly glowing stone",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Soulbound Hammer",
      "itemId": 0,
      "icon": 567,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Speckled Molded Mushroom",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Sweetened Mudroot",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Swirling Sphere of Color",
      "itemId": 0,
      "icon": 507,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Warmly Glowing Stone",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Wood Painting",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Worn Dark Metal Coin",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Worn note",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    }
  ],
  "Rogue": [
    {
      "name": "Book of Souls",
      "itemId": 0,
      "icon": 789,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Bottle of Milk",
      "itemId": 13087,
      "icon": 856,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Burning Rapier",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Temple Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Cazic Quill",
      "itemId": 0,
      "icon": 574,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Combined Parchment",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Fleshripper",
      "itemId": 5411,
      "icon": 568,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "General's Pouch",
      "itemId": 0,
      "icon": 722,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Gigantic Zweihander",
      "itemId": 5308,
      "icon": 519,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Jagged Diamond Dagger",
      "itemId": 0,
      "icon": 574,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Mithril Two-Handed Sword",
      "itemId": 5401,
      "icon": 519,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Painbringer",
      "itemId": 5410,
      "icon": 1165,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Robe of the Ishva",
      "itemId": 1357,
      "icon": 940,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Robe of the Kedge",
      "itemId": 1253,
      "icon": 940,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Robe of the Oracle",
      "itemId": 1354,
      "icon": 838,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Scribbled Parchment",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Sealed Box",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Shining Metallic Robes",
      "itemId": 1360,
      "icon": 929,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Stained Parchment Bottom",
      "itemId": 28011,
      "icon": 864,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Stained Parchment Top",
      "itemId": 28010,
      "icon": 864,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Stanos' Pouch",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Tattered Parchment",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Translated Parchment",
      "itemId": 0,
      "icon": 682,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    }
  ],
  "Shadow Knight": [
    {
      "name": "Blade of Abrogation",
      "itemId": 5430,
      "icon": 603,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Blood of Kyrenna",
      "itemId": 0,
      "icon": 1157,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Cell Key",
      "itemId": 14373,
      "icon": 1081,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Corrupted Ghoulbane",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Cough Elixir",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Dark Shroud",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Darkforge Breastplate",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Temple Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Darkforge Greaves",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Temple Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Darkforge Helm",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Temple Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Decrepit Hide",
      "itemId": 14371,
      "icon": 555,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Decrepit Sheath",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Drake Spine",
      "itemId": 14372,
      "icon": 804,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Dusty Tome",
      "itemId": 14382,
      "icon": 778,
      "hasId": true,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Enchanted Platinum Bar",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Ghoulbane",
      "itemId": 5403,
      "icon": 519,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Glohnor wrappings",
      "itemId": 0,
      "icon": 812,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Head of Glohnor",
      "itemId": 0,
      "icon": 982,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Head of the Valiant",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Heart of Kyrenna",
      "itemId": 0,
      "icon": 1003,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Heart of the Innocent",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Letter to Duriek",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Note to Marl",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Soul Leech, Dark Sword of Blood",
      "itemId": 11609,
      "icon": 519,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Soulcase",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Will of Innoruuk",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    }
  ],
  "Shaman": [
    {
      "name": "Black Dire Pelt",
      "itemId": 1672,
      "icon": 556,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Black Fur Boots",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Child's Tear",
      "itemId": 0,
      "icon": 1160,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Crier's Scroll",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Envy",
      "itemId": 1677,
      "icon": 1183,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Icon of the High Scale",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Iksar Scale",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Marr's Promise",
      "itemId": 1675,
      "icon": 805,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Merchant's Letter",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Opaque Gem",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Personal Diary Page",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Priest's Diary Page",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Shield of Falsehood",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Student's Log",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Tiny Gem",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Woe",
      "itemId": 1676,
      "icon": 580,
      "hasId": true,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Written Announcement",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    }
  ],
  "Warrior": [
    {
      "name": "Ancient Blade",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Ancient Sword Blade",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Ball of Everliving Golem",
      "itemId": 20677,
      "icon": 971,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Black Sapphire",
      "itemId": 10036,
      "icon": 965,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Block of Permafrost",
      "itemId": 20665,
      "icon": 1138,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Diamond",
      "itemId": 10037,
      "icon": 966,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Finely Crafted Dragon Head Hilt",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Giant Sized Monocle",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Green Dragon Scales",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Hand of the Maestro",
      "itemId": 20676,
      "icon": 918,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Heart of Frost",
      "itemId": 10549,
      "icon": 1003,
      "hasId": true,
      "era": "Temple Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Jacinth",
      "itemId": 10053,
      "icon": 767,
      "hasId": true,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Jeweled Dragon Head Hilt",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Classic Era",
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Keg of Vox Tail Ale",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Mark of the Sword",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Rebreather",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Red Dragon Scales",
      "itemId": 11622,
      "icon": 1232,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Red Scabbard",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Rejesiam Ore",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Severely Damaged Dragon Head Hilt",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Spiroc Wingblade",
      "itemId": 20679,
      "icon": 588,
      "hasId": true,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Tenal's note to Kargek",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Tiny Lute",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Totem of Fiery War",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Totem of the Freezing War",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Unjeweled Dragon Head Hilt",
      "itemId": 0,
      "icon": 1231,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Wax Sealed Note",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    }
  ],
  "Wizard": [
    {
      "name": "Arantir's Ring",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Blue Crystal Staff",
      "itemId": 14337,
      "icon": 602,
      "hasId": true,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Cazic's Skin",
      "itemId": 0,
      "icon": 555,
      "hasId": false,
      "era": null,
      "notYetLive": false,
      "hasDrop": true,
      "category": "drop"
    },
    {
      "name": "Gnarled Staff",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Golem Sprocket",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Kunark Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Green Oil",
      "itemId": 0,
      "icon": 697,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Mistletoe Powder",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": true,
      "category": "not-live"
    },
    {
      "name": "Note from Arantir",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Note to Arantir",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Ro's Breath",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "Epics Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    },
    {
      "name": "Staff of Gabstik",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "era": "EpicQuests Era",
      "notYetLive": true,
      "hasDrop": false,
      "category": "reward"
    }
  ]
};
