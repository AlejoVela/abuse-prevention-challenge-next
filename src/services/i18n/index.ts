import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LANG = process.env.NEXT_PUBLIC_LANG || "es-AR";

// Función para cargar traducciones dinámicamente
const loadTranslations = async () => {
  try {
    const [esAR, enUS, br] = await Promise.all([
      fetch('/assets/i18n/es-AR.json').then(res => res.json()),
      fetch('/assets/i18n/en-US.json').then(res => res.json()),
      fetch('/assets/i18n/br.json').then(res => res.json())
    ]);

    return {
      'es-AR': { translation: esAR },
      'en-US': { translation: enUS },
      'br': { translation: br }
    };
  } catch (error) {
    console.error('Error loading translations:', error);
    // Fallback a traducciones vacías si falla
    return {
      'es-AR': { translation: {} },
      'en-US': { translation: {} },
      'br': { translation: {} }
    };
  }
};

// Inicializar i18n sin recursos, los cargaremos después
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
  resources: {}, // Inicialmente vacío
});

// Cargar traducciones dinámicamente
loadTranslations().then(resources => {
  // Agregar recursos a i18n
  Object.keys(resources).forEach(lng => {
    i18n.addResourceBundle(lng, 'translation', resources[lng].translation, true, true);
  });
});

export default i18n;
