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
  static navigationOptions = { title: "Traduction" };

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
      .then(jsonResponse => {
        this.setState({ langageDetecte: jsonResponse.languages[0].language });
      }).catch((error) => {
        alert(error.message);
      });
  };

  traduire = (texte, langageDetecte, langageDeTraduction) => {
    getTraduction(texte, langageDetecte, langageDeTraduction)
      .then(responseJson => {
        this.setState({ traduction: responseJson.translations[0].translation });
      }).catch((error) => {
        alert(error.message);
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

        <TouchableOpacity onPress={() => this.ecouterTexteInitial}>
          <Text>Ecouter texte initial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.traduire(
            this.state.texte,
            this.state.langageDetecte,
            this.state.langageDeTraduction
          )}
        >
          <Text>Traduire</Text>
        </TouchableOpacity>

        <Text>{this.state.traduction}</Text>
        <TouchableOpacity onPress={() => this.ecouterTraduction}>
          <Text>Ecouter traduction</Text>
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
    alignItems: "center",
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
  }
});
