import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator
} from "react-native";
import { testVisualRecognition, testTextToSpeech } from "./textToSpeech";

export default class TextToSpeechScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { textInput: "", audioFile: "", isLoading: false };
  }

  getFetch = text => {
    this.setState({ textInput: text, isLoading: true });

    //getTextToSpeech(text)
    testTextToSpeech(text)
      .then(audioReceived =>
        this.setState({ audioFile: audioReceived, isLoading: false })
      )
      .catch(() => this.setState({ isLoading: false }));
  };

  render() {
    let rendu = <Text>Rien</Text>;
    if (this.state.isLoading) rendu = <ActivityIndicator />;

    return (
      <View style={styles.container}>
        <TextInput
          style={{
            width: 200,
            marginBottom: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderColor: "gray",
            backgroundColor: "white",
            elevation: 4,
            color: "black"
          }}
          placeholder="text to say"
          onSubmitEditing={e => this.getFetch(e.nativeEvent.text)}
        />
        {rendu}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
