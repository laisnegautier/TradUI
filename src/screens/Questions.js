import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Format from "../resources/utils/Format";

import QuestionsState from "../components/QuestionsState/QuestionsState";
import Score from "../components/Score/Score";
import IBMAnswers from "../components/IBMAnswers/IBMAnswers";
import InputPlayer from "../components/InputPlayer/InputPlayer";

import {
  getLanguages,
  getTranslations,
  addLanguage,
  addTranslation
} from "../services/api/questionGame";

export default class Questions extends Component {
  static navigationOptions = { title: "Questions" };

  constructor(props) {
    super(props);
    this.state = {
      languageInput: "",
      translationInput: "",
      languageIBM: "",
      translationIBM: "",

      allTranslations: [],
      allLanguages: [],

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

      isLoadingCheck: false,
      isLoadingAddAnswer: false,
      isLoadingAddLanguage: false,
      isLoadingAddTranslation: false,
      disabledAddLanguage: false,
      disabledAddTranslation: false,

      hasAlreadyChecked: false
    };
  }

  // HANDLER CALLBACKS
  handleIBMAnswers = (language, translation) =>
    this.setState({ languageIBM: language, translationIBM: translation });
  handleLanguageAnswer = languageAnswer =>
    this.setState({ languageInput: languageAnswer });
  handleTranslationAnswer = translationAnswer =>
    this.setState({ translationInput: translationAnswer });


  // API CALLS
  languages = async questionId => {
    this.setState({ isLoadingCheck: true });

    try {
      const response = await getLanguages(questionId);
      const data = await response.json();
      this.setState({ allLanguages: data });
    } catch (e) {
      console.log(e.message)
    }
  };

  translations = async questionId => {
    this.setState({ isLoadingCheck: true });

    try {
      const response = await getTranslations(questionId);
      const data = await response.json();
      this.setState({ allTranslations: data });
    } catch (e) {
      console.log(e.message)
    }
  };

  addAnswer = async (type, questionId) => {
    if (type == "t") {
      if (Format.getFormattedText(this.state.translationInput) == "")
        alert("Une réponse vide n'est pas ajoutable dans la base de données.");
      else {
        this.setState({ isLoadingAddTranslation: true, disabledAddTranslation: true });

        try {
          const response = await addTranslation(this.state.translationInput, questionId);
          this.setState({ isLoadingAddTranslation: false });

          // score update
          let newArray = this.state.gameStatePlayer.translationPoints;
          newArray[questionId - 1] = 0.5;
          this.setState({ ...this.state.gameStatePlayer, translationPoints: newArray });
        } catch (e) {
          this.setState({ isLoadingAddTranslation: false, disabledAddTranslation: false });
          console.log(e.message)
        }
      }
    }
    else {
      if (Format.getFormattedText(this.state.languageInput) == "")
        alert("Une réponse vide n'est pas ajoutable dans la base de données.");
      else {
        this.setState({ isLoadingAddLanguage: false, disabledAddLanguage: true });

        try {
          const response = await addLanguage(this.state.languageInput, questionId);
          this.setState({ isLoadingAddLanguage: false });

          // score update
          let newArray = this.state.gameStatePlayer.languagePoints;
          newArray[questionId - 1] = 0.5;
          this.setState({ ...this.state.gameStatePlayer, languagePoints: newArray });
        } catch (e) {
          this.setState({ isLoadingAddLanguage: false, disabledAddLanguage: false });
          console.log(e.message)
        }
      }
    }
  };


  // METHODS
  checkEveryAnswer = (expectedAnswer, answerInput, allAnswers) => {
    // the player has already the good answer (the one expected)
    if (expectedAnswer == answerInput) return true;

    // the player may have another answer (synonyms etc)
    let answerIn = allAnswers.filter(obj => Format.getFormattedText(obj.answer_descr).toLowerCase() === answerInput);
    if (answerIn.length != 0) return true;

    // the player has nothing good
    return false;
  };

  // check for the player if answers valid or not
  check = async (quest_id, expectedLanguage, expectedTranslation) => {

    // forbidding to check again
    this.setState({ hasAlreadyChecked: true });

    let player = this.state.gameStatePlayer;
    let IBM = this.state.gameStateIBM;

    // formatting
    expectedLanguage = Format.getFormattedText(expectedLanguage).toLowerCase();
    expectedTranslation = Format.getFormattedText(expectedTranslation).toLowerCase();

    // fetching all the possible answers related to the current question
    await this.languages(quest_id);
    await this.translations(quest_id);

    await this.updateAnswers(player, IBM, this.state.languageInput, this.state.translationInput, this.state.languageIBM, this.state.translationIBM)

    this.updateScore(player, player.languageAnswers, expectedLanguage, this.state.allLanguages, "languagePoints");
    this.updateScore(player, player.translationAnswers, expectedTranslation, this.state.allTranslations, "translationPoints");
    this.updateScore(IBM, IBM.languageAnswers, expectedLanguage, this.state.allLanguages, "languagePoints");
    this.updateScore(IBM, IBM.translationAnswers, expectedTranslation, this.state.allTranslations, "translationPoints");
  };

