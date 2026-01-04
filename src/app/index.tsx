import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { I18nextProvider } from "react-i18next"
import i18n from "../localization"
import * as SplashScreen from "expo-splash-screen"
import React, { useEffect } from "react"
import { Portal } from "react-native-chill-ui"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { configRefreshToken } from "../client"
import { ClientProvider } from "../client/provider"
import StyledNavigation from "../navigation"

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export default function App() {
  useEffect(configRefreshToken, [])

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <Portal.Host>
              <ClientProvider>
                <StyledNavigation onReady={SplashScreen.hideAsync} />
              </ClientProvider>
            </Portal.Host>
          </KeyboardProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}
