import { FC } from "react"
import { Modal, ModalProps, Portal } from "react-native-chill-ui"
import Animated, { LinearTransition } from "react-native-reanimated"
import { StyleSheet } from "react-native-unistyles"

type Props = ModalProps & {}

const OverlayView: FC<Props> = ({ children, style, ...rest }) => {
  return (
    <Portal>
      <Modal {...rest} style={[styles.container, style]}>
        {!!children && (
          <Animated.View
            style={styles.content_container}
            layout={LinearTransition}
          >
            {children}
          </Animated.View>
        )}
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  content_container: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness * 6,
    margin: 16,
    padding: 16,
    overflow: "hidden",
  },
}))

export default OverlayView
