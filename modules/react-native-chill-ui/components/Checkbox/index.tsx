import { FC, Ref } from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"
import Icon, { IconName } from "../Icon"

type CheckboxStatus = "checked" | "unchecked"

interface CheckboxProps extends TouchableOpacityProps {
  ref?: Ref<View>
  status: CheckboxStatus
}

const iconsMap: Record<CheckboxStatus, IconName> = {
  checked: "check-box",
  unchecked: "check-box-outline-blank",
}

const Checkbox: FC<CheckboxProps> = ({ ref, status, style, ...props }) => {
  styles.useVariants({ status })
  return (
    <TouchableOpacity ref={ref} style={[styles.container, style]} {...props}>
      <Icon name={iconsMap[status]} style={styles.icon} />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create((theme) => ({
  container: {
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 18,
    variants: {
      status: {
        checked: {
          color: theme.colors.primary,
        },
        unchecked: {
          color: theme.colors.onBackground,
        },
      },
    },
  },
}))

export default Checkbox
export type { CheckboxProps, CheckboxStatus }
