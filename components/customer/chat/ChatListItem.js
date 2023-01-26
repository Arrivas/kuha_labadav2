import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import getDimensions from '../../../config/getDimensions';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const ChatListItem = ({
  chatId,
  customerDocId,
  laundryImageUrl,
  laundryServiceName,
  laundry_id,
  navigation,
}) => {
  const [seen, setSeen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { width } = getDimensions();

  const fetchSeen = () => {
    try {
      firebase
        .firestore()
        .collection('customers')
        .doc(customerDocId)
        .collection('chats')
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            setSeen(doc.data().customerSeen ? doc.data().customerSeen : false);
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
      {messages[0]?.data?.message ? (
        <TouchableNativeFeedback
          onPress={() =>
            navigation.navigate('ChatScreen', {
              chatId,
              laundry_id,
              customerDocId,
              laundryImageUrl,
              laundryServiceName,
            })
          }
        >
          <View className="flex-row items-center py-4 px-5">
            <Image
              source={{ uri: laundryImageUrl }}
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
                {laundryServiceName}
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
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatListItem;
