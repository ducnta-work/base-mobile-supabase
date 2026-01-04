import { FC } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Divider, Text } from "react-native-chill-ui"
import { StyleSheet } from "react-native-unistyles"
import Storyset from "../../assets/storyset/signin.svg"
import AnonymousSignInButton from "./AnonymousSignInButton"
import AppleSignInButton from "./AppleSignInButton"
import GoogleSignInButton from "./GoogleSignInButton"

interface Props {
  canSignInWithApple: boolean
}

const SignInScreenLayout: FC<Props> = ({ canSignInWithApple }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.story_set_container}>
        <Storyset style={styles.story_set} />
      </View>

      <View style={styles.content_container}>
        <View style={styles.header}>
          <Text
            style={styles.header_small}
            children={t("sign_in.welcome_to")}
          />
          <Text style={styles.header_large} children={t("app_name")} />
        </View>

        <AnonymousSignInButton />

        <View style={styles.devider_container}>
          <Divider style={styles.divider} />
          <Text style={styles.login_width} children={t("sign_in.login_with")} />
          <Divider style={styles.divider} />
        </View>

        <GoogleSignInButton />

        {canSignInWithApple && <AppleSignInButton />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
  },
  content_container: {
    gap: 24,
    padding: 24,
  },
  story_set_container: {
    flex: 1,
  },
  story_set: {
    flex: 1,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 32,
  },
  header: {
    paddingVertical: 16,
  },
  header_small: {
    fontSize: 16,
    textAlign: "center",
  },
  header_large: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "600",
  },
  devider_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  login_width: {
    opacity: 0.75,
    fontSize: 12,
  },
  divider: {
    flex: 1,
  },
}))

export default SignInScreenLayout
