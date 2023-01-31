import {
  View,
  Text,
  FlatList,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { expoNotificationApi } from '../../../api/sendNotification';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import SafeScreenView from '../../SafeScreenView';
import Icon from '../../Icon';
import colors from '../../../config/colors';
import ActivityIndicator from '../../ActivityIndicator';
import AddPaymentButton from './AddPaymentButton';
import CreatePayment from './CreatePayment';

const AdminChatScreen = ({ navigation, route }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatDetails, setChatDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    chatId,
    customerDocId,
    customerName,
    customerImageUrl,
    laundryServiceName,
    fabcons,
  } = route.params;
  const [now, setNow] = useState(new Date());

  const getCustomerPushToken = () =>
    firebase
      .firestore()
      .collection('customers')
      .doc(customerDocId)
      .get()
      .then((doc) => doc.data().pushToken);

  const sendMessage = (e) => {
    const messagesRef = firebase
      .firestore()
      .collection('customers')
      .doc(customerDocId)
      .collection('chats');

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
        chatId,
      },
      { merge: true }
    );

    // send notif if customer is logged in
    getCustomerPushToken().then((customerPushToken) => {
      expoNotificationApi.post('/', {
        to: customerPushToken,
        title: laundryServiceName,
        body: inputMessage,
        sound: 'default',
      });
    });
  };

  const seenMessage = () => {
    const messagesRef = firebase
      .firestore()
      .collection('customers')
      .doc(customerDocId)
      .collection('chats');
    messagesRef.doc(chatId).set(
      {
        adminSeen: true,
      },
      { merge: true }
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: customerName || '',
      headerRight: chatDetails?.estimatedPayment
        ? null
        : () => <AddPaymentButton handleAddPayment={handleAddPayment} />,
    });
  }, [chatDetails]);

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    let unsubscribe;
    let getChatDetails;
    if (mounted) {
      unsubscribe = firebase
        .firestore()
        .collection('customers')
        .doc(customerDocId)
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
      getChatDetails = firebase
        .firestore()
        .collection('customers')
        .doc(customerDocId)
        .collection('chats')
        .onSnapshot((data) => {
          let currentChatDetails;
          data.forEach((doc) => {
            currentChatDetails = doc.data();
          });
          setChatDetails(currentChatDetails);
        });
    }
    seenMessage();
    setLoading(false);
    return () => {
      unsubscribe();
      getChatDetails();
      mounted = false;
    };
  }, []);

  const handleAddPayment = () => setIsModalVisible(!isModalVisible);

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
              renderItem={({ item, index }) => {
                let sum = 0;
                if (item.data.payment) {
                  for (
                    let i = 0;
                    i < item?.data?.message?.payment.length;
                    i++
                  ) {
                    sum +=
                      item.data.message.payment[i][
                        `${Object.keys(item?.data?.message?.payment[i])[0]}`
                      ];
                  }
                }
                return (
                  <ScrollView style={{ scaleY: -1 }}>
                    <>
                      {item.data.from === 'admin' && !item?.data?.payment ? (
                        <View
                          key={index}
                          className={`bg-[${colors.primary}] self-end p-2 px-3 my-1 max-w-[70%] rounded-l-3xl rounded-t-3xl`}
                        >
                          <Text className="text-white">
                            {item.data.message}
                          </Text>
                        </View>
                      ) : item.data.from === 'customer' &&
                        !item?.data?.payment ? (
                        <View className="flex-row items-center">
                          <Image
                            key={new Date()}
                            className="h-[25px] w-[25px] rounded-full mr-1"
                            source={{
                              uri: customerImageUrl + '&time=' + now,
                            }}
                          />
                          <View
                            key={index}
                            className={`bg-gray-200 self-start p-2 px-3 my-1 max-w-[70%] rounded-full`}
                          >
                            <Text>{item.data.message}</Text>
                          </View>
                        </View>
                      ) : (
                        <>
                          <View
                            className="self-end p-2 rounded-t-xl rounded-l-xl max-w-[70%] mt-1"
                            style={{
                              backgroundColor: colors.primary,
                            }}
                          >
                            <Text className="font-semibold text-white text-lg pb-1">
                              Payment Notice
                            </Text>
                            {item.data.message.payment.map((item, index) => {
                              const key = Object.keys(item);
                              return (
                                <View
                                  key={index}
                                  className="flex-row justify-between"
                                >
                                  <Text className="text-white max-w-[60%]">
                                    {key[0]}
                                  </Text>
                                  <Text className="text-white max-w-[40%]">
                                    {item[key[0]]}
                                  </Text>
                                </View>
                              );
                            })}
                            <View className="flex-row justify-between">
                              <Text className="font-semibold text-white">
                                total
                              </Text>
                              <Text className="font-semibold text-white">
                                {sum}
                              </Text>
                            </View>
                            <Text className="pt-5 text-gray-200">
                              {chatDetails?.estimatedPayment
                                ? 'payment confirmed'
                                : 'waiting for customer to confirm'}
                            </Text>
                          </View>
                        </>
                      )}
                    </>
                  </ScrollView>
                );
              }}
            />
          ) : (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-300">
                  start a conversation with {customerName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          <View className="px-3 my-2">
            <View className="flex-row items-center justify-between">
              <TextInput
                placeholder="message"
                name="chat"
                value={inputMessage}
                className="h-[40px] bg-gray-100 rounded-full px-4"
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
      <CreatePayment
        chatId={chatId}
        fabcons={fabcons}
        customerDocId={customerDocId}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        laundryServiceName={laundryServiceName}
      />
    </>
  );
};

export default AdminChatScreen;
