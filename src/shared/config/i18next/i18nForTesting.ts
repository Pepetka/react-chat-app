import { initReactI18next } from 'react-i18next';
const i18n = require('i18next');

i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	debug: false,

	interpolation: {
		escapeValue: false,
	},

	resources: { en: { translations: {} } },
});

export default i18n;
