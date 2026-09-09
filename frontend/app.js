const defaultApi = window.localStorage.getItem("eql_api_base") || "http://127.0.0.1:8000";
const defaultMode = window.localStorage.getItem("eql_mode") || "local";

const modeSelect = document.getElementById("analysisMode");
const apiField = document.getElementById("apiField");
const apiBaseInput = document.getElementById("apiBase");
const fileInput = document.getElementById("inventoryFile");
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

apiBaseInput.value = defaultApi;
modeSelect.value = defaultMode === "api" ? "api" : "local";

function setStatus(message, isError = false) {
  statusNode.textContent = message;
  statusNode.style.color = isError ? "#b42318" : "#5c6779";
}

function updateModeUi() {
  const mode = modeSelect.value;
  apiField.hidden = mode !== "api";
  window.localStorage.setItem("eql_mode", mode);

  if (mode === "local") {
    setStatus("Local Browser Mode enabled. Your file is analyzed in this browser.");
  } else {
    setStatus("Hosted API Mode enabled. File will be sent to your API endpoint.");
  }
}

function resetResults() {
  metricsSection.hidden = true;
  resultsGrid.hidden = true;
  confirmedTableBody.innerHTML = "";
  possibleTableBody.innerHTML = "";
  reportText.textContent = "";
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
  recordCountNode.textContent = String(payload.meta.record_count);
  confirmedCountNode.textContent = String(payload.meta.confirmed_count);
  possibleCountNode.textContent = String(payload.meta.possible_count);
  renderConfirmedRows(payload.confirmed || []);
  renderPossibleRows(payload.possible || []);
  reportText.textContent = payload.report_text || "";
  metricsSection.hidden = false;
  resultsGrid.hidden = false;
}

async function analyzeInventoryLocal(file) {
  if (!window.eqlAnalyzer || typeof window.eqlAnalyzer.analyzeInventoryText !== "function") {
    throw new Error("Browser analyzer is not loaded.");
  }

  const text = await decodeInventoryFile(file);
  return window.eqlAnalyzer.analyzeInventoryText(text, file.name || "uploaded-inventory.txt");
}

async function analyzeInventoryApi(file) {
  const apiBase = apiBaseInput.value.trim().replace(/\/$/, "");
  if (!apiBase) {
    throw new Error("Enter your API base URL first.");
  }

  window.localStorage.setItem("eql_api_base", apiBase);
  const body = new FormData();
  body.append("file", file);

  const response = await fetch(`${apiBase}/analyze-file`, {
    method: "POST",
    body,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.detail || "Analysis failed.");
  }

  return payload;
}

async function analyzeInventory() {
  const file = fileInput.files?.[0];
  if (!file) {
    setStatus("Choose an inventory export text file first.", true);
    return;
  }

  analyzeBtn.disabled = true;
  const localMode = modeSelect.value === "local";
  setStatus(localMode ? "Analyzing locally in browser..." : "Uploading and analyzing inventory...");

  try {
    const payload = localMode
      ? await analyzeInventoryLocal(file)
      : await analyzeInventoryApi(file);

    renderPayload(payload);
    setStatus(`Done. ${payload.meta.confirmed_count} confirmed groups found.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";
    setStatus(message, true);
    resetResults();
  } finally {
    analyzeBtn.disabled = false;
  }
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
  resetResults();
  setStatus("Cleared. Choose a file and analyze.");
});
copyReportBtn.addEventListener("click", copyReport);
modeSelect.addEventListener("change", updateModeUi);
updateModeUi();
