const FILTER_LABELS = {
  1: "Always Store",
  2: "Always Loot",
  3: "Always Merge",
  4: "Always Sell",
};
const FILTER_ORDER = [1, 2, 3, 4];
const DEFAULT_HEADER = "[Filters]";
const DOWNLOAD_SUFFIX = "_eqlim";

function withDownloadSuffix(fileName) {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex <= 0) return `${fileName}${DOWNLOAD_SUFFIX}`;
  return `${fileName.slice(0, dotIndex)}${DOWNLOAD_SUFFIX}${fileName.slice(dotIndex)}`;
}

function serializeLootFilterEntries(entries, headerLine) {
  const body = entries.map((e) => `${e.itemId}^${e.filterId}^${e.iconId}^${e.name}`).join("\n");
  return `${headerLine || DEFAULT_HEADER}\n${body}\n`;
}

function downloadLootFilterFile(entries, headerLine, fileName) {
  const downloadName = withDownloadSuffix(fileName);
  const blob = new Blob([serializeLootFilterEntries(entries, headerLine)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = downloadName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return downloadName;
}

async function decodeTextFile(file) {
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

function actionSelectClass(filterId) {
  return `action-select action-${filterId}`;
}

function populateActionOptions(selectEl, options) {
  const opts = options || {};
  selectEl.innerHTML = "";
  if (opts.includeBlank) {
    const blank = document.createElement("option");
    blank.value = "";
    blank.textContent = opts.blankLabel || "Set action for selected...";
    selectEl.appendChild(blank);
  }
  FILTER_ORDER.forEach((id) => {
    const opt = document.createElement("option");
    opt.value = String(id);
    opt.textContent = FILTER_LABELS[id];
    selectEl.appendChild(opt);
  });
  if (opts.defaultValue !== undefined) selectEl.value = String(opts.defaultValue);
}
