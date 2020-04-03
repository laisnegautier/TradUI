import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addQuestion } from "../services/api/questionGame";

export default class AddQuestion extends Component {
    static navigationOptions = { title: "Questions" };

    constructor(props) {
        super(props);
        this.state = {
            languageInput: "",
            translationInput: "",

            quest_word: "",
            quest_language: "",
            quest_frenchTranslation: "",

            isLoading: false,
            disabled: false
        };
    }

    createQuestion = () => {
        if (this.state.quest_word != ""
            && this.state.quest_language != ""
            && this.state.quest_frenchTranslation != "") {
            this.setState({ isLoading: true, disabled: true });

            addQuestion(
                {
                    quest_word: this.state.quest_word,
                    quest_language: this.state.quest_language,
                    quest_frenchTranslation: this.state.quest_language
                }
            )
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
        }
        else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Mot à ajouter"
                        onChangeText={insertedText => this.setState({ quest_word: insertedText })}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Langue originale"
                        onChangeText={insertedText => this.setState({ quest_language: insertedText })}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Traduction en français"
                        onChangeText={insertedText => this.setState({ quest_frenchTranslation: insertedText })}
                    />
                </View>

                <TouchableOpacity
                    disabled={this.state.disabled}
                    onPress={() => this.createQuestion()}
                    style={styles.createQuestion}>
                    <Ionicons name="ios-cloud-upload" size={40}></Ionicons>
                    <Text>Ajouter</Text>
                </TouchableOpacity>

                {this.state.isLoading ? <ActivityIndicator /> : null}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: "flex",
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 20
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
        elevation: 4,
    },
    inputSuccess: {
        borderWidth: 3,
        borderColor: "green"
    },
    inputFail: {
        borderWidth: 3,
        borderColor: "tomato",
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
    flagSuccess: {
        backgroundColor: "green",
        color: "#fff"
    },
    flagFail: {
        backgroundColor: "tomato",
        color: "#fff"
    },
    textInput: {
        width: "100%",
        backgroundColor: "white",
        fontSize: 18
    },
    createQuestion: {
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        backgroundColor: "#fff",
        width: "30%",
        height: 100
    }
});
