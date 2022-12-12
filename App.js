import { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/auth/AuthStack.js';
import CustomerRootScreen from './navigation/customer/CustomerRootScreen';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import secureStore from './auth/storage';
import { AppContext } from './context/AppContext';
import useAuth from './auth/useAuth.js';
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [isFirstUse, setIsFirstUse] = useState(false);
  const { logIn, logOut } = useAuth();

  const onAuthStateChanged = (user) => {
    if (user) {
      logIn(user?.uid);
      getUserInfo();
    }
  };

  const getUserInfo = async () => {
    // retrieve uid if available on secure store
    const uid = await secureStore.getId();
    // if available, search for user
    if (uid)
      return firebase
        .firestore()
        .collection('customers')
        .where('userId', '==', uid)
        .limit(1)
        .get()
        .then((data) => {
          const currentUser = [];
          data.forEach((doc) => currentUser.push(doc.data()));
          setUser(currentUser[0]);
        })
        .catch((error) => console.log(error));
  };

  const checkFirstUse = async () => {
    const welcomeState = await secureStore.getWelcome();
    if (welcomeState === undefined || welcomeState === null)
      return setIsFirstUse(true);
    setIsFirstUse(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    if (firebase.auth().currentUser?.uid) getUserInfo();
    checkFirstUse();
    return () => {
      subscriber;
    };
  }, []);

  return (
    <NavigationContainer>
      <AppContext.Provider value={{ user, setUser }}>
        {isFirstUse ? (
          <WelcomeScreen
            isFirstUse={isFirstUse}
            setIsFirstUse={setIsFirstUse}
          />
        ) : user?.userType === 'customer' ? (
          <CustomerRootScreen />
        ) : (
          <AuthStack />
        )}
        <StatusBar style="auto" />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
