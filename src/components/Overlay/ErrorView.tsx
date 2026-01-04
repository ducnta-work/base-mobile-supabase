import { FC, ReactElement } from "react"
import { ViewProps } from "react-native"
import { Icon, Text } from "react-native-chill-ui"
import Animated, {
  AnimatedProps,
  FadeIn,
  FadeOut,
} from "react-native-reanimated"
import { StyleSheet } from "react-native-unistyles"

type BaseProps = AnimatedProps<ViewProps> & { children?: ReactElement }

type Props = BaseProps & {
  title: string
  message: string
}

const ErrorView: FC<Props> = ({ style, title, message, children, ...rest }) => {
  return (
    <Animated.View
      style={[styles.container, style]}
      entering={FadeIn}
      exiting={FadeOut}
      {...rest}
    >
      <Icon name="warning-amber" style={styles.icon} />
      <Text children={title} style={styles.title} />
      <Text children={message} style={styles.message} />
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: 16,
    alignItems: "center",
    minWidth: "80%",
    gap: 12,
  },
  icon: {
    fontSize: 36,
    color: theme.colors.error,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    fontWeight: "semibold",
    opacity: 0.75,
    textAlign: "center",
  },
}))

export default ErrorView
