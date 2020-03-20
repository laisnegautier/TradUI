import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { getTraduction } from "./../helpers/langageTranslatorApi";
import * as Speech from "expo-speech";

export default class TranslatedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedText: "",
      isTranslating: false
    };
  }

  listenToTranslatedText = () => {
    this.state.translatedText !== ""
      ? Speech.speak(this.state.translatedText, { language: this.props.chosenTranslationLanguage })
      : (this.state.isTranslating)
        ? alert("Veuillez patienter, le texte a besoin d'être traduit.")
        : alert("Veuillez insérer du texte avant d'utiliser cette fonctionnalité.");
  };

  translate = () => {
    this.setState({ translatedText: "", isTranslating: true });

    getTraduction(
      this.props.insertedText,
      this.props.chosenInitialLanguage,
      this.props.chosenTranslationLanguage
    )
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          translatedText: responseJson.translations[0].translation,
          isTranslating: false
        });
      })
      .catch(error => {
        this.setState({
          translatedText: "[Pas de traduction]",
          isTranslating: false
        });
      });
  };

  // ERRORS
  checkUsefulness = () => {
    alert("Hum hum cela ne sert à rien de traduire dans une même langue...");
  }

  componentDidMount = () => {
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.insertedText !== "") {
      if (prevProps.insertedText !== this.props.insertedText
        || prevProps.chosenInitialLanguage !== this.props.chosenInitialLanguage
        || prevProps.chosenTranslationLanguage !== this.props.chosenTranslationLanguage) {
        this.translate();
      }
    }

    // If the text is empty after modification then we stop all
    if (prevProps.insertedText !== this.props.insertedText && this.props.insertedText === "") {
      this.setState({ translatedText: [], isTranslating: false });
    }
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => this.listenToTranslatedText()}>
          <View style={styles.ioniconsMegaphone1}>
            <Ionicons name="ios-megaphone" size={25}></Ionicons>
          </View>
        </TouchableOpacity>

        <Text style={styles.textToTranslateInput}>
          {this.state.isTranslating ? (
            <ActivityIndicator style={{ width: 170, height: 50 }} />
          ) : (this.props.insertedText !== "") ? (
            this.state.translatedText
          ) : ("En attente de texte...")}
        </Text>
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
    backgroundColor: "#fff",
    elevation: 4,
    marginBottom: 20
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
