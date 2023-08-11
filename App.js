// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDZqoA9ZuQE2c_xZtUwHp2HA16MZf-ygTk",
        authDomain: "shopping-list-demo-ab103.firebaseapp.com",
        projectId: "shopping-list-demo-ab103",
        storageBucket: "shopping-list-demo-ab103.appspot.com",
        messagingSenderId: "561660294699",
        appId: "1:561660294699:web:91af5f8503798d8f5c5c6e",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Chat" >
                    {props => <Chat db={db} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default App;