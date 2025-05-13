/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  /**
   * Hotjar site ID for visitor recording (non-sensitive)
   */
  readonly PUBLIC_HOTJAR_SITE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
