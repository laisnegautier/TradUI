import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Picker,
    ActivityIndicator
} from "react-native";
import { getDetectionLangue } from "./../helpers/langageTranslatorApi";
import paysLangues from "./../data/iso_639-2.json";

export default class DetectedLanguages extends Component {
    constructor(props) {
        super(props);
        this.state = { detectedLanguages: [], isDetectingLanguages: true, pickerValue: [] };
    }

    // CALLBACKS
    _onDetectedLanguagesChange = newDetectedLanguages => this.props.handleDetectedLanguagesChange(newDetectedLanguages);
    _onChosenInitialLanguageChange = newChosenInitialLanguage => this.props.handleChosenInitialLanguageChange(newChosenInitialLanguage);

    // METHODS
    detecterLangue = (texte) => {
        if (this.props.insertedText !== "") {
            this.setState({ isDetectingLanguages: true });

            getDetectionLangue(texte)
                .then(jsonResponse => {
                    jsonResponse.languages;
                    this.setState({ detectedLanguages: jsonResponse.languages });
                    this._onDetectedLanguagesChange(jsonResponse.languages);
                    this._onChosenInitialLanguageChange(jsonResponse.languages[0].language);
                    this.setState({ isDetectingLanguages: false });
                })
                .catch(error => { alert(error.message); });
        }
    };

    paysCorrespondant = codeIso => {
        var getLanguesParIsoCode = (code) => paysLangues.filter(x => x.Alpha2_Code === code && x.French_Name !== null)[0];
        var langueTrouvee = getLanguesParIsoCode(codeIso);

        // on met en majuscule la premiere lettre
        return (langueTrouvee !== undefined) ? langueTrouvee.French_Name.charAt(0).toUpperCase() + langueTrouvee.French_Name.slice(1) : codeIso;
    }

    pickerChange(value, index) {
        this.state.detectedLanguages.map((v, i) => {
            if (index === i) {
                this.setState({
                    chosenInitialLanguage: this.state.detectedLanguages[index].language,
                    pickerValue: this.state.detectedLanguages[index].language
                })
            }
        });
    }

    componentDidMount() {
        if (this.props.insertedText !== "") {
            this.detecterLangue(this.props.insertedText);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.insertedText !== this.props.insertedText && this.props.insertedText !== "") {
            this.detecterLangue(this.props.insertedText);
        }
        if (prevProps.insertedText !== this.props.insertedText && this.props.insertedText === "") {
            this.setState({ detectedLanguages: [], isDetectingLanguages: false });
        }
    }

    render() {
        // CONDITIONAL DISPLAY
        var picker = "";
        this.state.detectedLanguages.length === 0
            ? picker = (
                <Picker
                    selectedValue={this.state.detectedLanguages[0]}
                    style={{ width: 170 }}
                    onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}
                ><Picker.Item label="En attente de texte" value="0" />
                </Picker>)
            : picker = (
                <Picker
                    selectedValue={this.state.pickerValue}
                    style={{ width: 170 }}
                    onValueChange={(itemValue, itemIndex) => { this.pickerChange(itemValue, itemIndex) }}
                >
                    {this.state.detectedLanguages.map(v => <Picker.Item key={v.language} label={this.paysCorrespondant(v.language)} value={v.language} />)}
                </Picker>);

        // FINAL DISPLAY
        return (
            <View style={styles.linePicker}>
                <Text style={styles.smallText}>Langue détectée : </Text>
                <View style={styles.picker}>
                    {this.state.isDetectingLanguages ? <ActivityIndicator style={{ width: 170, height: 50 }} /> : picker}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    linePicker: {
        flexDirection: "row",
        width: "90%",
        marginBottom: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },
    smallText: {
        fontSize: 15
    },
    picker: {
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#fff",
        borderRadius: 5,
        elevation: 4
    }
});
