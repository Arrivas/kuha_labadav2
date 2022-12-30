import {
  View,
  Text,
  FlatList,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { expoNotificationApi } from '../../../api/sendNotification';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import SafeScreenView from '../../SafeScreenView';
import Icon from '../../Icon';
import colors from '../../../config/colors';
import ActivityIndicator from '../../ActivityIndicator';

const AdminChatScreen = ({ navigation, route }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {
    chatId,
    customerDocId,
    customerName,
    customerImageUrl,
    laundryServiceName,
  } = route.params;
  const [loading, setLoading] = useState(false);

  const getCustomerPushToken = () =>
    firebase
      .firestore()
      .collection('customers')
      .doc(customerDocId)
      .get()
      .then((doc) => doc.data().pushToken);

  const sendMessage = async (e) => {
    const messagesRef = await firebase.firestore().collection('chats');
    e.persist();
    if (!inputMessage.trim() || inputMessage.trim().length >= 255) return;
    Keyboard.dismiss();
    messagesRef.doc(chatId).collection('messages').add({
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: inputMessage,
      from: 'admin',
    });

    // set seen on customer
    setInputMessage('');
    messagesRef.doc(chatId).set(
      {
        customerSeen: false,
      },
      { merge: true }
    );

    // send notif if customer is logged in

    getCustomerPushToken().then((customerPushToken) => {
      if (customerPushToken) console.log(customerPushToken);
      expoNotificationApi.post('/', {
        to: customerPushToken,
        title: laundryServiceName,
        body: inputMessage,
        sound: 'default',
      });
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: customerName || '',
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    let unsubscribe;
    if (mounted) {
      unsubscribe = firebase
        .firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timeStamp', 'desc')
        .onSnapshot((snapshop) => {
          const currentMessages = [];
          snapshop.forEach((doc) => {
            currentMessages.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setMessages(currentMessages);
          setLoading(false);
        });
    }
    setLoading(false);
    return () => {
      unsubscribe();
      mounted = false;
    };
  }, []);

  return (
    <>
      <ActivityIndicator isVisible={loading} />
      <SafeScreenView>
        <KeyboardAvoidingView
          className="flex-1"
          behavior="height"
          keyboardVerticalOffset={100}
        >
          {messages.length !== 0 ? (
            <FlatList
              style={{
                // height: height - 1120,
                flex: 1,
              }}
              inverted
              className="px-3"
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index, separators }) => (
                <ScrollView style={{ scaleY: -1 }}>
                  <>
                    {item.data.from === 'admin' ? (
                      <View
                        key={index}
                        className={`bg-[${colors.primary}] self-end p-2 px-3 my-1 max-w-[80%] rounded-l-3xl rounded-t-3xl`}
                      >
                        <Text className="text-white">{item.data.message}</Text>
                      </View>
                    ) : (
                      <></>
                    )}
                  </>
                </ScrollView>
              )}
            />
          ) : (
            <></>
          )}
          <View className="px-3 my-2">
            <View className="flex-row items-center justify-between">
              <TextInput
                name="chat"
                value={inputMessage}
                className="h-[40px] bg-gray-100 rounded-full px-2"
                style={{
                  width: '90%',
                }}
                onChangeText={(text) => setInputMessage(text)}
              />
              <TouchableNativeFeedback
                onPress={sendMessage}
                background={TouchableNativeFeedback.Ripple('#c7c7c7', true)}
              >
                <View className="rounded-full items-center justify-center">
                  <Icon
                    iconName="send"
                    color={colors.primary}
                    iconLibrary="MaterialIcons"
                    size={30}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeScreenView>
    </>
  );
};

export default AdminChatScreen;
