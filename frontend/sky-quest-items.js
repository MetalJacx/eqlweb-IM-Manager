// Plane of Sky class-quest item reference data for the Quest LootFilter tool.
// Each class has its own "Tests" quest line in the Plane of Sky (source: eqlwiki.com's
// Plane of Sky page, "Plane of Sky Class Quests" section, snapshotted 2026-09-10):
// turn in Wind Runes plus specific Sky drops to a class quest NPC for a class-specific
// reward. category is "drop" for the Rune/turn-in items (the actual loot, relevant to a
// loot filter) and "reward" for the final item handed back by the NPC (never appears as
// loot, so a filter entry for it would never trigger).
//
// Unlike Epic Quest, Plane of Sky is already live in EQL's Classic Era -- every item name
// here was checked against eqlwiki's per-page era template and none came back tagged with
// a Kunark-only era, so there is no notYetLive/"Not Live Yet" bucket for this category.
//
// itemId/icon: cross-referenced against the public EQLFilter item database
// (https://eqlfilter.com/eql-items.json, snapshotted 2026-09-10) by exact name match, then
// topped up against a live LF_*.ini loot filter export a user shared with real in-game item
// IDs (2026-09-10) -- that filled in every Wind Rune ID, since eqlfilter.com had none of
// them cataloged yet. hasId is false when neither source has a record of the item.
const SKY_QUEST_CLASS_ORDER = ["Bard", "Beastlord", "Berserker", "Cleric", "Druid", "Enchanter", "Magician", "Monk", "Necromancer", "Paladin", "Ranger", "Rogue", "Shadow Knight", "Shaman", "Warrior", "Wizard"];

