import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LearnTranslateScreen from "./../components/LearnTranslateScreen";
import LearnWordcontextScreen from "./../components/LearnWordcontextScreen";
import PlayFindlanguageScreen from "./../components/PlayFindlanguageScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: "#fafafa"
  },
  headerTintColor: "#000",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let iconName;
  if (routeName === "Learn") {
    iconName = `ios-git-compare`;
  } else if (routeName === "Play") {
    iconName = `ios-football`;
  }
  return <Ionicons name={iconName} size={25} color={tintColor} />;
};


// NOS STACKS
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
    PlayFindlanguage: PlayFindlanguageScreen
  },
  {
    defaultNavigationOptions: defaultNavigationOptions
  }
);


// LES ONGLETS DU BAS
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
