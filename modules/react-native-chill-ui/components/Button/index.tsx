import { createContext, FC, Ref, use } from "react"
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"
import { StyleSheet } from "react-native-unistyles"
import Icon, { IconName, IconsProps } from "../Icon"

type ButtonMode = "text" | "outlined" | "contained" | "contained-tonal"

type ButtonSize = "small" | "medium" | "large" | "xlarge"

interface ButtonBaseProps extends Omit<TouchableOpacityProps, "children"> {
  ref?: Ref<View>
  mode?: ButtonMode
  size?: ButtonSize
}

interface ButtonWithTitleIconProps extends ButtonBaseProps {
  title?: string
  icon?: IconName
  children?: undefined
}

interface ButtonWithChildrenProps extends ButtonBaseProps {
  title?: undefined
  icon?: undefined
  children: React.ReactNode
}

type ButtonProps = ButtonWithTitleIconProps | ButtonWithChildrenProps

type ButtonComponent = FC<ButtonProps>

type Button = ButtonComponent & {
  Icon: typeof ButtonIcon
  Text: typeof ButtonText
}

const Button: Button = ({
  ref,
  mode = "text",
  size = "medium",
  title,
  icon,
  style,
  children,
  disabled,
  ...props
}) => {
  styles.useVariants({ mode, size, disabled })

  return (
    <ButtonContext value={{ mode, size }}>
      <TouchableOpacity
        ref={ref}
        style={[styles.container, style]}
        disabled={disabled}
        {...props}
      >
        {children ?? (
          <>
            {icon && <Icon style={styles.icon} name={icon} />}
            {title && <Text style={styles.text} children={title} />}
          </>
        )}
      </TouchableOpacity>
    </ButtonContext>
  )
}

interface ButtonContext {
  mode: ButtonMode
  size: ButtonSize
}

const ButtonContext = createContext<ButtonContext>(null as never)
const useButton = () => use(ButtonContext)

interface ButtonTextProps extends TextProps {
  ref?: Ref<Text>
}

interface ButtonIconProps extends IconsProps {}

const ButtonIcon: FC<ButtonIconProps> = ({ style, ...props }) => {
  const button = useButton()
  styles.useVariants(button)
  return <Icon style={[styles.icon, style]} {...props} />
}

const ButtonText: FC<ButtonTextProps> = ({ style, ...props }) => {
  const button = useButton()
  styles.useVariants(button)
  return <Text style={[styles.text, style]} {...props} />
}

Button.Icon = ButtonIcon
Button.Text = ButtonText

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    borderWidth: 1,
    borderRadius: theme.roundness * 4,
    variants: {
      mode: {
        text: {
          backgroundColor: "transparent",
          borderColor: "transparent",
        },
        outlined: {
          backgroundColor: "transparent",
          borderColor: theme.colors.outline,
        },
        contained: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        "contained-tonal": {
          backgroundColor: theme.colors.primaryContainer,
          borderColor: theme.colors.primaryContainer,
        },
      },
      size: {
        small: {
          height: 44,
        },
        medium: {
          height: 52,
        },
        large: {
          height: 60,
        },
        xlarge: {
          height: 68,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {},
        default: {},
      },
    },
  },
  text: {
    fontWeight: "semibold",
    variants: {
      mode: {
        text: {
          color: theme.colors.primary,
        },
        outlined: {
          color: theme.colors.primary,
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
          fontSize: 14,
        },
        medium: {
          fontSize: 16,
        },
        large: {
          fontSize: 18,
        },
        xlarge: {
          fontSize: 20,
        },
      },
    },
  },
  icon: {
    variants: {
      mode: {
        text: {
          color: theme.colors.primary,
        },
        outlined: {
          color: theme.colors.primary,
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
          fontSize: 14,
        },
        medium: {
          fontSize: 16,
        },
        large: {
          fontSize: 18,
        },
        xlarge: {
          fontSize: 20,
        },
      },
    },
  },
}))

export type { ButtonMode, ButtonProps, ButtonSize }
export default Button
