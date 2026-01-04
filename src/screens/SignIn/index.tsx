import { StaticScreenProps } from "@react-navigation/native"
import { FC } from "react"
import SignInScreenLayout from "./Layout"
import { Platform } from "react-native"

const canSignInWithApple = Platform.OS === "ios" || Platform.OS === "macos"

const SignInScreen: FC<StaticScreenProps<undefined>> = () => {
  return <SignInScreenLayout canSignInWithApple={canSignInWithApple} />
}

export default SignInScreen
