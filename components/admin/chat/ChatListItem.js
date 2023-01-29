import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import getDimensions from '../../../config/getDimensions';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const ChatListItem = ({
  chatId,
  customerDocId,
  customerImageUrl,
  customerName,
  navigation,
  laundryShopName,
  fabcons,
}) => {
  const [messages, setMessages] = useState([]);
  const [seen, setSeen] = useState(false);
  const [now, setNow] = useState(new Date());
  const { width } = getDimensions();

  const fetchSeen = () => {
    try {
      firebase
        .firestore()
        .collection('customers')
        .doc(customerDocId)
        .collection('chats')

        .onSnapshot((snapshot) => {
          const chatData = [];
          snapshot.forEach((doc) => {
            setSeen(doc.data().adminSeen ? doc.data().adminSeen : false);
            if (doc.data().adminSeen === false) chatData.push(doc.data());
          });
        });
    } catch (error) {
      console.log(err);
    }
  };

  useEffect(() => {
    let mounted = true;
    let unsubscribe;
    if (mounted) {
      fetchSeen();
      unsubscribe = firebase
        .firestore()
        .collection('customers')
        .doc(customerDocId)
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timeStamp', 'desc')
        .onSnapshot((snapshot) => {
          const currentMessages = [];
          snapshot.forEach((doc) => {
            currentMessages.push({ docId: doc.id, data: doc.data() });
          });
          setMessages(currentMessages);
        });
    }
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <>
      {messages[0]?.data?.message && (
        <TouchableNativeFeedback
          onPress={() =>
            navigation.navigate('ChatScreen', {
              chatId: chatId,
              customerDocId: customerDocId,
              customerName: customerName,
              customerImageUrl: customerImageUrl,
              laundryShopName,
              fabcons,
            })
          }
        >
          <View className="flex-row items-center py-4 px-5">
            <Image
              source={{
                uri: `${customerImageUrl}&time=${now}`,
              }}
              className="h-[50px] w-[50px] rounded-full"
            />
            <View>
              <Text
                className="font-bold px-2"
                style={{
                  width: width - 100,
                }}
                numberOfLines={1}
              >
                {customerName}
              </Text>
              <Text
                className={`px-2 text-${seen ? 'gray-300' : 'black'}`}
                style={{
                  width: width - 100,
                }}
                numberOfLines={1}
              >
                {!messages[0]?.data?.payment
                  ? messages[0]?.data?.message
                  : 'payment notice'}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      )}
    </>
  );
};

export default ChatListItem;
