import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from "react-native";
import Format from "./../utils/Format";

export default class InputPlayerLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    }

    // CALLBACK
    _onChangeAnswer = answer => {
        this.setState({ input: Format.getFormattedText(answer) })
        this.props.callback(answer);
    }

    // METHODS


    render() {
        let count = this.props.count;
        let player = this.props.gameStatePlayer;
        let typeAnswers = this.props.type + "Answers";
        let typePoints = this.props.type + "Points";

        let inputZone = null;
        let success = null;

        if ((player[typeAnswers])[count] == null) {
            inputZone = (
                <View style={{ width: "100%" }}>
                    <Text style={styles.flag}>{this.props.label}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Votre réponse"
                            onChangeText={insertedText => this._onChangeAnswer(insertedText)}
                        />
                    </View>
                </View>);
        } else {
            success = (player[typePoints])[count] == 0.5 ? "Success" : "Fail";
            inputZone = (
                <View style={{ width: "100%" }}>
                    <Text style={[styles.flag, styles["flag" + success]]}>{this.props.label}</Text>
                    <View style={[styles.inputContainer, styles["input" + success]]}>
                        <Text style={styles.textInput}>{(player[typeAnswers])[count]}</Text>
                    </View>
                </View>);
        }

        return (
            <View>
                {inputZone}
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
        marginBottom: 20,
        backgroundColor: "#fff",
        elevation: 4
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
    }
});
