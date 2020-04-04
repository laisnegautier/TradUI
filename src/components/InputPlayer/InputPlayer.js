import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import Format from "./../../resources/utils/Format";
import styles from "./styles";

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
