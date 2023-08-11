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

const firebaseConfig = {
  apiKey: "AIzaSyDMqYQ5nTthzBd4E669Ku4Oe3l-7uQaVys",
  authDomain: "chatapp-11e31.firebaseapp.com",
  projectId: "chatapp-11e31",
  storageBucket: "chatapp-11e31.appspot.com",
  messagingSenderId: "317111370639",
  appId: "1:317111370639:web:07c5d289e3f3fe7a3c81fa",
  measurementId: "G-154MGBMRTP"
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