import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class Score extends Component {
    constructor(props) {
        super(props);
    }

    // METHODS
    computeScore = who => {
        let score = 0;

        for (let i = 0; i < who.languagePoints.length; i++)
            score = score + who.languagePoints[i] + who.translationPoints[i];

        return score;
    };

    render() {
        return (
            <View style={styles.score}>
                <Text>IBM : {this.computeScore(this.props.gameStateIBM)}</Text>
                <Text>Vous : {this.computeScore(this.props.gameStatePlayer)}</Text>
            </View>
        );
    }
}