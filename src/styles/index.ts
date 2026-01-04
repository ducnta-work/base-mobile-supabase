import { Theme } from "@react-navigation/native"
import { StyleSheet } from "react-native-unistyles"
import theme from "./theme.json"
import { MD3Theme } from "react-native-chill-ui"

const lightTheme: MD3Theme = {
  colors: {
    ...theme.schemes.light,
    backdrop: `${theme.schemes.light.inverseSurface}32`,
  },
  dark: false,
  roundness: 4,
  fontFamily: "System",
}

const darkTheme: MD3Theme = {
  colors: {
    ...theme.schemes.dark,
    backdrop: `${theme.schemes.dark.inverseSurface}32`,
  },
  dark: true,
  roundness: 4,
  fontFamily: "System",
}

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
}

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
}

type AppBreakpoints = typeof breakpoints
type AppThemes = typeof appThemes

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
})

function createNavigationTheme(theme: MD3Theme): Theme {
  const { dark, colors, fontFamily } = theme

  return {
    fonts: {
      regular: {
        fontFamily,
        fontWeight: "400",
      },
      medium: {
        fontFamily,
        fontWeight: "500",
      },
      bold: {
        fontFamily,
        fontWeight: "600",
      },
      heavy: {
        fontFamily,
        fontWeight: "700",
      },
    },
    dark,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.onSurface,
      border: colors.surfaceContainerLowest,
      notification: colors.error,
    },
  }
}

export { createNavigationTheme }
