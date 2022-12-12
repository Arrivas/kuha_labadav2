import { initializeApp, getApps } from 'firebase/app';
import {
  initializeAuth,
  sendPasswordResetEmail,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  collection,
  doc,
  setDoc,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBLKh-L43KNs6i6gElVru9QLO0i-rZAfdU',
  authDomain: 'labada-app.firebaseapp.com',
  projectId: 'labada-app',
  storageBucket: 'labada-app.appspot.com',
  messagingSenderId: '910338142085',
  appId: '1:910338142085:web:89d5ef9ebfd9dc923c9eec',
};

let app = null;
if (!getApps.length) {
  app = initializeApp(firebaseConfig);
}
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
});

export {
  doc,
  setDoc,
  getAuth,
  onSnapshot,
  collection,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
