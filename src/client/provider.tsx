import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Profile, Session } from "family-task-client"
import { createContext, FC, PropsWithChildren, use, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "react-native-chill-ui"
import { auth } from "."
import ErrorLayout from "../components/Layout/ErrorLayout"
import LoadingView from "../components/Overlay/LoadingView"
import OverlayView from "../components/Overlay/OverlayView"
import {
  profileQueryOptions,
  sessionQueryOptions,
} from "./queries"
import * as SplashScreen from "expo-splash-screen"


interface ClientState {
  session: Session | null | undefined
  profile: Profile | null | undefined
}

const ClientContext = createContext<ClientState>(null as never)

const ClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useQueryClient()

  useEffect(() => {
    const subscription = auth.onAuthStateChange((_event, session) => {
      client.setQueryData(["session"], session)
      if (session == null) {
        client.clear()
      }
    })
    return subscription.unsubscribe
  }, [])

  const sessionQueryResult = useQuery(sessionQueryOptions)

  const profileQueryResult = useQuery({
    ...profileQueryOptions,
    enabled: !!sessionQueryResult.data,
  })

  const { t } = useTranslation()

  if (
    sessionQueryResult.isLoading ||
    profileQueryResult.isLoading
  ) {
    return (
      <OverlayView visible>
        <LoadingView />
      </OverlayView>
    )
  }

  if (sessionQueryResult.isError) {
    SplashScreen.hideAsync()
    return (
      <ErrorLayout
        title={t("error")}
        message={sessionQueryResult.error.message}
      >
        <Button
          mode="contained"
          size="small"
          title={t("retry")}
          onPress={() => sessionQueryResult.refetch()}
        />
      </ErrorLayout>
    )
  }

  if (profileQueryResult.isError) {
    SplashScreen.hideAsync()
    return (
      <ErrorLayout
        title={t("error")}
        message={profileQueryResult.error.message}
      >
        <Button
          mode="contained"
          size="small"
          title={t("retry")}
          onPress={() => profileQueryResult.refetch()}
        />
      </ErrorLayout>
    )
  }

  const isSuccess =
    sessionQueryResult.isSuccess &&
    profileQueryResult.isSuccess
  if (isSuccess) {
    SplashScreen.hideAsync()
  }

  const state: ClientState = {
    session: sessionQueryResult.data,
    profile: profileQueryResult.data,
  }

  return <ClientContext value={state} children={children} />
}

function useClient(): ClientState {
  const context = use(ClientContext)
  if (context == null) throw Error("ClientProvider must be provided")
  return context
}

export { ClientProvider, useClient }
