import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { useState } from "react";

const image = require("../assets/Background_Image.png");

//states passed from Start screen to Chat screen
const Start = ({ navigation }) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={[styles.plainText, styles.setColorWhite]}>
                        Chat Demo
                    </Text>
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder="Your name"
                    />
                    <Text style={{fontWeight: 600}}>Choose Background Color</Text>
                    {/*this container is required to keep radio buttons in line */}
                    <View style={styles.radioButtonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.radioButton,
                                { backgroundColor: "#090C08" },
                            ]}
                            onPress={() => setColor("#090C08")}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.radioButton,
                                { backgroundColor: "#474056" },
                            ]}
                            onPress={() => setColor("#474056")}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.radioButton,
                                { backgroundColor: "#8A95A5" },
                            ]}
                            onPress={() => setColor("#8A95A5")}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.radioButton,
                                { backgroundColor: "#B9C6AE" },
                            ]}
                            onPress={() => setColor("#B9C6AE")}
                        ></TouchableOpacity>
                    </View>
                    {/*passes states to Chat and adds defaults for when nothing is entered or selected*/}
                    <TouchableOpacity
                        style={styles.button}
                        title="Go to Chat"
                        onPress={() =>
                            navigation.navigate("Chat", {
                                name: name ? name : "User",
                                color: color ? color : "white",
                            })
                        }
                    >
                        <Text style={styles.buttonText}>Start chatting</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    subContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "88%",
    },
    plainText: {
        height: 80,
        fontWeight: "600",
        fontSize: 45,
        padding: 10,
    },
    textInput: {
        width: "88%",
        padding: 15,
        fontWeight: "300",
        fontSize: 16,
        borderWidth: 3,
        marginTop: 15,
        marginBottom: 30,
        borderRadius: 10,
    },
    radioButtonContainer: {
        width: "70%",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 30,
    },
    radioButton: {
        backgroundColor: "#FFFFFF",
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    button: {
        alignItems: "center",
        width: "88%",
        paddingVertical: 17,
        backgroundColor: "#757083",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    setColorWhite: {
        color: "#FFFFFF",
    },
});

export default Start;
