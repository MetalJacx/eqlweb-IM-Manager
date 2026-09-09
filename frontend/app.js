const fileInput = document.getElementById("inventoryFile");
const fileHelpToggle = document.getElementById("fileHelpToggle");
const fileHelpPanel = document.getElementById("fileHelpPanel");
const dropZone = document.getElementById("dropZone");
const fileNameNode = document.getElementById("fileName");
const themeToggleBtn = document.getElementById("themeToggle");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const copyReportBtn = document.getElementById("copyReportBtn");
const statusNode = document.getElementById("status");
const workspace = document.getElementById("workspace");
const tabConfirmedBtn = document.getElementById("tabConfirmed");
const tabPossibleBtn = document.getElementById("tabPossible");
const tabReportBtn = document.getElementById("tabReport");
const panelConfirmed = document.getElementById("panelConfirmed");
const panelPossible = document.getElementById("panelPossible");
const panelReport = document.getElementById("panelReport");
const contentGrid = document.querySelector(".content-grid");
const detailPanel = document.getElementById("detailPanel");
const detailToggleBtn = document.getElementById("detailToggle");
const detailItemName = document.getElementById("detailItemName");
const detailItemMeta = document.getElementById("detailItemMeta");
const detailKeep = document.getElementById("detailKeep");
const detailFeed = document.getElementById("detailFeed");
const detailDonorXp = document.getElementById("detailDonorXp");
const detailProjection = document.getElementById("detailProjection");
const detailProgressBar = document.getElementById("detailProgressBar");
const hideMaxedInput = document.getElementById("hideMaxed");
const hideSkyInput = document.getElementById("hideSky");
const hideEpicInput = document.getElementById("hideEpic");
const filterDropdown = document.getElementById("filterDropdown");
const filterMenuButton = document.getElementById("filterMenuButton");
const filterMenu = document.getElementById("filterMenu");
const searchInput = document.getElementById("searchInput");
const confirmedTableBody = document.querySelector("#confirmedTable tbody");
const possibleTableBody = document.querySelector("#possibleTable tbody");
const reportText = document.getElementById("reportText");
const confirmedCountNode = document.getElementById("confirmedCount");
const possibleCountNode = document.getElementById("possibleCount");

let selectedFile = null;
let latestPayload = null;
let statusIsError = false;
let selectedConfirmedId = null;
let detailCollapsed = false;
let filterMenuOpen = false;

const pickerSupported = typeof window.showOpenFilePicker === "function";

function setDetailCollapsed(collapsed) {
  detailCollapsed = Boolean(collapsed);
  detailPanel.classList.toggle("collapsed", detailCollapsed);
  contentGrid.classList.toggle("details-collapsed", detailCollapsed);
  detailToggleBtn.textContent = detailCollapsed ? "Expand" : "Collapse";
  detailToggleBtn.setAttribute("aria-expanded", String(!detailCollapsed));
  window.localStorage.setItem("eql_detail_collapsed", detailCollapsed ? "1" : "0");
}

function initDetailPanelState() {
  const stored = window.localStorage.getItem("eql_detail_collapsed");
  setDetailCollapsed(stored === "1");
}

function setFilterMenuOpen(open) {
  filterMenuOpen = Boolean(open);
  filterMenu.hidden = !filterMenuOpen;
  filterMenuButton.setAttribute("aria-expanded", String(filterMenuOpen));
}

function toggleFilterMenu() {
  setFilterMenuOpen(!filterMenuOpen);
}

function attachFilterDropdownEvents() {
  filterMenuButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleFilterMenu();
  });

  document.addEventListener("pointerdown", (event) => {
    if (!filterMenuOpen) {
      return;
    }
    if (filterDropdown.contains(event.target)) {
      return;
    }
    setFilterMenuOpen(false);
  }, true);

  filterMenu.addEventListener("change", () => {
    setFilterMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setFilterMenuOpen(false);
    }
  });
}

function applyTheme(themeName) {
  const theme = themeName === "light" ? "light" : "dark";
  document.body.setAttribute("data-theme", theme);
  window.localStorage.setItem("eql_theme", theme);
  themeToggleBtn.textContent = theme === "dark" ? "Switch to Light" : "Switch to Dark";
  setStatus(statusNode.textContent, statusIsError);
}

function toggleTheme() {
  const current = document.body.getAttribute("data-theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
}

function initTheme() {
  const stored = window.localStorage.getItem("eql_theme");
  const preferredDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored || (preferredDark ? "dark" : "light"));
}

