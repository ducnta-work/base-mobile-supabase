import { FC } from "react"
import { View } from "react-native"
import { Text } from "react-native-chill-ui"
import { StyleSheet } from "react-native-unistyles"

interface Props {}

const TopPageLayout: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the app!</Text>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 18,
    color: theme.colors.onBackground,
  },
}))

export default TopPageLayout

