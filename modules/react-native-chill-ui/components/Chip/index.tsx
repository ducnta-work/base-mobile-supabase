import { FC, Ref } from "react"
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"
import { StyleSheet } from "react-native-unistyles"
import Icon, { IconName } from "../Icon"

type ChipMode = "outlined" | "contained-tonal" | "contained"

interface ChipProps extends TouchableOpacityProps {
  ref?: Ref<View>
  mode?: ChipMode
  icon?: IconName
  customIcon?: React.ReactNode
}

const Chip: FC<ChipProps> = ({
  ref,
  mode = "contained",
  style,
  icon,
  children,
  customIcon,
  ...props
}) => {
  styles.useVariants({ mode })

  return (
    <TouchableOpacity ref={ref} style={[styles.container, style]} {...props}>
      {icon && <Icon name={icon} style={styles.icon} />}
      {customIcon && customIcon}
      {children && <Text children={children} style={styles.label} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: theme.roundness * 2,
    paddingHorizontal: 8,
    gap: 4,
    borderWidth: 0,
    variants: {
      mode: {
        outlined: {
          borderColor: theme.colors.outline,
          backgroundColor: theme.colors.background,
        },
        contained: {
          backgroundColor: theme.colors.primary,
        },
        "contained-tonal": {
          borderColor: theme.colors.primaryContainer,
          backgroundColor: theme.colors.primaryContainer,
        },
      },
    },
  },
  icon: {
    fontSize: 14,
    variants: {
      mode: {
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
    },
  },
  label: {
    fontSize: 14,
    variants: {
      mode: {
        outlined: {
          color: theme.colors.onBackground,
        },
        contained: {
          color: theme.colors.onPrimary,
        },
        "contained-tonal": {
          color: theme.colors.onPrimary,
        },
      },
    },
  },
}))

export default Chip
export type { ChipProps }
