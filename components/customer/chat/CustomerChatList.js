import { View, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import '@react-native-firebase/firestore';
import { AppContext } from '../../../context/AppContext';
import ChatListItem from './ChatListItem';

const CustomerChatList = ({ navigation }) => {
  const { user } = useContext(AppContext);
  const { confirmedBooking } = user;

  return (
    <ScrollView className="bg-white">
      {confirmedBooking.map((item) => (
        <View key={item.docId}>
          <ChatListItem
            chatId={item.docId}
            navigation={navigation}
            laundry_id={item.laundry_id}
            customerDocId={item.customerDocId}
            driverDetails={item.driverDetails}
            laundryImageUrl={item.laundryImageUrl}
            laundryServiceName={item.laundryServiceName}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default CustomerChatList;
