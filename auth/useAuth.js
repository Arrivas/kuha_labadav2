import secureStore from './storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default useAuth = () => {
  const { setUser } = useContext(AppContext);

  const logIn = (uid) => {
    secureStore.storeId(uid);
  };

  const logOut = async () => {
    secureStore.removeId();
    await firebase
      .auth()
      .signOut()
      .then(() => console.log('user signed out'))
      .catch((err) => console.log(err.code));
    setUser(null);
  };

  return { logIn, logOut };
};
