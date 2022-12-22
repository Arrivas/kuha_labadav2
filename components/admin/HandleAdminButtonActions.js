import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const HandleAdminBookingActions = ({ method, status, bookingDetails }) => {
  const notifyDriver = (
    <TouchableNativeFeedback
      onPress={() => {
        // const driversRef = firebase.firestore().collection('drivers');
      }}
    >
      <View className="self-end p-2">
        <Text>notify driver</Text>
      </View>
    </TouchableNativeFeedback>
  );

  return (
    <>
      {status === 'waiting for a driver' ? (
        <></>
      ) : method === 'pickup&deliver' && status === 'picked-up' ? (
        notifyDriver
      ) : (
        <></>
      )}
    </>
  );
};

export default HandleAdminBookingActions;
