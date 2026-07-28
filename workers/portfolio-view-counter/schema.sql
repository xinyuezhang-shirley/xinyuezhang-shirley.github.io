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

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,
  type TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS events_event_created ON events (event, created_at);
-- Owner mode: users, sessions, conversations, memories, notes, persona.
-- Apply: wrangler d1 execute portfolio-views --file=./migrations/002_owner_mode.sql
-- Local: wrangler d1 execute portfolio-views --local --file=./migrations/002_owner_mode.sql

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Named owner_sessions to avoid colliding with legacy analytics `sessions` table.
CREATE TABLE IF NOT EXISTS owner_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  last_used_at INTEGER NOT NULL,
  revoked_at INTEGER
);

CREATE INDEX IF NOT EXISTS owner_sessions_token_hash ON owner_sessions (token_hash);
CREATE INDEX IF NOT EXISTS owner_sessions_user_id ON owner_sessions (user_id);

CREATE TABLE IF NOT EXISTS auth_attempts (
  bucket TEXT PRIMARY KEY,
  failures INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL,
  locked_until INTEGER
);

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  visitor_session_id TEXT,
  mode TEXT NOT NULL CHECK (mode IN ('public', 'owner')),
  title TEXT,
  summary TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS conversations_user_mode ON conversations (user_id, mode, updated_at);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'tool')),
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  metadata TEXT
);

CREATE INDEX IF NOT EXISTS messages_conversation ON messages (conversation_id, created_at);

CREATE TABLE IF NOT EXISTS memories (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  category TEXT,
  importance REAL NOT NULL DEFAULT 0.5,
  confidence REAL NOT NULL DEFAULT 0.8,
  source_message_id TEXT,
  source_conversation_id TEXT,
  embedding TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  archived_at INTEGER
);

CREATE INDEX IF NOT EXISTS memories_user_active ON memories (user_id, archived_at, updated_at);

CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  tags TEXT,
  embedding TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  archived_at INTEGER
);

CREATE INDEX IF NOT EXISTS notes_user_active ON notes (user_id, archived_at, updated_at);

CREATE TABLE IF NOT EXISTS persona_observations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  observation TEXT NOT NULL,
  category TEXT,
  confidence REAL NOT NULL DEFAULT 0.5,
  evidence_message_ids TEXT,
  status TEXT NOT NULL DEFAULT 'candidate'
    CHECK (status IN ('candidate', 'approved', 'rejected', 'archived')),
  created_at INTEGER NOT NULL,
  reviewed_at INTEGER
);

CREATE INDEX IF NOT EXISTS persona_obs_user_status ON persona_observations (user_id, status, created_at);

CREATE TABLE IF NOT EXISTS persona_versions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  version_number INTEGER NOT NULL,
  profile_json TEXT NOT NULL,
  change_summary TEXT,
  source_observation_ids TEXT,
  created_at INTEGER NOT NULL,
  activated_at INTEGER,
  UNIQUE (user_id, version_number)
);

CREATE INDEX IF NOT EXISTS persona_versions_user ON persona_versions (user_id, version_number);
