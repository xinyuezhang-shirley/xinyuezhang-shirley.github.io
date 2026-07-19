/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VIEW_COUNTER_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
