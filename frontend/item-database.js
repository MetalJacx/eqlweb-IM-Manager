const fileInput = document.getElementById("filterFile");
const fileHelpToggle = document.getElementById("fileHelpToggle");
const fileHelpPanel = document.getElementById("fileHelpPanel");
const dropZone = document.getElementById("dropZone");
const fileNameNode = document.getElementById("fileName");
const loadBtn = document.getElementById("loadBtn");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const statusNode = document.getElementById("status");
const previewSummary = document.getElementById("previewSummary");
const apiConfigWarning = document.getElementById("apiConfigWarning");
const contributorNameInput = document.getElementById("contributorName");
const contributorServerInput = document.getElementById("contributorServer");
const leaderboardBody = document.querySelector("#leaderboardTable tbody");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const searchBtn = document.getElementById("searchBtn");
const browseTableBody = document.querySelector("#browseTable tbody");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageInfoNode = document.getElementById("pageInfo");

const SUBMITTER_KEY = "eql_submitter_id";
const CONTRIBUTOR_NAME_KEY = "eql_contributor_name";
const CONTRIBUTOR_SERVER_KEY = "eql_contributor_server";
const STATUS_LABELS = {
  unverified: "Unverified",
  emerging: "Emerging",
  verified: "Verified",
  disputed: "Disputed",
};

let selectedFile = null;
let pendingRows = []; // { itemId, name, iconId }
let currentPage = 1;
let hasMorePages = false;

function apiBase() {
  return (window.EQL_API_BASE || "").trim().replace(/\/+$/, "");
}

function setStatus(message, isError) {
  statusNode.textContent = message;
  const styles = getComputedStyle(document.body);
  statusNode.style.color = (isError
    ? styles.getPropertyValue("--danger")
    : styles.getPropertyValue("--status-muted")).trim();
}

function getSubmitterId() {
  try {
    let id = window.localStorage.getItem(SUBMITTER_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(SUBMITTER_KEY, id);
    }
    return id;
  } catch {
    // localStorage unavailable (private mode, etc.) - fall back to a
    // per-page-load id so submission still works, just without persistence.
    return crypto.randomUUID();
  }
}

function loadStoredProfile() {
  try {
    contributorNameInput.value = window.localStorage.getItem(CONTRIBUTOR_NAME_KEY) || "";
    contributorServerInput.value = window.localStorage.getItem(CONTRIBUTOR_SERVER_KEY) || "";
  } catch {
    // localStorage unavailable - fields just stay blank
  }
}

function persistProfileField(key, value) {
  try {
    if (value) window.localStorage.setItem(key, value);
    else window.localStorage.removeItem(key);
  } catch {
    // localStorage unavailable - nothing to persist
  }
}

// Loot filters are named LF_<Character>_<Server>.ini (see lootfilter.js) and
// inventory exports are named <Character>_<Server>-Inventory.txt (see
// index.html's help panel) - prefill the leaderboard fields from either when
// they're still empty, so most people never have to type anything.
function prefillProfileFromFileName(fileName) {
  const match = /^LF_(.+)_([^_]+)\.ini$/i.exec(fileName)
    || /^(.+)_([^_]+)-Inventory\.txt$/i.exec(fileName);
  if (!match) return;
  if (!contributorNameInput.value.trim()) contributorNameInput.value = match[1];
  if (!contributorServerInput.value.trim()) contributorServerInput.value = match[2];
}

// Distinguish the two supported file formats without relying on the file
// name: loot filter rows are `itemId^filterId^iconId^name`, inventory export
// rows are tab-separated. Counting which delimiter shape actually shows up
// in the file's lines is more robust than trusting the extension.
function detectFileFormat(text) {
  const lines = text.split(/\r\n|\n|\r/).map((l) => l.trim()).filter(Boolean);
  const caretLines = lines.filter((l) => l.split("^").length === 4).length;
  const tabLines = lines.filter((l) => l.includes("\t")).length;
  if (caretLines > 0 && caretLines >= tabLines) return "lootfilter";
  if (tabLines > 0) return "inventory";
  return null;
}

