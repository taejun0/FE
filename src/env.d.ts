declare interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
