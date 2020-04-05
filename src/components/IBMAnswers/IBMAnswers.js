import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View, ActivityIndicator } from "react-native";

import { getLanguageDetection, getTraduction } from "./../../services/api/langageTranslator";
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
  // we detect language first then we translate
  searchAnswers = async word => {
    this.setState({ isDetectingLanguages: true });

    try {
      const response = await getLanguageDetection(word);
      const data = (await response.json()).languages;
      this.setState(
        {
          detectedLanguages: data,
          detectedLanguage: data[0].language
        },
        () => this.translate(data[0].language, word)
      );
    } catch (e) {
      console.log(e.message);
      this.setState({ detectedLanguage: "[aucune]" });
    } finally {
      this.setState({ isDetectingLanguages: false });
    }
  };

  translate = async (detectedLanguage, word) => {
    this.setState({ translatedText: "", isTranslating: true });

    try {
      const response = await getTraduction(word, detectedLanguage, "fr");
      const data = (await response.json()).translations[0].translation;
      this.setState({ translatedText: data });
    } catch (e) {
      console.log(e.message);
      this.setState({ translatedText: "[aucune]" });
    } finally {
      this.setState(
        { isTranslating: false },
        () => this._callback(
          Format.getCountry(detectedLanguage),
          this.state.translatedText
        )
      );
    }
  };

  componentDidMount = () => this.searchAnswers(this.props.word);

  componentDidUpdate = (prevProps) => {
    if (prevProps.word != this.props.word) this.searchAnswers(this.props.word);
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
