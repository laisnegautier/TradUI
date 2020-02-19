import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  TouchableOpacity
} from "react-native";
import {
  getDetectionLangue,
  getTraduction
} from "./../helpers/langageTranslatorApi";
import * as Speech from "expo-speech";

export default class LearnTranslateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texte: "",
      langageDetecte: "...",
      langageDeTraduction: "en",
      traduction: "...",
      isLoading: true
    };
  }

  //METHODES DE NOTRE CLASSE
  ecouterTexteInitial = () => {
    Speech.speak(this.state.texte, { language: this.state.langageDetecte });
  };

  ecouterTraduction = () => {
    Speech.speak(this.state.traduction, {
      language: this.state.langageDeTraduction
    });
  };

  detecterLangue = texte => {
    getDetectionLangue(texte)
      .then(jsonResponse => jsonResponse.languages[0].language)
      .then(response => {
        this.setState({ langageDetecte: response });
      });
  };

  traduire = (texte, langageDetecte, langageDeTraduction) => {
    getTraduction(texte, langageDetecte, langageDeTraduction)
      .then(responseJson => responseJson.translations[0].translation)
      .then(response => {
        this.setState({ traduction: response });
      });
  };

  //Action une fois que l'objet est construit
  componentDidMount = () => {
    //Actions à effectuer
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>LearnTranslateScreen</Text>
        <TextInput
          style={{
            padding: 20,
            borderWidth: 0,
            marginVertical: 20,
            marginHorizontal: 10,
            elevation: 3
          }}
          placeholder="Ton texte"
          onChangeText={text => this.setState({ texte: text })}
          onSubmitEditing={e => this.detecterLangue(this.state.texte)}
        />
        <Text>Identification de la langue : {this.state.langageDetecte}</Text>
        <Picker
          selectedValue={this.state.langageDeTraduction}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ langageDeTraduction: itemValue })
          }
        >
          <Picker.Item label="Français" value="fr" />
          <Picker.Item label="Anglais (UK)" value="en" />
          <Picker.Item label="Espagnol" value="sp" />
        </Picker>
        <TouchableOpacity onPress={this.ecouterTexteInitial}>
          <Text>Ecouter texte initial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.traduire(
            this.state.texte,
            this.state.langageDetecte,
            this.state.langageDeTraduction
          )}
        >
          <Text>Traduire</Text>
        </TouchableOpacity>

        <Text>{this.state.traduction}</Text>
        <TouchableOpacity onPress={this.ecouterTraduction}>
          <Text>Ecouter traduction</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue"
  }
});
