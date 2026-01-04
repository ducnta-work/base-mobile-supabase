import Ionicons from "@expo/vector-icons/MaterialIcons"
import { ComponentProps } from "react"
import { withUnistyles } from "react-native-unistyles"

const Icon = withUnistyles(Ionicons, (theme) => ({
  color: theme.colors.onBackground,
}))

type IconsProps = ComponentProps<typeof Icon>

type IconName = IconsProps["name"]

export default Icon
export type { IconName, IconsProps }
