import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";

export default class TextToTranslate extends Component {
  constructor(props) {
    super(props);
    this.state = { insertedText: "", timeout: 0 };
  }

  // We get rid of multiple white spaces in the sentence and at both ends of the string
  // The formatted text is either empty or with well formatted string (a single space is not possible for example)
  formattedText = t => {
    if (t !== "" && t !== " ") t = t.replace(/\s+/g, ' ').trim();
    return t;
  }

  // CALLBACKS
  _onInsertedTextChange = newInsertedText => {
    var formattedText = this.formattedText(newInsertedText);

    // if there's text, we are sending it 1/2 second after the end of typing
    if (formattedText !== "" && formattedText !== " ") {

      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }

      this.state.timeout = setTimeout(() => {
        this.props.handleInsertedTextChange(formattedText);
      }, 500);
    }
    else {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }

      this.props.handleInsertedTextChange("");
    }
  }

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