function setStatus(message, isError = false) {
  statusIsError = isError;
  statusNode.textContent = message;
  const styles = getComputedStyle(document.body);
  const color = isError
    ? styles.getPropertyValue("--danger").trim()
    : styles.getPropertyValue("--status-muted").trim();
  statusNode.style.color = color;
}

function resetResults() {
  workspace.hidden = true;
  confirmedTableBody.innerHTML = "";
  possibleTableBody.innerHTML = "";
  reportText.textContent = "";
  selectedConfirmedId = null;
  renderDetail(null);
}

function setSelectedFile(file) {
  selectedFile = file;
  fileNameNode.textContent = file ? file.name : "No file selected";
}

async function chooseFileWithPicker() {
  if (!pickerSupported) {
    fileInput.click();
    return;
  }

  try {
    const [handle] = await window.showOpenFilePicker({
      id: "eql-inventory-file",
      multiple: false,
      types: [{
        description: "Text files",
        accept: {
          "text/plain": [".txt"],
        },
      }],
    });

    if (!handle) {
      return;
    }

    const file = await handle.getFile();
    setSelectedFile(file);
    setStatus(`Loaded ${file.name}.`);
  } catch (error) {
    const isCancel = error instanceof DOMException && error.name === "AbortError";
    if (!isCancel) {
      setStatus("Could not open file picker. Try drag/drop or click to browse.", true);
    }
  }
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

function createTierBadge(tierText) {
  const cell = document.createElement("td");
  const chip = document.createElement("span");
  chip.className = "chip-tier";
  chip.textContent = tierText;
  cell.appendChild(chip);
  return cell;
}

function createDetailRow(tierText, text, extraText) {
  const row = document.createElement("div");
  row.className = "detail-row";

  if (tierText != null) {
    const chip = document.createElement("span");
    chip.className = "chip-tier";
    chip.textContent = tierText;
    row.appendChild(chip);
  }

  const label = document.createElement("span");
  label.textContent = text;
  row.appendChild(label);

  if (extraText != null) {
    const extra = document.createElement("span");
    extra.textContent = extraText;
    row.appendChild(extra);
  }

  return row;
}

function createDetailTitle(text) {
  const title = document.createElement("p");
  title.className = "detail-title";
  title.textContent = text;
  return title;
}

function renderConfirmedRows(confirmed) {
  confirmedTableBody.innerHTML = "";
  if (confirmed.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "No confirmed merge groups match your filters.";
    tr.appendChild(td);
    confirmedTableBody.appendChild(tr);
    return;
  }

  for (const row of confirmed) {
    const tr = document.createElement("tr");
    if (selectedConfirmedId === row.item_id) {
      tr.classList.add("selected");
    }
    tr.appendChild(createCell(row.item_name));
    tr.appendChild(createCell(String(row.item_id)));
    tr.appendChild(createCell(row.keep_location));
    tr.appendChild(createCell(String(row.donor_count)));
    tr.appendChild(createCell(String(row.donor_xp)));
    tr.appendChild(createCell(row.projection || "-"));
    tr.addEventListener("click", () => {
      selectedConfirmedId = row.item_id;
      renderActiveTab();
    });
    confirmedTableBody.appendChild(tr);
  }
}

function renderPossibleRows(possible) {
  possibleTableBody.innerHTML = "";
  if (possible.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.textContent = "No possible +0 groups match your filters.";
    tr.appendChild(td);
    possibleTableBody.appendChild(tr);
    return;
  }

  for (const row of possible) {
    const tr = document.createElement("tr");
    tr.appendChild(createCell(row.item_name));
    tr.appendChild(createCell(String(row.copy_count)));
    const locations = (row.items || []).map((item) => item.location).join(", ");
    tr.appendChild(createCell(locations || "-"));
    possibleTableBody.appendChild(tr);
  }
}

async function decodeInventoryFile(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return new TextDecoder("utf-16le").decode(bytes);
  }
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    return new TextDecoder("utf-16be").decode(bytes);
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return new TextDecoder("utf-16le").decode(bytes);
  }
}

