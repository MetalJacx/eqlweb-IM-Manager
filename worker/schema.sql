-- Community item ID database schema (Cloudflare D1 / SQLite)

-- Every distinct (item_id, name, submitter) claim ever seen. A submitter
-- can only contribute one row per (item_id, name) pair — INSERT OR IGNORE
-- on the primary key is what stops a single person from inflating a
-- confirmation count by resubmitting the same filter.
CREATE TABLE IF NOT EXISTS item_claims (
  item_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  icon_id INTEGER NOT NULL DEFAULT 0,
  submitter_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (item_id, name, submitter_id)
);

CREATE INDEX IF NOT EXISTS idx_item_claims_item_id ON item_claims(item_id);

-- Materialized view over item_claims: one row per item_id with the
-- current leading name and a trust status derived from how many distinct
-- submitters agree on it. Rebuilt incrementally on every submission.
CREATE TABLE IF NOT EXISTS items (
  item_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  icon_id INTEGER NOT NULL DEFAULT 0,
  confirmations INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'unverified',
  disputed_names TEXT,
  first_seen TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);
CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);

-- One row per submission, used purely for per-submitter rate limiting.
CREATE TABLE IF NOT EXISTS submissions_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submitter_id TEXT NOT NULL,
  entry_count INTEGER NOT NULL,
  new_claims INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_submissions_log_submitter ON submissions_log(submitter_id, created_at);

-- Optional, self-reported profile info for the "Top Uploaders" leaderboard.
-- A submitter_id with no row here (or a null display_name) is anonymous and
-- never shows up on the leaderboard -- providing a name is opt-in, not
-- required to contribute.
CREATE TABLE IF NOT EXISTS submitters (
  submitter_id TEXT PRIMARY KEY,
  display_name TEXT,
  server TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
