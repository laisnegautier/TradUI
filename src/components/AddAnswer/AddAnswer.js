import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

createTranslation = questionId => {
  this.setState({ isLoading: true, disabled: true });
  fetch(
    "http://projet-dev-mobile-laisnejouault.000webhostapp.com/createTranslation.php",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        translationInput: this.state.translationInput,
        questionId: questionId
      })
    }
  )
    .then(response => response.json())
    .then(responseJson => {
      // Showing response message coming from server after inserting records.
      alert(responseJson);
      this.setState({ isLoading: false, disabled: false });
    })
    .catch(error => {
      console.error(error);
      this.setState({ isLoading: false, disabled: false });
    });
};

export default class addAnswer extends Component {
  //const { } = this.props;
  render() {
    return (
      <View>
        <Text>Vous avez répondu {answer}</Text>
        <TouchableOpacity
          disabled={this.state.disabled}
          onPress={() => this.createTranslation(questionId)}
        >
          <View>
            <Text>J'avais raison pour la traduction</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
