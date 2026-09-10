const fileInput = document.getElementById("filterFile");
const fileHelpToggle = document.getElementById("fileHelpToggle");
const fileHelpPanel = document.getElementById("fileHelpPanel");
const dropZone = document.getElementById("dropZone");
const fileNameNode = document.getElementById("fileName");
const loadBtn = document.getElementById("loadBtn");
const newFileBtn = document.getElementById("newFileBtn");
const clearBtn = document.getElementById("clearBtn");
const statusNode = document.getElementById("status");
const workspace = document.getElementById("workspace");
const tabRow = document.querySelector(".tab-row");
const searchInput = document.getElementById("searchInput");
const downloadBtn = document.getElementById("downloadBtn");
const addItemId = document.getElementById("addItemId");
const addItemName = document.getElementById("addItemName");
const addAction = document.getElementById("addAction");
const addItemBtn = document.getElementById("addItemBtn");
const selectAll = document.getElementById("selectAll");
const selectedCountNode = document.getElementById("selectedCount");
const bulkAction = document.getElementById("bulkAction");
const bulkApplyBtn = document.getElementById("bulkApplyBtn");
const removeSelectedBtn = document.getElementById("removeSelectedBtn");
const tableBody = document.querySelector("#filterTable tbody");
const pageSizeSelect = document.getElementById("pageSizeSelect");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageInfoNode = document.getElementById("pageInfo");

let entries = []; // { itemId, filterId, iconId, name }
let headerLine = DEFAULT_HEADER;
let outFileName = "LF_filter.ini";
let selectedFile = null;
let activeTab = "all";
let searchTerm = "";
let selected = new Set(); // itemIds
let pageSize = 20; // number or "all"
let currentPage = 1;
let currentPageRows = [];

function setStatus(message, isError = false) {
  statusNode.textContent = message;
  const styles = getComputedStyle(document.body);
  statusNode.style.color = (isError
    ? styles.getPropertyValue("--danger")
    : styles.getPropertyValue("--status-muted")).trim();
}

function parseLootFilter(text) {
  const lines = text.split(/\r\n|\n|\r/);
  let header = null;
  const parsed = [];
  const warnings = [];
  const seenIds = new Set();

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("#")) continue;
    if (line.startsWith("[")) {
      if (header === null) header = line;
      continue;
    }
    const parts = line.split("^");
    if (parts.length !== 4) {
      warnings.push(`Skipped unrecognized line: ${line}`);
      continue;
    }
    const [idRaw, filterRaw, iconRaw, nameRaw] = parts.map((p) => p.trim());
    const itemId = Number(idRaw);
    const filterId = Number(filterRaw);
    const iconId = Number(iconRaw);
    if (!Number.isFinite(itemId) || !Number.isFinite(iconId) || !nameRaw || !FILTER_ORDER.includes(filterId)) {
      warnings.push(`Skipped malformed row: ${line}`);
      continue;
    }
    if (seenIds.has(itemId)) {
      warnings.push(`Duplicate item id ${itemId}, kept last occurrence`);
      const existing = parsed.find((e) => e.itemId === itemId);
      existing.filterId = filterId;
      existing.iconId = iconId;
      existing.name = nameRaw;
      continue;
    }
    seenIds.add(itemId);
    parsed.push({ itemId, filterId, iconId, name: nameRaw });
  }

  return { headerLine: header || DEFAULT_HEADER, entries: parsed, warnings };
}

function getCounts() {
  const counts = { all: entries.length, 1: 0, 2: 0, 3: 0, 4: 0 };
  entries.forEach((e) => {
    if (counts[e.filterId] !== undefined) counts[e.filterId] += 1;
  });
  return counts;
}

function getFilteredEntries() {
  const term = searchTerm.trim().toLowerCase();
  return entries.filter((e) => {
    if (activeTab !== "all" && String(e.filterId) !== activeTab) return false;
    if (!term) return true;
    return e.name.toLowerCase().includes(term) || String(e.itemId).includes(term);
  });
}

function updateTabCounts() {
  const counts = getCounts();
  document.getElementById("countAll").textContent = String(counts.all);
  document.getElementById("countStore").textContent = String(counts[1]);
  document.getElementById("countLoot").textContent = String(counts[2]);
  document.getElementById("countMerge").textContent = String(counts[3]);
  document.getElementById("countSell").textContent = String(counts[4]);
}

