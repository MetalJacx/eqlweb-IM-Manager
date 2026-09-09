const fileInput = document.getElementById("inventoryFile");
const dropZone = document.getElementById("dropZone");
const fileNameNode = document.getElementById("fileName");
const hideMaxedInput = document.getElementById("hideMaxed");
const hideSkyInput = document.getElementById("hideSky");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const copyReportBtn = document.getElementById("copyReportBtn");
const statusNode = document.getElementById("status");
const metricsSection = document.getElementById("metrics");
const resultsGrid = document.getElementById("resultsGrid");
const confirmedTableBody = document.querySelector("#confirmedTable tbody");
const possibleTableBody = document.querySelector("#possibleTable tbody");
const reportText = document.getElementById("reportText");

const recordCountNode = document.getElementById("recordCount");
const confirmedCountNode = document.getElementById("confirmedCount");
const possibleCountNode = document.getElementById("possibleCount");

let selectedFile = null;
let latestPayload = null;

function setStatus(message, isError = false) {
  statusNode.textContent = message;
  statusNode.style.color = isError ? "#b42318" : "#5c6779";
}

function resetResults() {
  metricsSection.hidden = true;
  resultsGrid.hidden = true;
  confirmedTableBody.innerHTML = "";
  possibleTableBody.innerHTML = "";
  reportText.textContent = "";
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

function renderConfirmedRows(confirmed) {
  confirmedTableBody.innerHTML = "";
  for (const row of confirmed) {
    const tr = document.createElement("tr");
    tr.appendChild(createCell(row.item_name));
    tr.appendChild(createCell(String(row.item_id)));
    tr.appendChild(createCell(`+${row.keep_tier}`));
    tr.appendChild(createCell(row.keep_location));
    tr.appendChild(createCell(String(row.donor_count)));
    tr.appendChild(createCell(String(row.donor_xp)));
    confirmedTableBody.appendChild(tr);
  }
}

function renderPossibleRows(possible) {
  possibleTableBody.innerHTML = "";
  for (const row of possible) {
    const tr = document.createElement("tr");
    tr.appendChild(createCell(row.item_name));
    tr.appendChild(createCell(String(row.item_id)));
    tr.appendChild(createCell(String(row.copy_count)));
    tr.appendChild(createCell(row.is_sky_turnin ? "Yes" : "No"));
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

function renderPayload(payload) {
  const hideMaxed = hideMaxedInput.checked;
  const hideSky = hideSkyInput.checked;
  const confirmed = (payload.confirmed || []).filter((row) => {
    if (hideMaxed && row.maxed) {
      return false;
    }
    if (hideSky && row.is_sky_turnin) {
      return false;
    }
    return true;
  });

  const possible = (payload.possible || []).filter((row) => !hideSky || !row.is_sky_turnin);

  recordCountNode.textContent = String(payload.meta.record_count);
  confirmedCountNode.textContent = String(confirmed.length);
  possibleCountNode.textContent = String(possible.length);
  renderConfirmedRows(confirmed);
  renderPossibleRows(possible);
  reportText.textContent = payload.report_text || "";
  metricsSection.hidden = false;
  resultsGrid.hidden = false;

  const hiddenCount = ((payload.confirmed || []).length - confirmed.length)
    + ((payload.possible || []).length - possible.length);
  if (hiddenCount > 0) {
    setStatus(`Done. ${confirmed.length} confirmed groups shown (${hiddenCount} hidden by filters).`);
  } else {
    setStatus(`Done. ${confirmed.length} confirmed groups found.`);
  }
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
    latestPayload = payload;
    renderPayload(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";
    setStatus(message, true);
    resetResults();
  } finally {
    analyzeBtn.disabled = false;
  }
}

function applyFilters() {
  if (!latestPayload) {
    return;
  }
  renderPayload(latestPayload);
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
  setSelectedFile(null);
  latestPayload = null;
  hideMaxedInput.checked = false;
  hideSkyInput.checked = false;
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
attachDropZoneEvents();
setStatus("Local browser mode enabled. Your file is analyzed in this browser.");
