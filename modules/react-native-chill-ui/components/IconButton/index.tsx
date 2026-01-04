import { FC, Ref } from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"
import Icon, { IconName } from "../Icon"

type IconButtonMode = "standard" | "outlined" | "contained" | "contained-tonal"
type IconButtonSize = "small" | "medium" | "large" | "xlarge"

interface IconButtonProps extends TouchableOpacityProps {
  ref?: Ref<View>
  icon: IconName
  mode?: IconButtonMode
  size?: IconButtonSize
  iconColor?: string
}

const IconButton: FC<IconButtonProps> = ({
  ref,
  icon,
  mode = "standard",
  size = "medium",
  style,
  iconColor,
  ...props
}) => {
  styles.useVariants({ mode, size })
  return (
    <TouchableOpacity ref={ref} style={[styles.container, style]} {...props}>
      <Icon
        name={icon}
        style={[styles.icon, iconColor ? { color: iconColor } : undefined]}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    variants: {
      mode: {
        standard: {
          backgroundColor: "transparent",
        },
        outlined: {
          borderWidth: 1,
          borderColor: theme.colors.outlineVariant,
          backgroundColor: "transparent",
        },
        contained: {
          backgroundColor: theme.colors.primary,
        },
        "contained-tonal": {
          backgroundColor: theme.colors.primaryContainer,
        },
      },
      size: {
        small: {
          height: 36,
        },
        medium: {
          height: 44,
        },
        large: {
          height: 52,
        },
        xlarge: {
          height: 60,
        },
      },
    },
  },
  icon: {
    variants: {
      mode: {
        standard: {
          color: theme.colors.onBackground,
        },
        outlined: {
          color: theme.colors.onBackground,
        },
        contained: {
          color: theme.colors.onPrimary,
        },
        "contained-tonal": {
          color: theme.colors.onPrimaryContainer,
        },
      },
      size: {
        small: {
          fontSize: 20,
        },
        medium: {
          fontSize: 24,
        },
        large: {
          fontSize: 28,
        },
        xlarge: {
          fontSize: 32,
        },
      },
    },
  },
}))

export default IconButton
export type { IconButtonProps }
