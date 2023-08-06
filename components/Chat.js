import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {

  const { name, color } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

    return (
        <View style={[{ backgroundColor: color }, styles.container]}>
            {/*makes sure text is legible w various colors of backgrounds */}
            <Text
                style={
                    color !== "white"
                        ? [{ color: "white" }, styles.title]
                        : styles.title
                }
            >
                Let's Chat!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
    }
});

export default Chat;
