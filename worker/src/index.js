// Community item ID database API.
//
// Trust model: an item_id -> name mapping only strengthens when *distinct*
// submitters independently agree on it (enforced by the item_claims primary
// key). A submission never overwrites an existing mapping outright -- if a
// name disagrees with the current leader and both sides have real support,
// the item is marked "disputed" instead of silently changed.
//
// Status thresholds (distinct-submitter confirmations for the leading name):
//   1        -> unverified
//   2-4      -> emerging
//   5+ AND confirmations span >= 30 minutes -> verified
// Disputed overrides all of the above whenever a runner-up name has
// meaningful independent support of its own.
//
// The 30-minute span requirement exists alongside the distinct-submitter
// count specifically to blunt a scripted Sybil attack: submitterId is a
// self-asserted client UUID, so nothing stops someone from firing 5 fake
// submissions with 5 fake UUIDs in a couple of seconds. Requiring real
// elapsed time between the earliest and latest confirming claim doesn't
// stop a patient attacker, but it kills the "one script, one second" case
// without adding any friction (CAPTCHA, login) for real users, who
// naturally submit over hours/days anyway.

const EMERGING_THRESHOLD = 2;
const VERIFIED_THRESHOLD = 5;
const DISPUTE_MIN_CONFIRMATIONS = 2;
const VERIFIED_MIN_SPAN_MS = 30 * 60 * 1000;

const MAX_ENTRIES_PER_SUBMISSION = 5000;
const MAX_NAME_LENGTH = 200;
const MAX_ITEM_ID = 2_147_483_647;
const DEFAULT_MAX_SUBMISSIONS_PER_DAY = 20;
const MAX_PROFILE_FIELD_LENGTH = 40;
const LEADERBOARD_SIZE = 10;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ALLOWED_ORIGIN holds one origin, "*", or a comma-separated allowlist (e.g.
// production domain plus local dev origins). With a real allowlist, the
// response reflects back whichever allowed origin actually made the
// request -- browsers require Access-Control-Allow-Origin to be a single
// value, not a list, so this is the standard way to allow more than one.
function corsHeaders(env, request) {
  const allowed = (env.ALLOWED_ORIGIN || "*").split(",").map((s) => s.trim()).filter(Boolean);
  const isWildcard = allowed.length === 0 || (allowed.length === 1 && allowed[0] === "*");
  const requestOrigin = request ? request.headers.get("Origin") : null;
  const allowOrigin = isWildcard
    ? "*"
    : (requestOrigin && allowed.includes(requestOrigin) ? requestOrigin : allowed[0]);

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(data, status, env, request) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json", ...corsHeaders(env, request) },
  });
}

function deriveStatus(leaderConfirmations, runnerUpConfirmations, spanMs) {
  if (runnerUpConfirmations >= DISPUTE_MIN_CONFIRMATIONS) return "disputed";
  if (leaderConfirmations >= VERIFIED_THRESHOLD && spanMs >= VERIFIED_MIN_SPAN_MS) return "verified";
  if (leaderConfirmations >= EMERGING_THRESHOLD) return "emerging";
  return "unverified";
}

// SQLite's datetime('now') yields "YYYY-MM-DD HH:MM:SS" in UTC with no
// timezone marker, which Date() alone would otherwise parse as local time.
function parseSqliteUtc(text) {
  return new Date(`${text.replace(" ", "T")}Z`).getTime();
}

// Item names flow into a CSV export (frontend/data/items.csv) that's offered
// as a direct download. A name starting with =, +, -, @, or a tab is a
// formula trigger in Excel/LibreOffice/Sheets -- rejecting them at ingestion
// means no downstream consumer (the CSV export, or anything else that might
// treat this data as spreadsheet input) ever has to remember to re-escape it.
const CSV_FORMULA_TRIGGER_RE = /^[=+\-@\t]/;

