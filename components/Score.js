import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";

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

const styles = StyleSheet.create({
    score: {
        elevation: 3,
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#fff",
        borderBottomLeftRadius: 5
    }
});
