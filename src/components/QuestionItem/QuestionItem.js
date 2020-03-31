import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default class QuestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      prename: "",
      reponse: "",
      isLoading: false,
      disabled: false,
      questionsData: "",
      compteur: 0
    };
  }

  createNewPlayer = () => {
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
          <Text>Quelle est la langue du mot {this.state.prenom}</Text>
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
            onPress={() => this.createNewPlayer()}
          >
            <View>
              <Text>Create</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={this.state.disabled}
            onPress={() => this.getQuestions()}
          >
            <View>
              <Text>Commencer le jeu !</Text>
            </View>
          </TouchableOpacity>

          <Text>
            {this.state.questionsData !== ""
              ? this.state.questionsData.map(x => {
                  return (
                    <Text key={x.quest_id}>
                      id: "{x.quest_id}", quest_word: "{x.quest_word}",
                      quest_language: "{x.quest_language}",
                      quest_frenchTranslation: "{x.quest_frenchTranslation}"
                      {"\n"}
                      {"\n"}
                    </Text>
                  );
                })
              : ""}
          </Text>

          <Text>Quelle est la langue du mot {this.state.questionsData}</Text>
        </View>
      </View>
    );
  }
}
