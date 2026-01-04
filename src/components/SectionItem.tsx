import { FC } from "react"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Icon, IconName, Text } from "react-native-chill-ui"
import { StyleSheet } from "react-native-unistyles"

interface Props extends TouchableOpacityProps {
  icon: IconName
  title: string
}

const SectionItem: FC<Props> = ({ icon, title, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Icon name={icon} style={styles.leading_icon} />
      <Text style={styles.title} children={title} />
      <Icon name="chevron-right" style={styles.trailing_icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  leading_icon: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  title: {
    flex: 1,
    fontWeight: 500,
  },
  trailing_icon: {
    opacity: 0.5,
    fontSize: 16,
  },
}))

export default SectionItem
