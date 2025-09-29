/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LANG: string
  readonly VITE_CAPTCHA_SITE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}