function sanitizeEntries(rawEntries) {
  if (!Array.isArray(rawEntries)) return { error: "entries must be an array" };
  if (rawEntries.length === 0) return { error: "entries must not be empty" };
  if (rawEntries.length > MAX_ENTRIES_PER_SUBMISSION) {
    return { error: `entries exceeds max of ${MAX_ENTRIES_PER_SUBMISSION}` };
  }

  const dedup = new Map(); // key `${itemId} ${name}` -> {itemId, name, iconId}
  for (const raw of rawEntries) {
    if (!raw || typeof raw !== "object") continue;
    const itemId = Number(raw.itemId);
    const iconId = Number.isFinite(Number(raw.iconId)) ? Math.trunc(Number(raw.iconId)) : 0;
    const name = typeof raw.name === "string" ? raw.name.trim() : "";
    if (!Number.isInteger(itemId) || itemId <= 0 || itemId > MAX_ITEM_ID) continue;
    if (!name || name.length > MAX_NAME_LENGTH || /[\r\n]/.test(name)) continue;
    if (CSV_FORMULA_TRIGGER_RE.test(name)) continue;
    if (iconId < 0 || iconId > MAX_ITEM_ID) continue;
    dedup.set(`${itemId} ${name}`, { itemId, name, iconId });
  }

  if (dedup.size === 0) return { error: "no valid entries after validation" };
  return { entries: [...dedup.values()] };
}

// Optional self-reported profile fields (display name, server) for the
// leaderboard. Not identity-verified -- same trust level as any other
// self-asserted value here -- but low-stakes (cosmetic ranking, not the
// item ID data itself), so no extra friction is added beyond basic shape
// validation and the same formula-injection guard used for item names.
function sanitizeProfileField(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_PROFILE_FIELD_LENGTH) return null;
  if (/[\r\n]/.test(trimmed) || CSV_FORMULA_TRIGGER_RE.test(trimmed)) return null;
  return trimmed;
}

async function verifyTurnstile(token, env, request) {
  if (!env.TURNSTILE_SECRET_KEY) return true; // not configured, skip
  if (!token || typeof token !== "string") return false;
  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET_KEY);
  body.append("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const outcome = await res.json();
  return outcome.success === true;
}

// Recomputes the aggregated `items` row for each given item_id from
// scratch off of `item_claims`, and upserts the results. Shared by
// handleSubmit (right after new claims land) and the scheduled handler
// (to promote items that only needed time, not new confirmations, to
// cross the verified threshold).
async function recomputeItems(env, itemIds) {
  if (!itemIds.length) return [];

  // Pull every candidate name for every touched item in a handful of
  // chunked queries (instead of one query per item) -- D1 caps how many
  // bound parameters a single statement can take, so IN (...) is batched
  // in groups rather than sent as one query per item_id.
  const CHUNK_SIZE = 100;
  const nameRowsByItem = new Map(); // itemId -> [{name, icon_id, confirmations, first_claim_at, last_claim_at}, ...] desc by confirmations
  for (let i = 0; i < itemIds.length; i += CHUNK_SIZE) {
    const chunk = itemIds.slice(i, i + CHUNK_SIZE);
    const placeholders = chunk.map((_, idx) => `?${idx + 1}`).join(",");
    const { results } = await env.DB.prepare(
      `SELECT item_id, name, MAX(icon_id) AS icon_id, COUNT(DISTINCT submitter_id) AS confirmations,
              MIN(created_at) AS first_claim_at, MAX(created_at) AS last_claim_at
       FROM item_claims WHERE item_id IN (${placeholders})
       GROUP BY item_id, name ORDER BY item_id ASC, confirmations DESC, name ASC`
    ).bind(...chunk).all();
    for (const row of results) {
      if (!nameRowsByItem.has(row.item_id)) nameRowsByItem.set(row.item_id, []);
      nameRowsByItem.get(row.item_id).push(row);
    }
  }

  const updatedItems = [];
  const upsertStmts = [];
  for (const itemId of itemIds) {
    const nameRows = nameRowsByItem.get(itemId);
    if (!nameRows || !nameRows.length) continue;

    const leader = nameRows[0];
    const runnerUp = nameRows[1];
    const spanMs = parseSqliteUtc(leader.last_claim_at) - parseSqliteUtc(leader.first_claim_at);
    const status = deriveStatus(leader.confirmations, runnerUp ? runnerUp.confirmations : 0, spanMs);
    const disputedNames = status === "disputed"
      ? JSON.stringify(nameRows.filter((r) => r.confirmations >= DISPUTE_MIN_CONFIRMATIONS)
          .map((r) => ({ name: r.name, confirmations: r.confirmations })))
      : null;

    upsertStmts.push(env.DB.prepare(
      `INSERT INTO items (item_id, name, icon_id, confirmations, status, disputed_names, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, datetime('now'))
       ON CONFLICT(item_id) DO UPDATE SET
         name = excluded.name,
         icon_id = excluded.icon_id,
         confirmations = excluded.confirmations,
         status = excluded.status,
         disputed_names = excluded.disputed_names,
         updated_at = datetime('now')`
    ).bind(itemId, leader.name, leader.icon_id, leader.confirmations, status, disputedNames));

    updatedItems.push({ itemId, name: leader.name, confirmations: leader.confirmations, status });
  }
  if (upsertStmts.length) await env.DB.batch(upsertStmts);

  return updatedItems;
}

