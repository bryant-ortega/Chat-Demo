import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import MapView from "react-native-maps";

// Firebase
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";

//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected }) => {
    const [messages, setMessages] = useState([]);
    const { name, color, uid } = route.params;


    // added system avatar
    // const chatAvatar = require("../assets/Hal.jpg");

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

    const loadCachedMessages = async () => {
        const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
        setMessages(JSON.parse(cachedMessages));
    };

    let unsubMessages;

    useEffect(() => {
        // Set navigation options for the title
        navigation.setOptions({ title: name });

        if (isConnected === true) {
            // unregister current onSnapshot() listener to avoid registering multiple listeners when
            // useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;
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
                cachedMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, [isConnected]);

    const cachedMessages = async messagesToCache => {
        try {
            await AsyncStorage.setItem(
                "messages",
                JSON.stringify(messagesToCache)
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const renderInputToolbar = props => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    const renderCustomActions = props => {
      return <CustomActions {...props} />;
    };

    const renderCustomView = props => {
      const { currentMessage } = props;
      if (currentMessage.location) {
        return (
          <MapView 
            style={{width: 150, 
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        );
      }
      return null;
    }

    return (
        <View style={[{ backgroundColor: color }, styles.container]}>
            {/*makes sure text is legible w various colors of backgrounds */}
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                    _id: userID,
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
