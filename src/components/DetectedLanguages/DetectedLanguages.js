import React, { Component } from "react";
import { Text, View, Picker, ActivityIndicator } from "react-native";
import { getLanguageDetection } from "./../../services/api/langageTranslator";
import Format from "./../../resources/utils/Format";
import styles from "./styles";

export default class DetectedLanguages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detectedLanguages: [],
      isDetectingLanguages: false,
      pickerValue: []
    };
  }

  // CALLBACKS
  _onDetectedLanguagesChange = newDetectedLanguages =>
    this.props.handleDetectedLanguagesChange(newDetectedLanguages);
  _onChosenInitialLanguageChange = newChosenInitialLanguage =>
    this.props.handleChosenInitialLanguageChange(newChosenInitialLanguage);

  // METHODS
  detectLanguage = async text => {
    this.setState({ isDetectingLanguages: true });

    try {
      const response = await getLanguageDetection(text);
      const data = (await response.json()).languages;
      this.setState({ detectedLanguages: data });
      this._onDetectedLanguagesChange(data);
      this._onChosenInitialLanguageChange(data[0].language);
    } catch (e) {
      console.log(e.message);
    } finally {
      this.setState({ isDetectingLanguages: false });
    }
  };

  pickerChange(value, index) {
    this.state.detectedLanguages.map((v, i) => {
      if (index === i) {
        this.setState({
          chosenInitialLanguage: this.state.detectedLanguages[index].language,
          pickerValue: this.state.detectedLanguages[index].language
        });
        this._onChosenInitialLanguageChange(
          this.state.detectedLanguages[index].language
        ); //essai
      }
    });
  }

  componentDidMount = () => {
    if (this.props.insertedText !== "")
      this.detectLanguage(this.props.insertedText);
  };

  componentDidUpdate = prevProps => {
    // If the text is not empty after modification then we start detection
    if (
      prevProps.insertedText !== this.props.insertedText &&
      this.props.insertedText !== ""
    ) {
      this.setState({ pickerValue: [] });
      this.detectLanguage(this.props.insertedText);
    }

    // If the text is empty after modification then we stop all detection occuring
    if (
      prevProps.insertedText !== this.props.insertedText &&
      this.props.insertedText === ""
    ) {
      this._onDetectedLanguagesChange([]);
      this._onChosenInitialLanguageChange("");
      this.setState({ detectedLanguages: [], isDetectingLanguages: false });
    }
  };

  render() {
    // CONDITIONAL DISPLAY concerning the picker (if it has some detected languages to display or not + percentages)
    var picker = "";
    this.props.insertedText === "" || this.state.detectedLanguages.length === 0
      ? (picker = (
        <Picker
          selectedValue={this.state.detectedLanguages[0]}
          style={{ width: 170 }}
          onValueChange={(itemValue, itemIndex) =>
            this.pickerChange(itemIndex)
          }
        >
          <Picker.Item label="En attente de texte" value="0" />
        </Picker>
      ))
      : (picker = (
        <Picker
          selectedValue={this.state.pickerValue}
          style={{ width: 170 }}
          onValueChange={(itemValue, itemIndex) => {
            this.pickerChange(itemValue, itemIndex);
          }}
        >
          {this.state.detectedLanguages.map(v => (
            <Picker.Item
              key={v.language}
              label={
                Format.getCountry(v.language) +
                "                      " +
                (v.confidence * 100).toFixed(1) +
                "%"
              }
              value={v.language}
            />
          ))}
        </Picker>
      ));

    // FINAL DISPLAY
    return (
      <View style={styles.linePicker}>
        <Text style={styles.smallText}>Langue détectée : </Text>
        <View style={styles.picker}>
          {this.state.isDetectingLanguages ? (
            <ActivityIndicator style={{ width: 170, height: 50 }} />
          ) : (
              picker
            )}
        </View>
      </View>
    );
  }
}