function updateSelectedCount() {
  selectedCountNode.textContent = `${selected.size} selected`;
}

function updatePaginationControls(total, maxPage) {
  pageInfoNode.textContent = `Page ${currentPage} of ${maxPage} · ${total} item${total === 1 ? "" : "s"}`;
  prevPageBtn.disabled = currentPage <= 1;
  nextPageBtn.disabled = currentPage >= maxPage;
}

function renderTable() {
  const filtered = getFilteredEntries();
  const matchedIds = new Set(filtered.map((r) => r.itemId));
  // drop selections for rows no longer matching the current tab/search so bulk ops stay predictable
  selected.forEach((id) => {
    if (!matchedIds.has(id)) selected.delete(id);
  });

  const maxPage = pageSize === "all" ? 1 : Math.max(1, Math.ceil(filtered.length / pageSize));
  currentPage = Math.min(Math.max(1, currentPage), maxPage);
  const rows = pageSize === "all"
    ? filtered
    : filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  currentPageRows = rows;
  updatePaginationControls(filtered.length, maxPage);

  tableBody.innerHTML = "";
  rows.forEach((entry) => {
    const tr = document.createElement("tr");
    tr.dataset.itemId = String(entry.itemId);

    const checkTd = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "row-select";
    checkbox.checked = selected.has(entry.itemId);
    checkTd.appendChild(checkbox);

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
      updateTabCounts();
      if (activeTab !== "all" && String(entry.filterId) !== activeTab) {
        renderTable();
      }
    });
    actionTd.appendChild(select);

    const removeTd = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "ghost row-remove";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      entries = entries.filter((e) => e.itemId !== entry.itemId);
      selected.delete(entry.itemId);
      updateTabCounts();
      updateSelectedCount();
      renderTable();
    });
    removeTd.appendChild(removeBtn);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) selected.add(entry.itemId);
      else selected.delete(entry.itemId);
      updateSelectedCount();
      selectAll.checked = rows.length > 0 && rows.every((r) => selected.has(r.itemId));
    });

    tr.append(checkTd, nameTd, idTd, actionTd, removeTd);
    tableBody.appendChild(tr);
  });

  selectAll.checked = rows.length > 0 && rows.every((r) => selected.has(r.itemId));
  updateSelectedCount();
}

function setActiveTab(tab) {
  activeTab = tab;
  currentPage = 1;
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  renderTable();
}

function showWorkspace() {
  workspace.hidden = false;
  updateTabCounts();
  renderTable();
}

function loadFromText(text, fileName) {
  const result = parseLootFilter(text);
  entries = result.entries;
  headerLine = result.headerLine;
  selected = new Set();
  if (fileName) outFileName = fileName;

  const warningNote = result.warnings.length
    ? ` (${result.warnings.length} line${result.warnings.length === 1 ? "" : "s"} skipped, see console)`
    : "";
  if (result.warnings.length) console.warn("Loot filter parse warnings:", result.warnings);
  setStatus(`Loaded ${entries.length} item${entries.length === 1 ? "" : "s"} from ${outFileName}${warningNote}.`);
  setActiveTab("all");
  showWorkspace();
}

function setSelectedFile(file) {
  selectedFile = file;
  fileNameNode.textContent = file ? file.name : "No file selected";
}

function handleFiles(fileList) {
  const file = fileList && fileList[0];
  if (!file) return;
  setSelectedFile(file);
}

async function loadSelectedFile() {
  if (!selectedFile) {
    setStatus("Choose a loot filter file first.", true);
    return;
  }
  try {
    const text = await decodeTextFile(selectedFile);
    loadFromText(text, selectedFile.name);
  } catch {
    setStatus("Could not read that file.", true);
  }
}

function startNewFile() {
  const character = window.prompt("Character name?", "");
  if (character === null) return;
  const server = window.prompt("Server name?", "neriak");
  if (server === null) return;
  const cleanChar = character.trim() || "Character";
  const cleanServer = server.trim() || "server";
  entries = [];
  headerLine = DEFAULT_HEADER;
  selected = new Set();
  outFileName = `LF_${cleanChar}_${cleanServer}.ini`;
  setStatus(`Started a new filter file: ${outFileName}.`);
  setActiveTab("all");
  showWorkspace();
}

function clearAll() {
  entries = [];
  headerLine = DEFAULT_HEADER;
  selected = new Set();
  currentPage = 1;
  selectedFile = null;
  fileNameNode.textContent = "No file selected";
  fileInput.value = "";
  workspace.hidden = true;
  setStatus("Choose a file and click Load Filter File, or start a new one.");
}

