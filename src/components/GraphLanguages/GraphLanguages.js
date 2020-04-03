import React, { Component } from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

import countries from "./../../resources/data/iso_639-2.json";
import styles from "./styles";
import config from "./config";

export default class GraphLanguages extends Component {
  constructor(props) {
    super(props);
  }

  findCountry = codeIso => {
    var getLanguagesByIsoCode = code =>
      countries.filter(
        x => x.Alpha2_Code === code && x.French_Name !== null
      )[0];
    var languageFound = getLanguagesByIsoCode(codeIso);

    // on met en majuscule la premiere lettre
    return languageFound !== undefined
      ? languageFound.French_Name.charAt(0).toUpperCase() +
      languageFound.French_Name.slice(1)
      : codeIso;
  };

  render() {
    var graphArray = this.props.detectedLanguages.slice(0, 5);

    const data = [
      {
        name: this.findCountry(graphArray[0].language).split(/[\s;]/)[0],
        confidence:
          Math.round((graphArray[0].confidence + Number.EPSILON) * 1000) / 10,
        color: "#E56E5B",
        legendFontColor: "#000",
        legendFontSize: 14
      },
      {
        name: this.findCountry(graphArray[1].language).split(/[\s;]/)[0],
        confidence:
          Math.round((graphArray[1].confidence + Number.EPSILON) * 1000) / 10,
        color: "#BF4E74",
        legendFontColor: "#000",
        legendFontSize: 14
      },
      {
        name: this.findCountry(graphArray[2].language).split(/[\s;]/)[0],
        confidence:
          Math.round((graphArray[2].confidence + Number.EPSILON) * 1000) / 10,
        color: "#93455E",
        legendFontColor: "#000",
        legendFontSize: 14
      },
      {
        name: this.findCountry(graphArray[3].language).split(/[\s;]/)[0],
        confidence:
          Math.round((graphArray[3].confidence + Number.EPSILON) * 1000) / 10,
        color: "#721D5A",
        legendFontColor: "#000",
        legendFontSize: 14
      },
      {
        name: this.findCountry(graphArray[4].language).split(/[\s;]/)[0],
        confidence:
          Math.round((graphArray[4].confidence + Number.EPSILON) * 1000) / 10,
        color: "#E8AA9B",
        legendFontColor: "#000",
        legendFontSize: 14
      }
    ];
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.titre}>
          Dispersion des détections de langues (en %)
        </Text>
        <PieChart
          data={data}
          width={config.screenWidth}
          height={150}
          chartConfig={config.chartConfig}
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
