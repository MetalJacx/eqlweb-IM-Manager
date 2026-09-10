const categorySelect = document.getElementById("categorySelect");
const categoryMeta = document.getElementById("categoryMeta");
const classGrid = document.getElementById("classGrid");
const classHelpToggle = document.getElementById("classHelpToggle");
const classHelpPanel = document.getElementById("classHelpPanel");
const itemsPanel = document.getElementById("itemsPanel");
const classItemGroups = document.getElementById("classItemGroups");
const addAsAction = document.getElementById("addAsAction");
const addCheckedBtn = document.getElementById("addCheckedBtn");
const cartCountNode = document.getElementById("cartCount");
const cartTableBody = document.querySelector("#cartTable tbody");
const charNameInput = document.getElementById("charName");
const serverNameInput = document.getElementById("serverName");
const downloadCartBtn = document.getElementById("downloadCartBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

const CATEGORIES = {
  epic: {
    label: "Epic Quest",
    meta: "15 classes · Kunark-gated",
    classOrder: EPIC_QUEST_CLASS_ORDER,
    classItems: EPIC_QUEST_CLASS_ITEMS,
    groupSuffix: "Epic Quest",
    sections: [
      { key: "drop", label: "Drops", hint: "Confirmed dropping in live Classic zones right now." },
      { key: "not-live", label: "Not Live Yet", hint: "Would drop, but only once Kunark launches." },
      { key: "reward", label: "Quest Rewards", hint: "Handed over directly by a quest NPC — never appears in a loot window, so a filter entry wouldn't do anything." },
    ],
  },
  sky: {
    label: "Sky Turn-ins",
    meta: "16 classes · live now",
    classOrder: SKY_QUEST_CLASS_ORDER,
    classItems: SKY_QUEST_CLASS_ITEMS,
    groupSuffix: "Sky Tests",
    sections: [
      { key: "drop", label: "Drops", hint: "Wind Runes and turn-in items that drop in the Plane of Sky right now." },
      { key: "reward", label: "Quest Rewards", hint: "The class armor/weapon handed back by the quest NPC — never appears in a loot window, so a filter entry wouldn't do anything." },
    ],
  },
};

let activeCategory = "epic";
const selectedClasses = { epic: new Set(), sky: new Set() };
const excludedItems = { epic: new Set(), sky: new Set() }; // itemIds whose checked state was manually flipped from its default
let cart = new Map(); // itemId -> { itemId, iconId, name, filterId }

function setStatus(message) {
  const status = document.querySelector(".controls .status");
  if (status) status.textContent = message;
}

function populateCategoryOptions() {
  categorySelect.innerHTML = "";
  Object.keys(CATEGORIES).forEach((key) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = CATEGORIES[key].label;
    categorySelect.appendChild(opt);
  });
  categorySelect.value = activeCategory;
}

function renderClassGrid() {
  const category = CATEGORIES[activeCategory];
  const selected = selectedClasses[activeCategory];
  classGrid.innerHTML = "";
  category.classOrder.forEach((className) => {
    const items = category.classItems[className];
    const dropCount = items.filter((it) => it.category === "drop").length;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "class-chip";
    btn.classList.toggle("active", selected.has(className));
    btn.innerHTML = `${className} <span class="chip-count">${dropCount}/${items.length}</span>`;
    btn.addEventListener("click", () => {
      if (selected.has(className)) selected.delete(className);
      else selected.add(className);
      renderClassGrid();
      renderClassItemGroups();
    });
    classGrid.appendChild(btn);
  });
}

function renderItemRow(item, className, excluded) {
  const row = document.createElement("label");
  const selectable = item.hasId && item.category !== "reward";
  // Only confirmed "drop" items are checked by default; Kunark-gated "not-live"
  // items are selectable (so a filter can be prepped ahead of time) but require
  // an explicit opt-in so they aren't silently added to the download.
  const defaultChecked = selectable && item.category === "drop";
  const checked = excluded.has(item.itemId) ? !defaultChecked : defaultChecked;
  row.className = "item-row" + (selectable ? "" : " needs-id");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.disabled = !selectable;
  checkbox.checked = checked;
  checkbox.dataset.itemId = String(item.itemId);
  checkbox.dataset.className = className;
  checkbox.dataset.itemName = item.name;
  checkbox.dataset.icon = String(item.icon);
  if (selectable) {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked === defaultChecked) excluded.delete(item.itemId);
      else excluded.add(item.itemId);
    });
  }

  const nameSpan = document.createElement("span");
  nameSpan.textContent = item.name;

  row.appendChild(checkbox);
  row.appendChild(nameSpan);

  if (item.category !== "reward" && !item.hasId) {
    const badges = document.createElement("span");
    badges.className = "badges";
    const idBadge = document.createElement("span");
    idBadge.className = "id-badge";
    idBadge.textContent = "ID unknown";
    badges.appendChild(idBadge);
    row.appendChild(badges);
  }

  return row;
}

