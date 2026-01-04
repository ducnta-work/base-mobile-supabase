import { useMutation } from "@tanstack/react-query"
import { AppleAuthenticationScope } from "expo-apple-authentication"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "react-native-chill-ui"
import { useUnistyles } from "react-native-unistyles"
import AppleIcon from "../../assets/icon/apple.svg"
import { auth } from "../../client"
import ErrorView from "../../components/Overlay/ErrorView"
import LoadingView from "../../components/Overlay/LoadingView"
import OverlayView from "../../components/Overlay/OverlayView"

const AppleSignInButton: FC = () => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const { isError, isIdle, isPending, mutate, reset, error } = useMutation({
    mutationFn: auth.signInWithApple,
  })

  const handleSignIn = () => {
    mutate({
      requestedScopes: [
        AppleAuthenticationScope.FULL_NAME,
        AppleAuthenticationScope.EMAIL,
      ],
    })
  }

  return (
    <>
      <Button mode="outlined" onPress={handleSignIn}>
        <AppleIcon fill={theme.colors.onBackground} width={24} height={24} />
        <Button.Text children={t("sign_in.login_with_apple")} />
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
              onPress={handleSignIn}
            />
          </ErrorView>
        )}
      </OverlayView>
    </>
  )
}

export default AppleSignInButton
