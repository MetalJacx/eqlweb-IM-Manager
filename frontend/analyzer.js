(() => {
  const TIER_RE = /\s+\+(\d+)$/;

  const MERGE_XP = {
    0: 1,
    1: 2,
    2: 4,
    3: 8,
    4: 16,
    5: 32,
    6: 64,
    7: 128,
    8: 256,
    9: 512,
    10: null,
  };

  const SKY_TURNIN_NAMES = [
    "Light Woolen Mask", "Light Woolen Mantle", "Crude Wooden Flute",
    "Amulet of Woven Hair", "Glowing Diamond", "Efreeti War Horn",
    "Nebulous Diamond", "Efreeti War Spear",
    "Spiroc Elder's Totem", "Azarack Skin", "Sphinx Claw", "Mithril Bands",
    "Brass Knuckles", "Leather Cord", "Silken Wrap",
    "Djinni War Blade", "Efreeti Standard", "Pulsating Ruby",
    "High Quality Raiment", "Feathered Cape", "Azarack Blood",
    "Jester's Mask", "Efreeti Great Staff",
    "Silver Hoop", "Small Shield", "Shiny Pauldrons",
    "Silvered Spiroc Necklace", "Djinni Aura", "Efreeti Mace",
    "Worn Leather Mask", "Mantle of Woven Grass", "Spiroc Battle Staff",
    "Efreeti Statuette", "Divine Honeycomb", "Ethereal Ruby",
    "Storm Sky Opal", "Efreeti Scimitar",
    "Finely Woven Cloth Cord", "Light Cloth Mantle", "Silken Mask",
    "Adamantium Earring", "Glowing Necklace", "Large Sky Sapphire",
    "Efreeti Wind Staff", "Ceramic Mask", "Golden Coffer", "Large Diamond",
    "Golden Efreeti Ring", "Hazy Opal", "Efreeti Magi Staff", "Djinni Stave",
    "Silken Strands", "Cracked Leather Eyepatch", "Dove Slippers",
    "Nebulous Sapphire", "Tear of Quellious", "Griffon's Beak",
    "Black Silk Cape", "Fine Cloth Raiment", "Ring of Veeshan", "Gorgon Head",
    "Ivory Sky Diamond", "Bixie Sword Blade", "Golden Hilt", "Large Sky Diamond",
    "Efreeti Zweihander", "Griffon Talon", "Fine Velvet Cloak",
    "Spiroc Earth Totem", "White Gold Earring", "Circlet of Brambles",
    "Efreeti Long Sword", "Shimmering Pearl", "Efreeti War Bow",
    "Inlaid Choker", "Sphinxian Circlet", "Spiroc Sky Totem",
    "Fine Wool Cloak", "Bixie Stinger", "Bloodsky Sapphire",
    "Finely Crafted Amulet", "Silvery Ring", "Finely Woven Cloth Belt",
    "Rusted Pauldrons", "Efreeti War Shield", "Sphinxian Ring",
    "Fae Pauldrons", "Blood Sky Ruby", "Efreeti War Axe",
    "Ceremonial Belt", "Light Damask Mantle", "Corrosive Venom",
    "Efreeti War Club", "Bixie Essence", "Spiritualist`s Ring",
    "Symbol of Veeshan", "Efreeti War Maul", "Azure Ring", "Stone Amulet",
    "Spiroc Air Totem", "Wind Tablet", "Efreeti Belt", "Gem of Invigoration",
    "Ethereal Emerald", "Efreeti Battle Axe", "Grey Damask Cloak",
    "Woven Skull Cap", "Box of Winds", "Amethyst Amulet", "Large Sky Lapis",
    "Efreeti War Staff",
  ];

  const EPIC_QUEST_ITEM_NAMES = [
    // Bard Epic Quest
    "Alluring Horn", "Amygdalan Tendril", "Chromodrac Gut", "Forpar's Note to Himself",
    "Kedge Backbone", "Maestro's Symphony Page 24 Bottom", "Maestro's Symphony Page 24 Top",
    "Maestro's Symphony Page 25", "Mahlin's Mystical Bongos", "Maligar's Head",
    "Mechanical Doll", "Metal Bits", "Mystical Lute", "Mystical Lute Body", "Note for Baenar",
    "Note to Forpar Fizfla", "Note to Maligar", "Onyx Drake Gut", "Petrified Werewolf Skull",
    "Proof of Speed", "Red Dragon Scales", "Red Wurm Gut", "Solusek Mining Company Invoice",
    "Torch of Misty", "Torch of Rathe", "Torch of Ro", "Undead Dragongut Strings",
    "White Dragon Scales",

    // Berserker Epic Quest
    "Axe of Lost Souls", "Bag of Image Essence Dust", "Bloodbeast Tooth", "Bone Trinket",
    "Bore Axes of the Spirit", "Burning Essence of Rage", "Decaying Liver",
    "Gnashing Kobold Paw", "Image Essence", "Maniac's Garbled Tome", "McArik Reagent Bag",
    "McArik-Crafted Bandage", "Medal of Blood", "Medal of Fervid Rage", "Medal of Hunting",
    "Medal of Mastery", "Medal of Mirages", "Medal of Strategy", "Note for Treanik",
    "Philter of Major Translocation", "Scent Gland", "Sealed Note for Mardic",
    "Throwing Axe of the Spirit", "Treaniks Tarnished Axe",

    // Cleric Epic Quest
    "Blood Soaked Plasmatic Priest Robe", "Coral Statue of Tarew", "Damaged Goblin Crown",
    "Heart of Zordak Ragefire", "Lord Bergurgle's Crown", "Lord Gimblox's Signet Ring",
    "Message to Natasha", "Oil of Fennin Ro", "Orb of Clear Water", "Orb of Frozen Water",
    "Ornate Sea Shell", "Sceptre of Ixiblat Fer", "Shimmering Pearl", "Singed Scroll",

    // Druid Epic Quest
    "Ancient Pattern", "Ancient Rock", "Bag of Provisions", "Braided Grass Amulet",
    "Chilled Tundra Root", "Chunk of Tundra", "Clean Lakewater", "Cleansed Spirit of Antonica",
    "Cleansed Spirit of Faydwer", "Cleansed Spirit of Kunark", "Crushed Pot",
    "Dark Metal Coin", "Earth Stained Note", "Elaborate Scimitar", "Enchanted Clay",
    "Faelin's Ring", "Fleshbound Tome", "Froglok Essence", "Gleaming Unicorn Horn",
    "Green Heartwood Branch", "Green Tree Bark", "Grocery List", "Hardened Mixture",
    "Jade Reaver", "Kedge Cave Crystals", "Ocean of Tears Seavines",
    "Platinum Speckled Powder", "Pod of Seawater", "Pulsing Green Stone", "Pure Lakewater",
    "Receipt", "Ripened Heartfruit", "Rose of Firiona", "Runecrested Bowl", "Shiny Tin Bowl",
    "Silver Chained Locket", "Softly Glowing Stone", "Speckled Molded Mushroom",
    "Sweetened Mudroot", "Warm Pulsing Treant Heart", "Warmly Glowing Stone", "Wood Painting",
    "Worn Dark Metal Coin", "Worn note",

    // Enchanter Epic Quest
    "1st Piece of Staff", "2nd Piece of Staff", "3rd Piece of Staff", "4th Piece of Staff",
    "Bundle of Staves", "Chalice of Kings", "Charm and Sacrifice", "Copy of Notes",
    "Empty Ink Vial", "Enchanted Diamond", "Enchanted Emerald", "Enchanted Ruby",
    "Enchanted Sapphire", "Enchanters Sack", "Essence of a Ghost", "Essence of a Vampire",
    "Gift to Bozlum", "Head of a Prince", "Head of the Serpent", "Ink of the Dark",
    "Innoruuk's Word", "Jeb's Seal", "Large Muddy Sandals", "Lost Scroll", "Mechanical Pen",
    "Piece of Parchment", "Quill", "Sands of the Mystics", "Scribbled Parchment",
    "Shining Metallic Robes", "Snow Blossoms", "Spoon", "The One Key", "White Paper",
    "Xolion Rod",

    // Magician Epic Quest
    "Blazing Wand", "Broom of Trilon", "Burning Embers", "Crown of Elemental Mastery",
    "Dirt of Underfoot", "Element of Earth", "Element of Fire", "Element of Water",
    "Element of Wind", "Elemental Binder", "Pegasus Feather Cloak", "Power of Earth",
    "Power of Fire", "Power of Water", "Power of Wind", "Power of the Elements",
    "Power of the Orb", "Rain of Karana", "Shovel of Ponz", "Tears of Erollisi",
    "Token of Mastery", "Torch of the Elements", "Torn Page of Magi'kot pg. 1",
    "Torn Page of Magi'kot pg. 2", "Torn Page of Magi'kot pg. 3", "Torn Page of Mastery Earth",
    "Torn Page of Mastery Fire", "Torn Page of Mastery Water", "Torn Page of Mastery Wind",
    "Words of Magi'kot", "Words of Mastery",

    // Monk Epic Quest
    "A Metal Pipe", "Book of Celestial Fists", "Breath of Gwan", "Celestial Fists (book)",
    "Charred Scale", "Code of Zan Fi", "Danl's Reference", "Demon Fangs", "Eye of Kaiaren",
    "Immortals", "Needle of the Void", "Purple Headband", "Rare Robe Pattern",
    "Red Sash of Order", "Robe of the Lost Circle", "Robe of the Whistling Fists",
    "Shadow Silk", "Shadow Wolf Pelt", "Silk Swatch", "The Idol", "Trunt's Head",

    // Necromancer Epic Quest
    "Apprentice Ring", "Black Silk Cape", "Cloak of Spiroc Feathers", "Eye of Innoruuk",
    "Flowing Black Robe", "Gkzzallk in a Box", "Manisi Herb", "Rolling Stone Moss",
    "Scaled Symbol of the Serpent", "Silver Disc", "Slime Blood of Cazic Thule",
    "Spiroc Feathers", "Tome of Instruction", "Twisted Bone Earring",

    // Paladin Epic Quest
    "Bucket of Pure Water", "Bucket of Water", "Cold Plate of Beef and Bread", "Fiery Avenger",
    "Ghoulbane", "Gleaming Crested Breastplate", "Gleaming Crested Shield",
    "Gleaming Crested Sword", "Mark of Atonement", "Pure Crystal", "SoulFire",
    "Tainted Darksteel Breastplate", "Tainted Darksteel Shield", "Tainted Darksteel Sword",

    // Ranger Epic Quest
    "Ancient Longsword", "Ancient Pattern", "Bag of Provisions", "Braided Grass Amulet",
    "Chilled Tundra Root", "Crushed Pot", "Dark Metal Coin", "Dwarven Smiths Hammer",
    "Earth Stained Note", "Enchanted Clay", "Faelin's Ring", "Fleshbound Tome", "Grocery List",
    "Hammer of the Ancients", "Hardened Mixture", "Jade Reaver", "Platinum Speckled Powder",
    "Pulsing Green Stone", "Receipt", "Refined Ancient Sword", "Refined Mithril Blade",
    "Ripened Heartfruit", "Rose of Firiona", "Runecrested Bowl",
    "Shattered Emerald of Corruption", "Shiny Tin Bowl", "Silver Chained Locket",
    "Small bit of Mithril Ore", "Softly glowing stone", "Soulbound Hammer",
    "Speckled Molded Mushroom", "Sweetened Mudroot", "Swirling Sphere of Color",
    "Warmly Glowing Stone", "Wood Painting", "Worn Dark Metal Coin", "Worn note",

    // Rogue Epic Quest
    "Book of Souls", "Bottle of Milk", "Burning Rapier", "Cazic Quill", "Combined Parchment",
    "Fleshripper", "General's Pouch", "Gigantic Zweihander", "Jagged Diamond Dagger",
    "Mithril Two-Handed Sword", "Painbringer", "Robe of the Ishva", "Robe of the Kedge",
    "Robe of the Oracle", "Scribbled Parchment", "Sealed Box", "Shining Metallic Robes",
    "Stained Parchment Bottom", "Stained Parchment Top", "Stanos' Pouch", "Tattered Parchment",
    "Translated Parchment",

    // Shadow Knight Epic Quest
    "Blade of Abrogation", "Blood of Kyrenna", "Cell Key", "Corrupted Ghoulbane",
    "Cough Elixir", "Dark Shroud", "Darkforge Breastplate", "Darkforge Greaves",
    "Darkforge Helm", "Decrepit Hide", "Decrepit Sheath", "Drake Spine", "Dusty Tome",
    "Enchanted Platinum Bar", "Ghoulbane", "Glohnor wrappings", "Head of Glohnor",
    "Head of the Valiant", "Heart of Kyrenna", "Heart of the Innocent", "Letter to Duriek",
    "Note to Marl", "Soul Leech, Dark Sword of Blood", "Soulcase", "Will of Innoruuk",

    // Shaman Epic Quest
    "Black Dire Pelt", "Black Fur Boots", "Child's Tear", "Crier's Scroll", "Envy",
    "Icon of the High Scale", "Iksar Scale", "Marr's Promise", "Merchant's Letter",
    "Opaque Gem", "Personal Diary Page", "Priest's Diary Page", "Shield of Falsehood",
    "Student's Log", "Tiny Gem", "Woe", "Written Announcement",

    // Warrior Epic Quest
    "Ancient Blade", "Ancient Sword Blade", "Ball of Everliving Golem", "Black Sapphire",
    "Block of Permafrost", "Diamond", "Finely Crafted Dragon Head Hilt", "Giant Sized Monocle",
    "Green Dragon Scales", "Hand of the Maestro", "Heart of Frost", "Jacinth",
    "Jeweled Dragon Head Hilt", "Keg of Vox Tail Ale", "Mark of the Sword", "Rebreather",
    "Red Dragon Scales", "Red Scabbard", "Rejesiam Ore", "Severely Damaged Dragon Head Hilt",
    "Spiroc Wingblade", "Tenal's note to Kargek", "Tiny Lute", "Totem of Fiery War",
    "Totem of the Freezing War", "Unjeweled Dragon Head Hilt", "Wax Sealed Note",

    // Wizard Epic Quest
    "Arantir's Ring", "Blue Crystal Staff", "Cazic's Skin", "Gnarled Staff", "Golem Sprocket",
    "Green Oil", "Mistletoe Powder", "Note from Arantir", "Note to Arantir", "Ro's Breath",
    "Staff of Gabstik",

    // Final class epic reward weapons (duplicates possible on this server)
    "The Fiery Avenger", "Singing Short Sword", "Kerasian Axe of Ire",
    "Water Sprinkler of Nem Ankh", "Reviviscence", "Nature Walkers Scimitar",
    "Staff of the Serpent", "Speed of the Shissar", "Orb of Mastery", "Manifest Elements",
    "Celestial Fists", "Scythe of the Shadowed Soul", "Fiery Defender", "Holy Shock",
    "Swiftwind", "Earthcaller", "Ragebringer", "Seething Fury", "Innoruuk's Curse",
    "Spear of Fate", "Curse of the Spirits", "Jagged Blade of War", "Rage of Zek",
    "Blade of Strategy", "Rage of Vallon", "Blade of Tactics", "Rage of Tallon",
    "Staff of the Four", "Barrier of Force",
  ];

  function normalizedItemKey(name) {
    return name.replace(/`/g, "'").trim().toLowerCase().replace(/\s+/g, " ");
  }

  const SKY_TURNIN_KEYS = new Set(SKY_TURNIN_NAMES.map(normalizedItemKey));
  const EPIC_QUEST_ITEM_KEYS = new Set(EPIC_QUEST_ITEM_NAMES.map(normalizedItemKey));

  function isSkyTurninGroup(items) {
    if (!items || items.length === 0) {
      return false;
    }
    return SKY_TURNIN_KEYS.has(normalizedItemKey(items[0].base_name));
  }

  function isEpicQuestItemGroup(items) {
    if (!items || items.length === 0) {
      return false;
    }
    return EPIC_QUEST_ITEM_KEYS.has(normalizedItemKey(items[0].base_name));
  }

  function parseTier(name) {
    const match = TIER_RE.exec(name.trim());
    if (!match) {
      return 0;
    }

    const tier = Number.parseInt(match[1], 10);
    return Number.isInteger(tier) && tier >= 0 && tier <= 10 ? tier : 0;
  }

  function baseName(name) {
    const cleaned = name.trim().replace(" (Exaltation)", "");
    return cleaned.replace(TIER_RE, "").trim();
  }

  function parseInventory(text) {
    const lines = text.split(/\r?\n/);
    if (lines.length === 0 || (lines.length === 1 && !lines[0])) {
      throw new Error("The selected file is empty.");
    }

    let keyringIndex = lines.length;
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].startsWith("KeyRing\t")) {
        keyringIndex = i;
        break;
      }
    }

    const records = [];

    for (let i = 1; i < keyringIndex; i += 1) {
      const parts = lines[i].split("\t");
      if (parts.length < 5) {
        continue;
      }

      const location = parts[0];
      const name = parts[1];
      const itemId = Number.parseInt(parts[2], 10);
      const count = Number.parseInt(parts[3], 10);
      const slots = Number.parseInt(parts[4], 10);

      if (!Number.isInteger(itemId) || !Number.isInteger(count) || !Number.isInteger(slots)) {
        continue;
      }

      if (itemId === 0 || name === "Empty") {
        continue;
      }

      if (name.includes("(Exaltation)")) {
        continue;
      }

      if (count !== 1) {
        continue;
      }

      records.push({
        source: "Inventory",
        location,
        name,
        base_name: baseName(name),
        id: itemId,
        tier: parseTier(name),
        slots,
      });
    }

    if (keyringIndex < lines.length) {
      for (let i = keyringIndex + 1; i < lines.length; i += 1) {
        const parts = lines[i].split("\t");
        if (parts.length < 3) {
          continue;
        }

        const keyringType = parts[0];
        const name = parts[1];
        const itemId = Number.parseInt(parts[2], 10);
        if (!Number.isInteger(itemId)) {
          continue;
        }

        if (keyringType !== "Equipment") {
          continue;
        }

        if (name.includes("(Exaltation)")) {
          continue;
        }

        records.push({
          source: "Equipment KeyRing",
          location: "Equipment KeyRing",
          name,
          base_name: baseName(name),
          id: itemId,
          tier: parseTier(name),
          slots: null,
        });
      }
    }

    if (records.length === 0) {
      throw new Error("No inventory records were found. Make sure this is an EQL /outputfile inventory export.");
    }

    return records;
  }

  function groupDuplicates(records) {
    const groups = new Map();
    for (const item of records) {
      if (!groups.has(item.id)) {
        groups.set(item.id, []);
      }
      groups.get(item.id).push(item);
    }

    return [...groups.entries()]
      .filter(([, items]) => items.length >= 2)
      .map(([, items]) => items);
  }

  function confidence(items) {
    if (items.some((item) => item.tier > 0)) {
      return "confirmed";
    }

    if (items.some((item) => item.source === "Equipment KeyRing")) {
      return "confirmed";
    }

    return "possible";
  }

  function projectMerge(items) {
    const ordered = [...items].sort((a, b) => {
      const tierDiff = b.tier - a.tier;
      if (tierDiff !== 0) {
        return tierDiff;
      }

      const aKeyring = a.source === "Equipment KeyRing" ? 1 : 0;
      const bKeyring = b.source === "Equipment KeyRing" ? 1 : 0;
      return bKeyring - aKeyring;
    });

    const target = ordered[0];
    const donors = ordered.slice(1);

    let donorXp = 0;
    for (const donor of donors) {
      const xp = MERGE_XP[donor.tier];
      if (xp !== null && xp !== undefined) {
        donorXp += xp;
      }
    }

    if (target.tier >= 10) {
      return {
        target,
        donors,
        donor_xp: donorXp,
        new_tier: 10,
        progress: null,
        maxed: true,
      };
    }

    const targetTotalXp = (2 ** target.tier) - 1;
    const projectedTotal = targetTotalXp + donorXp;
    const newTier = Math.min(10, Math.floor(Math.log2(projectedTotal + 1)));

    let progress = null;
    if (newTier < 10) {
      const startOfTier = (2 ** newTier) - 1;
      progress = [projectedTotal - startOfTier, 2 ** newTier];
    }

    return {
      target,
      donors,
      donor_xp: donorXp,
      new_tier: newTier,
      progress,
      maxed: false,
    };
  }

  function tierText(tier) {
    return `+${tier}`;
  }

  function projectionText(plan) {
    if (plan.maxed) {
      return "Already +10";
    }

    if (plan.progress === null) {
      return `${tierText(plan.target.tier)} -> +10`;
    }

    const [current, needed] = plan.progress;
    if (plan.new_tier > plan.target.tier) {
      return `${tierText(plan.target.tier)} -> ${tierText(plan.new_tier)} (${current}/${needed})`;
    }

    return `${tierText(plan.new_tier)} (${current}/${needed})`;
  }

  function buildReport(filename, confirmedGroups, possibleGroups) {
    const bar = "=".repeat(78);
    const lines = [
      bar,
      "EQL INVENTORY CLEANER - MERGE FINDER",
      bar,
      `File: ${filename}`,
      `Confirmed merge groups: ${confirmedGroups.length}`,
      `Possible +0 duplicate groups: ${possibleGroups.length}`,
      "",
      "CONFIRMED MERGE CANDIDATES",
      bar,
    ];

    if (confirmedGroups.length === 0) {
      lines.push("No confirmed merge candidates found.");
    } else {
      for (const items of confirmedGroups) {
        const plan = projectMerge(items);
        const target = plan.target;

        lines.push("");
        lines.push(`${target.base_name}  [ID ${target.id}]`);
        lines.push("-".repeat(Math.min(78, target.base_name.length + 16)));
        lines.push(`KEEP: ${tierText(target.tier).padStart(3, " ")}  ${target.location}`);
        lines.push("FEED:");

        for (const donor of plan.donors) {
          const xp = MERGE_XP[donor.tier];
          const xpText = xp === null ? "NO XP (+10)" : `${xp} XP`;
          lines.push(`  ${tierText(donor.tier).padStart(3, " ")}  ${donor.location.padEnd(34, " ")} ${xpText}`);
        }

        lines.push(`Donor XP: ${plan.donor_xp}`);
        lines.push(`Projection: ${projectionText(plan)}`);
      }
    }

    lines.push("");
    lines.push("");
    lines.push("POSSIBLE +0 DUPLICATES");
    lines.push(bar);
    lines.push("These are repeated Count=1 items, but the inventory export alone");
    lines.push("does not prove they are mergeable gear.");

    if (possibleGroups.length === 0) {
      lines.push("None.");
    } else {
      for (const items of possibleGroups) {
        lines.push("");
        lines.push(`${items[0].base_name}  [ID ${items[0].id}]  (${items.length} copies)`);
        for (const item of [...items].sort((a, b) => a.location.localeCompare(b.location))) {
          lines.push(`  - ${item.location}`);
        }
      }
    }

    lines.push("");
    lines.push("");
    lines.push("NOTE");
    lines.push(bar);
    lines.push("Merge projections assume the KEEP copy has 0 partial item XP inside");
    lines.push("its current tier because EQL's inventory export does not expose that value.");
    lines.push("");

    return lines.join("\n");
  }

  function analyzeInventoryText(text, filename = "uploaded-inventory.txt") {
    const records = parseInventory(text);
    const duplicateGroups = groupDuplicates(records);

    const confirmedGroups = [];
    const possibleGroups = [];
    for (const items of duplicateGroups) {
      if (confidence(items) === "confirmed") {
        confirmedGroups.push(items);
      } else {
        possibleGroups.push(items);
      }
    }

    confirmedGroups.sort((a, b) => a[0].base_name.localeCompare(b[0].base_name));
    possibleGroups.sort((a, b) => a[0].base_name.localeCompare(b[0].base_name));

    const confirmed = confirmedGroups.map((items) => {
      const plan = projectMerge(items);
      const target = plan.target;
      return {
        item_name: target.base_name,
        item_id: target.id,
        keep_tier: target.tier,
        keep_location: target.location,
        donor_count: plan.donors.length,
        donor_xp: plan.donor_xp,
        projection: projectionText(plan),
        maxed: plan.maxed,
        is_sky_turnin: isSkyTurninGroup(items),
        is_epic_quest_item: isEpicQuestItemGroup(items),
        items,
        plan,
      };
    });

    const possible = possibleGroups.map((items) => ({
      item_name: items[0].base_name,
      item_id: items[0].id,
      copy_count: items.length,
      is_sky_turnin: isSkyTurninGroup(items),
      is_epic_quest_item: isEpicQuestItemGroup(items),
      items: [...items].sort((a, b) => a.location.localeCompare(b.location)),
    }));

    return {
      meta: {
        filename,
        record_count: records.length,
        confirmed_count: confirmed.length,
        possible_count: possible.length,
      },
      confirmed,
      possible,
    };
  }

  function xpForTier(tier) {
    return MERGE_XP[tier];
  }

  window.eqlAnalyzer = {
    analyzeInventoryText,
    buildReport,
    xpForTier,
  };
})();
