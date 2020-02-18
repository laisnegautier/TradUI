import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LearnTranslateScreen from "./components/LearnTranslateScreen";
import LearnWordcontextScreen from "./components/LearnWordcontextScreen";
import PlayFindLanguageScreen from "./components/PlayFindLanguageScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

export default class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  //Action une fois que l'objet est construit
  componentDidMount = () => {
    //Actions à effectuer
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Routing</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green"
  }
});
