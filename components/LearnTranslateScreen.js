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

import paysLangues from "./../data/iso_639-2.json";

export default class LearnTranslateScreen extends Component {
  static navigationOptions = { title: "Traduction" };

  constructor(props) {
    super(props);
    this.state = {
      texte: "",
      langagesDetectes: [],
      langageDeTraduction: "en",
      traduction: "...",
      isLoading: true,
      currentLabel: "Choisissez votre langue"
    };
  }

  //METHODES DE NOTRE CLASSE
  ecouterTexteInitial = () => {
    Speech.speak(this.state.texte, { language: this.state.langagesDetectes });
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
          jsonResponse.languages;
          this.setState({ langagesDetectes: jsonResponse.languages });
          // console.log(jsonResponse.languages);
        })
        .catch(error => {
          alert(error.message);
        });
    } else {
      alert("Veuillez entrer du texte.");
    }
  };

  paysCorrespondant = codeIso => {
    var getLanguesParIsoCode = (code) => paysLangues.filter(x => x.Alpha2_Code === code && x.French_Name !== null)[0];
    var langueTrouvee = getLanguesParIsoCode(codeIso);

    // on met en majuscule la premiere lettre
    return (langueTrouvee !== undefined) ? langueTrouvee.French_Name.charAt(0).toUpperCase() + langueTrouvee.French_Name.slice(1) : codeIso;
  }

  traduire = (texte, langagesDetectes, langageDeTraduction) => {
    getTraduction(texte, langagesDetectes, langageDeTraduction)
      .then(responseJson => {
        this.setState({ traduction: responseJson.translations[0].translation });
      })
      .catch(error => {
        alert(error.message);
      });
  };

  pickerChange(index) {
    // this.state.langagesDetectes.map((v, i) => {
    //   if (index === i) {
    //     this.setState({
    //       currentLabel: this.state.langagesDetectes[index].language,
    //       langagesDetectes: this.state.langagesDetectes[index].language
    //     });
    //   }
    // });
  }

  //Action une fois que l'objet est construit
  componentDidMount = () => {
    //Actions à effectuer
    this.setState({ isLoading: false });
  };

  render() {
    // console.log(this.state.langagesDetectes);
    var picker = "";
    this.state.langagesDetectes.length === 0
      ? picker = (
        <Picker
          selectedValue={this.state.langagesDetectes[0]}
          style={{ width: 170 }}
          onValueChange={(itemValue, itemIndex) =>
            this.pickerChange(itemIndex)
          }
        ><Picker.Item label="En attente de texte" value="0" />
        </Picker>)
      : picker = (
        <Picker
          selectedValue={this.state.langagesDetectes[0]}
          style={{ width: 170 }}
          onValueChange={(itemValue, itemIndex) =>
            this.pickerChange(itemIndex)
          }
        >
          {this.state.langagesDetectes.map(v => <Picker.Item key={v.language} label={this.paysCorrespondant(v.language)} value={v.language} />)}
        </Picker>);

    return (
      <View style={styles.container} >

        {/* ZONE D'INSERTION DU TEXTE ET DE SON ECOUTE */}
        < View style={styles.inputContainer} >
          <TouchableOpacity onPress={() => this.ecouterTexteInitial()}>
            <View style={styles.ioniconsMegaphone1}>
              <Ionicons name="ios-megaphone" size={25}></Ionicons>
            </View>
          </TouchableOpacity>

          <TextInput
            style={styles.textToTranslateInput}
            placeholder="Ecrire le texte à traduire"
            // onChangeText={text => {
            //   this.setState({ texte: text }); (this.state.texte === "") ? this.setState({ langagesDetectes: [{ language: "Aucune" }] }) : this.detecterLangue(this.state.texte);
            // }}
            onChangeText={text => this.setState({ texte: text })}
            onSubmitEditing={e => this.detecterLangue(this.state.texte)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "90%",
            marginBottom: 20,
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 15 }}>Langue détectée : </Text>

          <View
            style={{
              borderWidth: 1,
              backgroundColor: "#fff",
              borderColor: "#fff",
              borderRadius: 5,
              elevation: 4
            }}
          >
            {picker}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 15 }}>Traduire en : </Text>

          <View
            style={{
              borderWidth: 1,
              backgroundColor: "#fff",
              borderColor: "#fff",
              borderRadius: 5,
              elevation: 4
            }}
          >
            <Picker
              selectedValue={this.state.langageDeTraduction}
              style={{ width: 170 }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ langageDeTraduction: itemValue });
                this.traduire(
                  this.state.texte,
                  this.state.langagesDetectes,
                  this.state.langageDeTraduction
                );
              }}
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

          <Text style={styles.textToTranslateInput}>
            {this.state.traduction}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            this.traduire(
              this.state.texte,
              this.state.langagesDetectes,
              this.state.langageDeTraduction
            )
          }
          style={styles.translateButton}
        >
          <Text>Traduire</Text>
        </TouchableOpacity>
      </View >
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
