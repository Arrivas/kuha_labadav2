import { View, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import ChatListItem from './ChatListItem';
import NoItemsYet from '../../NoItemsYet';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const AdminChatList = ({ navigation }) => {
  const { user, setUser } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { laundry_id } = user;
  const { ongoing } = user.pendingServices;

  const onRefresh = () => {
    setRefreshing(true);
    firebase
      .firestore()
      .collection('laundryProviders')
      .doc(laundry_id)
      .get()
      .then((doc) => {
        if (!doc.exists) return console.log('cannot load admin');
        return setUser(doc.data());
      })
      .catch((err) => {
        setRefreshing(false);
        console.log(err);
      });
    setRefreshing(false);
  };

  useEffect(() => {
    let mounted = true;
    const unsubscribe = firebase
      .firestore()
      .collection('customers')
      .doc(ongoing[0]?.customerDetails?.customerDocId)
      .collection('chats')
      .doc(ongoing[0]?.docId)
      .collection('messages')
      .orderBy('timeStamp', 'desc')
      .onSnapshot((data) => {
        if (data.empty) {
          console.log('cannot get messages');
          return setMessages([]);
        }
        const currentMessages = [];
        data.forEach((doc) => {
          currentMessages.push(doc.data());
        });
        setMessages(currentMessages);
      });

    return () => {
      unsubscribe();
      mounted = false;
    };
  }, []);

  return (
    <>
      <ScrollView
        className="bg-white"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {ongoing.map((item) => {
          const { laundryShopDetails, customerDetails, docId, fabcons } = item;
          const { laundry_id, laundryShopName } = laundryShopDetails;
          const { customerDocId, customerName, customerImageUrl } =
            customerDetails;

          return (
            <View key={item.docId}>
              <ChatListItem
                chatId={docId}
                fabcons={fabcons}
                navigation={navigation}
                laundry_id={laundry_id}
                customerName={customerName}
                customerDocId={customerDocId}
                laundryShopName={laundryShopName}
                customerImageUrl={customerImageUrl}
              />
            </View>
          );
        })}
      </ScrollView>
      {messages?.length === 0 && <NoItemsYet />}
    </>
  );
};

export default AdminChatList;
