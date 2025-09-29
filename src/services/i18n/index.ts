import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import esAR from '@assets/i18n/es-AR.json';
import enUS from '@assets/i18n/en-US.json';
import br from '@assets/i18n/br.json';

const LANG = import.meta.env.VITE_LANG || 'es-AR';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: import.meta.env.MODE === 'development',
		fallbackLng: LANG,
		interpolation: {
			escapeValue: false,
		},
		resources: {
			'es-AR': {
				translation: esAR,
			},
			'en-US': {
				translation: enUS,
			},
			'br': {
				translation: br,
			},
		},
	});

export default i18n;