import { FC, useCallback, useEffect, useMemo, useState } from "react"
import {
  BackHandler,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated"
import { StyleSheet } from "react-native-unistyles"
import { scheduleOnRN } from "react-native-worklets"

interface ModalProps {
  visible: boolean
  overlayAccessibilityLabel?: string
  children: React.ReactNode
  dismissable?: boolean // Hide on press outside
  dismissableBackButton?: boolean // Hide on backpress
  onDismiss?: () => void // On complete hide
  onRequestClose?: () => void // On press outside or backpress
  animationDuration?: number
  transparent?: boolean
  style?: StyleProp<ViewStyle>
  lazy?: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Modal: FC<ModalProps> = ({
  children,
  visible,
  style,
  animationDuration = 220,
  dismissableBackButton,
  dismissable = true,
  onDismiss,
  onRequestClose,
  transparent,
  overlayAccessibilityLabel,
  lazy = true,
}) => {
  const [hasBeenRendered, setHasBeenRendered] = useState(visible)
  const [contentVisible, setContentVisible] = useState(visible)
  const progress = useSharedValue(Number(visible))

  styles.useVariants({contentVisible})

  const timmingConfig = useMemo(
    () => ({
      duration: animationDuration,
      easing: Easing.in(Easing.ease),
    }),
    [animationDuration]
  )

  const show = useCallback(() => {
    setContentVisible(true)
    progress.value = withTiming(1, timmingConfig)
  }, [progress, timmingConfig])

  const hide = useCallback(() => {
    progress.value = withTiming(0, timmingConfig, () => {
      onDismiss && scheduleOnRN(onDismiss)
      scheduleOnRN(setContentVisible, false)
      scheduleOnRN(setHasBeenRendered, false)
    })
  }, [progress, timmingConfig, onDismiss])

  useEffect(() => {
    const timmingConfig: WithTimingConfig = {
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
    }

    if (visible) {
      setHasBeenRendered(true)
      if (contentVisible) return
      setContentVisible(true)
      progress.value = withTiming(1, timmingConfig)
    } else {
      if (!hasBeenRendered || !contentVisible) return
      hide()
    }
  }, [show, hide, visible, contentVisible, hasBeenRendered])

  // Android BackHandler
  useEffect(() => {
    if (!visible) {
      return undefined
    }

    const onHardwareBackPress = () => {
      if (dismissable || dismissableBackButton) {
        onRequestClose?.()
      }
      return true
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onHardwareBackPress
    )

    return () => subscription.remove()
  }, [dismissable, dismissableBackButton, onRequestClose, visible])

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: transparent ? 0 : progress.value,
    }
  }, [transparent])

  // eslint-disable-next-line react-compiler/react-compiler
  if (lazy && (!hasBeenRendered || !contentVisible)) return null

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={contentVisible ? "auto" : "none"}
      accessibilityViewIsModal
      accessibilityLiveRegion="polite"
      onAccessibilityEscape={onRequestClose}
      accessibilityLabel={overlayAccessibilityLabel}
    >
      <AnimatedPressable
        accessibilityRole="button"
        importantForAccessibility="no"
        onPress={dismissable ? onRequestClose : undefined}
        style={[
          !transparent && { opacity: progress },
          StyleSheet.absoluteFill,
          !transparent && styles.backdrop,
        ]}
      />
      <Animated.View
        style={[styles.container, style]}
        pointerEvents="box-none"
        children={children}
      />
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    variants: {
      contentVisible: {
        true: {
          opacity: 1,
        },
        false: {
          opacity: 0,
        },
      },
    },
  },
  backdrop: {
    backgroundColor: theme.colors.backdrop,
  },
}))

export default Modal
export type { ModalProps }
