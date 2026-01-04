import { FC, Ref } from "react"
import { Text as NativeText, TextProps as NativeTextProps } from "react-native"
import { StyleSheet } from "react-native-unistyles"

interface TextProps extends NativeTextProps {
  ref?: Ref<NativeText>
}

const Text: FC<TextProps> = ({ ref, style, ...rest }) => {
  return <NativeText ref={ref} style={[styles.text, style]} {...rest} />
}

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.onBackground,
  },
}))

export default Text
export type { TextProps }
