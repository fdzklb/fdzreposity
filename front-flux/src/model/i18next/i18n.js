import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { reactI18nextModule } from './i18nContext';

/**
 * create i18next instance
 */
i18n
  .use(XHR)
  .use(reactI18nextModule)
  .init({
    // default language
    lng: 'en',
    // fallback language
    fallbackLng: 'en',
    // all namespaces
    ns: [ 'common', 'account' ],
    // default namespaces
    defaultNS: [ 'common', 'account' ],
    // open the debug
    debug: false,

    // react i18next special options (optional)
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    },
  });

export default i18n;
