import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";

export default class QuestionsState extends Component {
    constructor(props) {
        super(props);
    }

    // METHODS
    computeScore = (who, quest_id) => {
        let scoreQuestion = 0;
        scoreQuestion += who.languagePoints[quest_id - 1] + who.translationPoints[quest_id - 1];
        return scoreQuestion;
    };

    render() {
        let questions = this.props.questions;
        let count = this.props.count;
        let questionCount = count + 1;
        let player = this.props.gameStatePlayer;
        let conditionalStyle = "";

        let questionsBtn = questions.map(question => {

            conditionalStyle = (question.quest_id > questionCount)
                ? "toDo"
                : (this.computeScore(player, question.quest_id) == 1)
                    ? "success"
                    : (this.computeScore(player, question.quest_id) == 0.5)
                        ? "semisuccess"
                        : (this.computeScore(player, question.quest_id) == 0)
                            ? "fail"
                            : "selected";

            return (
                <View key={question.quest_id} style={[styles.badge, styles[conditionalStyle]]}>
                    <Text style={[styles.textBtn, styles["textBtn" + conditionalStyle]]}>{question.quest_id}</Text>
                </View>);
        });

        return (
            <View style={styles.questionsState}>
                {questionsBtn}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    questionsState: {
        elevation: 3,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    badge: {
        padding: 5,
        marginHorizontal: 2,
        width: 30,
        height: 30,
        borderRadius: 50
    },
    selected: {
        backgroundColor: "lightgray",
    },
    success: {
        backgroundColor: "green",
    },
    semisuccess: {
        backgroundColor: "orange",
    },
    fail: {
        backgroundColor: "tomato",
    },
    toDo: {
        backgroundColor: "#fafafa",
    },
    textBtn: {
        textAlign: "center",
        color: "#fff"
    },
    textBtnselected: {
        color: "#000",
    },
    textBtnsuccess: {
        color: "#fff",
    },
    textBtnsemisuccess: {
        color: "#fff",
    },
    textBtnfail: {
        color: "#fff",
    },
    textBtntoDo: {
        color: "#000",
    },
});
