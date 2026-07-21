/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VIEW_COUNTER_ENDPOINT?: string;
  /** Cloudflare Worker origin for Ask Shirley (no trailing slash). */
  readonly VITE_ASK_SHIRLEY_ENDPOINT?: string;
  /** Explicit opt-in to show /ask-shirley/author outside DEV builds. */
  readonly VITE_ASK_SHIRLEY_AUTHOR?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
