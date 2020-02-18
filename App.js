import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Picker,
  Flatlist
} from "react-native";
import * as Speech from "expo-speech";
import GLOBALS from "./Globals";

class Translator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texte: "",
      langageDetecte: "attendre",
      langageDeTraduction: "en",
      traduction: "..."
    };
  }

  ecouterTexteInitial = () => {
    Speech.speak(this.state.texte, { language: this.state.langageDetecte });
  };
  ecouterTraduction = () => {
    Speech.speak(this.state.traduction, {
      language: this.state.langageDeTraduction
    });
  };

  _identifierLangue = () => {
    fetch(
      "https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/e3752ef5-06ea-4b46-9d33-6142a579f9d8/v3/identify?version=2018-05-01",
      {
        body: this.state.texte,
        headers: {
          Authorization:
            "Basic YXBpa2V5OlhOVE1qVEZvam4tNmw1b2dLaWo2OEtiMkcxOGo3QTFFejJrT3lYakZTV3Nh",
          "Content-Type": "text/plain"
        },
        method: "POST"
      }
    )
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({ langageDetecte: jsonResponse.languages[0].language });
      });
  };

  _traduire = () => {
    fetch(
      "https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/e3752ef5-06ea-4b46-9d33-6142a579f9d8/v3/translate?version=2018-05-01",
      {
        body: JSON.stringify({
          text: this.state.texte,
          model_id:
            this.state.langageDetecte + "-" + this.state.langageDeTraduction
        }),
        // { text: [this.state.texte], model_id: this.state.langageDetecte + "-" + this.state.langageDeTraduction },
        headers: {
          Authorization:
            "Basic YXBpa2V5OlhOVE1qVEZvam4tNmw1b2dLaWo2OEtiMkcxOGo3QTFFejJrT3lYakZTV3Nh",
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ traduction: responseJson.translations[0].translation });
      });
    // .then(responseJson => console.log(responseJson));
  };

  render() {
    return (
      <View>
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
          onSubmitEditing={e => this._identifierLangue()}
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

        <Button title="Traduire" onPress={this._traduire} />
        <Text>{this.state.traduction}</Text>
        <Button title="Ecouter traduction" onPress={this.ecouterTraduction} />
      </View>
    );
  }
}

export default function App() {
  return (
    <View>
      <Translator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
