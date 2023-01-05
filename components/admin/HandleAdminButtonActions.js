import { View, Text, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

// buttons
import ChatCustomer from './home/buttonActions/ChatCustomer';
import SendToDriver from './home/buttonActions/SendToDriver';

const HandleAdminBookingActions = ({ method, status, bookingDetails }) => {
  const navigation = useNavigation();

  return (
    <View className="self-end">
      {status === 'waiting for a driver' ? (
        <></>
      ) : method === 'pickup&deliver' && status === 'picked-up' ? (
        <ChatCustomer navigation={navigation} bookingDetails={bookingDetails} />
      ) : method === 'pickup&deliver' && status === 'estimated payment' ? (
        <SendToDriver bookingDetails={bookingDetails} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default HandleAdminBookingActions;
