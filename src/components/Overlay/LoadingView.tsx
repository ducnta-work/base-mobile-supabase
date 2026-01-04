import { FC } from "react"
import { ActivityIndicator } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { useUnistyles } from "react-native-unistyles"

const LoadingView: FC = () => {
  const { theme } = useUnistyles()
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </Animated.View>
  )
}

export default LoadingView
