import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LearnTranslateScreen from "./components/LearnTranslateScreen";
import LearnWordcontextScreen from "./components/LearnWordcontextScreen";
import PlayFindLanguageScreen from "./components/PlayFindLanguageScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: "#a700a7"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let iconName;
  if (routeName === "Learn") {
    iconName = `ios-wine`;
  } else if (routeName === "Play") {
    iconName = `ios-menu`;
  }
  return <Ionicons name={iconName} size={25} color={tintColor} />;
};

const LearnStack = createStackNavigator(
  {
    LearnTranslate: LearnTranslateScreen,
    LearnWordContext: LearnWordcontextScreen
  },
  {
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const PlayStack = createStackNavigator(
  {
    PlayFindLanguage: PlayFindLanguageScreen
  },
  {
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Learn: LearnStack,
    Play: PlayStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      labelStyle: {
        fontSize: 14
      }
    }
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default class Routing extends Component {
  render() {
    return <AppContainer />;
  }
}
