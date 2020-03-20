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
        console.log(responseJson);
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
  }

  render() {
    /*const mot = "yo";
    const questions = this.props;
    for (const e of questions) {
      if (e.quest_order == compteur) {
        mot = e.quest_word;
      }
    }
    console.log(mot);*/

    //const { navigation } = this.props;
    return (
      <View>
        <Text>Quelle est la langue du mot ?</Text>
        <TextInput
          placeholder="Enter Resultat"
          onChangeText={text => this.setState({ answer: text })}
          style={styles.TextInputStyleClass}
        />
        <Text>Test : {JSON.stringify(this.props.navigation.getParam("questionsData", "Error"))}</Text>
        <TouchableOpacity
          style={styles.container}
        //onPress={() => this.checkAnswer()}
        >
          <Text>Confirmer</Text>
        </TouchableOpacity>
        <Text>Langue : </Text>
        <Text>Traduction :</Text>

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
