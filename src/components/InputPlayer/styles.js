import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputContainer: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 0,
        borderColor: "#f1f1f1",
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: "#fff",
        elevation: 4
    },
    inputSuccess: {
        borderWidth: 3,
        borderColor: "green"
    },
    inputFail: {
        borderWidth: 3,
        borderColor: "tomato",
    },
    flag: {
        width: "60%",
        paddingVertical: 5,
        paddingHorizontal: 7,
        backgroundColor: "white",
        elevation: 3,
        fontSize: 12,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        color: "#000",
        marginLeft: 10
    },
    flagSuccess: {
        backgroundColor: "green",
        color: "#fff"
    },
    flagFail: {
        backgroundColor: "tomato",
        color: "#fff"
    },
    textInput: {
        width: "100%",
        backgroundColor: "white",
        fontSize: 18
    }
});

export default styles;