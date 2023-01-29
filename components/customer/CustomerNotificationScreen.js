import React, { useContext, useLayoutEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import SafeScreenView from '../SafeScreenView';
import NotificationItem from './notifications/NotificationItem';
import { AppContext } from '../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import NotItemsYet from '../NoItemsYet';

const CustomerNotificationScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AppContext);
  const { notifications } = user;

  const handleClearNotification = () => {
    const userCopy = { ...user };
    userCopy.notifications = [];
    firebase
      .firestore()
      .collection('customers')
      .doc(user.docId)
      .update(userCopy)
      .then(() => {
        ToastAndroid.show('notification cleared', ToastAndroid.SHORT);
        setUser(userCopy);
      })
      .catch((err) => console.log(err));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableNativeFeedback onPress={handleClearNotification}>
          <View className="py-2">
            <Text>clear all</Text>
          </View>
        </TouchableNativeFeedback>
      ),
    });
  }, []);

  return (
    <SafeScreenView>
      {notifications.length !== 0 ? (
        <ScrollView contentContainerStyle={{ paddingTop: 5 }}>
          <View>
            {notifications.map((item, index) => (
              <NotificationItem notification={item} key={index} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <NotItemsYet />
      )}
    </SafeScreenView>
  );
};

export default CustomerNotificationScreen;
