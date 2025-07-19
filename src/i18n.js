import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonId from './translations/id/common.json';
import commonEn from './translations/en/common.json';
import homeId from './translations/id/home.json';
import homeEn from './translations/en/home.json';
import modalId from './translations/id/modal.json';
import modalEn from './translations/en/modal.json';
import pagesId from './translations/id/pages.json';
import pagesEn from './translations/en/pages.json';

const resources = {
  id: {
    common: commonId,
    home: homeId,
    modal: modalId,
    pages: pagesId,
  },
  en: {
    common: commonEn,
    home: homeEn,
    modal: modalEn,
    pages: pagesEn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'id',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n; 