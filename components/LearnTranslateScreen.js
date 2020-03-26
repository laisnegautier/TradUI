import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import TextToTranslate from "./TextToTranslate";
import DetectedLanguages from "./DetectedLanguages";
import TranslationLanguage from "./TranslationLanguage";
import TranslatedText from "./TranslatedText";
import GraphLanguages from "./GraphLanguages";

export default class LearnTranslateScreen extends Component {
  static navigationOptions = { title: "Traduction" };

  constructor(props) {
    super(props);
    this.state = {
      insertedText: "",
      chosenInitialLanguage: "",
      detectedLanguages: [],
      chosenTranslationLanguage: "fr",
      translation: "",

      isLoading: false,
      isLoadingLangueDetection: false,
      isLoadingTraduction: false
    };
  }

  // HANDLER CALLBACKS
  handleInsertedTextChange = newInsertedText =>
    this.setState({ insertedText: newInsertedText });
  handleDetectedLanguagesChange = newDetectedLanguages =>
    this.setState({ detectedLanguages: newDetectedLanguages });
  handleChosenInitialLanguageChange = newChosenInitialLanguage =>
    this.setState({ chosenInitialLanguage: newChosenInitialLanguage });
  handleChosenTranslationLanguageChange = newChosenTranslationLanguage =>
    this.setState({ chosenTranslationLanguage: newChosenTranslationLanguage });

  render() {
    // VARIABLES
    let insertedText = this.state.insertedText;
    let chosenInitialLanguage = this.state.chosenInitialLanguage;
    let detectedLanguages = this.state.detectedLanguages;
    let chosenTranslationLanguage = this.state.chosenTranslationLanguage;

    // FINAL DISPLAY
    return (
      <View style={styles.bigContainer}>
        <ScrollView>
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
              insertedText={insertedText}
              chosenInitialLanguage={chosenInitialLanguage}
              chosenTranslationLanguage={chosenTranslationLanguage}
            />

            {detectedLanguages.length > 0 ? <GraphLanguages detectedLanguages={detectedLanguages} /> : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigContainer: {
    height: "100%",
    backgroundColor: "#fff"
  },
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 20
  }
});
