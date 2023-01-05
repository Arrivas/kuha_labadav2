import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

const AddPaymentButton = ({ handleAddPayment }) => {
  return (
    <TouchableWithoutFeedback onPress={handleAddPayment}>
      <View>
        <Text>add payment</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddPaymentButton;
