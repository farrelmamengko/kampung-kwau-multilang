import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher d-flex align-items-center">
      <button
        className={`btn btn-sm ${i18n.language === 'id' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
        onClick={() => changeLanguage('id')}
        style={{ fontSize: '12px', padding: '4px 8px' }}
      >
        🇮🇩 ID
      </button>
      <button
        className={`btn btn-sm ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => changeLanguage('en')}
        style={{ fontSize: '12px', padding: '4px 8px' }}
      >
        🇺🇸 EN
      </button>
    </div>
  );
};

export default LanguageSwitcher; 