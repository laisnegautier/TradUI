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
      questions: []
    };
  }

  create = () => {
    this.setState({ isLoading: true, disabled: true });

    fetch(
      "http://projet-dev-mobile-laisnejouault.000webhostapp.com/create.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nom: this.state.nom,
          prenom: this.state.prenom,
          resultat: this.state.resultat
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

  //Action une fois que l'objet est construit
  componentDidMount = () => {
    //Actions à effectuer
    // this.setState({ isLoading: false });
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text>PlayFindlanguageScreen</Text>
        </View>
        <View style={styles.MainContainer}>
          <Text style={styles.title}>Create Form</Text>

          {this.state.isLoading ? <ActivityIndicator size="large" /> : null}
          <TextInput
            placeholder="Enter Nom"
            onChangeText={text => this.setState({ nom: text })}
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="Enter Prenom"
            onChangeText={text => this.setState({ prenom: text })}
            style={styles.TextInputStyleClass}
          />
          <TextInput
            placeholder="Enter Resultat"
            onChangeText={text => this.setState({ resultat: text })}
            style={styles.TextInputStyleClass}
          />
          <TouchableOpacity
            disabled={this.state.disabled}
            onPress={() => this.create()}
          >
            <View>
              <Text>Create</Text>
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
