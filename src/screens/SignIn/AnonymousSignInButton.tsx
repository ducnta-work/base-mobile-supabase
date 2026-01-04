import { useMutation } from "@tanstack/react-query"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "react-native-chill-ui"
import { auth } from "../../client"
import ErrorView from "../../components/Overlay/ErrorView"
import LoadingView from "../../components/Overlay/LoadingView"
import OverlayView from "../../components/Overlay/OverlayView"

const AnonymousSignInButton: FC = () => {
  const { t } = useTranslation()

  const { isError, isIdle, isPending, mutate, reset, error } = useMutation({
    mutationFn: auth.signInAnonymously,
  })

  return (
    <>
      <Button
        mode="contained"
        title={t("sign_in.start_now")}
        onPress={() => mutate()}
      />
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
              onPress={() => mutate()}
            />
          </ErrorView>
        )}
      </OverlayView>
    </>
  )
}

export default AnonymousSignInButton
