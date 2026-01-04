import { FC, Ref } from "react"
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
} from "react-native"
import { StyleSheet, withUnistyles } from "react-native-unistyles"

interface TextInputProps extends NativeTextInputProps {
  ref?: Ref<NativeTextInput>
}

const UniTextInput = withUnistyles(NativeTextInput, (theme) => ({
  placeholderTextColor: theme.colors.onSurfaceVariant,
  selectionColor: theme.colors.primary,
  cursorColor: theme.colors.primary,
  selectionHandleColor: theme.colors.primary,
}))

const TextInput: FC<TextInputProps> = ({ style, ...props }) => {
  return <UniTextInput style={[styles.container, style]} {...props} />
}

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: 0,
    color: theme.colors.onBackground,
  },
}))

export default TextInput
export type { TextInputProps }
