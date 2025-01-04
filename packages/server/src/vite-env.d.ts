/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_HOST_NAME: string
  readonly VITE_STATIC_DIR: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
