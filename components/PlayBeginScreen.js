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

export default class PlayBeginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      prenom: "",
      reponse: "",
      isLoading: false,
      disabled: false,
      questionsData: [],
      compteur: 0
    };
  }

  //Action une fois que l'objet est construit
  componentDidMount = () => {
    //Actions à effectuer
    // this.setState({ isLoading: false });
  };

  getQuestions = () => {
    this.setState({ isLoading: true, disabled: true });

    fetch(
      "http://projet-dev-mobile-laisnejouault.000webhostapp.com/queryQuestions.php",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        // Showing response message coming from server after inserting records.
        this.setState({
          questionsData: responseJson,
          isLoading: false,
          disabled: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false, disabled: false, compteur: 1 });
      });
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text>PlayBeginScreen</Text>
        </View>
        <View style={styles.MainContainer}>
          <Text style={styles.title}>Règles du jeu</Text>

          {this.state.isLoading ? <ActivityIndicator size="large" /> : null}
          <Text>Parviendrez-vous à battre IBM Watson translator ?</Text>
          <Text>
            L'objectif du jeu : trouver la langue et la traduction des mots
            proposés !
          </Text>
          <TouchableOpacity
            disabled={this.state.disabled}
            onPress={() => {
              this.getQuestions(),
                this.props.navigation.navigate("PlayFindlanguage"),
                { questionsData: this.state.questionsData };
            }}
          >
            <View>
              <Text>Commencer le jeu !</Text>
            </View>
          </TouchableOpacity>
        </View>
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
