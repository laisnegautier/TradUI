import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

export default class PlatFindTranslation extends Component {
  //const { } = this.props;
  render() {
    return (
      <View>
        <TextInput
          placeholder="Entrer traduction"
          onChangeText={text => this.setState({ translationInput: text })}
          style={styles.TextInputStyleClass}
        />

        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.checkAnswer(this.state.languageInput, language, questionCount);
            this.checkAnswer(
              this.state.TranslationInput,
              translation,
              questionCount
            ); //vérif IBM this.detectLanguageIBM(word);
            this.translateIBM(word);
            this.checkAnswer(this.state.detectedLanguageIBM, language);
            this.checkAnswer(this.state.translationIBM, translation);
          }}
        >
          <Text>Confirmer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
