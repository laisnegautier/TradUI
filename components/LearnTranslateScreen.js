import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
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
        <View style={styles.inputContainer}>
          <View style={styles.ioniconsSearch}>
            <Ionicons name="ios-search" size={25}></Ionicons>
          </View>

          <TextInput
            style={styles.textToTranslateInput}
            placeholder="Ecrire le texte à traduire"
            onChangeText={text => this.setState({ texte: text })}
            onSubmitEditing={e => this.detecterLangue(this.state.texte)}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>Identification de la langue : {this.state.langageDetecte}</Text>

          <Picker
            selectedValue={this.state.langageDetecte}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ langageDeTraduction: itemValue })
            }
          >
            <Picker.Item label="Français" value="fr" />
            <Picker.Item label="Anglais (UK)" value="en" />
            <Picker.Item label="Espagnol" value="sp" />
          </Picker>
        </View>

        <Text>Choisir langue de traduction :</Text>

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

        <TouchableOpacity
          onPress={this.ecouterTexteInitial}
          style={styles.listeningButton}
        >
          <Ionicons name="ios-megaphone" size={25}></Ionicons>
          <Text style={{ marginLeft: 5 }}>Ecouter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.traduire(
            this.state.texte,
            this.state.langageDetecte,
            this.state.langageDeTraduction
          )}
          style={styles.translateButton}
        >
          <Text>Traduire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.ecouterTexteInitial}
          style={styles.listeningButton}
        >
          <Ionicons name="ios-megaphone" size={25}></Ionicons>
          <Text style={{ marginLeft: 5 }}>Ecouter</Text>
        </TouchableOpacity>
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
  },
  inputContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#f1f1f1",
    borderRadius: 5,
    marginVertical: 20
  },
  ioniconsSearch: {
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
  },

  listeningButton: {
    flexDirection: "row"
  },

  translateButton: {
    borderColor: "orange"
  }
});
