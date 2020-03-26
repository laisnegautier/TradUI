import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from "react-native";
import { getDetectionLangue, getTraduction } from "./../helpers/langageTranslatorApi";
import Format from "./../utils/Format";

export default class IBMAnswers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detectedLanguages: null,
            detectedLanguage: "",
            isDetectingLanguages: false,

            translatedText: "",
            isTranslating: false,
        };
    }

    // CALLBACK
    _callback = (detectedLanguage, translation) =>
        this.props.handleIBMAnswers(detectedLanguage, translation);

    // METHODS
    detecterLangue = texte => {
        this.setState({ isDetectingLanguages: true });

        getDetectionLangue(texte)
            .then(jsonResponse => {
                jsonResponse.languages;
                this.setState({ detectedLanguages: jsonResponse.languages, detectedLanguage: jsonResponse.languages[0].language });
                this.translate(jsonResponse.languages[0].language);
                this.setState({ isDetectingLanguages: false });
            })
            .catch(error => {
                alert(error.message);
            });
    };

    translate = () => {
        this.setState({ translatedText: "", isTranslating: true });
        console.log("df");
        console.log(this.state.detectedLanguage);
        getTraduction(
            this.props.word,
            this.state.detectedLanguage,
            "fr"
        )
            .then(responseJson => {
                this.setState({
                    translatedText: responseJson.translations[0].translation,
                    isTranslating: false
                });
                this._callback(
                    Format.getPaysCorrespondant(this.state.detectedLanguage), responseJson.translations[0].translation
                );
            })
            .catch(error => {
                this.setState({
                    translatedText: "[Pas de traduction]",
                    isTranslating: false
                });
            });
    };

    componentDidMount = () => {
        if (this.props.word !== "")
            this.detecterLangue(this.props.word);
    };

    componentDidUpdate = prevProps => {
        if (prevProps.word !== this.props.word) {
            this.detecterLangue(this.props.word);
        }
    }

    render() {
        let detectedLanguage = Format.getPaysCorrespondant(this.state.detectedLanguage);
        let translatedText = this.state.translatedText;

        return (
            <View>
                <Ionicons name="ios-git-network" color="black" size={25}></Ionicons>

                <Text>Reponses d'IBM</Text>

                <Text>Langue : </Text>
                {this.state.isDetectingLanguages
                    ? <ActivityIndicator style={{ width: 170, height: 50 }} />
                    : <Text>{detectedLanguage}</Text>}

                <Text>Traduction : </Text>
                {this.state.isDetectingLanguages || this.state.isTranslating ? <ActivityIndicator style={{ width: 170, height: 50 }} /> : <Text>{translatedText}</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: "#fff",
        elevation: 4,
        marginBottom: 20
    },
    ioniconsMegaphone1: {
        backgroundColor: "#fafafa",
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 100
    },
    textToTranslateInput: {
        width: "70%",
        backgroundColor: "white",
        marginLeft: 25,
        fontSize: 18
    }
});
