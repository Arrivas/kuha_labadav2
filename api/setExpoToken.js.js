import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const expoTokenCustomer = async (userId, token) => {
  const customerRef = await firebase.firestore().collection('customers');

  return customerRef
    .doc(userId)
    .update({ pushToken: token })
    .catch((err) => console.log('cannot udpate pushToken on db', err));
};

const expoTokenDriver = async (userId, token) => {
  const driverRef = await firebase.firestore().collection('drivers');

  return driverRef
    .doc(userId)
    .update({ pushToken: token })
    .catch((err) => console.log('cannot udpate pushToken on db', err));
};

const expoTokenAdmin = async (userId, token) => {
  const adminRef = await firebase.firestore().collection('laundryProviders');

  return adminRef
    .doc(userId)
    .update({ pushToken: token })
    .catch((err) => console.log('cannot udpate pushToken on db', err));
};

export { expoTokenCustomer, expoTokenDriver, expoTokenAdmin };
