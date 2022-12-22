import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';

const HandleDriverButtonAtion = ({ method, status, bookingDetails }) => {
  const startPickup = (
    <TouchableNativeFeedback
      onPress={() => {
        console.log('asd');
      }}
    >
      <View className="self-end p-2">
        <Text>map screen</Text>
      </View>
    </TouchableNativeFeedback>
  );
  return (
    <>
      {method === 'pickup&deliver' && status === 'pick-up' ? (
        startPickup
      ) : (
        <></>
      )}
    </>
  );
};

export default HandleDriverButtonAtion;
