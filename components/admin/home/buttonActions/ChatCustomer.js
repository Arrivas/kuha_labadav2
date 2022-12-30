import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

const ChatCustomer = ({ navigation, bookingDetails }) => {
  const {
    docId,
    customerDocId,
    customerName,
    customerImageUrl,
    laundryServiceName,
  } = bookingDetails;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('ChatStack', {
          screen: 'ChatScreen',
          initial: false,
          params: {
            chatId: docId,
            customerDocId: customerDocId,
            customerName: customerName,
            customerImageUrl: customerImageUrl,
            laundryServiceName,
          },
        });
      }}
    >
      <View>
        <Text>Message</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatCustomer;