// Extracts item_id/name pairs from an EQL `/outputfile inventory` export
// (see analyzer.js's parseInventory for the full format, including the
// KeyRing section split). Icon IDs aren't present in this file type, so
// they're always sent as 0 - the community database already treats icon_id
// as optional and fills it in from a loot filter submission for the same
// item when one arrives.
function parseInventoryLines(text) {
  const lines = text.split(/\r\n|\n|\r/);
  const rows = [];
  const warnings = [];

  let keyringIndex = lines.length;
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].startsWith("KeyRing\t")) {
      keyringIndex = i;
      break;
    }
  }

  for (let i = 1; i < keyringIndex; i += 1) {
    const line = lines[i];
    if (!line.trim()) continue;
    const parts = line.split("\t");
    if (parts.length < 5) {
      warnings.push(`Skipped unrecognized line: ${line}`);
      continue;
    }
    const name = parts[1];
    const itemId = Number.parseInt(parts[2], 10);
    if (!Number.isInteger(itemId) || itemId === 0 || name === "Empty") continue;
    if (name.includes("(Exaltation)")) continue;
    rows.push({ itemId, name, iconId: 0 });
  }

  if (keyringIndex < lines.length) {
    for (let i = keyringIndex + 1; i < lines.length; i += 1) {
      const line = lines[i];
      if (!line.trim()) continue;
      const parts = line.split("\t");
      if (parts.length < 3) continue;
      const keyringType = parts[0];
      const name = parts[1];
      const itemId = Number.parseInt(parts[2], 10);
      if (!Number.isInteger(itemId) || keyringType !== "Equipment") continue;
      if (name.includes("(Exaltation)")) continue;
      rows.push({ itemId, name, iconId: 0 });
    }
  }

  // Worn/stacked copies of the same item repeat across inventory slots -
  // dedupe by item_id+name so the preview count reflects distinct items,
  // not slot count. The server dedupes again regardless, but a slot-count
  // number here would be a confusing thing to show someone before submit.
  const seen = new Map();
  for (const row of rows) {
    seen.set(`${row.itemId}|${row.name}`, row);
  }
  return { rows: [...seen.values()], warnings };
}

function setSelectedFile(file) {
  selectedFile = file;
  fileNameNode.textContent = file ? file.name : "No file selected";
  if (file) prefillProfileFromFileName(file.name);
}

function handleFiles(fileList) {
  const file = fileList && fileList[0];
  if (!file) return;
  setSelectedFile(file);
}

async function loadAndPreview() {
  if (!selectedFile) {
    setStatus("Choose a loot filter or inventory export file first.", true);
    return;
  }
  try {
    const text = await decodeTextFile(selectedFile);
    const format = detectFileFormat(text);
    if (!format) {
      setStatus("Unrecognized file. Upload a loot filter (LF_*.ini) or an inventory export (*-Inventory.txt).", true);
      previewSummary.hidden = true;
      submitBtn.disabled = true;
      return;
    }

    const { rows, warnings } = format === "lootfilter" ? parseLootFilterLines(text) : parseInventoryLines(text);
    pendingRows = rows.map((r) => ({ itemId: r.itemId, name: r.name, iconId: r.iconId }));

    if (pendingRows.length === 0) {
      setStatus("No valid item rows found in that file.", true);
      previewSummary.hidden = true;
      submitBtn.disabled = true;
      return;
    }

    const minId = Math.min(...pendingRows.map((r) => r.itemId));
    const maxId = Math.max(...pendingRows.map((r) => r.itemId));
    const iconNote = format === "inventory" ? " (this file type has no icon IDs, so 0 is sent and filled in later by a loot filter upload)" : "";
    previewSummary.hidden = false;
    previewSummary.textContent = `${pendingRows.length} item${pendingRows.length === 1 ? "" : "s"} ready to submit (IDs ${minId}-${maxId}). Only item_id, item_name, and icon_id are sent${iconNote}.`;

    const warningNote = warnings.length ? ` (${warnings.length} line${warnings.length === 1 ? "" : "s"} skipped, see console)` : "";
    if (warnings.length) console.warn("File parse warnings:", warnings);
    setStatus(`Loaded ${pendingRows.length} item(s) from ${selectedFile.name}${warningNote}. Review above, then submit.`);
    submitBtn.disabled = !apiBase();
  } catch {
    setStatus("Could not read that file.", true);
  }
}

