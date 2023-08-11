import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    const [messages, setMessages] = useState([]);
    const { name, color, uid } = route.params;

    let unsubMessages;

    // added system avatar
    const chatAvatar = require("../assets/Hal.jpg");

    // Append new message to firestore
    const onSend = newMessages => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    // attempted to change systemMessage text color
    // const customSystemMessage = props => {
    //   return (
    //     <SystemMessage
    //     {...props}
    //     textStyle={{
    //       color: "#FFF"
    //     }}
    //     />
    //   )
    // }

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
        // Set navigation options for the title
        navigation.setOptions({ title: name });
        // Create a query to fetch messages from the Firestore collection
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc")
        );
        // Subscribe to real-time updates using onSnapshot
        unsubMessages = onSnapshot(q, docs => {
            let newMessages = [];
            // Process each document and create a new message object
            docs.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                });
            });
            setMessages(newMessages);
        });

        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, []);

    return (
        <View style={[{ backgroundColor: color }, styles.container]}>
            {/*makes sure text is legible w various colors of backgrounds */}
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: uid,
                    name,
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
