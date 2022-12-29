import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import secureStore from './auth/storage';
import { AppContext } from './context/AppContext';
import useAuth from './auth/useAuth.js';
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen.js';
import * as Location from 'expo-location';
import { navigationRef } from './navigation/navigationRef';

// stack screens
import AuthStack from './navigation/auth/AuthStack.js';
import CustomerRootScreen from './navigation/customer/CustomerRootScreen';
import DriverRootScreen from './navigation/driver/DriverRootScreen';
import AdminRootScreen from './navigation/admin/AdminRootScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const [isFirstUse, setIsFirstUse] = useState(false);
  const [userCurrentLocation, setUserCurrentLocation] = useState('');
  const { logIn, logOut } = useAuth();

  const getLocationRequest = async () => {
    const res = await Location.requestForegroundPermissionsAsync();
    if (!res.granted)
      return ToastAndroid.show(
        'please enable location to use the app properly.',
        ToastAndroid.SHORT
      );
    const hasPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    if (!latitude) return console.log('cannot get location');
    setUserCurrentLocation({ longitude, latitude });
  };

  const onAuthStateChanged = (user) => {
    if (user) {
      logIn(user?.uid);
      getUserInfo();
    }
  };
  // console.log(user);
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
          if (data.empty) return;
          const currentUser = [];
          data.forEach((doc) => currentUser.push(doc.data()));
          setUser(currentUser[0]);
        })
        .then(() =>
          firebase
            .firestore()
            .collection('drivers')
            .where('userId', '==', uid)
            .limit(1)
            .get()
            .then((data) => {
              if (data.empty) return;
              const currentUser = [];
              data.forEach((doc) => currentUser.push(doc.data()));
              return setUser(currentUser[0]);
            })
            .then(() =>
              firebase
                .firestore()
                .collection('admins')
                .where('userId', '==', uid)
                .limit(1)
                .get()
                .then((data) => {
                  if (data.empty) return;
                  const currentAdmin = [];
                  data.forEach((doc) => currentAdmin.push(doc.data()));
                  firebase
                    .firestore()
                    .collection('laundryProviders')
                    .doc(currentAdmin[0]?.laundry_id)
                    .get()
                    .then((doc) => {
                      if (!doc.exists) return;
                      const admin = doc.data();
                      setUser(admin);
                    });
                })
            )
        )
        .catch((error) => console.log(error));
  };
  const checkFirstUse = async () => {
    const welcomeState = await secureStore.getWelcome();
    if (welcomeState === undefined || welcomeState === null)
      return setIsFirstUse(true);
    setIsFirstUse(false);
  };

  useEffect(() => {
    getLocationRequest();
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    if (firebase.auth().currentUser?.uid) getUserInfo();
    checkFirstUse();
    return () => {
      subscriber;
    };
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <AppContext.Provider
          value={{ user, setUser, userCurrentLocation, setUserCurrentLocation }}
        >
          {isFirstUse ? (
            <WelcomeScreen
              isFirstUse={isFirstUse}
              setIsFirstUse={setIsFirstUse}
            />
          ) : user?.userType === 'customer' ? (
            <CustomerRootScreen />
          ) : user?.userType === 'admin' ? (
            <AdminRootScreen />
          ) : user?.userType === 'driver' ? (
            <DriverRootScreen />
          ) : (
            <AuthStack />
          )}
          <StatusBar style="auto" />
        </AppContext.Provider>
      </NavigationContainer>
    </>
  );
}
