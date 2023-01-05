import { View, Text, TouchableNativeFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { expoNotificationApi } from '../../../api/sendNotification';
import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

// buttons
import StartPickup from './buttonActions/StartPickup';
import PickedUp from './buttonActions/PickedUp';
import Deliver from './buttonActions/Deliver';

const HandleDriverButtonAtion = ({ method, status, bookingDetails }) => {
  const { user } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View className="flex-row self-end">
      {method === 'pickup&deliver' && status === 'pick-up' ? (
        <StartPickup
          expoNotificationApi={expoNotificationApi}
          driverDetails={user}
          bookingDetails={bookingDetails}
          navigation={navigation}
          firebase={firebase}
        />
      ) : method === 'pickup&deliver' && status === 'picked-up' ? (
        <PickedUp navigation={navigation} bookingDetails={bookingDetails} />
      ) : (method === 'pickup&deliver' && status === 'estimated payment') ||
        (method === 'pickup&deliver' && status === 'out for delivery') ? (
        <Deliver
          navigation={navigation}
          bookingDetails={bookingDetails}
          driverDetails={user}
          firebase={firebase}
          expoNotificationApi={expoNotificationApi}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default HandleDriverButtonAtion;
