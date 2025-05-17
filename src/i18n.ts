import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import pt from "./locales/pt/translation.json";
import fr from "./locales/fr/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    fr: { translation: fr }, // Adicione outros idiomas conforme necessário
  },
  lng: "en", // idioma padrão
  fallbackLng: "pt",
  interpolation: { escapeValue: false },
});

export default i18n;
