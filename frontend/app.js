const fileInput = document.getElementById("inventoryFile");
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
const detailPanel = document.getElementById("detailPanel");
const detailItemName = document.getElementById("detailItemName");
const detailItemMeta = document.getElementById("detailItemMeta");
const detailKeep = document.getElementById("detailKeep");
const detailFeed = document.getElementById("detailFeed");
const detailDonorXp = document.getElementById("detailDonorXp");
const detailProjection = document.getElementById("detailProjection");
const detailProgressBar = document.getElementById("detailProgressBar");
const hideMaxedInput = document.getElementById("hideMaxed");
const hideSkyInput = document.getElementById("hideSky");
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

function renderConfirmedRows(confirmed) {
  confirmedTableBody.innerHTML = "";
  if (confirmed.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 7;
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
    tr.appendChild(createTierBadge(`+${row.keep_tier}`));
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
    td.colSpan = 4;
    td.textContent = "No possible +0 groups match your filters.";
    tr.appendChild(td);
    possibleTableBody.appendChild(tr);
    return;
  }

  for (const row of possible) {
    const tr = document.createElement("tr");
    tr.appendChild(createCell(row.item_name));
    tr.appendChild(createCell(String(row.item_id)));
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

  const confirmed = (payload.confirmed || []).filter((row) => {
    if (hideMaxed && row.maxed) {
      return false;
    }
    if (hideSky && row.is_sky_turnin) {
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

  detailKeep.innerHTML = [
    '<p class="detail-title">Keep</p>',
    `<div class="detail-row"><span class="chip-tier">+${row.keep_tier}</span><span>${row.keep_location}</span></div>`,
  ].join("");

  const donorRows = (row.plan?.donors || []).map((donor) => {
    const xp = donor.tier >= 10 ? "NO XP" : `${2 ** donor.tier} XP`;
    return `<div class="detail-row"><span class="chip-tier">+${donor.tier}</span><span>${donor.location}</span><span>${xp}</span></div>`;
  }).join("");
  detailFeed.innerHTML = `<p class="detail-title">Feed</p>${donorRows || '<div class="detail-row"><span>No donors</span></div>'}`;

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
  tabConfirmedBtn.classList.toggle("active", tabName === "confirmed");
  tabPossibleBtn.classList.toggle("active", tabName === "possible");
  tabReportBtn.classList.toggle("active", tabName === "report");

  panelConfirmed.hidden = tabName !== "confirmed";
  panelPossible.hidden = tabName !== "possible";
  panelReport.hidden = tabName !== "report";
  detailPanel.hidden = tabName !== "confirmed";
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
  reportText.textContent = latestPayload.report_text || "";

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

  dropZone.addEventListener("click", () => fileInput.click());
  dropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInput.click();
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
searchInput.addEventListener("input", applyFilters);
tabConfirmedBtn.addEventListener("click", tabFromButton);
tabPossibleBtn.addEventListener("click", tabFromButton);
tabReportBtn.addEventListener("click", tabFromButton);
themeToggleBtn.addEventListener("click", toggleTheme);

initTheme();
attachDropZoneEvents();
setActiveTab("confirmed");
renderDetail(null);
setStatus("Local browser mode enabled. Your file is analyzed in this browser.");
