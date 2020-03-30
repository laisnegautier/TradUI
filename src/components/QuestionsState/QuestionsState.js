import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

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