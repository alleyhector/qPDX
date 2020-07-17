import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import Submit from "../screens/Submit";
import Events from "../screens/Events";

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Submit: { screen: Submit },
    Events: { screen: Events }
  },
  {
    initialRouteName: "Home"
  }
);

export default AppNavigation;
