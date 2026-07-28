-- First-party analytics: events, sessions, aggregates, chat usage, pricing, settings.
-- Apply: npm run db:migrate:analytics (--remote for prod)

CREATE TABLE IF NOT EXISTS analytics_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  raw_event_retention_days INTEGER NOT NULL DEFAULT 90,
  transcript_retention_days INTEGER NOT NULL DEFAULT 30,
  store_visitor_transcripts INTEGER NOT NULL DEFAULT 1,
  email_every_n_views INTEGER NOT NULL DEFAULT 5,
  email_mode TEXT NOT NULL DEFAULT 'every_n_views',
  cost_alert_daily_usd REAL,
  cost_alert_monthly_usd REAL,
  inactivity_cutoff_ms INTEGER NOT NULL DEFAULT 45000,
  updated_at INTEGER NOT NULL
);

INSERT OR IGNORE INTO analytics_settings (id, updated_at) VALUES (1, 0);

CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  anonymous_visitor_id TEXT,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer_domain TEXT,
  acquisition TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  timezone TEXT,
  device_category TEXT,
  browser_family TEXT,
  is_bot INTEGER NOT NULL DEFAULT 0,
  metadata TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS analytics_events_created ON analytics_events (created_at);
CREATE INDEX IF NOT EXISTS analytics_events_name_created ON analytics_events (event_name, created_at);
CREATE INDEX IF NOT EXISTS analytics_events_path_created ON analytics_events (page_path, created_at);
CREATE INDEX IF NOT EXISTS analytics_events_session ON analytics_events (session_id, created_at);

CREATE TABLE IF NOT EXISTS analytics_sessions (
  session_id TEXT PRIMARY KEY,
  anonymous_visitor_id TEXT,
  started_at INTEGER NOT NULL,
  ended_at INTEGER,
  landing_path TEXT,
  exit_path TEXT,
  referrer_domain TEXT,
  acquisition TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  device_category TEXT,
  browser_family TEXT,
  is_bot INTEGER NOT NULL DEFAULT 0,
  page_count INTEGER NOT NULL DEFAULT 0,
  active_ms INTEGER NOT NULL DEFAULT 0,
  engaged INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS analytics_sessions_started ON analytics_sessions (started_at);
CREATE INDEX IF NOT EXISTS analytics_sessions_acquisition ON analytics_sessions (acquisition, started_at);

CREATE TABLE IF NOT EXISTS analytics_daily_pages (
  day TEXT NOT NULL,
  page_path TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  sessions INTEGER NOT NULL DEFAULT 0,
  active_ms_total INTEGER NOT NULL DEFAULT 0,
  entries INTEGER NOT NULL DEFAULT 0,
  exits INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, page_path)
);

CREATE TABLE IF NOT EXISTS analytics_daily_sources (
  day TEXT NOT NULL,
  acquisition TEXT NOT NULL,
  referrer_domain TEXT NOT NULL DEFAULT '',
  sessions INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, acquisition, referrer_domain)
);

CREATE TABLE IF NOT EXISTS analytics_daily_locations (
  day TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  sessions INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, country, region)
);

CREATE TABLE IF NOT EXISTS analytics_daily_interactions (
  day TEXT NOT NULL,
  analytics_id TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  clicks INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, analytics_id, category, label)
);

CREATE TABLE IF NOT EXISTS analytics_daily_totals (
  day TEXT PRIMARY KEY,
  human_views INTEGER NOT NULL DEFAULT 0,
  bot_views INTEGER NOT NULL DEFAULT 0,
  human_sessions INTEGER NOT NULL DEFAULT 0,
  visitors_est INTEGER NOT NULL DEFAULT 0,
  active_ms_total INTEGER NOT NULL DEFAULT 0,
  chat_opens INTEGER NOT NULL DEFAULT 0,
  chat_messages INTEGER NOT NULL DEFAULT 0,
  model_requests INTEGER NOT NULL DEFAULT 0,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  estimated_cost_usd REAL NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS chat_usage_events (
  id TEXT PRIMARY KEY,
  conversation_id TEXT,
  anonymous_visitor_id TEXT,
  session_id TEXT,
  mode TEXT NOT NULL CHECK (mode IN ('public', 'owner')),
  model TEXT,
  status TEXT NOT NULL,
  latency_ms INTEGER,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  cached_tokens INTEGER NOT NULL DEFAULT 0,
  total_tokens INTEGER NOT NULL DEFAULT 0,
  estimated_cost_usd REAL NOT NULL DEFAULT 0,
  tools_json TEXT,
  used_web_search INTEGER NOT NULL DEFAULT 0,
  used_portfolio INTEGER NOT NULL DEFAULT 0,
  page_path TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS chat_usage_created ON chat_usage_events (created_at);
CREATE INDEX IF NOT EXISTS chat_usage_mode_created ON chat_usage_events (mode, created_at);

CREATE TABLE IF NOT EXISTS visitor_chat_messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  anonymous_visitor_id TEXT,
  session_id TEXT,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content_redacted TEXT NOT NULL,
  page_path TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS visitor_chat_conv ON visitor_chat_messages (conversation_id, created_at);
CREATE INDEX IF NOT EXISTS visitor_chat_created ON visitor_chat_messages (created_at);

CREATE TABLE IF NOT EXISTS model_pricing (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  input_cost_per_million REAL NOT NULL,
  cached_input_cost_per_million REAL,
  output_cost_per_million REAL NOT NULL,
  effective_from INTEGER NOT NULL,
  effective_until INTEGER,
  source TEXT,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS model_pricing_lookup ON model_pricing (provider, model, effective_from);

INSERT OR IGNORE INTO model_pricing (
  id, provider, model, input_cost_per_million, cached_input_cost_per_million,
  output_cost_per_million, effective_from, effective_until, source, updated_at
) VALUES (
  'price_gpt41mini_2025',
  'openai',
  'gpt-4.1-mini',
  0.40,
  0.10,
  1.60,
  0,
  NULL,
  'openai_public_list_approx',
  0
);

CREATE TABLE IF NOT EXISTS email_report_history (
  id TEXT PRIMARY KEY,
  trigger_type TEXT NOT NULL,
  period_start INTEGER,
  period_end INTEGER,
  view_threshold INTEGER,
  delivery_status TEXT NOT NULL,
  sent_at INTEGER,
  summary_json TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS email_report_created ON email_report_history (created_at);
