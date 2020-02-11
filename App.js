import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TextToSpeechScreen from "./components/TextToSpeechScreen";

// =========  WATSON  MAGIC  ==============

/**
 * Get Watson session
 */
getSession = async () => {
  fetch(
    "https://gateway-fra.watsonplatform.net/assistant/api/v2/assistants/4d704b0d-1461-4d8c-b85c-062ab09f30fe/sessions?version=2019-02-28",
    {
      headers: {
        Authorization:
          "Basic YXBpa2V5Ok5jYy1Ta0xLdXN0MGxpeU1OR1J5WmE5bU9yRTlLd3U4R0xJemRGUEtQanZP"
      },
      method: "POST"
    }
  )
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson.session_id);
      this.setState({ userSession: responseJson.session_id });
    });
};

// import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
// import { IamAuthenticator } from 'ibm-watson/auth';

// import GLOBALS from './Globals';

// const textToSpeech = new TextToSpeechV1({
//   authenticator: new IamAuthenticator({
//     apikey: `${GLOBALS.WATSON_TEXTTOSPEECH_CREDENTIALS}`,
//   }),
//   url: `${GLOBALS.WATSON_TEXTTOSPEECH_URL}`,
// });

export default function App() {
  return (
    <View style={styles.container}>
      <TextToSpeechScreen />
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
