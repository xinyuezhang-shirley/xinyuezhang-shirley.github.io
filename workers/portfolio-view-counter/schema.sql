CREATE TABLE IF NOT EXISTS visit_stats (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  total INTEGER NOT NULL DEFAULT 0,
  last_notified INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO visit_stats (id, total, last_notified) VALUES (1, 0, 0);

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket TEXT PRIMARY KEY,
  hits INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL
);
