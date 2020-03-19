import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

export default class PlayFindlanguageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      prenom: "",
      reponse: "",
      isLoading: false,
      disabled: false,
      compteur: 1
    };
  }

  checkLanguage = () => {
    //if(question.quest_language=)
  };

  render() {
    var questionsData = this.props;
    const question = questionsData.find(
      e => (e.quest_id = this.state.compteur)
    );
    return (
      <View>
        <Text>Quelle est la langue du mot {question.quest_word} ?</Text>
        <TextInput
          placeholder="Enter Resultat"
          onChangeText={text => this.setState({ resultat: text })}
          style={styles.TextInputStyleClass}
        />
        <TouchableOpacity
          style={styles.container}
          //onPress={() => this.checkAnswer()}
        >
          <Text>Confirmer</Text>
        </TouchableOpacity>
        <Text>Langue : {question.quest_language}</Text>
        <Text>Traduction : {question.quest_frenchTranslation} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray"
  },
  MainContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 4,
    margin: 10,
    padding: 20
  },

  TextInputStyleClass: {
    textAlign: "center",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 5
  },

  title: {
    fontSize: 22,
    color: "#009688",
    textAlign: "center",
    marginBottom: 15
  }
});
