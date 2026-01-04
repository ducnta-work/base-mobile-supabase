import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"
import { Icon, Text } from "react-native-chill-ui"
import { StyleSheet } from "react-native-unistyles"
import { auth } from "../../client"

function HomeHeader() {
  const { t } = useTranslation()

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.header}>
      <View style={styles.left} />

      <View style={styles.center}>
        <Text style={styles.app_name}>{t("app_name")}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.avatar_container}
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create((theme, rt) => ({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: rt.insets.top,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surfaceContainer,
    paddingBottom: 16,
  },
  left: {
    justifyContent: "flex-start",
    flexDirection: "row",
    width: 44,
  },
  avatar: {
    width: 32,
    height: 32,
  },
  avatar_container: {
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: "50%",
    padding: 8,
  },
  right: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  app_name: {
    fontSize: 22,
    fontWeight: "bold",
  },
}))

export default HomeHeader
