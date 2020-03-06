import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";

export default class TextToTranslate extends Component {
  constructor(props) {
    super(props);
    this.state = { insertedText: "" };
  }

  // CALLBACKS
  _onInsertedTextChange = newInsertedText =>
    this.props.handleInsertedTextChange(newInsertedText);

  // METHODS
  listenToInsertedText = () => {
    this.state.insertedText !== ""
      ? Speech.speak(this.state.insertedText, {
          language: this.props.chosenInitialLanguage
        })
      : alert(
          "Veuillez insérer du texte avant d'utiliser cette fonctionnalité."
        );
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => this.listenToInsertedText()}>
          <View style={styles.ioniconsMegaphone1}>
            <Ionicons name="ios-megaphone" size={25}></Ionicons>
          </View>
        </TouchableOpacity>

        <TextInput
          style={styles.textToTranslateInput}
          placeholder="Écrire le texte à traduire"
          onChangeText={newInsertedText => {
            this.setState({ insertedText: newInsertedText });
            this._onInsertedTextChange(newInsertedText);
          }}
          onSubmitEditing={event => {
            this.setState({ insertedText: event.nativeEvent.text });
            this._onInsertedTextChange(event.nativeEvent.text);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 0,
    borderColor: "#f1f1f1",
    borderRadius: 5,
    marginVertical: 20,
    backgroundColor: "#fff",
    elevation: 4
  },
  ioniconsMegaphone1: {
    backgroundColor: "#fafafa",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 100
  },
  textToTranslateInput: {
    width: "70%",
    backgroundColor: "white",
    marginLeft: 25,
    fontSize: 18
  }
});
