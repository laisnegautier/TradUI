import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

import { Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width * 0.9);
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import paysLangues from "./../data/iso_639-2.json";

export default class GraphLanguages extends Component {
    constructor(props) {
        super(props);
    }

    paysCorrespondant = codeIso => {
        var getLanguesParIsoCode = code =>
            paysLangues.filter(
                x => x.Alpha2_Code === code && x.French_Name !== null
            )[0];
        var langueTrouvee = getLanguesParIsoCode(codeIso);

        // on met en majuscule la premiere lettre
        return langueTrouvee !== undefined
            ? langueTrouvee.French_Name.charAt(0).toUpperCase() +
            langueTrouvee.French_Name.slice(1)
            : codeIso;
    };

    render() {
        var graphArray = this.props.detectedLanguages.slice(0, 5);

        const data = [
            {
                name: this.paysCorrespondant(graphArray[0].language).split(/[\s;]/)[0],
                confidence: Math.round((graphArray[0].confidence + Number.EPSILON) * 1000) / 10,
                color: "#E56E5B",
                legendFontColor: "#000",
                legendFontSize: 14
            },
            {
                name: this.paysCorrespondant(graphArray[1].language).split(/[\s;]/)[0],
                confidence: Math.round((graphArray[1].confidence + Number.EPSILON) * 1000) / 10,
                color: "#BF4E74",
                legendFontColor: "#000",
                legendFontSize: 14
            },
            {
                name: this.paysCorrespondant(graphArray[2].language).split(/[\s;]/)[0],
                confidence: Math.round((graphArray[2].confidence + Number.EPSILON) * 1000) / 10,
                color: "#93455E",
                legendFontColor: "#000",
                legendFontSize: 14
            },
            {
                name: this.paysCorrespondant(graphArray[3].language).split(/[\s;]/)[0],
                confidence: Math.round((graphArray[3].confidence + Number.EPSILON) * 1000) / 10,
                color: "#721D5A",
                legendFontColor: "#000",
                legendFontSize: 14
            },
            {
                name: this.paysCorrespondant(graphArray[4].language).split(/[\s;]/)[0],
                confidence: Math.round((graphArray[4].confidence + Number.EPSILON) * 1000) / 10,
                color: "#E8AA9B",
                legendFontColor: "#000",
                legendFontSize: 14
            }
        ];
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.titre}>Dispersion des détections de langues (en %)</Text>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={150}
                    chartConfig={chartConfig}
                    accessor="confidence"
                    backgroundColor="transparent"
                    paddingLeft="0"
                    style={{ backgroundColor: "#fff", overflow: "visible" }}
                    absolute
                />
            </View>
        );
    }
}

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
};


const styles = StyleSheet.create({
    inputContainer: {
        width: "90%",
        paddingVertical: 12,
        borderWidth: 0,
        borderColor: "#f1f1f1",
        borderRadius: 5,
        backgroundColor: "#fff",
        elevation: 4
    },
    titre: {
        marginLeft: 15
    }
});