function filterRows(payload) {
  const search = searchInput.value.trim().toLowerCase();
  const hideMaxed = hideMaxedInput.checked;
  const hideSky = hideSkyInput.checked;
  const hideEpic = hideEpicInput.checked;

  const confirmed = (payload.confirmed || []).filter((row) => {
    if (hideMaxed && row.maxed) {
      return false;
    }
    if (hideSky && row.is_sky_turnin) {
      return false;
    }
    if (hideEpic && row.is_epic_quest_item) {
      return false;
    }
    if (!search) {
      return true;
    }
    const donorLocations = (row.plan?.donors || []).map((d) => d.location).join(" ");
    const corpus = `${row.item_name} ${row.item_id} ${row.keep_location} ${row.projection || ""} ${donorLocations}`.toLowerCase();
    return corpus.includes(search);
  });

  const possible = (payload.possible || []).filter((row) => {
    if (hideSky && row.is_sky_turnin) {
      return false;
    }
    if (hideEpic && row.is_epic_quest_item) {
      return false;
    }
    if (!search) {
      return true;
    }
    const locations = (row.items || []).map((item) => item.location).join(" ");
    const corpus = `${row.item_name} ${row.item_id} ${locations}`.toLowerCase();
    return corpus.includes(search);
  });

  return { confirmed, possible };
}

function renderDetail(row) {
  if (!row) {
    detailItemName.textContent = "No item selected";
    detailItemMeta.textContent = "Select a confirmed merge group.";
    detailKeep.innerHTML = "";
    detailFeed.innerHTML = "";
    detailDonorXp.textContent = "Donor XP: 0";
    detailProjection.textContent = "Projection: -";
    detailProgressBar.style.width = "0%";
    return;
  }

  detailItemName.textContent = row.item_name;
  detailItemMeta.textContent = `ID ${row.item_id}`;

  detailKeep.innerHTML = "";
  detailKeep.appendChild(createDetailTitle("Keep"));
  detailKeep.appendChild(createDetailRow(`+${row.keep_tier}`, row.keep_location));

  const donors = row.plan?.donors || [];
  detailFeed.innerHTML = "";
  detailFeed.appendChild(createDetailTitle("Feed"));
  if (donors.length === 0) {
    detailFeed.appendChild(createDetailRow(undefined, "No donors"));
  } else {
    for (const donor of donors) {
      const xpValue = window.eqlAnalyzer.xpForTier(donor.tier);
      const xp = xpValue == null ? "NO XP" : `${xpValue} XP`;
      detailFeed.appendChild(createDetailRow(`+${donor.tier}`, donor.location, xp));
    }
  }

  detailDonorXp.textContent = `Donor XP: ${row.donor_xp}`;
  detailProjection.textContent = `Projection: ${row.projection || "-"}`;

  const progress = row.plan?.progress;
  if (!progress || !Array.isArray(progress) || progress[1] <= 0) {
    detailProgressBar.style.width = row.maxed ? "100%" : "0%";
  } else {
    const pct = Math.max(0, Math.min(100, Math.floor((progress[0] / progress[1]) * 100)));
    detailProgressBar.style.width = `${pct}%`;
  }
}

function setActiveTab(tabName) {
  const isConfirmed = tabName === "confirmed";

  tabConfirmedBtn.classList.toggle("active", tabName === "confirmed");
  tabPossibleBtn.classList.toggle("active", tabName === "possible");
  tabReportBtn.classList.toggle("active", tabName === "report");

  panelConfirmed.hidden = !isConfirmed;
  panelPossible.hidden = tabName !== "possible";
  panelReport.hidden = tabName !== "report";
  detailPanel.hidden = !isConfirmed;
  contentGrid.classList.toggle("single-panel", !isConfirmed);

  // Prevent the filters menu from lingering over other tabs.
  setFilterMenuOpen(false);
}

function renderActiveTab() {
  if (!latestPayload) {
    return;
  }

  const filtered = filterRows(latestPayload);
  confirmedCountNode.textContent = String(filtered.confirmed.length);
  possibleCountNode.textContent = String(filtered.possible.length);

  renderConfirmedRows(filtered.confirmed);
  renderPossibleRows(filtered.possible);
  reportText.textContent = window.eqlAnalyzer.buildReport(
    latestPayload.meta?.filename || "uploaded-inventory.txt",
    filtered.confirmed.map((row) => row.items),
    filtered.possible.map((row) => row.items),
  );

  const selected = filtered.confirmed.find((row) => row.item_id === selectedConfirmedId)
    || filtered.confirmed[0]
    || null;
  selectedConfirmedId = selected?.item_id ?? null;
  renderDetail(selected);

  workspace.hidden = false;

  const hiddenCount = ((latestPayload.confirmed || []).length - filtered.confirmed.length)
    + ((latestPayload.possible || []).length - filtered.possible.length);
  if (hiddenCount > 0) {
    setStatus(`Done. ${filtered.confirmed.length} confirmed groups shown (${hiddenCount} hidden by filters/search).`);
  } else {
    setStatus(`Done. ${filtered.confirmed.length} confirmed groups found.`);
  }
}

