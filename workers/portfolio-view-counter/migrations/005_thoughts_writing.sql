-- Thoughts + Writing living archive
-- Run: wrangler d1 execute portfolio-views --remote --file=./migrations/005_thoughts_writing.sql

CREATE TABLE IF NOT EXISTS thoughts (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  text TEXT NOT NULL,
  title TEXT,
  type TEXT NOT NULL DEFAULT 'fragment',
  visibility TEXT NOT NULL DEFAULT 'private',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  published_at INTEGER,
  dormant_at INTEGER,
  archived_at INTEGER,
  expires_at INTEGER,
  max_public_encounters INTEGER,
  public_encounter_count INTEGER NOT NULL DEFAULT 0,
  last_surfaced_at INTEGER,
  resurface_after_days INTEGER,
  per_visitor_once INTEGER NOT NULL DEFAULT 1,
  manual_weight REAL NOT NULL DEFAULT 0,
  pinned INTEGER NOT NULL DEFAULT 0,
  source_conversation_id TEXT,
  source_message_id TEXT,
  original_text TEXT NOT NULL,
  edited_text TEXT,
  behavior_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_thoughts_owner_vis ON thoughts(owner_id, visibility, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_thoughts_public ON thoughts(visibility, pinned DESC, last_surfaced_at);

CREATE TABLE IF NOT EXISTS thought_revisions (
  id TEXT PRIMARY KEY,
  thought_id TEXT NOT NULL,
  body TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'edit',
  created_at INTEGER NOT NULL,
  FOREIGN KEY (thought_id) REFERENCES thoughts(id)
);

CREATE INDEX IF NOT EXISTS idx_thought_revisions_thought ON thought_revisions(thought_id, created_at DESC);

CREATE TABLE IF NOT EXISTS thought_tags (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  label TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_thought_tags_owner_slug ON thought_tags(owner_id, slug);

CREATE TABLE IF NOT EXISTS thought_tag_map (
  thought_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (thought_id, tag_id),
  FOREIGN KEY (thought_id) REFERENCES thoughts(id),
  FOREIGN KEY (tag_id) REFERENCES thought_tags(id)
);

CREATE TABLE IF NOT EXISTS thought_relationships (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  from_thought_id TEXT NOT NULL,
  to_thought_id TEXT NOT NULL,
  relationship_type TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (from_thought_id) REFERENCES thoughts(id),
  FOREIGN KEY (to_thought_id) REFERENCES thoughts(id)
);

CREATE INDEX IF NOT EXISTS idx_thought_rels_from ON thought_relationships(from_thought_id);

CREATE TABLE IF NOT EXISTS writing_pieces (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  type TEXT NOT NULL DEFAULT 'essay',
  status TEXT NOT NULL DEFAULT 'draft',
  visibility TEXT NOT NULL DEFAULT 'private',
  excerpt TEXT,
  structured_content TEXT NOT NULL DEFAULT '{}',
  cover_image_id TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  published_at INTEGER,
  archived_at INTEGER,
  show_origin INTEGER NOT NULL DEFAULT 0,
  source_conversation_id TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_writing_slug ON writing_pieces(slug);
CREATE INDEX IF NOT EXISTS idx_writing_owner_status ON writing_pieces(owner_id, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_writing_public ON writing_pieces(status, published_at DESC);

CREATE TABLE IF NOT EXISTS writing_versions (
  id TEXT PRIMARY KEY,
  writing_id TEXT NOT NULL,
  structured_content_snapshot TEXT NOT NULL,
  title_snapshot TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'checkpoint',
  created_at INTEGER NOT NULL,
  FOREIGN KEY (writing_id) REFERENCES writing_pieces(id)
);

CREATE INDEX IF NOT EXISTS idx_writing_versions_piece ON writing_versions(writing_id, created_at DESC);

CREATE TABLE IF NOT EXISTS writing_annotations (
  id TEXT PRIMARY KEY,
  writing_id TEXT NOT NULL,
  block_id TEXT,
  text_anchor TEXT,
  body TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'private',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (writing_id) REFERENCES writing_pieces(id)
);

CREATE INDEX IF NOT EXISTS idx_writing_ann_piece ON writing_annotations(writing_id, created_at);

CREATE TABLE IF NOT EXISTS thought_writing_links (
  id TEXT PRIMARY KEY,
  thought_id TEXT NOT NULL,
  writing_id TEXT NOT NULL,
  relationship_type TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (thought_id) REFERENCES thoughts(id),
  FOREIGN KEY (writing_id) REFERENCES writing_pieces(id)
);

CREATE INDEX IF NOT EXISTS idx_tw_links_writing ON thought_writing_links(writing_id);
CREATE INDEX IF NOT EXISTS idx_tw_links_thought ON thought_writing_links(thought_id);
