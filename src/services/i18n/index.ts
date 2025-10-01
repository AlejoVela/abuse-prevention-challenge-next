import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import esAR from "@/assets/i18n/es-AR.json";
import enUS from "@/assets/i18n/en-US.json";
import br from "@/assets/i18n/br.json";

const LANG = process.env.NEXT_PUBLIC_LANG || "es-AR";

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: LANG,
  lng: LANG,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  resources: {
    "es-AR": {
      translation: esAR,
    },
    "en-US": {
      translation: enUS,
    },
    br: {
      translation: br,
    },
  },
});

export default i18n;
