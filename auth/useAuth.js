import secureStore from './storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  expoTokenCustomer,
  expoTokenHigherAdmin,
  expoTokenAdmin,
} from '../api/setExpoToken.js';

const useAuth = () => {
  const { user, setUser } = useContext(AppContext);

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

    // remove expo token
    if (user?.userType === 'customer')
      return expoTokenCustomer(user?.docId.trim(), '');
    else if (user?.userType === 'admin')
      return expoTokenAdmin(user?.laundry_id.trim(), '');
    else if (user?.userType === 'higherAdmin')
      return expoTokenHigherAdmin(user?.docId.trim(), '');
  };

  return { logIn, logOut };
};

export default useAuth;
