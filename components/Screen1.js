import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";



const Screen1 = ({ navigation }) => {

  const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.plainText}>Hello Screen1!</Text>
            <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your first name"
            />
            <TouchableOpacity
                style={styles.button}
                title="Go to Screen 2"
                onPress={() => navigation.navigate("Screen2", { name: name })}
            >
                <Text style={styles.buttonText}>Go to Screen 2</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 15,
        marginBottom: 10,
    },
    plainText: {
        height: 80,
        fontWeight: "600",
        fontSize: 44,
        padding: 10,
    },
    textInput: {
        width: "76%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 35,
    },
    button: {
        alignItems: "center",
        width: "50%",
        paddingVertical: 20,
        borderWidth: 1,
        backgroundColor: "lightblue",
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000",
    },
});

export default Screen1;
