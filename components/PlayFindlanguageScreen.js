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
import { getDetectionLangue } from "../helpers/langageTranslatorApi";
import { getTraduction } from "../helpers/langageTranslatorApi";
import Ionicons from "react-native-vector-icons/Ionicons";
import Format from "./../utils/Format";
import paysLangues from "./../data/iso_639-2.json";
import IBMAnswers from "./IBMAnswers";

export default class PlayFindlanguageScreen extends Component {
  static navigationOptions = { title: "Questions" };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      disabled: false,

      count: 0, // pour gérer l'ordre des questions
      points: 0,

      pointsIBM: 0,

      languageInput: "",
      translationInput: "",

      isLoading: false,
      disabled: false,

      timer: 30
    };
  }

  //Duplication de code
  paysCorrespondant = codeIso => {
    var getLanguesParIsoCode = code =>
      paysLangues.filter(
        x => x.Alpha2_Code === code && x.French_Name !== null
      )[0];
    var langueTrouvee = getLanguesParIsoCode(codeIso);

    // on met en majuscule la premiere lettre
    return langueTrouvee !== undefined
      ? langueTrouvee.French_Name.charAt(0).toUpperCase() +
      langueTrouvee.French_Name.slice(1)
      : codeIso;
  };

  //quasi duplication de code
  translateIBM = word => {
    console.log(this.state.detectedLanguageIBM);
    getTraduction(word, this.state.detectedLanguageIBM, "fr")
      .then(responseJson => {
        this.setState({
          translationIBM: responseJson.translations[0].translation
        });
        console.log(responseJson.translations);
      })
      .catch(error => {
        this.setState({
          translationIBM: "[Pas trouvé]"
        });
      });
  };

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

  startTimer = () => {
    if (this.state.timer > 0) {
      let timerInterval = setInterval(() => {
        this.setState({
          timer: this.state.timer - 1
        });
      }, 1000);
    }
    else { console.log("fin"); }
  }

  // HANDLER CALLBACKS
  handleIBMAnswers = (language, translation) =>
    this.setState({ detectedLanguageIBM: language, translationIBM: translation });

  render() {
    const questions = this.props.navigation.getParam("questionsData", "Error");

    let word = questions[this.state.count].quest_word;
    let questionCount = this.state.count + 1;

    let questionsBtn = questions.map(question => {
      if (question.quest_id == questionCount) {
        return <View key={question.quest_id} style={styles.enCours}><Text style={styles.textBtnSelected}>{question.quest_id}</Text></View>;
      }
      else {
        return <View key={question.quest_id} style={styles.aFaire}><Text style={styles.textBtn}>{question.quest_id}</Text></View>;
      }
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.questionsState}>
            {questionsBtn}
          </View>

          <Text style={styles.timer}>{this.state.timer}s</Text>
        </View>

        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <View style={styles.title}>
            <Text style={styles.word}>{word}</Text>
          </View>

          <View>
            <Text style={styles.flag}>Langue supposée</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Votre réponse"
                onChangeText={insertedText => this.setState({ languageInput: Format.getFormattedText(insertedText) })}
              />
            </View>
          </View>

          <View>
            <Text style={styles.flag}>Traduction en français</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Votre réponse"
                onChangeText={insertedText => this.setState({ translationInput: Format.getFormattedText(insertedText) })}
              />
            </View>
          </View>

          <View style={{ display: "flex", flexDirection: "row", width: "90%", justifyContent: "space-between", marginTop: 10 }}>
            <IBMAnswers
              word={word}
              handleIBMAnswers={this.handleIBMAnswers} />

            <View style={styles.checkAnswer}>
              <Ionicons name="ios-checkmark-circle-outline" color="green" size={50}></Ionicons>
              <Text>Verifier</Text>
            </View>
          </View>

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

        <View>
          <Text>Réponses</Text>
          <Text>Langue : {language}</Text>
          <Text>Traduction : {translation}</Text>
        </View>

        <View>
          <Text>
            Langue trouvée par IBM:{" "}
            {JSON.stringify(
              this.paysCorrespondant(this.state.detectedLanguageIBM)
            )}
          </Text>
          <Text>Traduction de IBM : {this.state.translationIBM}</Text>
        </View>

        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.followingQuestion(questionCount);
          }} // passe à la question suivante
        >
          <Text>Passer cette question</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  inputContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 0,
    borderColor: "#f1f1f1",
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: "white",
    elevation: 4
  },
  separator: {
    width: "60%",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  inputContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 0,
    borderColor: "#f1f1f1",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
    elevation: 4
  },
  textInput: {
    width: "100%",
    backgroundColor: "white",
    fontSize: 18
  },
  MainContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 4,
    margin: 10,
    padding: 20
  },
  word: {
    fontSize: 30,
    marginTop: 10,
    fontStyle: "italic",
    fontFamily: "serif"
  },
  flag: {
    width: "60%",
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: "white",
    elevation: 3,
    fontSize: 12,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: "#000",
    marginLeft: 10
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
  questionsState: {
    elevation: 3,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  enCours: {
    backgroundColor: "orange",
    padding: 5,
    marginHorizontal: 2,
    width: 30,
    height: 30,
    borderRadius: 50
  },
  aFaire: {
    backgroundColor: "#fafafa",
    padding: 5,
    marginHorizontal: 2,
    width: 30,
    height: 30,
    borderRadius: 50
  },
  textBtn: {
    textAlign: "center"
  },
  textBtnSelected: {
    textAlign: "center",
    color: "#fff"
  },
  timer: {
    elevation: 3,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
