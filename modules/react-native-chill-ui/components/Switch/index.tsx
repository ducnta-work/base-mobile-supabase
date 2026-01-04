import { FC, useEffect } from "react"
import { Pressable, PressableProps } from "react-native"
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { StyleSheet } from "react-native-unistyles"
import { useAnimatedTheme } from "react-native-unistyles/reanimated"

interface SwitchProps extends PressableProps {
  value: boolean
  onValueChange?: (value: boolean) => void
}

const Switch: FC<SwitchProps> = ({ value, onValueChange, ...props }) => {
  const theme = useAnimatedTheme()

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 220 })
  }, [progress, value])

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [theme.value.colors.surface, theme.value.colors.primary]
      ),
      borderColor: interpolateColor(
        progress.value,
        [0, 1],
        [theme.value.colors.outline, theme.value.colors.primary]
      ),
    }
  }, [value])

  const handleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [theme.value.colors.outline, theme.value.colors.onPrimary]
      ),
      width: interpolate(progress.value, [0, 1], [16, 24]),
      start: interpolate(progress.value, [0, 1], [6, 22]),
    }
  }, [])

  return (
    <Pressable
      onPress={() => onValueChange?.(!value)}
      accessibilityLabel="Switch"
      {...props}
    >
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          props.disabled && styles.disabled,
        ]}
      >
        <Animated.View style={[styles.handle, handleStyle]} />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    width: 52,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
  },
  handle: {
    borderRadius: 14,
    aspectRatio: 1,
  },
  disabled: {
    opacity: 0.8,
  },
}))

export default Switch
export type { SwitchProps }
