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

  function normalizedItemKey(name) {
    return name.replace(/`/g, "'").trim().toLowerCase().replace(/\s+/g, " ");
  }

  const SKY_TURNIN_KEYS = new Set(SKY_TURNIN_NAMES.map(normalizedItemKey));

  function isSkyTurninGroup(items) {
    if (!items || items.length === 0) {
      return false;
    }
    return SKY_TURNIN_KEYS.has(normalizedItemKey(items[0].base_name));
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
        items,
        plan,
      };
    });

    const possible = possibleGroups.map((items) => ({
      item_name: items[0].base_name,
      item_id: items[0].id,
      copy_count: items.length,
      is_sky_turnin: isSkyTurninGroup(items),
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
      report_text: buildReport(filename, confirmedGroups, possibleGroups),
    };
  }

  window.eqlAnalyzer = {
    analyzeInventoryText,
  };
})();
