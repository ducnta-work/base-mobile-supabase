import { FC, ReactElement } from "react"
import { ViewProps } from "react-native"
import { Icon, Text } from "react-native-chill-ui"
import Animated, { AnimatedProps } from "react-native-reanimated"
import { StyleSheet } from "react-native-unistyles"

type BaseProps = AnimatedProps<ViewProps> & { children?: ReactElement }

type Props = BaseProps & {
  title: string
  message: string
}

const ErrorLayout: FC<Props> = ({
  style,
  title,
  message,
  children,
  ...rest
}) => {
  return (
    <Animated.View style={[styles.container, style]} {...rest}>
      <Icon name="warning-amber" style={styles.icon} />
      <Text children={title} style={styles.title} />
      <Text children={message} style={styles.message} />
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    gap: 8,
  },
  icon: {
    fontSize: 48,
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

export default ErrorLayout
