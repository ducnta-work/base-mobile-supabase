import { FC, Ref } from "react"
import { View, ViewProps } from "react-native"
import { StyleSheet } from "react-native-unistyles"

interface DividerProps extends ViewProps {
  ref?: Ref<View>
}

const Divider: FC<DividerProps> = ({ ref, style, ...props }) => {
  return <View ref={ref} style={[styles.container, style]} {...props} />
}

const styles = StyleSheet.create((theme) => ({
  container: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.outlineVariant,
  },
}))

export default Divider
export type { DividerProps }
