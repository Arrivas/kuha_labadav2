import { View, Text, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

// buttons
import ChatCustomer from './home/buttonActions/ChatCustomer';

const HandleAdminBookingActions = ({ method, status, bookingDetails }) => {
  const navigation = useNavigation();

  return (
    <View className="self-end">
      {status === 'waiting for a driver' ? (
        <></>
      ) : method === 'pickup&deliver' && status === 'picked-up' ? (
        <ChatCustomer navigation={navigation} bookingDetails={bookingDetails} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default HandleAdminBookingActions;
