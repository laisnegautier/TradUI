import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "65%",
        height: 100,
        flexDirection: "column",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 0,
        borderColor: "#f1f1f1",
        borderRadius: 5,
        backgroundColor: "#fff",
        elevation: 4,
        marginBottom: 20
    },
    titleView: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 10
    },
    title: {
        fontWeight: "bold",
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    textFound: {
        fontStyle: "italic",
        fontFamily: "serif"
    },
    inline: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default styles;