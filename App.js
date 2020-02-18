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

// import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
// import { IamAuthenticator } from 'ibm-watson/auth';

import GLOBALS from "./Globals";

// const textToSpeech = new TextToSpeechV1({
//   authenticator: new IamAuthenticator({
//     apikey: `${GLOBALS.WATSON_TEXTTOSPEECH_CREDENTIALS}`,
//   }),
//   url: `${GLOBALS.WATSON_TEXTTOSPEECH_URL}`,
// });

// class Jeton extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { monJeton: "", refresh_token: "", timeOut: "" };
//   }

//   componentDidMount() {
//     // IAM access_token
//     fetch("https://iam.cloud.ibm.com/identity/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + GLOBALS.WATSON_TEXTTOSPEECH_APIKEY, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       method: "POST"
//     })
//       .then(response => response.json())
//       .then(jsonResponse => { this.setState({ monJeton: jsonResponse.access_token, refresh_token: jsonResponse.refresh_token, timeOut: jsonResponse.expires_in }); });

//     // Refresh token
//     fetch("https://iam.cloud.ibm.com/identity/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=aWhdLNtyT3lI2WtKuLNJD6gTNR2ay24lWc4qLEDY5xXp", {
//       headers: {
//         Accept: "application/json",
//         Authorization: "Basic Yng6Yng=",
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       method: "POST"
//     })
//       .then(response => response.json())
//       .then(jsonResponse => { this.setState({ monJeton: jsonResponse.access_token, refresh_token: jsonResponse.refresh_token, timeOut: jsonResponse.expires_in }); });
//   }

//   render() {
//     return <View><Text>Mon Jeton : {this.state.monJeton}</Text>
//       <Text>Mon Jeton : {this.state.timeOut}</Text></View>
//   }
// }

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
      // .then(responseJson => console.log(responseJson))
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

        <Flatlist></Flatlist>
      </View>
    );
  }
}

export default function App() {
  //console.log(Promise.resolve(_access_tokenIAM));

  return (
    <View>
      <Text>test</Text>
      {/* <Jeton /> */}

      <Translator />
    </View>
    // <View style={styles.container}>
    //   <TextToSpeechScreen />
    // </View>
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
