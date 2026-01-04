import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignInScreen from "../screens/SignIn"
import HomeTab from "./Home"
import {
  createTranslatableHeaderTitle,
  useIsReady,
  useIsUnAuthenticated,
} from "./utils"
import { NavigationContainerRef } from "@react-navigation/native"

let rootNavRef: NavigationContainerRef<any> | null = null
export function setRootNavigationRef(ref: NavigationContainerRef<any>) {
  rootNavRef = ref
}

export function navigateByNotification(data: any) {
  if (!rootNavRef) return
  try {
    rootNavRef.navigate("Home" as never)
  } catch {}
}

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerBackButtonDisplayMode: "minimal",
    headerShadowVisible: false,
  },
  groups: {
    UnAuthenticated: {
      screens: {
        SignIn: {
          if: useIsUnAuthenticated,
          screen: SignInScreen,
          options: {
            headerShown: false,
            headerTitle: createTranslatableHeaderTitle("sign_in.title"),
          },
        },
      },
    },
    Authenticated: {
      if: useIsReady,
      screens: {
        Home: {
          screen: HomeTab,
          options: {
            headerShown: false,
            headerTitle: createTranslatableHeaderTitle("home_tab.title"),
          },
        },
      },
    },
  },
})

export default RootStack
