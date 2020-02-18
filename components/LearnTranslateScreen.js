import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Speech from "expo-speech";

export default class LearnTranslateScreen extends Component {
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
        <Text>LearnTranslateScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue"
  }
});
