import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
  FlatList,
  Keyboard,
  Image,
} from 'react-native';
import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { expoNotificationApi } from '../../../api/sendNotification';
import { AppContext } from '../../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import Icon from '../../Icon';
import colors from '../../../config/colors';
import SafeScreenView from '../../SafeScreenView';

const CustomerChatScreen = ({ route, navigation }) => {
  const { user, setUser } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatDetails, setChatDetails] = useState();
  const [now, setNow] = useState(new Date());
  const {
    chatId,
    customerDocId,
    laundryImageUrl,
    laundryServiceName,
    laundry_id,
    driverDetails,
  } = route.params;

  useEffect(() => {
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
    return () => {
      unsubscribe();
      getChatDetails();
      mounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: laundryServiceName || '',
    });
  }, []);

  const getAdminPushToken = () =>
    firebase
      .firestore()
      .collection('laundryProviders')
      .doc(laundry_id)
      .get()
      .then((doc) => doc.data().pushToken);

  const seenMessage = () => {
    const messagesRef = firebase
      .firestore()
      .collection('customers')
      .doc(customerDocId)
      .collection('chats');
    messagesRef.doc(chatId).set(
      {
        customerSeen: true,
      },
      { merge: true }
    );
  };

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
      from: 'customer',
    });

    setInputMessage('');
    messagesRef.doc(chatId).set(
      {
        adminSeen: false,
      },
      { merge: true }
    );

    // send notif if shop owner is logged in
    getAdminPushToken().then((adminPushToken) => {
      expoNotificationApi.post('/', {
        to: adminPushToken,
        title: laundryServiceName,
        body: inputMessage,
        sound: 'default',
      });
    });
  };

  const handleConfirmPayment = () => {
    const laundryProvRef = firebase.firestore().collection('laundryProviders');
    const driversRef = firebase.firestore().collection('drivers');
    const customerRef = firebase.firestore().collection('customers');
    const messagesRef = firebase
      .firestore()
      .collection('customers')
      .doc(customerDocId)
      .collection('chats');
    laundryProvRef
      .doc(laundry_id)
      .get()
      .then((doc) => {
        if (!doc.exists) return;
        const currentLaundryProv = doc.data();
        const index = currentLaundryProv.pendingServices.ongoing.findIndex(
          (item) => item.docId === chatId
        );
        if (index < 0) return console.log('cannot find index on laundryprov');
        currentLaundryProv.pendingServices.ongoing[index].status =
          'estimated payment';
        laundryProvRef.doc(laundry_id).update(currentLaundryProv);
        return driversRef.doc(driverDetails.docId).get();
      })
      .then((doc) => {
        if (!doc.exists) return;
        const currentDriver = doc.data();
        const index = currentDriver.service.ongoing.findIndex(
          (item) => item.docId === chatId
        );
        if (index < 0) return console.log('cannot find index on driver');
        currentDriver.service.ongoing[index].status = 'estimated payment';
        driversRef.doc(driverDetails.docId).update(currentDriver);
        return customerRef.doc(customerDocId).get();
      })
      .then((doc) => {
        if (!doc.exists) return;
        const currentCustomer = { ...user };
        const index = currentCustomer.confirmedBooking.findIndex(
          (item) => item.docId === chatId
        );
        if (index < 0) return console.log('cannot find index on customer');
        currentCustomer.confirmedBooking[index].status = 'estimated payment';
        delete currentCustomer.confirmedBooking[index].driverDetails;
        customerRef.doc(customerDocId).update(currentCustomer);
        setUser(currentCustomer);
      })
      .catch((err) => console.log(err));

    // update on chat
    messagesRef.doc(chatId).set(
      {
        estimatedPayment: true,
      },
      { merge: true }
    );
  };

  return (
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
                for (let i = 0; i < item?.data?.message?.payment.length; i++) {
                  sum +=
                    item.data.message.payment[i][
                      `${Object.keys(item?.data?.message?.payment[i])[0]}`
                    ];
                }
              }
              return (
                <ScrollView style={{ scaleY: -1 }}>
                  <>
                    {item.data.from === 'customer' && !item.data.payment ? (
                      <View
                        key={index}
                        className={`bg-[${colors.primary}] self-end p-2 px-3 my-1 max-w-[70%] rounded-t-3xl rounded-l-3xl`}
                      >
                        <Text className="text-white">{item.data.message}</Text>
                      </View>
                    ) : item.data.from === 'admin' && !item.data.payment ? (
                      <View className="flex-row items-center">
                        <Image
                          source={{ uri: laundryImageUrl }}
                          className="h-[25px] w-[25px] rounded-full mr-1"
                        />
                        <View
                          key={index}
                          className={`bg-gray-200 self-start p-2 px-3 my-1 max-w-[70%] rounded-b-3xl rounded-t-3xl`}
                        >
                          <Text className="text-black">
                            {item.data.message}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View className="flex-row items-center">
                        <Image
                          source={{ uri: laundryImageUrl + '&time=' + now }}
                          className="h-[25px] w-[25px] rounded-full mr-1"
                        />
                        <View className="self-start p-2 rounded-xl w-full max-w-[70%] bg-gray-200">
                          <Text className="font-semibold text-lg pb-1">
                            Payment Notice
                          </Text>
                          {item.data.message.payment.map((item, index) => {
                            const key = Object.keys(item);
                            return (
                              <View
                                key={index}
                                className="flex-row justify-between"
                              >
                                <Text className=" max-w-[60%]">{key[0]}</Text>
                                <Text className=" max-w-[40%]">
                                  {item[key[0]]}
                                </Text>
                              </View>
                            );
                          })}
                          <View className="flex-row justify-between">
                            <Text className="font-semibold">total</Text>
                            <Text className="font-semibold">{sum}</Text>
                          </View>
                          {/* accept button */}
                          <TouchableNativeFeedback
                            onPress={handleConfirmPayment}
                            disabled={
                              chatDetails?.estimatedPayment ? true : false
                            }
                          >
                            <View
                              className="self-end p-2 mt-6 rounded-xl"
                              style={{
                                backgroundColor: chatDetails?.estimatedPayment
                                  ? '#b2b2b4'
                                  : colors.primary,
                              }}
                            >
                              <Text className="text-white">
                                {chatDetails?.estimatedPayment
                                  ? 'confirmed'
                                  : 'confirm'}
                              </Text>
                            </View>
                          </TouchableNativeFeedback>
                        </View>
                      </View>
                    )}
                  </>
                </ScrollView>
              );
            }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-300">
              start a conversation with {laundryServiceName}
            </Text>
          </View>
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
  );
};

export default CustomerChatScreen;