  // GS = GameState
  // we update the GS arrays by adding a case at the end
  updateGS = (who, array, valueToAdd) => {
    let newArray = who[array].push(valueToAdd);
    this.setState({ ...who, array: newArray });
  };

  updateAnswers = (player, IBM, languageInput, translationInput, languageIBM, translationIBM) => {
    // add the inserted texts into the gamestate
    this.updateGS(player, "languageAnswers", languageInput);
    this.updateGS(player, "translationAnswers", translationInput);
    this.updateGS(IBM, "languageAnswers", languageIBM);
    this.updateGS(IBM, "translationAnswers", translationIBM);
  };

  updateScore = (who, array, expectedAnswer, allAnswers, nomTableauPoints) => {
    let answerIsValid = Format.getFormattedText(array[this.state.count]).toLowerCase() == expectedAnswer;
    if (!answerIsValid)
      answerIsValid = this.checkEveryAnswer(expectedAnswer, Format.getFormattedText(array[this.state.count]).toLowerCase(), allAnswers);

    // check for the player and point distribution (0.5 per correct input)
    let points = answerIsValid ? 0.5 : 0;
    this.updateGS(who, nomTableauPoints, answerIsValid ? 0.5 : 0);
  };

  nextQuestion = questions => {
    if (this.state.count < questions.length - 1)
      this.setState({
        languageInput: "",
        translationInput: "",
        count: this.state.count + 1,
        hasAlreadyChecked: false,
        disabledAddLanguage: false,
        disabledAddTranslation: false
      });
    else {
      this.props.navigation.navigate("EndGame", {
        questionsData: questions,
        gameStatePlayer: this.state.gameStatePlayer,
        gameStateIBM: this.state.gameStateIBM
      });
    }
  };

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
              <QuestionsState
                count={count}
                questions={questions}
                gameStatePlayer={player}
              />
              <Score gameStatePlayer={player} gameStateIBM={IBM} />
            </View>

            <View
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <View style={styles.title}>
                <Text style={styles.word}>{word}</Text>
              </View>

              <InputPlayer
                type="language"
                label="Langue supposée"
                count={count}
                gameStatePlayer={player}
                callback={this.handleLanguageAnswer}
              />

              <InputPlayer
                type="translation"
                label="Traduction en français"
                count={count}
                gameStatePlayer={player}
                callback={this.handleTranslationAnswer}
              />

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "90%",
                  justifyContent: "space-between",
                  marginTop: 0
                }}
              >
                <IBMAnswers
                  word={word}
                  count={count}
                  gameStateIBM={IBM}
                  handleIBMAnswers={this.handleIBMAnswers}
                />

                <TouchableOpacity
                  disabled={this.state.hasAlreadyChecked}
                  onPress={() =>
                    this.check(questions[count].quest_id, questions[count].quest_language, questions[count].quest_frenchTranslation)
                  }
                  style={[
                    styles.checkAnswer,
                    this.state.hasAlreadyChecked
                      ? { opacity: 0.3, elevation: 0 }
                      : {}
                  ]}
                >
                  <Ionicons
                    name="ios-checkmark-circle-outline"
                    color="green"
                    size={50}
                  ></Ionicons>
                  <Text>Vérifier</Text>
                </TouchableOpacity>
              </View>

              {this.state.hasAlreadyChecked ? (
                <View>
                  <Text>Reponses attendues :</Text>
                  <Text>Langue : {questions[count].quest_language}</Text>

                  <TouchableOpacity
                    disabled={this.state.disabledAddLanguage}
                    style={[styles.nextQuestion,
                    this.state.disabledAddLanguage
                      ? { opacity: 0.3, elevation: 0 }
                      : {}
                    ]}
                    onPress={() =>
                      this.addAnswer("l", questions[count].quest_id)
                    }
                  >
                    <Text style={styles.textQuestion}>J'avais raison !</Text>
                  </TouchableOpacity>

                  <Text>
                    Traduction : {questions[count].quest_frenchTranslation}
                  </Text>

                  <TouchableOpacity
                    disabled={this.state.disabledAddTranslation}
                    style={[styles.nextQuestion,
                    this.state.disabledAddTranslation
                      ? { opacity: 0.3, elevation: 0 }
                      : {}
                    ]}
                    onPress={() =>
                      this.addAnswer("t", questions[count].quest_id)
                    }
                  >
                    <Text style={styles.textQuestion}>J'avais raison !</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.nextQuestion}
                    onPress={() => this.nextQuestion(questions)}
                  >
                    <Ionicons
                      name="ios-arrow-dropright"
                      color="white"
                      size={25}
                    ></Ionicons>
                    <Text style={styles.textQuestion}>Question suivante !</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
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
          </View>
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
  },
  nextQuestion: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "tomato",
    width: "60%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20
  },
  textQuestion: {
    color: "white"
  }
});
