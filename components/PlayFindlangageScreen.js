import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class PlayFindlanguageScreen extends Component {
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
        <Text>PlayFindlanguageScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red"
  }
});