async function submitEntries() {
  const base = apiBase();
  if (!base) {
    setStatus("No database server configured yet.", true);
    return;
  }
  if (pendingRows.length === 0) {
    setStatus("Load a file first.", true);
    return;
  }

  const displayName = contributorNameInput.value.trim();
  const server = contributorServerInput.value.trim();

  submitBtn.disabled = true;
  setStatus(`Submitting ${pendingRows.length} item(s)...`);
  try {
    const res = await fetch(`${base}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submitterId: getSubmitterId(),
        displayName: displayName || undefined,
        server: server || undefined,
        entries: pendingRows,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error || `Submission failed (${res.status}).`, true);
      submitBtn.disabled = false;
      return;
    }
    persistProfileField(CONTRIBUTOR_NAME_KEY, displayName);
    persistProfileField(CONTRIBUTOR_SERVER_KEY, server);
    setStatus(`Thanks! ${data.newClaims} new confirmation(s) recorded across ${data.itemsUpdated.length} item(s).`);
    previewSummary.hidden = true;
    pendingRows = [];
    runSearch();
    loadLeaderboard();
  } catch {
    setStatus("Could not reach the database server.", true);
    submitBtn.disabled = false;
  }
}

function clearContribute() {
  selectedFile = null;
  pendingRows = [];
  fileNameNode.textContent = "No file selected";
  fileInput.value = "";
  previewSummary.hidden = true;
  submitBtn.disabled = true;
  setStatus("Choose a loot filter or inventory export file and click Load & Preview.");
}

function statusBadge(status) {
  const span = document.createElement("span");
  span.className = `status-badge ${status}`;
  span.textContent = STATUS_LABELS[status] || status;
  return span;
}

function renderDetailRow(itemId, claims) {
  const tr = document.createElement("tr");
  tr.className = "detail-row";
  const td = document.createElement("td");
  td.colSpan = 5;

  if (!claims.length) {
    td.textContent = "No claim history.";
  } else {
    const list = document.createElement("ul");
    list.className = "claims-breakdown";
    claims.forEach((c) => {
      const li = document.createElement("li");
      const nameSpan = document.createElement("span");
      nameSpan.textContent = c.name;
      const countSpan = document.createElement("span");
      countSpan.className = "claim-count";
      countSpan.textContent = `${c.confirmations} confirmation${c.confirmations === 1 ? "" : "s"}`;
      li.append(nameSpan, countSpan);
      list.appendChild(li);
    });
    td.appendChild(list);
  }
  tr.appendChild(td);
  return tr;
}

async function toggleItemDetail(row, itemId) {
  const next = row.nextElementSibling;
  if (next && next.classList.contains("detail-row")) {
    next.remove();
    return;
  }
  document.querySelectorAll(".detail-row").forEach((el) => el.remove());

  try {
    const res = await fetch(`${apiBase()}/api/items/${itemId}`);
    if (!res.ok) return;
    const data = await res.json();
    row.after(renderDetailRow(itemId, data.claims || []));
  } catch {
    // silently ignore - detail is a nice-to-have
  }
}

function renderResults(items) {
  browseTableBody.innerHTML = "";
  if (items.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = "No items match.";
    tr.appendChild(td);
    browseTableBody.appendChild(tr);
    return;
  }

  items.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className = "item-row-expandable";

    const nameTd = document.createElement("td");
    nameTd.textContent = item.name;

    const idTd = document.createElement("td");
    idTd.textContent = String(item.item_id);

    const iconTd = document.createElement("td");
    iconTd.textContent = String(item.icon_id ?? 0);

    const confTd = document.createElement("td");
    confTd.textContent = String(item.confirmations);

    const statusTd = document.createElement("td");
    statusTd.appendChild(statusBadge(item.status));

    tr.append(nameTd, idTd, iconTd, confTd, statusTd);
    tr.addEventListener("click", () => toggleItemDetail(tr, item.item_id));
    browseTableBody.appendChild(tr);
  });
}

async function runSearch() {
  const base = apiBase();
  if (!base) return;

  const params = new URLSearchParams();
  const q = searchInput.value.trim();
  if (q) params.set("q", q);
  if (statusFilter.value) params.set("status", statusFilter.value);
  params.set("page", String(currentPage));
  params.set("limit", "25");

  try {
    const res = await fetch(`${base}/api/items?${params.toString()}`);
    if (!res.ok) {
      renderResults([]);
      return;
    }
    const data = await res.json();
    hasMorePages = data.items.length === data.limit;
    pageInfoNode.textContent = `Page ${currentPage}`;
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = !hasMorePages;
    renderResults(data.items);
  } catch {
    setStatus("Could not reach the database server.", true);
  }
}

async function loadExportMeta() {
  const exportMeta = document.getElementById("exportMeta");
  try {
    const res = await fetch("data/items.json");
    if (!res.ok) return;
    const data = await res.json();
    if (!data.generatedAt || !data.count) {
      exportMeta.textContent = "No export has run yet.";
      return;
    }
    const when = new Date(data.generatedAt).toLocaleString();
    exportMeta.textContent = `Last updated ${when} · ${data.count} item${data.count === 1 ? "" : "s"}.`;
  } catch {
    // static file missing/unreachable - leave the meta line blank
  }
}

function renderLeaderboard(leaders) {
  leaderboardBody.innerHTML = "";
  if (leaders.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = "No uploaders yet.";
    tr.appendChild(td);
    leaderboardBody.appendChild(tr);
    return;
  }

  leaders.forEach((leader, index) => {
    const tr = document.createElement("tr");

    const rankTd = document.createElement("td");
    rankTd.textContent = String(index + 1);

    const nameTd = document.createElement("td");
    nameTd.textContent = leader.name;

    const serverTd = document.createElement("td");
    serverTd.textContent = leader.server || "—";

    const countTd = document.createElement("td");
    countTd.textContent = String(leader.item_count);

    tr.append(rankTd, nameTd, serverTd, countTd);
    leaderboardBody.appendChild(tr);
  });
}

async function loadLeaderboard() {
  const base = apiBase();
  if (!base) return;
  try {
    const res = await fetch(`${base}/api/leaderboard`);
    if (!res.ok) return;
    const data = await res.json();
    renderLeaderboard(data.leaders || []);
  } catch {
    // silently ignore - leaderboard is a nice-to-have
  }
}

function checkApiConfigured() {
  const configured = Boolean(apiBase());
  apiConfigWarning.hidden = configured;
  searchBtn.disabled = !configured;
  return configured;
}

function attachEvents() {
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

  loadBtn.addEventListener("click", loadAndPreview);
  submitBtn.addEventListener("click", submitEntries);
  clearBtn.addEventListener("click", clearContribute);

  searchBtn.addEventListener("click", () => {
    currentPage = 1;
    runSearch();
  });
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      currentPage = 1;
      runSearch();
    }
  });
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      runSearch();
    }
  });
  nextPageBtn.addEventListener("click", () => {
    if (hasMorePages) {
      currentPage += 1;
      runSearch();
    }
  });
}

attachEvents();
loadStoredProfile();
loadExportMeta();
if (checkApiConfigured()) {
  runSearch();
  loadLeaderboard();
}
