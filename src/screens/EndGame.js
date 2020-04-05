import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { getQuestions } from "../services/api/questionGame";

export default class GameRules extends Component {
    static navigationOptions = { title: "Fin du jeu" };

    constructor(props) {
        super(props);
        this.state = {
            scorePlayer: 0,
            scoreIBM: 0
        };
    }

    // METHODS
    computeScore = (languagePoints, translationPoints) => {
        let score = 0;

        for (let i = 0; i < languagePoints.length; i++)
            score = score + languagePoints[i] + translationPoints[i];

        return score;
    };

    render() {
        const questions = this.props.navigation.getParam("questionsData", "Error");
        const player = this.props.navigation.getParam("gameStatePlayer", "Error");
        const IBM = this.props.navigation.getParam("gameStateIBM", "Error");

        let displayAnswers = questions.map(questions =>
            <View key={questions.quest_id} style={styles.answers}>
                <Text style={styles.question}>Question {questions.quest_id}</Text>
                <Text style={styles.word}>{questions.quest_word}</Text>

                <Text style={styles.t}>Langue</Text>
                <View style={styles.inline}>
                    <View style={styles.answerBox}>
                        <Text>Vous : {player.languageAnswers[questions.quest_id - 1] != "" ? player.languageAnswers[questions.quest_id - 1] != "" : "[aucune]"}</Text>
                        {player.languagePoints[questions.quest_id - 1] != 0 ?
                            <Ionicons name="ios-checkmark-circle-outline" color="green" size={30}></Ionicons> : <Ionicons name="ios-close-circle-outline" color="red" size={30}></Ionicons>}
                    </View>
                    <View style={styles.answerBox}>
                        <Text>IBM : {IBM.languageAnswers[questions.quest_id - 1]}</Text>
                        {IBM.languagePoints[questions.quest_id - 1] != 0 ?
                            <Ionicons name="ios-checkmark-circle-outline" color="green" size={30}></Ionicons> : <Ionicons name="ios-close-circle-outline" color="red" size={30}></Ionicons>}
                    </View>
                </View>
                <Text style={styles.t}>Traduction</Text>
                <View style={styles.inline}>
                    <View style={styles.inline}>
                        <View style={styles.answerBox}>
                            <Text>Vous : {player.translationAnswers[questions.quest_id - 1] != "" ? player.translationAnswers[questions.quest_id - 1] : "[aucune]"}</Text>
                            {player.translationPoints[questions.quest_id - 1] != 0 ?
                                <Ionicons name="ios-checkmark-circle-outline" color="green" size={30}></Ionicons> : <Ionicons name="ios-close-circle-outline" color="red" size={30}></Ionicons>}
                        </View>
                        <View style={styles.answerBox}>
                            <Text>IBM : {IBM.translationAnswers[questions.quest_id - 1]}</Text>
                            {IBM.translationPoints[questions.quest_id - 1] != 0 ?
                                <Ionicons name="ios-checkmark-circle-outline" color="green" size={30}></Ionicons> : <Ionicons name="ios-close-circle-outline" color="red" size={30}></Ionicons>}
                        </View>
                    </View>
                    {/* <Text>Votre rep : {player.translationAnswers[questions.quest_id]} et c'est {player.translationPoints[questions.quest_id] != 0 ? "correct" : "faux"}</Text>
                    <Text>Reponse d'IBM {IBM.translationAnswers[questions.quest_id]} et c'est {IBM.translationPoints[questions.quest_id] != 0 ? "correct" : "faux"}</Text> */}
                </View>
            </View>
        );
        return (
            <View style={styles.bigContainer}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.endGame}>
                            <Text style={styles.catchphrase}>Vous avez... {this.computeScore(player.languagePoints, player.translationPoints)} points !</Text>
                            <Text style={styles.catchphrase}>IBM a... {this.computeScore(IBM.languagePoints, IBM.translationPoints)} points !</Text>
                            <Text style={styles.title}>
                                {this.computeScore(player.languagePoints, player.translationPoints) >= this.computeScore(IBM.languagePoints, IBM.translationPoints)
                                    ? "Gagné !"
                                    : "Perdu !"}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('GameRules')}
                            style={styles.replay}>
                            <View style={{ display: "flex", alignItems: "center" }}>
                                <Ionicons name="ios-refresh" color="green" size={40}></Ionicons>
                                <Text style={{ fontSize: 18 }}>Rejouer ?</Text>
                            </View>
                        </TouchableOpacity>
                        {displayAnswers}

                    </View >
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    bigContainer: {
        height: "100%",
        backgroundColor: "#fff"
    },
    container: {
        height: "100%",
        display: "flex",
        backgroundColor: "#fff",
        alignItems: "center",
        paddingBottom: 20
    },
    endGame: {
        width: "100%",
        backgroundColor: "#f3f3f3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    catchphrase: {
        fontSize: 20
    },
    title: {
        fontSize: 40,
        fontStyle: "italic",
        fontFamily: "serif"
    },
    answers: {
        width: "90%",
        backgroundColor: "white",
        elevation: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 20
    },
    separator: {
        width: "60%",
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
    },
    question: {
        fontSize: 18
    },
    word: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 20,
        fontStyle: "italic",
        fontFamily: "serif"
    },
    inline: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    answerBox: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        minWidth: 90,
        height: 90,
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#f3f3f3"
    },
    t: {
        width: "100%",
        fontWeight: "bold"
    },
    replay: {
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        backgroundColor: "#fff",
        width: "30%",
        height: 100,
        marginTop: 20
    }
});
