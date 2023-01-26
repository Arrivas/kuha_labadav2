import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

const ChatCustomer = ({ navigation, bookingDetails }) => {
  const { docId, customerDetails, laundryShopDetails, fabcons } =
    bookingDetails;
  const { customerImageUrl, customerName, customerDocId } = customerDetails;
  const { laundryShopName } = laundryShopDetails;

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
            laundryServiceName: laundryShopName,
            fabcons,
          },
        });
      }}
    >
      <View className="mx-2">
        <Text>message</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatCustomer;
