import React, { Component } from "react";
import {
    Text,
    View,
    Picker
} from "react-native";
import styles from "./styles";

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
                        <Picker.Item label="Italien" value="it" />
                        <Picker.Item label="Arabe" value="ar" />
                        <Picker.Item label="Allemand" value="de" />
                        <Picker.Item label="Polonais" value="pl" />
                        <Picker.Item label="Chinois" value="zh" />
                        <Picker.Item label="Japonais" value="ja" />
                    </Picker>
                </View>
            </View>
        );
    }
}