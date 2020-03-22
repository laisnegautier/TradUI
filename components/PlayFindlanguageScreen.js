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
import { getDetectionLangue } from "./../helpers/langageTranslatorApi";
import { getTraduction } from "./../helpers/langageTranslatorApi";
import paysLangues from "./../data/iso_639-2.json";

export default class PlayFindlanguageScreen extends Component {
  static navigationOptions = { title: "Questions" };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      disabled: false,
      questionsData: [],
      count: 1, // pour gérer l'ordre des questions
      answerLanguage: "",
      word: "",
      language: "",
      translation: "",
      points: 0,
      detectedLanguageIBM: "",
      translationIBM: ""
    };
  }

  //quasi duplication de code
  detectLanguageIBM = texte => {
    getDetectionLangue(texte)
      .then(jsonResponse => {
        this.setState({
          detectedLanguageIBM: jsonResponse.languages[0].language
        });
      })
      .catch(error => {
        this.setState({
          detectLanguageIBM: "[Pas trouvé]"
        });
      });
  };

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
    getTraduction(word, this.state.detectedLanguage, "fr")
      .then(responseJson => {
        this.setState({
          translationIBM: responseJson.translations[0].translation
        });
      })
      .catch(error => {
        this.setState({
          translationIBM: "[Pas trouvé]"
        });
      });
  };

  checkLanguage = (language, translation, questionCount) => {
    /*console.log(this.state.answerLanguage);
    console.log(language);*/
    /*if (this.state.answerLanguage.equals("language")) {
      console.log("great!");
      this.setState({ points: this.state.points + 1 });
      this.followingQuestion(questionCount);
    }*/
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

  create = questionId => {
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
          language: this.state.answerLanguage,
          questionId: questionId
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
    let translation = "";
    let word = "";
    let language = "";
    let questionId = "";
    let questionCount = 0;
    const questions = this.props.navigation.getParam("questionsData", "Error");
    for (const e of questions) {
      questionCount++;
      const value = JSON.parse(e.quest_order);

      if (value == Number(this.state.count)) {
        word = JSON.stringify(e.quest_word);
        language = JSON.stringify(e.quest_language);
        translation = JSON.stringify(e.quest_frenchTranslation);
        questionId = JSON.parse(e.quest_id);
        /*this.setState({
          word: JSON.stringify(e.quest_word),
          language: JSON.stringify(e.quest_language),
          translation: JSON.stringify(e.quest_frenchTranslation)
        });*/
      }
    }
    return (
      <View>
        <Text>Quelle est la langue du mot {word}?</Text>
        <TextInput
          placeholder="Entrer Resultat"
          onChange={text => this.setState({ answerLanguage: text })}
          style={styles.TextInputStyleClass}
        />
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.checkLanguage(language, translation, questionCount);
            this.detectLanguageIBM(word);
            this.translateIBM(word);
          }}
        >
          <Text>Confirmer</Text>
        </TouchableOpacity>
        <Text>Langue : {language}</Text>
        <Text>Traduction {translation}:</Text>
        <Text>
          Langue trouvée par IBM:{" "}
          {JSON.stringify(
            this.paysCorrespondant(this.state.detectedLanguageIBM)
          )}
        </Text>
        <Text>Traduction de IBM : {this.state.translationIBM}</Text>

        <TouchableOpacity
          style={styles.container}
          onPress={() => this.create(questionId)} // ajoute une réponse
        >
          <Text>J'avais raison</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.followingQuestion(questionCount);
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
