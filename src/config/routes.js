import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Translation from "./../screens/Translation";
import PlayStart from "./../screens/PlayStart";
import FindLanguage from "./../screens/FindLanguage";

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: "#fff"
    },
    headerTintColor: "#000",
    headerTitleStyle: {
        fontWeight: "bold"
    }
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName;
    if (routeName === "Apprendre") {
        iconName = `ios-git-compare`;
    } else if (routeName === "Jouer") {
        iconName = `ios-football`;
    }
    return <Ionicons name={iconName} size={25} color={tintColor} />;
};

// NOS STACKS
const LearnStack = createStackNavigator(
    {
        LearnTranslate: {
            screen: Translation
        }
    },
    {
        defaultNavigationOptions: defaultNavigationOptions
    }
);

const PlayStack = createStackNavigator(
    {
        PlayBegin: {
            screen: PlayStart
        },
        PlayFindLanguage: {
            screen: FindLanguage
        }
    },
    {
        defaultNavigationOptions: defaultNavigationOptions
    }
);

// LES ONGLETS DU BAS
const TabNavigator = createBottomTabNavigator(
    {
        Apprendre: LearnStack,
        Jouer: PlayStack
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

export default class Routes extends Component {
    render() {
        return <AppContainer />;
    }
}
