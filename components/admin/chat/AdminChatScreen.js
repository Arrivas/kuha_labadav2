import {
  View,
  Text,
  FlatList,
  Keyboard,
  TextInput,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
} from 'react-native';
import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import SafeScreenView from '../../SafeScreenView';
import Icon from '../../Icon';
import colors from '../../../config/colors';

const AdminChatScreen = ({ navigation, route }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [messages, setMessages] = useState([]);
  const { chatId, customerDocId } = route.params;
  const { user } = useContext(AppContext);
  const { customerImageUrl, name: customerName } = currentCustomer;

  const fetchCustomerDetails = async () => {
    const customerRef = await firebase.firestore().collection('customers');
    customerRef
      .doc(customerDocId)
      .get()
      .then((doc) => setCurrentCustomer(doc.data()))
      .catch((err) => console.log('cannot get customer details', err));
  };

  const sendMessage = async (e) => {
    const messagesRef = await firebase.firestore().collection('chats');
    e.persist();
    if (!inputMessage.trim() || inputMessage.trim().length >= 255) return;
    Keyboard.dismiss();
    messagesRef
      .doc(chatId)
      .collection('messages')
      .add({
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: inputMessage,
        from: 'admin',
      })
      .then((doc) =>
        doc.update({
          id: doc.id,
        })
      );
    // set seen on customer
    setInputMessage('');
    messagesRef.doc(chatId).set(
      {
        customerSeen: false,
      },
      { merge: true }
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: customerName || '',
    });
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) fetchCustomerDetails();
    const unsubscribe = firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timeStamp', 'asc')
      .onSnapshot((snapshop) => {
        const currentMessages = [];
        snapshop.forEach((doc) => {
          currentMessages.push(doc.data());
        });
        setMessages(currentMessages);
      });
    return () => {
      unsubscribe();
      mounted = false;
    };
  }, [messages]);

  return (
    <SafeScreenView enablePadding>
      <KeyboardAvoidingView
        className="flex-1"
        behavior="height"
        keyboardVerticalOffset={100}
      >
        <FlatList
          style={{
            // height: height - 1120,
            scaleY: -1,
          }}
          className="flex-col-reverse px-3"
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index, separators }) => (
            <>
              {item.from === 'admin' ? (
                <View
                  key={index}
                  className={`bg-[${colors.primary}] self-end p-2 px-3 my-1 max-w-[80%] rounded-l-3xl rounded-t-3xl`}
                >
                  <Text className="text-white">{item.message}</Text>
                </View>
              ) : (
                <></>
              )}
            </>
          )}
        />
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
  );
};

export default AdminChatScreen;
