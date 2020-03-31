import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View, ActivityIndicator } from "react-native";

import {
  getLanguageDetection,
  getTraduction
} from "./../../services/api/langageTranslator";
import Format from "./../../resources/utils/Format";
import styles from "./styles";

export default class IBMAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detectedLanguages: null,
      detectedLanguage: "",
      isDetectingLanguages: false,

      translatedText: "",
      isTranslating: false
    };
  }

  // CALLBACK
  _callback = (detectedLanguage, translation) =>
    this.props.handleIBMAnswers(detectedLanguage, translation);

  // METHODS
  searchAnswers = texte => {
    this.setState({ isDetectingLanguages: true });

    getLanguageDetection(texte)
      .then(jsonResponse => {
        this.translate(jsonResponse.languages[0].language, texte);
        this.setState({
          detectedLanguages: jsonResponse.languages,
          detectedLanguage: jsonResponse.languages[0].language,
          isDetectingLanguages: false
        });
      })
      .catch(error => alert(error.message));
  };

  translate = (detectedLanguage, word) => {
    this.setState({ translatedText: "", isTranslating: true });

    getTraduction(word, detectedLanguage, "fr")
      .then(responseJson => {
        this.setState({
          translatedText: responseJson.translations[0].translation,
          isTranslating: false
        });
      })
      .catch(error =>
        this.setState({
          translatedText: "[aucune]",
          isTranslating: false
        })
      );
  };

  componentDidMount = () => this.searchAnswers(this.props.word);

  componentDidUpdate = (prevProps, prevState) => {
    // Props changes
    if (prevProps.word != this.props.word) this.searchAnswers(this.props.word);

    // State changes
    if (
      prevState.detectedLanguage != this.state.detectedLanguage ||
      prevState.translatedText != this.state.translatedText
    )
      this._callback(
        Format.getCountry(this.state.detectedLanguage),
        this.state.translatedText
      );
  };

  render() {
    let detectedLanguage = Format.getCountry(this.state.detectedLanguage);
    let translatedText = this.state.translatedText;

    let count = this.props.count;
    let IBM = this.props.gameStateIBM;

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Ionicons name="ios-git-network" color="black" size={25}></Ionicons>
          <Text style={styles.title}>Réponses d'IBM</Text>
        </View>

        <View style={styles.inline}>
          <Text>Langue : </Text>
          {this.state.isDetectingLanguages ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={[
                styles.textFound,
                IBM.languagePoints[count] == 0.5
                  ? { color: "green" }
                  : IBM.languagePoints[count] == 0
                  ? { color: "tomato" }
                  : {}
              ]}
            >
              {detectedLanguage}
            </Text>
          )}
        </View>

        <View style={styles.inline}>
          <Text>Traduction : </Text>
          {this.state.isDetectingLanguages || this.state.isTranslating ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={[
                styles.textFound,
                IBM.translationPoints[count] == 0.5
                  ? { color: "green" }
                  : IBM.translationPoints[count] == 0
                  ? { color: "tomato" }
                  : {}
              ]}
            >
              {translatedText}
            </Text>
          )}
        </View>
      </View>
    );
  }
}
