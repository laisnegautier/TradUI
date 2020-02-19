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
      langageDetecte: "",
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
    if (texte != "") {
      getDetectionLangue(texte)
        .then(jsonResponse => {
          this.setState({ langageDetecte: jsonResponse.languages[0].language });
        })
        .catch(error => {
          alert(error.message);
        });
    }
    else {
      alert("Veuillez entrer du texte.");
    }
  };

  traduire = (texte, langageDetecte, langageDeTraduction) => {
    getTraduction(texte, langageDetecte, langageDeTraduction)
      .then(responseJson => {
        this.setState({ traduction: responseJson.translations[0].translation });
      })
      .catch(error => {
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
          <TouchableOpacity onPress={() => this.ecouterTexteInitial()}>
            <View style={styles.ioniconsMegaphone1}>
              <Ionicons name="ios-megaphone" size={25}></Ionicons>
            </View>
          </TouchableOpacity>

          <TextInput
            style={styles.textToTranslateInput}
            placeholder="Ecrire le texte à traduire"
            onChangeText={text => this.setState({ texte: text })}
            onSubmitEditing={e => this.detecterLangue(this.state.texte)}
          />
        </View>

        <View style={{ flexDirection: "row", width: "90%", marginBottom: 20, justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 15 }}>Langue détectée : </Text>

          <View style={{ borderWidth: 1, backgroundColor: "#fff", borderColor: "#fff", borderRadius: 5, elevation: 4 }}>
            <Picker
              selectedValue={this.state.langageDetecte}
              style={{ width: 170 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ langageDetecte: itemValue })
              }
            >
              <Picker.Item label="Français" value="fr" />
              <Picker.Item label="Anglais (UK)" value="en" />
              <Picker.Item label="Espagnol" value="sp" />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: "row", width: "90%", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 15 }}>Traduire en : </Text>

          <View style={{ borderWidth: 1, backgroundColor: "#fff", borderColor: "#fff", borderRadius: 5, elevation: 4 }}>
            <Picker
              selectedValue={this.state.langageDeTraduction}
              style={{ width: 170 }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ langageDeTraduction: itemValue });
                this.traduire(
                  this.state.texte,
                  this.state.langageDetecte,
                  this.state.langageDeTraduction
                );
              }
              }
            >
              <Picker.Item label="Français" value="fr" />
              <Picker.Item label="Anglais (UK)" value="en" />
              <Picker.Item label="Espagnol" value="sp" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => this.ecouterTraduction()}>
            <View style={styles.ioniconsMegaphone1}>
              <Ionicons name="ios-megaphone" size={25}></Ionicons>
            </View>
          </TouchableOpacity>

          <Text style={styles.textToTranslateInput}>{this.state.traduction}</Text>
        </View>


        <TouchableOpacity
          onPress={() =>
            this.traduire(
              this.state.texte,
              this.state.langageDetecte,
              this.state.langageDeTraduction
            )
          }
          style={styles.translateButton}
        >
          <Text>Traduire</Text>
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
    borderWidth: 0,
    borderColor: "#f1f1f1",
    borderRadius: 5,
    marginVertical: 20,
    backgroundColor: "#fff",
    elevation: 4
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
  },

  listeningButton: {
    flexDirection: "row"
  },

  translateButton: {
    borderColor: "orange",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "orange",
    elevation: 10
  }
});
