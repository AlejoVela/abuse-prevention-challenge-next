import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LANG = process.env.NEXT_PUBLIC_LANG || "es-AR";

import esAR from "@assets/i18n/es-AR.json";
import enUS from "@assets/i18n/en-US.json";
import br from "@assets/i18n/br.json";

const loadTranslations = async () => {
  try {
    return {
      "es-AR": { translation: esAR },
      "en-US": { translation: enUS },
      br: { translation: br },
    };
  } catch (error) {
    console.error("Error loading translations:", error);
    return {
      "es-AR": { translation: {} },
      "en-US": { translation: {} },
      br: { translation: {} },
    };
  }
};

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
  resources: {}, 
});

loadTranslations().then((resources) => {
  Object.keys(resources).forEach((lng) => {
    i18n.addResourceBundle(
      lng,
      "translation",
      resources[lng].translation,
      true,
      true
    );
  });
});

export default i18n;
