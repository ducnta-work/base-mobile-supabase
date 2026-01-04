import "i18next"
import { ParseKeys, TOptions } from "i18next"
import { defaultNS, resources } from "."

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)["en"]
  }
}

export type TranslationKey = ParseKeys<"task", TOptions, undefined>