function renderPayload(payload) {
  latestPayload = payload;
  if (payload.confirmed && payload.confirmed.length > 0) {
    selectedConfirmedId = payload.confirmed[0].item_id;
  }
  renderActiveTab();
}

function tabFromButton(event) {
  const tabName = event.currentTarget.dataset.tab;
  if (!tabName) {
    return;
  }
  setActiveTab(tabName);
  renderActiveTab();
}

function applyFilters() {
  if (!latestPayload) {
    return;
  }
  renderActiveTab();
}

async function analyzeInventoryLocal(file) {
  if (!window.eqlAnalyzer || typeof window.eqlAnalyzer.analyzeInventoryText !== "function") {
    throw new Error("Browser analyzer is not loaded.");
  }
  const text = await decodeInventoryFile(file);
  return window.eqlAnalyzer.analyzeInventoryText(text, file.name || "uploaded-inventory.txt");
}

async function analyzeInventory() {
  const file = selectedFile || fileInput.files?.[0];
  if (!file) {
    setStatus("Choose an inventory export text file first.", true);
    return;
  }

  analyzeBtn.disabled = true;
  setStatus("Analyzing locally in browser...");

  try {
    const payload = await analyzeInventoryLocal(file);
    renderPayload(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";
    setStatus(message, true);
    latestPayload = null;
    resetResults();
  } finally {
    analyzeBtn.disabled = false;
  }
}

function attachDropZoneEvents() {
  const prevent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, prevent);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add("dragging"));
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove("dragging"));
  });

  dropZone.addEventListener("drop", (event) => {
    const file = event.dataTransfer?.files?.[0];
    if (!file) {
      return;
    }
    setSelectedFile(file);
    setStatus(`Loaded ${file.name}. Click Analyze Inventory.`);
  });

  dropZone.addEventListener("click", () => {
    void chooseFileWithPicker();
  });
  dropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      void chooseFileWithPicker();
    }
  });
}

async function copyReport() {
  if (!reportText.textContent) {
    setStatus("Run an analysis first.", true);
    return;
  }

  try {
    await navigator.clipboard.writeText(reportText.textContent);
    setStatus("Report copied to clipboard.");
  } catch {
    setStatus("Clipboard access failed in this browser.", true);
  }
}

analyzeBtn.addEventListener("click", analyzeInventory);
clearBtn.addEventListener("click", () => {
  fileInput.value = "";
  searchInput.value = "";
  setSelectedFile(null);
  latestPayload = null;
  hideMaxedInput.checked = false;
  hideSkyInput.checked = false;
  hideEpicInput.checked = false;
  setActiveTab("confirmed");
  resetResults();
  setStatus("Cleared. Choose a file and analyze.");
});

copyReportBtn.addEventListener("click", copyReport);
fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0] || null;
  setSelectedFile(file);
  if (file) {
    setStatus(`Loaded ${file.name}. Click Analyze Inventory.`);
  }
});

hideMaxedInput.addEventListener("change", applyFilters);
hideSkyInput.addEventListener("change", applyFilters);
hideEpicInput.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);
tabConfirmedBtn.addEventListener("click", tabFromButton);
tabPossibleBtn.addEventListener("click", tabFromButton);
tabReportBtn.addEventListener("click", tabFromButton);
themeToggleBtn.addEventListener("click", toggleTheme);
detailToggleBtn.addEventListener("click", () => {
  setDetailCollapsed(!detailCollapsed);
});
fileHelpToggle.addEventListener("click", () => {
  const isHidden = fileHelpPanel.hidden;
  fileHelpPanel.hidden = !isHidden;
  fileHelpToggle.setAttribute("aria-expanded", String(isHidden));
});

initTheme();
initDetailPanelState();
attachDropZoneEvents();
attachFilterDropdownEvents();
setActiveTab("confirmed");
renderDetail(null);
setStatus("Local browser mode enabled. Your file is analyzed in this browser.");
