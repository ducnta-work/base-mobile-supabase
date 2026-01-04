import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native"
import { withUnistyles } from "react-native-unistyles"
import { createNavigationTheme } from "../styles"
import RootStack, { setRootNavigationRef } from "./RootStack"

type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack)

const StyledNavigation = withUnistyles(Navigation, (theme) => ({
  theme: createNavigationTheme(theme),
}))

// Wrap exported component to capture ref
const StyledNavigationWithRef = (props: any) => {
  return <StyledNavigation ref={setRootNavigationRef as any} {...props} />
}

export default StyledNavigationWithRef
