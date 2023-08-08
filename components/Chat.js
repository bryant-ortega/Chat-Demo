import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const { name, color } = route.params;
    
    // added system avatar
    const chatAvatar = require("../assets/Hal.jpg");

    // called when a user sends a message
    const onSend = newMessages => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages)
        );
    };

// text bubble customization 
    const renderBubble = props => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#800",
                    },
                    left: {
                        backgroundColor: "#FFF",
                    },
                }}
            />
        );
    };

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "You have entered the chat.",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: src=chatAvatar,
                },
            },
            {
                _id: 2,
                text: "This is a system message",
                createdAt: new Date(),
                system: true,
            },
        ]);
        //displays name at the top of chat screen
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[{ backgroundColor: color }, styles.container]}>
            {/*makes sure text is legible w various colors of backgrounds */}
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            {/*fixes keyboard view blocking the textInput on Android */}
            {Platform.OS === "android" ? (
                <KeyboardAvoidingView behavior="height" />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
    },
});

export default Chat;
