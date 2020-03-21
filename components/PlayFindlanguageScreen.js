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
  static navigationOptions = { title: "Questions" };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      disabled: false,
      questionsData: [],
      count: 1, // pour gérer l'ordre des questions
      answer: ""
    };
  }

  checkLanguage = () => {
    //vérifie que c'est la bonne réponse. Si oui, passe à la suivant sinon, réessaye.
    // +1 pt pr le joueur
  };

  create = () => {
    this.setState({ isLoading: true, disabled: true });

    fetch(
      "http://projet-dev-mobile-laisnejouault.000webhostapp.com/addAnswer.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          answer: this.state.answer
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        // Showing response message coming from server after inserting records.
        alert(responseJson);
        this.setState({ isLoading: false, disabled: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false, disabled: false });
      });
  };

  componentDidMount = () => {
    //this.setState({ questionsData: this.props.navigation.getParams('questionsData') });
    //console.log(this.state.questionsData);
  };

  render() {
    let word = "";
    let language = "";
    let translation = "";

    const questions = this.props.navigation.getParam("questionsData", "Error");
    for (const e of questions) {
      const value = JSON.parse(e.quest_order);
      //const order = parseInt(questions.get("quest_order"));
      //console.log(order);
      if (value == Number(this.state.count)) {
        word = JSON.stringify(e.quest_word);
        language = JSON.stringify(e.quest_language);
        translation = JSON.stringify(e.quest_frenchTranslation);
      }
    }
    return (
      <View>
        <Text>Quelle est la langue du mot {word}?</Text>
        <TextInput
          placeholder="Entrer Resultat"
          onChangeText={text => this.setState({ answer: text })}
          style={styles.TextInputStyleClass}
        />
        <TouchableOpacity
          style={styles.container}
          //onPress={() => this.checkAnswer()}
        >
          <Text>Confirmer</Text>
        </TouchableOpacity>
        <Text>Langue : {language}</Text>
        <Text>Traduction {translation}:</Text>

        <TouchableOpacity
          style={styles.container}
          onPress={() => this.create()} // ajoute une réponse
        >
          <Text>J'avais raison</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            count++;
            his.navigation.navigate("PlayFindlanguage");
          }} // passe à la question suivante
        >
          <Text>Passer cette question</Text>
        </TouchableOpacity>
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
