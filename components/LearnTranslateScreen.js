import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import TextToTranslate from "./TextToTranslate";
import DetectedLanguages from "./DetectedLanguages";
import TranslationLanguage from "./TranslationLanguage";
import TranslatedText from "./TranslatedText";

export default class LearnTranslateScreen extends Component {
  static navigationOptions = { title: "Traduction" };

  constructor(props) {
    super(props);
    this.state = {
      insertedText: "",
      chosenInitialLanguage: "en",
      detectedLanguages: [],
      chosenTranslationLanguage: "fr",
      translation: ""
    };
  }

  // HANDLER CALLBACKS
  handleInsertedTextChange = newInsertedText =>
    this.setState({ insertedText: newInsertedText });
  handleDetectedLanguagesChange = newDetectedLanguages =>
    this.setState({ detectedLanguages: newDetectedLanguages });
  handleChosenInitialLanguageChange = newChosenInitialLanguage => {
    this.setState({ chosenInitialLanguage: newChosenInitialLanguage });
    //console.log(newChosenInitialLanguage);
  };
  handleChosenTranslationLanguageChange = newChosenTranslationLanguage =>
    this.setState({ chosenTranslationLanguage: newChosenTranslationLanguage });

  //METHODS
  componentDidMount = () => {
    this.setState({
      isLoading: false,
      isLoadingLangueDetection: false,
      isLoadingTraduction: false
    });
  };

  render() {
    // VARIABLES
    var insertedText = this.state.insertedText;
    var chosenInitialLanguage = this.state.chosenInitialLanguage;
    var detectedLanguages = this.state.detectedLanguages;
    var chosenTranslationLanguage = this.state.chosenTranslationLanguage;

    // FINAL DISPLAY
    return (
      <View style={styles.container}>
        <TextToTranslate
          handleInsertedTextChange={this.handleInsertedTextChange}
          chosenInitialLanguage={chosenInitialLanguage}
        />
        <DetectedLanguages
          insertedText={insertedText}
          handleDetectedLanguagesChange={this.handleDetectedLanguagesChange}
          detectedLanguages={detectedLanguages}
          chosenInitialLanguage={chosenInitialLanguage}
          handleChosenInitialLanguageChange={
            this.handleChosenInitialLanguageChange
          }
        />
        <TranslationLanguage
          chosenInitialLanguage={chosenInitialLanguage}
          chosenTranslationLanguage={chosenTranslationLanguage}
          handleChosenTranslationLanguageChange={
            this.handleChosenTranslationLanguageChange
          }
        />
        <TranslatedText
          detectedLanguages={detectedLanguages}
          insertedText={insertedText}
          chosenInitialLanguage={chosenInitialLanguage}
          chosenTranslationLanguage={chosenTranslationLanguage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
