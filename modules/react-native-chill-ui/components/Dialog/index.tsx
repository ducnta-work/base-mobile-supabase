import { FC } from "react"
import { StyleProp, TextProps, View, ViewProps, ViewStyle } from "react-native"
import Animated, {
  EntryExitAnimationFunction,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated"
import { StyleSheet } from "react-native-unistyles"
import Modal, { ModalProps } from "../Modal"
import Portal from "../Portal"
import Text from "../Text"

interface DialogProps extends ModalProps {
  contentContainerStyle?: StyleProp<ViewStyle>
  safeArea?: boolean
  entering?: EntryExitAnimationFunction
  exiting?: EntryExitAnimationFunction
}

type Dialog = FC<DialogProps> & {
  Title: FC<TextProps>
  Content: FC<ViewProps>
  Actions: FC<ViewProps>
}

const Dialog: Dialog = ({
  children,
  contentContainerStyle,
  animationDuration = 120,
  style,
  entering = FadeInDown.duration(animationDuration),
  exiting = FadeOutDown.duration(animationDuration),
  safeArea = true,
  ...props
}) => {
  return (
    <Portal>
      <Modal {...props} animationDuration={animationDuration}>
        <View style={[styles.container, style]} pointerEvents="box-none">
          {props.visible && (
            <Animated.View
              entering={entering}
              exiting={exiting}
              style={[styles.content_container, contentContainerStyle]}
              children={children}
            />
          )}
        </View>
      </Modal>
    </Portal>
  )
}

const DialogTitle: FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.title, style]} {...props} />
}

const DialogContent: FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[styles.content, style]} {...props} />
}

const DialogActions: FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[styles.actions, style]} {...props} />
}

Dialog.Title = DialogTitle
Dialog.Content = DialogContent
Dialog.Actions = DialogActions

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: rt.insets.top,
    paddingBottom: Math.max(rt.insets.bottom, rt.insets.ime),
    paddingLeft: rt.insets.left,
    paddingRight: rt.insets.right,
  },
  content_container: {
    padding: 20,
    margin: 16,
    gap: 8,
    borderRadius: theme.roundness * 5,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
  },
  content: {
    gap: 4,
  },
  actions: {
    flexDirection: "row-reverse",
    gap: 12,
    marginTop: 12,
  },
  fill: {
    flex: 1,
  },
}))

export default Dialog
export type { DialogProps }
