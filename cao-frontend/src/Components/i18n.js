import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import Cookies from 'js-cookie'
import { initReactI18next } from 'react-i18next'

i18n 
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: Cookies.get("locale") || "en",
    backend: {
      /* translation file path */
      loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
    },
    fallbackLng: 'en',
    debug: true,
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: ['translations'],
    defaultNS: 'translations',
    // Used to go to each page within the json file
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    } 
  })

export default i18n