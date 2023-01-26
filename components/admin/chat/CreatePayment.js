import {
  View,
  Text,
  Modal,
  Keyboard,
  TextInput,
  ScrollView,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { FieldArray } from 'formik';
import { expoNotificationApi } from '../../../api/sendNotification';
import getDimensions from '../../../config/getDimensions';
import FormikField from '../../forms/FormikField';
import AppFormField from '../../forms/AppFormField';
import SubmitButton from '../../forms/SubmitButton';
import colors from '../../../config/colors';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import Icon from '../../Icon';

const CreatePayment = ({
  chatId,
  customerDocId,
  isModalVisible,
  setIsModalVisible,
  laundryServiceName,
  fabcons,
}) => {
  const initialValues = {
    payment: [],
  };
  const [inputCount, setInputCount] = useState(initialValues.payment);
  const [inputKey, setInputKey] = useState('');
  const { width, height } = getDimensions();

  const getCustomerPushToken = () =>
    firebase
      .firestore()
      .collection('customers')
      .doc(customerDocId)
      .get()
      .then((doc) => doc.data().pushToken);

  const onSubmit = async (values) => {
    let error = '';
    const { payment } = values;

    payment.forEach((item, index) => {
      item[`${inputCount[index]}`] = parseInt(
        Math.round(item[`${inputCount[index]}`])
      );

      if (payment[index][inputCount[index]] === '') return (error = 'empty');
      else if (isNaN(payment[index][inputCount[index]]))
        return (error = 'numbersOnly');
    });
    if (inputCount.length < 1)
      return ToastAndroid.show(
        'Must have at least one field',
        ToastAndroid.SHORT
      );
    if (error === 'empty')
      return ToastAndroid.show(
        'All fields must not be empty',
        ToastAndroid.SHORT
      );
    if (error === 'numbersOnly')
      return ToastAndroid.show(
        'Fields must contain numbers only',
        ToastAndroid.SHORT
      );

    // add message to db
    const messagesRef = await firebase
      .firestore()
      .collection('customers')
      .doc(customerDocId)
      .collection('chats');

    messagesRef.doc(chatId).collection('messages').add({
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: values,
      from: 'admin',
      payment: true,
    });

    // seen
    messagesRef.doc(chatId).set(
      {
        customerSeen: false,
        estimatedPayment: false,
      },
      { merge: true }
    );

    // send notif if customer is logged in
    getCustomerPushToken().then((customerPushToken) => {
      expoNotificationApi.post('/', {
        to: customerPushToken,
        title: laundryServiceName,
        body: 'Payment Details',
        sound: 'default',
      });
    });
    Keyboard.dismiss();
    setInputCount(initialValues.payment);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      >
        <TouchableWithoutFeedback
          onPress={() => setIsModalVisible(!isModalVisible)}
        >
          <View className="absolute bg-black/20 h-full w-full" />
        </TouchableWithoutFeedback>
        <View
          className={`self-center my-auto bg-white items-center justify-center  rounded-xl`}
          style={{
            width: width - 40,
            height: 350,
          }}
        >
          <FormikField initialValues={initialValues} onSubmit={onSubmit}>
            <FieldArray validateOnChange name="payment">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                return (
                  <>
                    <Text className="px-4 py-2 font-semibold text-lg">
                      Add Payment Details
                    </Text>
                    <View className="w-full flex-row items-center justify-around p-2">
                      <TextInput
                        className="bg-gray-100 p-2 py-2 w-full rounded-xl"
                        onChangeText={(text) => setInputKey(text)}
                        value={inputKey}
                      />
                      <TouchableNativeFeedback
                        onPress={() => {
                          if (!inputKey) return;
                          const obj = {};
                          obj[inputKey] = '';
                          push(obj);
                          setInputCount((oldArray) => [...oldArray, inputKey]);
                          setInputKey('');
                        }}
                      >
                        <View
                          className="absolute right-[12px] py-2 px-5 rounded-xl"
                          style={{
                            backgroundColor: '#e6eaf0',
                          }}
                        >
                          <Text
                            className="font-semibold"
                            style={{
                              color: colors.primary,
                            }}
                          >
                            add
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                    <ScrollView keyboardShouldPersistTaps="never">
                      {inputCount.map((item, index) => {
                        return (
                          <View className="flex-row px-2" key={index}>
                            <View>
                              <Text className="absolute top-[2px] left-2 z-50 text-gray-500 font-semibold">
                                {item}
                              </Text>
                              <AppFormField
                                keyboardType="numeric"
                                className="w-[89%]"
                                containerStyle="justify-center"
                                payment={true}
                                name={`payment[${index}].${item}`}
                              />
                            </View>

                            <TouchableWithoutFeedback
                              onPress={() => {
                                const inputCopy = [...inputCount];
                                inputCopy.splice(index, 1);
                                setInputCount(inputCopy);
                                remove(index);
                              }}
                            >
                              <View className="justify-center px-2 py-2 rounded-md mb-[12px] self-center">
                                <Icon
                                  iconLibrary="Feather"
                                  iconName="x"
                                  size={20}
                                  color="black"
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </>
                );
              }}
            </FieldArray>
            <View
              className="flex-row items-center justify-center px-5 py-2 rounded-xl self-end m-2"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              <SubmitButton
                title="done"
                textClass="text-white"
                textStyle={{
                  backgroundColor: colors.primary,
                }}
                defaultStyle={false}
              />
            </View>
          </FormikField>
        </View>
      </Modal>
    </>
  );
};

export default CreatePayment;
