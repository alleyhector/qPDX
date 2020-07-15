import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import Submit from "../screens/Submit";

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Submit: { screen: Submit }
  },
  {
    initialRouteName: "Home"
  }
);

export default AppNavigation;