async function handleSubmit(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid JSON body" }, 400, env, request);
  }

  const submitterId = typeof payload.submitterId === "string" ? payload.submitterId : "";
  if (!UUID_RE.test(submitterId)) {
    return json({ error: "submitterId must be a UUID" }, 400, env, request);
  }

  const turnstileOk = await verifyTurnstile(payload.turnstileToken, env, request);
  if (!turnstileOk) {
    return json({ error: "verification challenge failed" }, 403, env, request);
  }

  const { entries, error } = sanitizeEntries(payload.entries);
  if (error) return json({ error }, 400, env, request);

  const displayName = sanitizeProfileField(payload.displayName);
  const server = sanitizeProfileField(payload.server);
  if (displayName) {
    await env.DB.prepare(
      `INSERT INTO submitters (submitter_id, display_name, server, updated_at)
       VALUES (?1, ?2, ?3, datetime('now'))
       ON CONFLICT(submitter_id) DO UPDATE SET
         display_name = excluded.display_name,
         server = excluded.server,
         updated_at = datetime('now')`
    ).bind(submitterId, displayName, server).run();
  }

  const maxPerDay = Number(env.MAX_SUBMISSIONS_PER_DAY) || DEFAULT_MAX_SUBMISSIONS_PER_DAY;
  const rateRow = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM submissions_log WHERE submitter_id = ?1 AND created_at >= datetime('now', '-1 day')`
  ).bind(submitterId).first();
  if ((rateRow?.n || 0) >= maxPerDay) {
    return json({ error: "daily submission limit reached, try again later" }, 429, env, request);
  }

  const insertStmts = entries.map((e) =>
    env.DB.prepare(
      `INSERT OR IGNORE INTO item_claims (item_id, name, icon_id, submitter_id) VALUES (?1, ?2, ?3, ?4)`
    ).bind(e.itemId, e.name, e.iconId, submitterId)
  );
  const insertResults = await env.DB.batch(insertStmts);
  const newClaims = insertResults.reduce((sum, r) => sum + (r.meta?.changes || 0), 0);

  const touchedItemIds = [...new Set(entries.map((e) => e.itemId))];
  const updatedItems = await recomputeItems(env, touchedItemIds);

  await env.DB.prepare(
    `INSERT INTO submissions_log (submitter_id, entry_count, new_claims) VALUES (?1, ?2, ?3)`
  ).bind(submitterId, entries.length, newClaims).run();

  return json({
    received: entries.length,
    newClaims,
    itemsUpdated: updatedItems,
  }, 200, env, request);
}

async function handleListItems(url, env, request) {
  const q = (url.searchParams.get("q") || "").trim();
  const status = (url.searchParams.get("status") || "").trim();
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 50, 1), 200);
  const page = Math.max(Number(url.searchParams.get("page")) || 1, 1);
  const offset = (page - 1) * limit;

  const conditions = [];
  const binds = [];
  if (q) {
    conditions.push(`(name LIKE ?${binds.length + 1} OR CAST(item_id AS TEXT) = ?${binds.length + 2})`);
    binds.push(`%${q}%`, q);
  }
  if (status && ["unverified", "emerging", "verified", "disputed"].includes(status)) {
    conditions.push(`status = ?${binds.length + 1}`);
    binds.push(status);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const stmt = env.DB.prepare(
    `SELECT item_id, name, icon_id, confirmations, status, disputed_names, updated_at
     FROM items ${where}
     ORDER BY confirmations DESC, item_id ASC
     LIMIT ${limit} OFFSET ${offset}`
  ).bind(...binds);
  const { results } = await stmt.all();

  return json({
    page,
    limit,
    items: results.map((r) => ({
      ...r,
      disputed_names: r.disputed_names ? JSON.parse(r.disputed_names) : null,
    })),
  }, 200, env, request);
}

async function handleExport(request, env) {
  // Bulk snapshot for the scheduled GitHub Action, not for public traffic --
  // gated by a shared token so open/free access to the data happens via the
  // static file it produces, never by calling this endpoint directly. That
  // keeps D1 reads (and therefore cost) bounded to the export schedule
  // regardless of how many people download the resulting file.
  if (env.EXPORT_TOKEN) {
    const auth = request.headers.get("Authorization") || "";
    if (auth !== `Bearer ${env.EXPORT_TOKEN}`) {
      return json({ error: "unauthorized" }, 401, env, request);
    }
  }

  const { results } = await env.DB.prepare(
    `SELECT item_id, name, icon_id, confirmations, status, updated_at FROM items ORDER BY item_id ASC`
  ).all();

  return json({
    generatedAt: new Date().toISOString(),
    count: results.length,
    items: results,
  }, 200, env, request);
}

async function handleGetItem(itemId, env, request) {
  const item = await env.DB.prepare(
    `SELECT item_id, name, icon_id, confirmations, status, disputed_names, first_seen, updated_at
     FROM items WHERE item_id = ?1`
  ).bind(itemId).first();
  if (!item) return json({ error: "not found" }, 404, env, request);

  const { results: claims } = await env.DB.prepare(
    `SELECT name, icon_id, COUNT(DISTINCT submitter_id) AS confirmations
     FROM item_claims WHERE item_id = ?1 GROUP BY name, icon_id ORDER BY confirmations DESC`
  ).bind(itemId).all();

  return json({
    ...item,
    disputed_names: item.disputed_names ? JSON.parse(item.disputed_names) : null,
    claims,
  }, 200, env, request);
}

async function handleLeaderboard(env, request) {
  // Ranks by distinct items each submitter has claims for -- only
  // submitters who opted into a display name show up; anonymous
  // contributions still count toward confirmations but aren't ranked.
  const { results } = await env.DB.prepare(
    `SELECT s.display_name AS name, s.server AS server, COUNT(DISTINCT ic.item_id) AS item_count
     FROM submitters s
     JOIN item_claims ic ON ic.submitter_id = s.submitter_id
     WHERE s.display_name IS NOT NULL
     GROUP BY s.submitter_id
     ORDER BY item_count DESC
     LIMIT ?1`
  ).bind(LEADERBOARD_SIZE).all();

  return json({ leaders: results }, 200, env, request);
}

async function promoteEligibleItems(env) {
  // Items that already have enough confirmations but are still capped at
  // "emerging" by the time-span gate. Recomputing them turns "verified"
  // into something that arrives on its own once 30 minutes have passed,
  // not just on the next unrelated submission that happens to touch them.
  const { results } = await env.DB.prepare(
    `SELECT item_id FROM items WHERE status = 'emerging' AND confirmations >= ?1`
  ).bind(VERIFIED_THRESHOLD).all();
  const itemIds = results.map((r) => r.item_id);
  if (itemIds.length) await recomputeItems(env, itemIds);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(env, request) });
    }

    try {
      if (url.pathname === "/api/submit" && request.method === "POST") {
        return await handleSubmit(request, env);
      }
      if (url.pathname === "/api/items" && request.method === "GET") {
        return await handleListItems(url, env, request);
      }
      if (url.pathname === "/api/export" && request.method === "GET") {
        return await handleExport(request, env);
      }
      if (url.pathname === "/api/leaderboard" && request.method === "GET") {
        return await handleLeaderboard(env, request);
      }
      const itemMatch = url.pathname.match(/^\/api\/items\/(\d+)$/);
      if (itemMatch && request.method === "GET") {
        return await handleGetItem(Number(itemMatch[1]), env, request);
      }
      return json({ error: "not found" }, 404, env, request);
    } catch (err) {
      return json({ error: "internal error", detail: String(err && err.message || err) }, 500, env, request);
    }
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(promoteEligibleItems(env));
  },
};