function renderClassItemGroups() {
  const category = CATEGORIES[activeCategory];
  const selected = selectedClasses[activeCategory];
  const excluded = excludedItems[activeCategory];
  itemsPanel.hidden = selected.size === 0;
  classItemGroups.innerHTML = "";

  category.classOrder.filter((c) => selected.has(c)).forEach((className) => {
    const group = document.createElement("div");
    group.className = "class-item-group";

    const heading = document.createElement("h3");
    heading.textContent = `${className} ${category.groupSuffix}`;
    group.appendChild(heading);

    const itemsByCategory = category.classItems[className].reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {});

    category.sections.forEach((section) => {
      const items = itemsByCategory[section.key];
      if (!items || items.length === 0) return;

      const sectionEl = document.createElement("div");
      sectionEl.className = `category-section category-${section.key}`;

      const sectionHeading = document.createElement("h4");
      sectionHeading.innerHTML = `${section.label} <span class="chip-count">${items.length}</span>`;
      sectionHeading.title = section.hint;
      sectionEl.appendChild(sectionHeading);

      const list = document.createElement("div");
      list.className = "item-checklist";
      items.forEach((item) => list.appendChild(renderItemRow(item, className, excluded)));
      sectionEl.appendChild(list);

      group.appendChild(sectionEl);
    });

    classItemGroups.appendChild(group);
  });
}

function renderCategory() {
  const category = CATEGORIES[activeCategory];
  categoryMeta.textContent = category.meta;
  renderClassGrid();
  renderClassItemGroups();
}

function updateCartCount() {
  cartCountNode.textContent = String(cart.size);
}

function renderCart() {
  cartTableBody.innerHTML = "";
  Array.from(cart.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((entry) => {
      const tr = document.createElement("tr");

      const nameTd = document.createElement("td");
      nameTd.textContent = entry.name;

      const idTd = document.createElement("td");
      idTd.textContent = String(entry.itemId);

      const actionTd = document.createElement("td");
      const select = document.createElement("select");
      select.className = actionSelectClass(entry.filterId);
      populateActionOptions(select);
      select.value = String(entry.filterId);
      select.addEventListener("change", () => {
        entry.filterId = Number(select.value);
        select.className = actionSelectClass(entry.filterId);
      });
      actionTd.appendChild(select);

      const removeTd = document.createElement("td");
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "ghost row-remove";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        cart.delete(entry.itemId);
        updateCartCount();
        renderCart();
      });
      removeTd.appendChild(removeBtn);

      tr.append(nameTd, idTd, actionTd, removeTd);
      cartTableBody.appendChild(tr);
    });

  updateCartCount();
}

function addCheckedItems() {
  const filterId = Number(addAsAction.value);
  const checkboxes = classItemGroups.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)');
  if (checkboxes.length === 0) {
    setStatus("Check at least one item first.");
    return;
  }

  checkboxes.forEach((checkbox) => {
    const itemId = Number(checkbox.dataset.itemId);
    cart.set(itemId, {
      itemId,
      iconId: Number(checkbox.dataset.icon) || 0,
      name: checkbox.dataset.itemName,
      filterId,
    });
  });
  renderCart();
  setStatus(`Added ${checkboxes.length} item(s) to your filter.`);
}

function buildFileName() {
  const character = charNameInput.value.trim() || "Character";
  const server = serverNameInput.value.trim() || "server";
  return `LF_${character}_${server}.ini`;
}

function downloadCart() {
  if (cart.size === 0) {
    setStatus("Nothing to download yet.");
    return;
  }
  const downloadName = downloadLootFilterFile(Array.from(cart.values()), DEFAULT_HEADER, buildFileName());
  setStatus(`Downloaded ${downloadName}.`);
}

function clearCart() {
  cart.clear();
  renderCart();
}

function attachEvents() {
  populateActionOptions(addAsAction, { defaultValue: 2 });
  populateCategoryOptions();

  categorySelect.addEventListener("change", () => {
    activeCategory = categorySelect.value;
    renderCategory();
  });

  classHelpToggle.addEventListener("click", () => {
    const expanded = classHelpToggle.getAttribute("aria-expanded") === "true";
    classHelpToggle.setAttribute("aria-expanded", String(!expanded));
    classHelpPanel.hidden = expanded;
  });

  addCheckedBtn.addEventListener("click", addCheckedItems);
  downloadCartBtn.addEventListener("click", downloadCart);
  clearCartBtn.addEventListener("click", clearCart);
}

renderCategory();
renderCart();
attachEvents();
