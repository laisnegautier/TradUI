import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Picker
} from "react-native";
import paysLangues from "./../data/iso_639-2.json";

export default class DetectedLanguages extends Component {
    constructor(props) {
        super(props);
    }

    // CALLBACKS
    _onChosenTranslationLanguageChange = newTranslationLanguage => this.props.handleChosenTranslationLanguageChange(newTranslationLanguage);

    render() {
        // FINAL DISPLAY
        return (
            <View style={styles.linePicker}>
                <Text style={styles.smallText}>Traduire en : </Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.props.chosenTranslationLanguage}
                        style={{ width: 170 }}
                        onValueChange={(itemValue, itemIndex) => this._onChosenTranslationLanguageChange(itemValue)}
                    >
                        <Picker.Item label="Anglais" value="en" />
                        <Picker.Item label="Francais" value="fr" />
                        <Picker.Item label="Espagnol" value="es" />
                    </Picker>
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
