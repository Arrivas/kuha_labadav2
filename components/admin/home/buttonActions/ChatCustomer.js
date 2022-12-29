import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

const ChatCustomer = ({ navigation, bookingDetails }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('ChatStack', {
          screen: 'ChatScreen',
          initial: false,
          params: {
            chatId: bookingDetails.docId,
            customerDocId: bookingDetails.customerDocId,
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
