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
                    translatedText: "[aucune]",
                    isTranslating: false
                });
            });
    };

    componentDidMount = () => {
        if (this.props.word !== "")
            this.detecterLangue(this.props.word);
    };

    componentDidUpdate = prevProps => {
        if (prevProps.word !== this.props.word)
            this.detecterLangue(this.props.word);
    }

    render() {
        let detectedLanguage = Format.getPaysCorrespondant(this.state.detectedLanguage);
        let translatedText = this.state.translatedText;

        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Ionicons name="ios-git-network" color="black" size={25}></Ionicons>
                    <Text style={styles.title}>Réponses d'IBM</Text>
                </View>

                <View style={styles.inline}>
                    <Text>Langue : </Text>
                    {this.state.isDetectingLanguages
                        ? <ActivityIndicator />
                        : <Text style={styles.textFound}>{detectedLanguage}</Text>}
                </View>

                <View style={styles.inline}>
                    <Text>Traduction : </Text>
                    {this.state.isDetectingLanguages || this.state.isTranslating
                        ? <ActivityIndicator />
                        : <Text style={styles.textFound}>{translatedText}</Text>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "65%",
        height: 100,
        flexDirection: "column",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 0,
        borderColor: "#f1f1f1",
        borderRadius: 5,
        backgroundColor: "#fff",
        elevation: 4,
        marginBottom: 20
    },
    titleView: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 10
    },
    title: {
        fontWeight: "bold",
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    textFound: {
        fontStyle: "italic",
        fontFamily: "serif"
    },
    inline: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
