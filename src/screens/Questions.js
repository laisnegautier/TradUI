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

  // METHODS
  // GS = GameState
  // we update the GS arrays by adding a case at the end
  updateGS = (who, array, valueToAdd) => {
    let newArray = who[array].push(valueToAdd);
    this.setState({ ...who, array: newArray });
  };

  translations = questionId => {
    this.setState({ isLoading: true });

    getTranslations(questionId)
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        this.setState({
          allTranslations: responseJson,
          isLoading: false,
          disabledBtn: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false });
      });
  };

  languages = questionId => {
    this.setState({ isLoading: true });

    getLanguages(questionId)
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        this.setState({
          allLanguages: responseJson,
          isLoading: false,
          disabledBtn: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false });
      });
  };

  addAnswer = (type, questionId) => {
    this.setState({ isLoading: true, disabled: true });

    if (type == "t") {
      var input = this.state.translationInput;
      addTranslation(input, questionId);
    } else {
      var input = this.state.languageInput;
      addLanguage(input, questionId);
    }
  };

  checkOtherAnswers = (type, answerInput, allAnswers) => {
    if (type == "l") {
      for (const a of allAnswers) {
        console.log("language");
        if (
          Format.getFormattedText(a.answerL_descr).toLowerCase() == answerInput
        ) {
          console.log("c'est bon pour language!");
          return true;
        }
      }
    } else {
      for (const a of allAnswers) {
        console.log("translation");
        console.log(a.answerT_descr);
        if (
          Format.getFormattedText(a.answerT_descr).toLowerCase() == answerInput
        ) {
          console.log("c'est bon pour translation!");
          return true;
        }
      }
    }
    return false;
  };

  checkAnswers = question => {
    this.setState({ hasAlreadyChecked: true });
    expectedLanguage = Format.getFormattedText(
      question.quest_language
    ).toLowerCase();
    expectedTranslation = Format.getFormattedText(
      question.quest_frenchTranslation
    ).toLowerCase();

    let questionId = question.quest_id;
    console.log("questionId=");
    console.log(questionId);

    let player = this.state.gameStatePlayer;
    let IBM = this.state.gameStateIBM;
    let points = 0;
    let i = this.state.count;

    // add the inserted texts into the gamestate
    this.updateGS(player, "languageAnswers", this.state.languageInput);
    this.updateGS(player, "translationAnswers", this.state.translationInput);
    this.updateGS(IBM, "languageAnswers", this.state.languageIBM);
    this.updateGS(IBM, "translationAnswers", this.state.translationIBM);

    //check for the player if answers valid or not
    var languageIsValid =
      Format.getFormattedText(player.languageAnswers[i]).toLowerCase() ==
      expectedLanguage
        ? true
        : false;

    if (!languageIsValid) {
      console.log("languageNotValid");
      this.languages(questionId);
      languageIsValid = this.checkOtherAnswers(
        "l",
        Format.getFormattedText(player.languageAnswers[i]).toLowerCase(),
        this.state.allLanguages
      );
    }

    var translationIsValid =
      Format.getFormattedText(player.translationAnswers[i]).toLowerCase() ==
      expectedTranslation
        ? true
        : false;

    if (!translationIsValid) {
      console.log("translation Not Valid");
      this.translations(questionId);
      translationIsValid = this.checkOtherAnswers(
        "t",
        Format.getFormattedText(player.translationAnswers[i]).toLowerCase(),
        this.state.allTranslations
      );
    }

    // check for the player and point distribution (0.5 per correct input)
    points = languageIsValid ? 0.5 : 0;
    this.updateGS(player, "languagePoints", points);

    points = translationIsValid ? 0.5 : 0;
    this.updateGS(player, "translationPoints", points);

    // for IBM now

    languageIsValid = false;
    translationIsValid = false;

    languageIsValid =
      Format.getFormattedText(IBM.languageAnswers[i]).toLowerCase() ==
      expectedLanguage
        ? true
        : false;

    if (!languageIsValid) {
      languageIsValid = this.checkOtherAnswers(
        expectedLanguage,
        IBM.languageAnswers[i],
        this.state.allLanguages
      );
    }

    translationIsValid =
      Format.getFormattedText(IBM.translationAnswers[i]).toLowerCase() ==
      expectedTranslation
        ? true
        : false;

    if (!translationIsValid) {
      translationIsValid = this.checkOtherAnswers(
        expectedTranslation,
        IBM.languageAnswers[i],
        this.state.Translations
      );
    }

    points = languageIsValid ? 0.5 : 0;
    this.updateGS(IBM, "languagePoints", points);

    points = translationIsValid ? 0.5 : 0;
    this.updateGS(IBM, "translationPoints", points);
  };

  nextQuestion = questions => {
    if (this.state.count < questions.length - 1)
      this.setState({
        languageInput: "",
        translationInput: "",
        count: this.state.count + 1,
        hasAlreadyChecked: false
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
                  onPress={() => this.checkAnswers(questions[count])}
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
                    style={styles.nextQuestion}
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
                    style={styles.nextQuestion}
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
