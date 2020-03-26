import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Format from "./../utils/Format";

import QuestionsState from "./QuestionsState";
import Score from "./Score";
import IBMAnswers from "./IBMAnswers";
import InputPlayer from "./InputPlayer";

export default class PlayFindlanguageScreen extends Component {
  static navigationOptions = { title: "Questions" };

  constructor(props) {
    super(props);
    this.state = {
      languageInput: "",
      translationInput: "",
      languageIBM: "",
      translationIBM: "",

      count: 0,

      gameStatePlayer: {
        languageAnswers: [],
        languagePoints: [],
        translationAnswers: [],
        translationPoints: []
      },
      gameStateIBM: {
        languageAnswers: [],
        languagePoints: [],
        translationAnswers: [],
        translationPoints: []
      },

      hasAlreadyChecked: false
    };
  }

  //MOMO----------------------------
  followingQuestion = questionCount => {
    //tant que c'est inférieur au nb total de q°, on passe à la question suivante
    if (this.state.count <= questionCount) {
      this.setState({
        count: this.state.count + 1
      });
    } else {
      alert(`Terminé, vous avez ${this.state.points} points`);
    }
  };

  createLanguage = questionId => {
    this.setState({ isLoading: true, disabled: true });
    fetch(
      "http://projet-dev-mobile-laisnejouault.000webhostapp.com/createLanguage.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          languageInput: this.state.languageInput,
          questionId: questionId
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

  createTranslation = questionId => {
    this.setState({ isLoading: true, disabled: true });
    fetch(
      "http://projet-dev-mobile-laisnejouault.000webhostapp.com/createTranslation.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          translationInput: this.state.translationInput,
          questionId: questionId
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        alert(responseJson);
        this.setState({ isLoading: false, disabled: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false, disabled: false });
      });
  };
  //MOMO----------------------------


  // HANDLER CALLBACKS
  handleIBMAnswers = (language, translation) =>
    this.setState({ languageIBM: language, translationIBM: translation });
  handleLanguageAnswer = languageAnswer =>
    this.setState({ languageInput: languageAnswer });
  handleTranslationAnswer = translationAnswer =>
    this.setState({ translationInput: translationAnswer });

  // METHODS
  updateGS = (who, array, valueToAdd) => {
    let newArray = who[array].push(valueToAdd);
    this.setState({ ...who, array: newArray });
  };

  checkAnswers = (expectedLanguage, expectedTranslation) => {
    this.setState({ hasAlreadyChecked: true });
    expectedLanguage = Format.getFormattedText(expectedLanguage).toLowerCase();
    expectedTranslation = Format.getFormattedText(expectedTranslation).toLowerCase();
    let player = this.state.gameStatePlayer;
    let IBM = this.state.gameStateIBM;
    let points = 0;
    let i = this.state.count;

    // add the inserted texts into the gamestate
    this.updateGS(player, "languageAnswers", this.state.languageInput);
    this.updateGS(player, "translationAnswers", this.state.translationInput);
    this.updateGS(IBM, "languageAnswers", this.state.languageIBM);
    this.updateGS(IBM, "translationAnswers", this.state.translationIBM);

    // check for the player and point distribution (0.5 per correct input)
    points = (Format.getFormattedText(player.languageAnswers[i]).toLowerCase() == expectedLanguage) ? 0.5 : 0;
    this.updateGS(player, "languagePoints", points);

    points = (Format.getFormattedText(player.translationAnswers[i]).toLowerCase() == expectedTranslation) ? 0.5 : 0;
    this.updateGS(player, "translationPoints", points);

    // for IBM now
    points = (Format.getFormattedText(IBM.languageAnswers[i]).toLowerCase() == expectedLanguage) ? 0.5 : 0;
    this.updateGS(IBM, "languagePoints", points);

    points = (Format.getFormattedText(IBM.translationAnswers[i]).toLowerCase() == expectedTranslation) ? 0.5 : 0;
    this.updateGS(IBM, "translationPoints", points);
  };

  nextQuestion = () => this.setState({
    languageInput: "",
    translationInput: "",
    count: this.state.count + 1,
    hasAlreadyChecked: false
  });

  render() {
    const questions = this.props.navigation.getParam("questionsData", "Error");
    let player = this.state.gameStatePlayer;
    let IBM = this.state.gameStateIBM;
    let count = this.state.count;
    let word = questions[count].quest_word;

    return (
      <View style={styles.bigContainer}>
        <ScrollView>
          <View style={styles.container}>

            <View style={styles.header}>

              <QuestionsState count={count} questions={questions} gameStatePlayer={player} />
              <Score gameStatePlayer={player} gameStateIBM={IBM} />

            </View>

            <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
              <View style={styles.title}>
                <Text style={styles.word}>{word}</Text>
              </View>

              {/* DEBOGUAGE
              <Text>{this.state.languageIBM}</Text>
              <Text>{this.state.count}</Text>
              <Text>{this.state.languageInput}</Text>
              <Text>{this.state.translationInput}</Text>
              <Text>{JSON.stringify(this.state.gameStatePlayer)}</Text>
              <Text>{JSON.stringify(this.state.gameStateIBM)}</Text> */}

              <InputPlayer
                type="language"
                label="Langue supposée"
                count={count}
                gameStatePlayer={player}
                callback={this.handleLanguageAnswer} />

              <InputPlayer
                type="translation"
                label="Traduction en français"
                count={count}
                gameStatePlayer={player}
                callback={this.handleTranslationAnswer} />

              <View style={{ display: "flex", flexDirection: "row", width: "90%", justifyContent: "space-between", marginTop: 0 }}>
                <IBMAnswers
                  word={word}
                  count={count}
                  gameStateIBM={IBM}
                  handleIBMAnswers={this.handleIBMAnswers} />

                <TouchableOpacity
                  disabled={this.state.hasAlreadyChecked}
                  onPress={() => this.checkAnswers(questions[count].quest_language, questions[count].quest_frenchTranslation)}
                  style={[styles.checkAnswer, this.state.hasAlreadyChecked ? { opacity: 0.3, elevation: 0 } : {}]}>
                  <Ionicons name="ios-checkmark-circle-outline" color="green" size={50}></Ionicons>
                  <Text>Vérifier</Text>
                </TouchableOpacity>
              </View>


              <TouchableOpacity

                onPress={() => this.nextQuestion()}>
                <Ionicons name="ios-arrow-dropright" size={50}></Ionicons>
                <Text>Question suivante !</Text>
              </TouchableOpacity>

            </View>


            {/* <TouchableOpacity
          disabled={this.state.disabled}
          onPress={() => this.createLanguage(questionId)}
        >
          <View>
            <Text>J'avais raison pour la langue</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={this.state.disabled}
          onPress={() => this.createTranslation(questionId)}
        >
          <View>
            <Text>J'avais raison pour la traduction</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.followingQuestion(questionCount);
          }} // passe à la question suivante
        >
          <Text>Passer cette question</Text>
        </TouchableOpacity> */}
          </View >
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigContainer: {
    height: "100%",
    backgroundColor: "#fff"
  },
  container: {
    height: "100%",
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center"
  },
  questionDetails: {
    backgroundColor: "tomato",
    display: "flex",
    justifyContent: "center",
    color: "white",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  word: {
    fontSize: 30,
    marginTop: 10,
    fontStyle: "italic",
    fontFamily: "serif"
  },
  checkAnswer: {
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    backgroundColor: "#fff",
    width: "30%",
    height: 100
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