function isValidName(name) {
  return Boolean(name) && !name.includes("^") && !/[\r\n]/.test(name);
}

function addOrUpdateItem() {
  const itemId = Number(addItemId.value);
  const name = addItemName.value.trim();
  const filterId = Number(addAction.value);

  if (!Number.isFinite(itemId) || itemId <= 0) {
    setStatus("Item ID must be a positive number.", true);
    return;
  }
  if (!isValidName(name)) {
    setStatus("Item name can't be empty or contain ^ or line breaks.", true);
    return;
  }

  const existing = entries.find((e) => e.itemId === itemId);
  if (existing) {
    existing.name = name;
    existing.filterId = filterId;
    setStatus(`Updated existing entry for ${name}.`);
  } else {
    entries.push({ itemId, iconId: 0, name, filterId });
    setStatus(`Added ${name}.`);
  }

  addItemId.value = "";
  addItemName.value = "";
  updateTabCounts();
  renderTable();
}

function applyBulkAction() {
  const filterId = Number(bulkAction.value);
  if (!bulkAction.value || !FILTER_ORDER.includes(filterId)) {
    setStatus("Choose an action to apply first.", true);
    return;
  }
  if (selected.size === 0) {
    setStatus("Select at least one row first.", true);
    return;
  }
  entries.forEach((e) => {
    if (selected.has(e.itemId)) e.filterId = filterId;
  });
  setStatus(`Set ${selected.size} item(s) to ${FILTER_LABELS[filterId]}.`);
  bulkAction.value = "";
  updateTabCounts();
  renderTable();
}

function removeSelected() {
  if (selected.size === 0) {
    setStatus("Select at least one row first.", true);
    return;
  }
  const count = selected.size;
  entries = entries.filter((e) => !selected.has(e.itemId));
  selected = new Set();
  setStatus(`Removed ${count} item(s).`);
  updateTabCounts();
  renderTable();
}

function downloadFilterFile() {
  if (entries.length === 0) {
    setStatus("Nothing to download yet.", true);
    return;
  }
  const downloadName = downloadLootFilterFile(entries, headerLine, outFileName);
  setStatus(`Downloaded ${downloadName}.`);
}

function attachEvents() {
  populateActionOptions(addAction);
  populateActionOptions(bulkAction, { includeBlank: true });

  fileHelpToggle.addEventListener("click", () => {
    const expanded = fileHelpToggle.getAttribute("aria-expanded") === "true";
    fileHelpToggle.setAttribute("aria-expanded", String(!expanded));
    fileHelpPanel.hidden = expanded;
  });

  dropZone.addEventListener("click", () => fileInput.click());
  dropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInput.click();
    }
  });
  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("dragging");
  });
  dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragging"));
  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("dragging");
    handleFiles(event.dataTransfer.files);
  });
  fileInput.addEventListener("change", (event) => handleFiles(event.target.files));

  loadBtn.addEventListener("click", loadSelectedFile);
  newFileBtn.addEventListener("click", startNewFile);
  clearBtn.addEventListener("click", clearAll);

  tabRow.addEventListener("click", (event) => {
    const btn = event.target.closest(".tab-btn");
    if (!btn) return;
    setActiveTab(btn.dataset.tab);
  });

  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value;
    currentPage = 1;
    renderTable();
  });

  selectAll.addEventListener("change", () => {
    if (selectAll.checked) currentPageRows.forEach((r) => selected.add(r.itemId));
    else currentPageRows.forEach((r) => selected.delete(r.itemId));
    renderTable();
  });

  pageSizeSelect.addEventListener("change", () => {
    pageSize = pageSizeSelect.value === "all" ? "all" : Number(pageSizeSelect.value);
    currentPage = 1;
    renderTable();
  });

  prevPageBtn.addEventListener("click", () => {
    currentPage -= 1;
    renderTable();
  });

  nextPageBtn.addEventListener("click", () => {
    currentPage += 1;
    renderTable();
  });

  addItemBtn.addEventListener("click", addOrUpdateItem);
  bulkApplyBtn.addEventListener("click", applyBulkAction);
  removeSelectedBtn.addEventListener("click", removeSelected);
  downloadBtn.addEventListener("click", downloadFilterFile);
}

attachEvents();
