import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { expoNotificationApi } from '../../api/sendNotification';
import { AppContext } from '../../context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import SafeScreenView from '../SafeScreenView';
import Icon from '../Icon';
import DocumentViewer from './home/DocumentViewer';
import getDimensions from '../../config/getDimensions';
import colors from '../../config/colors';
import Moment from 'moment';
import NoItemsYet from '../NoItemsYet';

const HigherAdminHomescreen = () => {
  const { user, setUser } = useContext(AppContext);
  const [currentUser, setCurerntUser] = useState([]);
  const { height, width } = getDimensions();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection('higherAdmin')
      .doc(user.docId)
      .onSnapshot((doc) => {
        setCurerntUser(doc.data());
      });

    return () => {
      subscriber();
    };
  }, []);

  const handleDecline = (request) => {
    Alert.alert('Decline', 'you are about to decline this credentials?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          if (request.from === 'customer')
            firebase
              .firestore()
              .collection('customers')
              .doc(request.customerDocId)
              .get()
              .then((doc) => {
                const currentCustomer = doc.data();

                currentCustomer.isVerified = 'declined';
                currentCustomer.notifications.push(customerNotifObj);
                firebase
                  .firestore()
                  .collection('customers')
                  .doc(request.customerDocId)
                  .update(currentCustomer);
                // send notification
                if (currentCustomer.pushToken)
                  expoNotificationApi.post('/', {
                    to: currentCustomer.pushToken,
                    title: 'Verification Failed',
                    body: 'your credentials has been declined.',
                    sound: 'default',
                  });
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });

          const userCopy = { ...user };
          const index = userCopy.requests.findIndex(
            (item) => item.customerDocId
          );
          if (index >= 0) userCopy.requests.splice(index, 1);
          firebase
            .firestore()
            .collection('higherAdmin')
            .doc(user.docId)
            .update(userCopy);
          setUser(userCopy);
          setLoading(false);
        },
      },
    ]);
    const customerNotifObj = {
      title: 'Verification Failed',
      body: 'your credentials has been declined.',
      createdAt: new Date().toISOString(),
      seen: false,
    };
  };

  const handleAccept = (request) => {
    Alert.alert(
      'Approve',
      'confirmed that you are about to approve this credentials?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setLoading(true);
            if (request.from === 'customer')
              firebase
                .firestore()
                .collection('customers')
                .doc(request.customerDocId)
                .get()
                .then((doc) => {
                  const currentCustomer = doc.data();

                  currentCustomer.isVerified = 'verified';
                  currentCustomer.notifications.push(customerNotifObj);
                  firebase
                    .firestore()
                    .collection('customers')
                    .doc(request.customerDocId)
                    .update(currentCustomer);
                  // send notification
                  if (currentCustomer.pushToken)
                    expoNotificationApi.post('/', {
                      to: currentCustomer.pushToken,
                      title: 'Verification Complete',
                      body: 'your credentials has been verified.',
                      sound: 'default',
                    });
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });

            const userCopy = { ...user };
            const index = userCopy.requests.findIndex(
              (item) => item.customerDocId
            );
            if (index >= 0) userCopy.requests.splice(index, 1);
            firebase
              .firestore()
              .collection('higherAdmin')
              .doc(user.docId)
              .update(userCopy);
            setUser(userCopy);
            setLoading(false);
          },
        },
      ]
    );
    const customerNotifObj = {
      title: 'Verification Complete',
      body: 'your credentials has been verified.',
      createdAt: new Date().toISOString(),
      seen: false,
    };
  };
  return (
    <SafeScreenView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {currentUser?.requests?.length !== 0 ? (
          currentUser?.requests?.map((item) => (
            <View
              style={{
                // maxHeight: 350,
                // height: '100%',
                maxWidth: width - 20,
                width: '100%',
              }}
              className=" self-center p-2 rounded-md bg-white border-y border-gray-200"
              key={item.createdAt}
            >
              <View className="flex-row items-center">
                <View className="bg-[#F2F2F2] rounded-full p-2">
                  <Icon
                    iconLibrary="Feather"
                    iconName="user"
                    size={30}
                    color="black"
                  />
                </View>
                <View className="flex-col ml-2">
                  <Text className="font-bold text-xl">{item.customerName}</Text>
                  <Text className="text-xs">{item.from}</Text>
                </View>
              </View>
              <View>
                <View className="my-5">
                  <Text className="font-semibold">Submitted documents</Text>
                  <Text>{item.selectedId.selectedId1}</Text>
                  <Text>{item.selectedId.selectedId2}</Text>
                  <Text className="font-semibold">Date & Time Submitted</Text>
                  <Text>{Moment(new Date(item.createdAt)).format('LLL')}</Text>
                </View>
                <DocumentViewer
                  images={item.credUrls}
                  selectedId={item.selectedId}
                />
              </View>
              <View className="flex-row justify-between px-2 my-3">
                <TouchableNativeFeedback onPress={() => handleDecline(item)}>
                  <View className="bg-[#F2F2F2] px-9 py-3 flex-row items-center justify-center rounded-md">
                    <Text className=" font-semibold">Decline</Text>
                    {loading && (
                      <ActivityIndicator color="white" animating={loading} />
                    )}
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  disabled={loading}
                  onPress={() => handleAccept(item)}
                >
                  <View
                    className={`bg-[${colors.primary}] px-9 py-3 flex-row items-center justify-center rounded-md`}
                  >
                    <Text className="text-white font-semibold">Approve</Text>
                    {loading && (
                      <ActivityIndicator color="white" animating={loading} />
                    )}
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          ))
        ) : (
          <NoItemsYet />
        )}
      </ScrollView>
    </SafeScreenView>
  );
};

export default HigherAdminHomescreen;
