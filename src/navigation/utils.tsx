import { HeaderTitle } from "@react-navigation/elements"
import { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import { useClient } from "../client/provider"
import { TranslationKey } from "../localization/i18next"

export function useIsUnAuthenticated(): boolean {
  const { session } = useClient()
  return !session
}

export function useIsProfileNotCreated(): boolean {
  const { profile } = useClient()
  return !profile
}

export function useIsReady(): boolean {
  const { profile, session } = useClient()
  return !!session && !!profile
}

export function createTranslatableHeaderTitle(translationKey: TranslationKey) {
  const TranslatableHeaderTitle = (): ReactElement => {
    const { t } = useTranslation()
    return <HeaderTitle children={t(translationKey)} />
  }
  return TranslatableHeaderTitle
}
