/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LANG: string
  readonly VITE_CAPTCHA_SITE_KEY: string
  readonly VITE_API_URL: string
  readonly VITE_DEFAULT_USER_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}