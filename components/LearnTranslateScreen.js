import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker
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
    getDetectionLangue(texte).then(response => {
      this.setState({ langageDetecte: response });
    });
  };

  traduire = (texte, langageDetecte, langageDeTraduction) => {
    getTraduction(texte, langageDetecte, langageDeTraduction).then(response => {
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

        <Button
          title="Ecouter Texte Initial"
          onPress={this.ecouterTexteInitial}
        />

        <Button
          title="Traduire"
          onPress={this.traduire(
            this.state.texte,
            this.state.langageDetecte,
            this.state.langageDeTraduction
          )}
        />
        <Text>{this.state.traduction}</Text>
        <Button title="Ecouter traduction" onPress={this.ecouterTraduction} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue"
  }
});
