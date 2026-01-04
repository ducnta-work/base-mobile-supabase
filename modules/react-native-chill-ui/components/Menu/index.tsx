import React, {
  Children,
  FC,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
} from "react"
import {
  LayoutChangeEvent,
  LayoutRectangle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native"
import Animated, {
  AnimatedRef,
  Easing,
  MeasuredDimensions,
  measure,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context"
import { StyleSheet } from "react-native-unistyles"
import Icon, { IconName } from "../Icon"
import Modal, { ModalProps } from "../Modal"
import Portal from "../Portal"
import Text from "../Text"

interface MenuProps extends ModalProps {
  anchorRef: AnimatedRef<any>
  animationDuration?: number
  safeArea?: boolean
}

type MenuType = FC<MenuProps> & {
  Item: FC<ItemProps>
  SelectItem: FC<MenuSelectItemProps>
}

const Menu: MenuType = ({
  anchorRef,
  animationDuration = 180,
  safeArea = true,
  children,
  visible,
  style,
  onRequestClose,
  ...props
}) => {
  const progress = useSharedValue(0)

  const windowDimensions = useWindowDimensions()
  const anchorMeasurement = useSharedValue<MeasuredDimensions | null>(null)
  const contentLayout = useSharedValue<LayoutRectangle | undefined>(undefined)
  const insets = useSafeAreaInsets()

  const show = useCallback(() => {
    runOnUI(() => (anchorMeasurement.value = measure(anchorRef)))()
    progress.value = withTiming(1, { duration: animationDuration, easing })
  }, [anchorMeasurement, anchorRef, animationDuration, progress])

  const hide = useCallback(() => {
    progress.value = withTiming(0, { duration: animationDuration, easing })
  }, [animationDuration, progress])

  useEffect(() => {
    if (visible) show()
    else hide()
  }, [visible, show, hide])

  const onContentLayout = (e: LayoutChangeEvent) => {
    contentLayout.value = e.nativeEvent.layout
  }

  const contentStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      ...getPosition(
        anchorMeasurement.value,
        windowDimensions,
        contentLayout.value,
        safeArea ? insets : undefined
      ),
      transform: [{ scale: progress.value }],
      opacity: progress.value,
    }
  }, [windowDimensions, contentLayout])

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable
        onRequestClose={onRequestClose}
        lazy={false}
        {...props}
      >
        <Animated.View
          onLayout={onContentLayout}
          style={[styles.content_container, contentStyle, style]}
        >
          {Children.toArray(children).map((child) => {
            if (
              isValidElement<TouchableOpacityProps>(child) &&
              (child.type === MenuSelectItem || child.type == MenuSelectItem)
            ) {
              return cloneElement(child, {
                onPress: (e) => {
                  child.props.onPress?.(e)
                  onRequestClose?.()
                },
              })
            }

            return child
          })}
        </Animated.View>
      </Modal>
    </Portal>
  )
}

interface ItemProps extends Omit<TouchableOpacityProps, "children"> {
  leadingIcon?: IconName
  trailingIcon?: IconName
  title: string
}

const MenuItem: FC<ItemProps> = ({
  leadingIcon,
  trailingIcon,
  title,
  disabled = false,
  style,
  ...props
}) => {
  menuItemStyles.useVariants({ disabled })
  return (
    <TouchableOpacity style={style} disabled={disabled} {...props}>
      <Animated.View style={menuItemStyles.item_container}>
        <Animated.View style={menuItemStyles.leading_container}>
          {leadingIcon && (
            <Icon name={leadingIcon} style={menuItemStyles.item_container} />
          )}
          <Text children={title} style={menuItemStyles.title} />
        </Animated.View>
        {trailingIcon && (
          <Icon name={trailingIcon} style={menuItemStyles.item_container} />
        )}
      </Animated.View>
    </TouchableOpacity>
  )
}

interface MenuSelectItemProps extends Omit<TouchableOpacityProps, "children"> {
  title: string
  isSelected?: boolean
  style?: StyleProp<ViewStyle>
}

const MenuSelectItem: FC<MenuSelectItemProps> = ({
  isSelected = false,
  disabled = false,
  title,
  style,
  ...props
}) => {
  menuSelectItemStyles.useVariants({ isSelected, disabled })
  return (
    <TouchableOpacity
      style={[menuSelectItemStyles.container, style]}
      disabled={disabled}
      {...props}
    >
      <View style={menuSelectItemStyles.select_item_container}>
        <Text style={menuSelectItemStyles.text} children={title} />
        <Icon style={menuSelectItemStyles.icon} name="check" />
      </View>
    </TouchableOpacity>
  )
}

Menu.Item = MenuItem
Menu.SelectItem = MenuSelectItem

const menuItemStyles = StyleSheet.create((theme) => ({
  item_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    gap: 12,
    variants: {
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {
          opacity: 1,
        },
      },
    },
  },
  leading_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    fontSize: 14,
  },
}))

const menuSelectItemStyles = StyleSheet.create((theme) => ({
  container: {
    variants: {
      isSelected: {
        true: {
          backgroundColor: theme.colors.secondaryContainer,
        },
        false: {
          backgroundColor: theme.colors.surface,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {
          opacity: 1,
        },
      },
    },
  },
  select_item_container: {
    flexDirection: "row",
    padding: 16,
    gap: 32,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    variants: {
      isSelected: {
        true: {
          color: theme.colors.onSecondaryContainer,
        },
        false: {
          color: theme.colors.onSurface,
        },
      },
    },
  },
  icon: {
    fontSize: 20,
    variants: {
      isSelected: {
        true: {
          color: theme.colors.onSecondaryContainer,
          opacity: 1,
        },
        false: {
          color: theme.colors.onSurface,
          opacity: 0,
        },
      },
    },
  },
}))

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  content_container: {
    position: "absolute",
    overflow: "hidden",
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness * 4,
  },
  backdrop: {
    flex: 1,
  },
}))

const easing = Easing.out(Easing.poly(2))

function getPosition(
  anchor?: MeasuredDimensions | null,
  window?: { width: number; height: number } | null,
  content?: { width: number; height: number } | null,
  insets: EdgeInsets = { bottom: 0, top: 0, left: 0, right: 0 }
): ViewStyle {
  "worklet"
  if (!anchor || !window || !content) return {}

  let top: number
  let bottom: number | undefined
  let left: number
  let right: number | undefined

  const safeHeight = window.height - insets.top - insets.bottom
  const safeWidth = window.width - insets.left - insets.right
  const isLeft = anchor.pageX + anchor.width / 2 < window.width / 2

  if (content.height >= safeHeight) {
    top = insets.top
    bottom = insets.bottom
  } else if (
    content.height >
    window.height - insets.bottom - anchor.pageY - anchor.height
  ) {
    top = window.height - content.height - insets.bottom
  } else {
    top = anchor.pageY + anchor.height
  }

  if (content.width >= safeWidth) {
    left = insets.left
    right = insets.right
  } else if (isLeft) {
    if (content.width > window.width - insets.right - anchor.pageX) {
      left = window.width - content.width
    } else {
      left = anchor.pageX
    }
  } else {
    if (content.width > anchor.pageX + anchor.width - insets.left) {
      left = insets.left
    } else {
      left = anchor.pageX + anchor.width - content.width
    }
  }

  const fromLeft = anchor.pageX + anchor.width / 2 - left
  const fromTop = anchor.pageY + anchor.height / 2 - top

  return {
    top,
    left,
    bottom,
    right,
    transformOrigin: [fromLeft, fromTop, 0],
  }
}

export default Menu
export type { MenuProps }
