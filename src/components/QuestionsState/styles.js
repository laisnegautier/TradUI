import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    questionsState: {
        elevation: 3,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    badge: {
        padding: 5,
        marginHorizontal: 2,
        width: 30,
        height: 30,
        borderRadius: 50
    },
    selected: {
        backgroundColor: "lightgray",
    },
    success: {
        backgroundColor: "green",
    },
    semisuccess: {
        backgroundColor: "orange",
    },
    fail: {
        backgroundColor: "tomato",
    },
    toDo: {
        backgroundColor: "#fafafa",
    },
    textBtn: {
        textAlign: "center",
        color: "#fff"
    },
    textBtnselected: {
        color: "#000",
    },
    textBtnsuccess: {
        color: "#fff",
    },
    textBtnsemisuccess: {
        color: "#fff",
    },
    textBtnfail: {
        color: "#fff",
    },
    textBtntoDo: {
        color: "#000",
    },
});

export default styles;