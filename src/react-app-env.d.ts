/// <reference types="vite/client" />

/**
 * Vite import.meta.env type extensions
 */
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
