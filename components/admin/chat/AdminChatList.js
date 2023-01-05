import { View, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import '@react-native-firebase/firestore';
import { AppContext } from '../../../context/AppContext';
import ChatListItem from './ChatListItem';

const AdminChatList = ({navigation}) => {
  const { user } = useContext(AppContext);
  const { ongoing } = user.pendingServices;
  return (
    <ScrollView className="bg-white">
      {ongoing.map((item) => (
        <View key={item.docId}>
          <ChatListItem
            chatId={item.docId}
            navigation={navigation}
            laundry_id={item.laundry_id}
            customerName={item.customerName}
            customerDocId={item.customerDocId}
            driverDetails={item.driverDetails}
            laundryServiceName={item.laundryServiceName}
            customerImageUrl={item.customerImageUrl}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default AdminChatList;
