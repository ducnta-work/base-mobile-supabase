import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTranslation } from "react-i18next"
import { Icon } from "react-native-chill-ui"
import TopPageScreen from "../../screens/TopPage"
import HomeHeader from "./Header"

const HomeTab = createBottomTabNavigator({
  screens: {
    TopPage: {
      screen: TopPageScreen,
      options: () => {
        const { t } = useTranslation()
        return {
          title: t("home_tab.title"),
          header: (props) => <HomeHeader {...props} />,
          headerShown: true,
          tabBarIcon({ size, color }) {
            return <Icon name="home" size={size} color={color} />
          },
        }
      },
    },
  },
  screenOptions: {
    headerShown: false,
  },
})

export default HomeTab
