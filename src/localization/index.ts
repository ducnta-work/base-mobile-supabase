import { getLocales } from "expo-localization"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en_task from "./languages/en/task.json"
import vi_task from "./languages/vi/task.json"
import ja_task from "./languages/ja/task.json"
import { getPersistedLanguage } from "./persist"

export const defaultNS = "task"

export const resources = {
  en: {
    task: en_task,
  },
  vi: {
    task: vi_task,
  },
  ja: {
    task: ja_task,
  },
} as const

const presetLocales = Object.keys(resources)

let locale = getPersistedLanguage() || getLocales()[0].languageCode || "en"

if (!presetLocales.includes(locale)) {
  locale = "en"
}

i18n.use(initReactI18next).init({
  resources,
  lng: locale,
  fallbackLng: "en",
  ns: ["task"],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
