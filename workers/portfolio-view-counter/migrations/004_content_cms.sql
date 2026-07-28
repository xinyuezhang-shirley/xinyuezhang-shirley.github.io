-- Conversational CMS foundation: drafts, uploads, art, photography, dreams, audit log.
-- Run: wrangler d1 execute portfolio-views --remote --file=./migrations/004_content_cms.sql

CREATE TABLE IF NOT EXISTS upload_sessions (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  conversation_id TEXT,
  status TEXT NOT NULL DEFAULT 'open', -- open | completed | expired
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS upload_objects (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  bucket TEXT NOT NULL DEFAULT 'private', -- private | public
  original_filename TEXT,
  mime_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  status TEXT NOT NULL DEFAULT 'uploaded', -- uploaded | processing | ready | failed
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  exif_stripped INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (session_id) REFERENCES upload_sessions(id)
);

CREATE INDEX IF NOT EXISTS idx_upload_objects_session ON upload_objects(session_id);
CREATE INDEX IF NOT EXISTS idx_upload_objects_owner ON upload_objects(owner_id);

CREATE TABLE IF NOT EXISTS content_drafts (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  content_type TEXT NOT NULL, -- artwork | photo_collection | dream | atlas_change
  target_content_id TEXT,
  operation_type TEXT NOT NULL, -- create | update | reorder | publish | unpublish | archive | delete | analyze
  proposed_data TEXT NOT NULL, -- JSON
  source_conversation_id TEXT,
  source_message_id TEXT,
  validation_status TEXT NOT NULL DEFAULT 'pending', -- pending | valid | invalid
  preview_status TEXT NOT NULL DEFAULT 'none', -- none | ready | failed
  status TEXT NOT NULL DEFAULT 'open', -- open | published | discarded | expired
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  expires_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_content_drafts_owner ON content_drafts(owner_id, status);

CREATE TABLE IF NOT EXISTS content_changes (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  content_id TEXT,
  operation TEXT NOT NULL,
  before_snapshot TEXT,
  after_snapshot TEXT,
  source_conversation_id TEXT,
  source_message_id TEXT,
  draft_id TEXT,
  confirmation_message_id TEXT,
  status TEXT NOT NULL DEFAULT 'applied', -- applied | reverted | failed
  commit_hash TEXT,
  created_at INTEGER NOT NULL,
  published_at INTEGER,
  reverted_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_content_changes_owner ON content_changes(owner_id, created_at DESC);

CREATE TABLE IF NOT EXISTS artworks (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  medium TEXT,
  dimensions TEXT,
  completed_at TEXT,
  year INTEGER,
  status TEXT NOT NULL DEFAULT 'draft', -- draft | published | hidden | archived
  section TEXT DEFAULT 'Recent Work',
  display_order INTEGER NOT NULL DEFAULT 0,
  primary_image_id TEXT,
  tags TEXT, -- JSON array
  alt_text TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  published_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_artworks_slug ON artworks(slug);
CREATE INDEX IF NOT EXISTS idx_artworks_status ON artworks(status, display_order);

CREATE TABLE IF NOT EXISTS artwork_images (
  id TEXT PRIMARY KEY,
  artwork_id TEXT NOT NULL,
  upload_object_id TEXT,
  original_url TEXT,
  optimized_url TEXT,
  thumbnail_url TEXT,
  width INTEGER,
  height INTEGER,
  mime_type TEXT,
  file_size INTEGER,
  display_order INTEGER NOT NULL DEFAULT 0,
  alt_text TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (artwork_id) REFERENCES artworks(id)
);

CREATE TABLE IF NOT EXISTS photo_collections (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  captured_at TEXT,
  location_label TEXT,
  cover_photo_id TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  published_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_photo_collections_slug ON photo_collections(slug);

CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY,
  collection_id TEXT NOT NULL,
  upload_object_id TEXT,
  original_url TEXT,
  optimized_url TEXT,
  thumbnail_url TEXT,
  title TEXT,
  caption TEXT,
  alt_text TEXT,
  captured_at TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  width INTEGER,
  height INTEGER,
  orientation TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at INTEGER NOT NULL,
  FOREIGN KEY (collection_id) REFERENCES photo_collections(id)
);

CREATE INDEX IF NOT EXISTS idx_photos_collection ON photos(collection_id, display_order);

CREATE TABLE IF NOT EXISTS dreams (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  dream_date TEXT,
  title TEXT,
  raw_private_text TEXT NOT NULL,
  owner_notes TEXT,
  public_excerpt TEXT,
  visibility TEXT NOT NULL DEFAULT 'full_private', -- full_private | private_with_public_excerpt | fully_public
  processing_status TEXT NOT NULL DEFAULT 'saved', -- saved | analyzing | ready | failed
  atlas_proposal_json TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  published_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_dreams_owner ON dreams(owner_id, created_at DESC);
