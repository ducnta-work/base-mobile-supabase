import { FC, ReactElement, Ref, useCallback, useRef, useState } from "react"
import {
  FocusEvent,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  Pressable,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import type { View as RNView } from "react-native"
import { StyleSheet } from "react-native-unistyles"
import Icon, { IconName } from "../Icon"
import TextInput from "../TextInput"

type TextFieldMode = "outlined" | "filled"

interface TextFieldProps extends NativeTextInputProps {
  ref?: Ref<NativeTextInput>
  mode?: TextFieldMode
  right?: ReactElement
  left?: ReactElement
  error?: boolean
}

type TextFieldType = FC<TextFieldProps> & {
  Icon: FC<TextFieldIconProps>
}

const TextField: TextFieldType = ({
  ref,
  mode = "outlined",
  style,
  onFocus,
  onBlur,
  left,
  right,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  const [selection, setSelection] = useState<{ start: number; end: number }>()
  const inputRef = useRef<NativeTextInput | null>(null)

  const setInputRef = useCallback(
    (node: NativeTextInput | null) => {
      inputRef.current = node
      if (typeof ref === "function") {
        // Forward to external callback ref
        ;(ref as (instance: NativeTextInput | null) => void)(node)
      } else if (ref) {
        // Forward to external object ref
        ;(ref as { current: NativeTextInput | null }).current = node
      }
    },
    [ref]
  )

  const handleContainerPress = useCallback(() => {
    // Respect non-editable state
    if ((props as NativeTextInputProps).editable === false) return
    inputRef.current?.focus()
  }, [props])

  const handleFocus = useCallback(
    (e: FocusEvent) => {
      setFocused(true)
      onFocus?.(e)
    },
    [setFocused, onFocus]
  )

  const handleBlur = useCallback(
    (e: FocusEvent) => {
      setFocused(false)
      onBlur?.(e)
    },
    [setFocused, onBlur]
  )

  styles.useVariants({ focused, mode, multiline: Boolean((props as NativeTextInputProps).multiline) })

  return (
    <Pressable style={[styles.container, style]} onPress={handleContainerPress}>
      {left}
      <TextInput
        ref={setInputRef}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        selection={selection}
        onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
        {...props}
      />
      {right}
    </Pressable>
  )
}

interface TextFieldIconProps extends TouchableOpacityProps {
  ref?: Ref<RNView>
  icon: IconName
}

const TextFieldIcon: FC<TextFieldIconProps> = ({ ref, icon, ...props }) => {
  return (
    <TouchableOpacity ref={ref} {...props}>
      <Icon name={icon} style={styles.icon} />
    </TouchableOpacity>
  )
}

TextField.Icon = TextFieldIcon

const styles = StyleSheet.create((theme) => ({
  container: {
    minHeight: 56,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    borderRadius: theme.roundness * 4,
    variants: {
      mode: {
        outlined: {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
        },
        filled: {
          backgroundColor: theme.colors.surfaceVariant,
          borderColor: theme.colors.surfaceVariant,
        },
      },
      focused: {
        true: {
          borderWidth: 2,
          borderColor: theme.colors.primary,
        },
        false: {
          borderWidth: 1,
        },
      },
      multiline: {
        true: {
          alignItems: "flex-start",
          paddingVertical: 12,
        },
        false: {},
      },
    },
  },
  icon: {
    fontSize: 24,
    variants: {
      mode: {
        outlined: {
          color: theme.colors.onSurface,
        },
        filled: {
          color: theme.colors.onSurfaceVariant,
        },
      },
    },
  },
  input: {
    flex: 1,
    fontWeight: "500",
    variants: {
      mode: {
        outlined: {
          color: theme.colors.onSurface,
        },
        filled: {
          color: theme.colors.onSurfaceVariant,
        },
      },
    },
  },
}))

export default TextField
export type { TextFieldProps }
