import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { getQuestions } from "../services/api/questionGame";

export default class GameRules extends Component {
    static navigationOptions = { title: "Règles du jeu" };

    constructor(props) {
        super(props);
        this.state = {
            questionsData: [],
            isLoading: false,
            disabledBtn: false
        };
    }

    questions = () => {
        this.setState({ isLoading: true });

        getQuestions().then(responseJson => {
            // Showing response message coming from server after inserting records.
            this.setState({
                questionsData: responseJson,
                isLoading: false,
                disabledBtn: false
            });
            this.props.navigation.navigate("Questions", { questionsData: this.state.questionsData });
        })
            .catch(error => {
                console.error(error);
                this.setState({ isLoading: false });
            });
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.title}>
                    <Ionicons name="ios-help-circle-outline" size={50}></Ionicons>
                    <Text style={styles.catchphrase}>Parviendrez-vous à battre IBM Watson translator ?</Text>
                </View>

                <View style={styles.separator} />

                <Text style={styles.description}>
                    L'objectif du jeu : trouver la langue et la traduction des mots
                    proposés !
          </Text>

                <TouchableOpacity
                    style={styles.inputContainer}
                    // disabledBtn to avoid multiple queries at the same time
                    disabled={this.state.disabledBtn}
                    onPress={() => this.questions()}>
                    <View style={styles.ioniconsMegaphone1}>
                        <Ionicons name="ios-play-circle" size={25}></Ionicons>
                    </View>
                    <Text style={styles.buttonStartGame}>{this.state.isLoading ? <ActivityIndicator style={{ width: 170, height: 50 }} /> : "Commencer le jeu !"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => this.props.navigation.navigate("AddQuestion")}>
                    <View style={styles.ioniconsMegaphone1}>
                        <Ionicons name="ios-add-circle-outline" size={25}></Ionicons>
                    </View>
                    <Text style={styles.buttonAddTrad}>Ajouter une question</Text>
                </TouchableOpacity>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: "flex",
        backgroundColor: "#fff",
        alignItems: "center"
    },
    inputContainer: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 0,
        borderColor: "#f1f1f1",
        borderRadius: 5,
        marginTop: 20,
        backgroundColor: "white",
        elevation: 4
    },
    separator: {
        width: "60%",
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
    },
    title: {
        display: "flex",
        alignItems: "center",
        marginVertical: 20
    },
    catchphrase: {
        fontSize: 18,
        textAlign: "center"
    },
    description: {
        width: "90%",
        textAlign: "center"
    },
    ioniconsMegaphone1: {
        backgroundColor: "#fafafa",
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 100
    },
    buttonStartGame: {
        width: "70%",
        // color: "green",
        marginLeft: 25,
        fontSize: 18
    },
    buttonAddTrad: {
        width: "70%",
        color: "black",
        marginLeft: 25,
        fontSize: 18
    }
});
