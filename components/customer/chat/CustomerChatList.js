import { View, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { AppContext } from '../../../context/AppContext';
import ChatListItem from './ChatListItem';
import NoItemsYet from '../../NoItemsYet';

const CustomerChatList = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const { confirmedBooking, docId } = user;

  const onRefresh = () => {
    setRefreshing(true);
    firebase
      .firestore()
      .collection('customers')
      .doc(docId)
      .get()
      .then((doc) => {
        if (!doc.exists) return console.log('cannot load user');
        return setUser(doc.data());
      })
      .catch((err) => {
        setRefreshing(false);
        console.log(err);
      });
    setRefreshing(false);
  };

  const fetchMessage = () => {
    firebase
      .firestore()
      .collection('customers')
      .doc(confirmedBooking[0]?.customerDetails?.customerDocId)
      .collection('chats')
      .doc(confirmedBooking[0]?.docId)
      .collection('messages')
      .orderBy('timeStamp', 'desc')
      .get()
      .then((data) => {
        if (data.empty) return console.log('cannot get messages');
        const currentMessages = [];
        data.forEach((doc) => {
          currentMessages.push(doc.data());
        });
        setMessages(currentMessages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchMessage();
    }
    return () => {
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
        {confirmedBooking.map((item) => {
          const { laundryShopDetails, customerDetails, docId } = item;
          const { laundry_id, laundryImageUrl, laundryShopName } =
            laundryShopDetails;
          const { customerDocId } = customerDetails;
          return (
            <View key={docId}>
              <ChatListItem
                chatId={docId}
                navigation={navigation}
                laundry_id={laundry_id}
                customerDocId={customerDocId}
                laundryImageUrl={laundryImageUrl}
                laundryServiceName={laundryShopName}
              />
            </View>
          );
        })}
      </ScrollView>
      {messages?.length === 0 && <NoItemsYet />}
    </>
  );
};

export default CustomerChatList;
