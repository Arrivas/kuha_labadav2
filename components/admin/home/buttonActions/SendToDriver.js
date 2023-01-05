import {
  View,
  Text,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { expoNotificationApi } from '../../../../api/sendNotification';

const PaymentConfirmed = ({ bookingDetails }) => {
  const { driverDetails, laundryServiceName, customerName } = bookingDetails;

  const handleNotifyDriver = () => {
    const driversRef = firebase.firestore().collection('drivers');
    driversRef
      .doc(driverDetails.docId)
      .get()
      .then((doc) => {
        if (!doc.exists) return;
        const notifObject = {
          title: laundryServiceName,
          body: `${laundryServiceName} is requesting you to deliver the laundry of ${customerName}`,
          read: false,
          timeStamp: new Date().toISOString(),
        };
        const currentDriver = doc.data();
        currentDriver.notifications.push(notifObject);
        driversRef.doc(driverDetails.docId).update(currentDriver);
        // send notif if driver is logged in
        expoNotificationApi.post('/', {
          to: currentDriver.pushToken,
          title: laundryServiceName,
          body: `${laundryServiceName} is requesting you to deliver the laundry of ${customerName}`,
          sound: 'default',
        });
      })
      .catch((err) => console.log(err));
    ToastAndroid.show('driver notifed', ToastAndroid.SHORT);
  };

  return (
    <TouchableNativeFeedback onPress={handleNotifyDriver}>
      <View className="py-2">
        <Text>notify driver</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default PaymentConfirmed;