const SKY_QUEST_CLASS_ITEMS = {
  "Bard": [
    {
      "name": "Wind Rune Meda",
      "itemId": 177776,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Light Woolen Mask",
      "itemId": 20821,
      "icon": 677,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Mask of Song",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Kala",
      "itemId": 177779,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Light Woolen Mantle",
      "itemId": 20823,
      "icon": 665,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Mantle of the Songweaver",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Azia",
      "itemId": 177780,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Crude Wooden Flute",
      "itemId": 20825,
      "icon": 751,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Ervaj's Flute of Flight",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Caza",
      "itemId": 177782,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Amulet of Woven Hair",
      "itemId": 20827,
      "icon": 754,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Amulet of the Fae",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Fana",
      "itemId": 177785,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Glowing Diamond",
      "itemId": 0,
      "icon": 966,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Efreeti War Horn",
      "itemId": 20830,
      "icon": 594,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Denon's Horn of Disaster",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Heda",
      "itemId": 177787,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Nebulous Diamond",
      "itemId": 20833,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti War Spear",
      "itemId": 20831,
      "icon": 740,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Spear of Harmony",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Beastlord": [
    {
      "name": "Wind Rune Beza",
      "itemId": 177781,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Spiroc Elder's Totem",
      "itemId": 20867,
      "icon": 894,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Spiroc Beak Earcuff",
      "itemId": 0,
      "icon": 501,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Heda",
      "itemId": 177787,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Azarack Skin",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Azarack Skin Wristwraps",
      "itemId": 0,
      "icon": 637,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Izah",
      "itemId": 177788,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Sphinx Claw",
      "itemId": 0,
      "icon": 801,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Mithril Bands",
      "itemId": 20819,
      "icon": 675,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Brass Knuckles",
      "itemId": 20803,
      "icon": 505,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Windhowl",
      "itemId": 0,
      "icon": 975,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Kala",
      "itemId": 177779,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Leather Cord",
      "itemId": 20835,
      "icon": 848,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Griffon-Hide Armguards",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Geza",
      "itemId": 177786,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Silken Wrap",
      "itemId": 0,
      "icon": 853,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Diaphonous Waistband",
      "itemId": 0,
      "icon": 718,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Berserker": [
    {
      "name": "Wind Rune Jaka",
      "itemId": 177789,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Djinni War Blade",
      "itemId": 0,
      "icon": 603,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Efreeti Standard",
      "itemId": 20817,
      "icon": 578,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Skycleaver",
      "itemId": 0,
      "icon": 568,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ena",
      "itemId": 177784,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Pulsating Ruby",
      "itemId": 0,
      "icon": 964,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Molten Coil",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ozah",
      "itemId": 177778,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "High Quality Raiment",
      "itemId": 20746,
      "icon": 842,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Sash of Ferocity",
      "itemId": 0,
      "icon": 935,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Azia",
      "itemId": 177780,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Feathered Cape",
      "itemId": 20755,
      "icon": 659,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Shroud of the Sky",
      "itemId": 0,
      "icon": 769,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Lena",
      "itemId": 177775,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Azarack Blood",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Blood-Drawn Runes",
      "itemId": 0,
      "icon": 797,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Dena",
      "itemId": 177783,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Jester's Mask",
      "itemId": 20987,
      "icon": 770,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Great Staff",
      "itemId": 20792,
      "icon": 602,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Cudgel of the Fool",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Cleric": [
    {
      "name": "Wind Rune Lena",
      "itemId": 177775,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Silver Hoop",
      "itemId": 20807,
      "icon": 544,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Truewind Earring",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Meda",
      "itemId": 177776,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Small Shield",
      "itemId": 20809,
      "icon": 542,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Aegis of the Wind",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Caza",
      "itemId": 177782,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Shiny Pauldrons",
      "itemId": 20811,
      "icon": 798,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Pauldrons of Piety",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Neza",
      "itemId": 177777,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Silvered Spiroc Necklace",
      "itemId": 20813,
      "icon": 1043,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Necklace of Resolution",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Kala",
      "itemId": 177779,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Djinni Aura",
      "itemId": 20815,
      "icon": 823,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Mace",
      "itemId": 20816,
      "icon": 578,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Theurgist's Star",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ena",
      "itemId": 177784,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Mithril Bands",
      "itemId": 20819,
      "icon": 675,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Standard",
      "itemId": 20817,
      "icon": 578,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Baton of the Sky",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Druid": [
    {
      "name": "Wind Rune Meda",
      "itemId": 177776,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Worn Leather Mask",
      "itemId": 20729,
      "icon": 771,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Drake-Hide Mask",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Kala",
      "itemId": 177779,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Mantle of Woven Grass",
      "itemId": 0,
      "icon": 665,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Nature Walker's Mantle",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Azia",
      "itemId": 177780,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Spiroc Battle Staff",
      "itemId": 20733,
      "icon": 1083,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Statuette",
      "itemId": 20951,
      "icon": 895,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Shillelagh",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Dena",
      "itemId": 177783,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Divine Honeycomb",
      "itemId": 0,
      "icon": 1069,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Honeycomb Belt",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ena",
      "itemId": 177784,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Ethereal Ruby",
      "itemId": 0,
      "icon": 964,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Spiroc Elder's Totem",
      "itemId": 20867,
      "icon": 894,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Spiroc Banisher Focus",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Izah",
      "itemId": 177788,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Storm Sky Opal",
      "itemId": 20740,
      "icon": 960,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Scimitar",
      "itemId": 20739,
      "icon": 604,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Espri",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Enchanter": [
    {
      "name": "Wind Rune Meda",
      "itemId": 177776,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Finely Woven Cloth Cord",
      "itemId": 20768,
      "icon": 572,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Sphinx Hair Cord",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ozah",
      "itemId": 177778,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Light Cloth Mantle",
      "itemId": 0,
      "icon": 665,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Wind Walker's Mantle",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Beza",
      "itemId": 177781,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Silken Mask",
      "itemId": 20772,
      "icon": 677,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Ivory Mask",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Caza",
      "itemId": 177782,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Adamantium Earring",
      "itemId": 0,
      "icon": 534,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Earring of Displacement",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Fana",
      "itemId": 177785,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Glowing Necklace",
      "itemId": 20776,
      "icon": 500,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Necklace of Whispering Winds",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Izah",
      "itemId": 177788,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Large Sky Sapphire",
      "itemId": 20752,
      "icon": 965,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Wind Staff",
      "itemId": 20779,
      "icon": 602,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Rod of the Protecting Winds",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Magician": [
    {
      "name": "Wind Rune Lena",
      "itemId": 177775,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Feathered Cape",
      "itemId": 20755,
      "icon": 659,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Bracelet of Clarification",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Neza",
      "itemId": 177777,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Ceramic Mask",
      "itemId": 20757,
      "icon": 528,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Mask of Empowerment",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Azia",
      "itemId": 177780,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Golden Coffer",
      "itemId": 20759,
      "icon": 609,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Gold White Pendant",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Dena",
      "itemId": 177783,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Large Diamond",
      "itemId": 20761,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Drake-Hide Amice",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ena",
      "itemId": 177784,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Golden Efreeti Ring",
      "itemId": 20763,
      "icon": 1040,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Duennan Shielding Ring",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Jaka",
      "itemId": 177789,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Hazy Opal",
      "itemId": 20872,
      "icon": 894,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Magi Staff",
      "itemId": 20870,
      "icon": 811,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Staff of The Magister",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Heda",
      "itemId": 177787,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Crown of Elemental Mastery",
      "itemId": 20764,
      "icon": 511,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Large Opal",
      "itemId": 20766,
      "icon": 959,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Djinni Stave",
      "itemId": 20765,
      "icon": 601,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Staff of Elemental Mastery: Air",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Monk": [
    {
      "name": "Wind Rune Caza",
      "itemId": 177782,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Silken Strands",
      "itemId": 20794,
      "icon": 853,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Back Straps of Mastery",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Geza",
      "itemId": 177786,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Cracked Leather Eyepatch",
      "itemId": 20796,
      "icon": 595,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Ton Po's Eye Patch",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Jaka",
      "itemId": 177789,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Dove Slippers",
      "itemId": 20798,
      "icon": 761,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Sandals of Alacrity",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Beza",
      "itemId": 177781,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Silken Wrap",
      "itemId": 0,
      "icon": 853,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Ton Po's Shoulder Wraps",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Neza",
      "itemId": 177777,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Nebulous Sapphire",
      "itemId": 0,
      "icon": 963,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Brass Knuckles",
      "itemId": 20803,
      "icon": 505,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Wu's Fist of Mastery",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Lena",
      "itemId": 177775,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Tear of Quellious",
      "itemId": 20805,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Golden Sash of Tranquility",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Necromancer": [
    {
      "name": "Wind Rune Lena",
      "itemId": 177775,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Griffon's Beak",
      "itemId": 20781,
      "icon": 1098,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Bloody Griffon-Hide Wrist Guard",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Neza",
      "itemId": 177777,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Black Silk Cape",
      "itemId": 20783,
      "icon": 842,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Cloak of Spiroc Feathers",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ozah",
      "itemId": 177778,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Fine Cloth Raiment",
      "itemId": 20785,
      "icon": 842,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Bloodsoaked Raiment",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Azia",
      "itemId": 177780,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Pulsating Ruby",
      "itemId": 0,
      "icon": 964,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Sphinx Heart Amulet",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Caza",
      "itemId": 177782,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Ring of Veeshan",
      "itemId": 20789,
      "icon": 765,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Band of Wailing Winds",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Fana",
      "itemId": 177785,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Gorgon Head",
      "itemId": 20790,
      "icon": 985,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Great Staff",
      "itemId": 20792,
      "icon": 602,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Gorgon Head Staff",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Paladin": [
    {
      "name": "Wind Rune Lena",
      "itemId": 177775,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Ivory Sky Diamond",
      "itemId": 20869,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Girdle of Faith",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ozah",
      "itemId": 177778,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Bixie Sword Blade",
      "itemId": 0,
      "icon": 591,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Aldryn, Blade of the Ocean",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Geza",
      "itemId": 177786,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Golden Hilt",
      "itemId": 20726,
      "icon": 973,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Sphinx Claw",
      "itemId": 0,
      "icon": 801,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Thelvorn, Blade of Light",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Izah",
      "itemId": 177788,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Large Sky Diamond",
      "itemId": 20727,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Zweihander",
      "itemId": 0,
      "icon": 519,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Truvinan",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Ranger": [
    {
      "name": "Wind Rune Meda",
      "itemId": 177776,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Griffon Talon",
      "itemId": 20850,
      "icon": 1067,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Griffon Talon Necklace",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Neza",
      "itemId": 177777,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Fine Velvet Cloak",
      "itemId": 20853,
      "icon": 841,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Dark Cloak of the Sky",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Kala",
      "itemId": 177779,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Spiroc Earth Totem",
      "itemId": 20855,
      "icon": 894,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Earthshaker's Mantle",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Azia",
      "itemId": 177780,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "White Gold Earring",
      "itemId": 0,
      "icon": 535,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Thunderforged Earring",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ena",
      "itemId": 177784,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Circlet of Brambles",
      "itemId": 0,
      "icon": 505,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Efreeti Long Sword",
      "itemId": 20858,
      "icon": 590,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Arydryidriyorn",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Heda",
      "itemId": 177787,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Shimmering Pearl",
      "itemId": 20863,
      "icon": 953,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti War Bow",
      "itemId": 20861,
      "icon": 597,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Windstriker",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Rogue": [
    {
      "name": "Wind Rune Ozah",
      "itemId": 177778,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Inlaid Choker",
      "itemId": 20985,
      "icon": 643,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Wispy Choker of Vigor",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Izah",
      "itemId": 177788,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Sphinxian Circlet",
      "itemId": 20993,
      "icon": 1054,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Renard's Belt of Quickness",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ena",
      "itemId": 177784,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Spiroc Sky Totem",
      "itemId": 20989,
      "icon": 894,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Griffon Wing Spauldors",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Dena",
      "itemId": 177783,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Jester's Mask",
      "itemId": 20987,
      "icon": 770,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Crystal Mask",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Geza",
      "itemId": 177786,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Fine Wool Cloak",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Shimmering Bracer of Protection",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Jaka",
      "itemId": 177789,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Bixie Stinger (Bixie God's Stinger)",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Bloodsky Sapphire",
      "itemId": 20996,
      "icon": 963,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Thornstinger",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Shadow Knight": [
    {
      "name": "Wind Rune Ozah",
      "itemId": 177778,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Finely Crafted Amulet",
      "itemId": 20998,
      "icon": 753,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Amulet of the Sphinx Eye",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Beza",
      "itemId": 177781,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Silvery Ring",
      "itemId": 20700,
      "icon": 675,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Crimson Ring of the Djinni",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Dena",
      "itemId": 177783,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Finely Woven Cloth Belt",
      "itemId": 20702,
      "icon": 1124,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Pegasus-Hide Belt",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Fana",
      "itemId": 177785,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Rusted Pauldrons",
      "itemId": 20704,
      "icon": 798,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Blood Sky Face Plate",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Heda",
      "itemId": 177787,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti War Shield",
      "itemId": 20705,
      "icon": 606,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Obtenebrate Mithril Guard",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Izah",
      "itemId": 177788,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Sphinxian Ring",
      "itemId": 20709,
      "icon": 614,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Fae Pauldrons",
      "itemId": 20710,
      "icon": 798,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Pearlescent Pauldrons",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Kala",
      "itemId": 177779,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Blood Sky Ruby",
      "itemId": 20713,
      "icon": 950,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti War Axe",
      "itemId": 20711,
      "icon": 1167,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Khyldorn the Blood Drinker",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Shaman": [
    {
      "name": "Wind Rune Meda",
      "itemId": 177776,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Leather Cord",
      "itemId": 20835,
      "icon": 848,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Amulet of the Fang",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Kala",
      "itemId": 177779,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Ceremonial Belt",
      "itemId": 20838,
      "icon": 548,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Bracelet of the Spirits",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Beza",
      "itemId": 177781,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Light Damask Mantle",
      "itemId": 20840,
      "icon": 665,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Fairy-Hide Mantle",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Ena",
      "itemId": 177784,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Corrosive Venom",
      "itemId": 0,
      "icon": 1006,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Efreeti War Club",
      "itemId": 20845,
      "icon": 738,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Warhammer of the Wind",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Heda",
      "itemId": 177787,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Bixie Essence",
      "itemId": 20843,
      "icon": 823,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Spiritualist`s Ring",
      "itemId": 0,
      "icon": 674,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Vermilion Sky Ring",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Geza",
      "itemId": 177786,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Symbol of Veeshan",
      "itemId": 20847,
      "icon": 646,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti War Maul",
      "itemId": 20846,
      "icon": 903,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Garduk",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Warrior": [
    {
      "name": "Wind Rune Neza",
      "itemId": 177777,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Azure Ring",
      "itemId": 20971,
      "icon": 1045,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Azure Ruby Ring",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Azia",
      "itemId": 177780,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Stone Amulet",
      "itemId": 20973,
      "icon": 566,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Runed Wind Amulet",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Beza",
      "itemId": 177781,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Spiroc Air Totem",
      "itemId": 20975,
      "icon": 894,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Pauldrons of the Blue Sky",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Fana",
      "itemId": 177785,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Wind Tablet",
      "itemId": 20978,
      "icon": 1095,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Belt",
      "itemId": 20976,
      "icon": 564,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Belt of the Four Winds",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Jaka",
      "itemId": 177789,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Djinni War Blade",
      "itemId": 0,
      "icon": 603,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Gem of Invigoration",
      "itemId": 0,
      "icon": 961,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Dagas",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Dena",
      "itemId": 177783,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Ethereal Emerald",
      "itemId": 20982,
      "icon": 958,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Battle Axe",
      "itemId": 20983,
      "icon": 1164,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Fangol",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ],
  "Wizard": [
    {
      "name": "Wind Rune Dena",
      "itemId": 177783,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Grey Damask Cloak",
      "itemId": 20742,
      "icon": 840,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Augmentor's Mask",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Fana",
      "itemId": 177785,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Woven Skull Cap",
      "itemId": 20744,
      "icon": 639,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Al`Kabor's Cap of Binding",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Geza",
      "itemId": 177786,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "High Quality Raiment",
      "itemId": 20746,
      "icon": 842,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Raiment of Thunder",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Izah",
      "itemId": 177788,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Box of Winds",
      "itemId": 20748,
      "icon": 608,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Efreeti Statuette",
      "itemId": 20951,
      "icon": 895,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Solidate Mithril Ring",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Jaka",
      "itemId": 177789,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Amethyst Amulet",
      "itemId": 0,
      "icon": 752,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Amulet of the Void",
      "itemId": 0,
      "icon": 566,
      "hasId": false,
      "category": "reward"
    },
    {
      "name": "Wind Rune Caza",
      "itemId": 177782,
      "icon": 966,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Large Sky Lapis",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "drop"
    },
    {
      "name": "Efreeti War Staff",
      "itemId": 20753,
      "icon": 601,
      "hasId": true,
      "category": "drop"
    },
    {
      "name": "Nargon's Staff",
      "itemId": 0,
      "icon": 0,
      "hasId": false,
      "category": "reward"
    }
  ]
};
