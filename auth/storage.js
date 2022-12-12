import * as SecureStore from 'expo-secure-store';

const key = 'userId';

const storeId = async (userId) => {
  try {
    await SecureStore.setItemAsync(key, userId);
  } catch (error) {
    console.log('error storing the auth token', error);
  }
};

const getId = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('error getiing the auth token', error);
  }
};

const removeId = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('error removing the auth token', error);
  }
};

// welcome screen
const welcomeKey = 'welcomeScreen';
const setWelcome = async () => {
  try {
    await SecureStore.setItemAsync(welcomeKey, 'notFirst');
  } catch (error) {
    console.log('error setting welcome state', error);
  }
};

const getWelcome = async () => {
  try {
    return await SecureStore.getItemAsync(welcomeKey);
  } catch (error) {
    console.log('error getting welcome state', error);
  }
};

const removeWelcome = async () => {
  try {
    return await SecureStore.deleteItemAsync(welcomeKey);
  } catch (error) {
    console.log('error getting welcome state', error);
  }
};

export default {
  storeId,
  getId,
  removeId,
  setWelcome,
  getWelcome,
  removeWelcome,
};
