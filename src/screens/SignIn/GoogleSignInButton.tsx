import { useMutation } from "@tanstack/react-query"
import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "react-native-chill-ui"
import GoogleIcon from "../../assets/icon/google.svg"
import { auth } from "../../client"
import ErrorView from "../../components/Overlay/ErrorView"
import LoadingView from "../../components/Overlay/LoadingView"
import OverlayView from "../../components/Overlay/OverlayView"

const GoogleSignInButton: FC = () => {
  const { t } = useTranslation()

  const { isError, isIdle, isPending, mutate, reset, error } = useMutation({
    mutationFn: auth.signInWithGoogle,
  })

  useEffect(() => {
    auth.configureGoogleSignIn({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    })
  }, [])

  return (
    <>
      <Button mode="outlined" onPress={() => mutate(undefined)}>
        <GoogleIcon width={24} height={24} />
        <Button.Text children={t("sign_in.login_with_google")} />
      </Button>
      <OverlayView
        visible={!isIdle}
        dismissable={!isPending}
        onRequestClose={reset}
      >
        {isPending && <LoadingView />}
        {isError && (
          <ErrorView title={t("error")} message={error.message}>
            <Button
              size="small"
              mode="contained"
              title={t("retry")}
              onPress={() => mutate(undefined)}
            />
          </ErrorView>
        )}
      </OverlayView>
    </>
  )
}

export default GoogleSignInButton
