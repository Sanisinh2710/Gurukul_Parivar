import {EnglishJSON, GujaratiJSON, HindiJSON} from '@localization';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const defaultNS = 'translation';

export const resources = {
  // list of languages
  en: EnglishJSON,
  gu: GujaratiJSON,
  hn: HindiJSON,
} as const;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    lng: 'gu',
    ns: ['translation'],
    defaultNS,
    resources,
    fallbackLng: 'en', // default language to use.
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
