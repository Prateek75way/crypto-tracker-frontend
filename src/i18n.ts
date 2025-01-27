import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Load translations using HTTP
  .use(LanguageDetector) // Detect the user's language
  .use(initReactI18next) // Bind to React
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Enable logs for debugging in development
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  });

export default i18n;
