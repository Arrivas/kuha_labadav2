import { View, Text, Alert, TouchableNativeFeedback } from 'react-native';
import React from 'react';

const PickedUp = ({ navigation, bookingDetails }) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigation.navigate('ToShopMapScreen', {
          laundry_id: bookingDetails.laundry_id,
        });
      }}
    >
      <View>
        <Text>map screen</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default PickedUp;
