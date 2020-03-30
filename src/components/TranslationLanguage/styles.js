import { StyleSheet } from "react-native";

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

export default styles;