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
import Customer from './home/Customer';
import Shop from './home/Shop';

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
          if (request.from === 'customer') {
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
          } else {
            firebase
              .firestore()
              .collection('laundryProviders')
              .doc(request.adminDocId)
              .get()
              .then((doc) => {
                const currentLaundryProv = doc.data();

                currentLaundryProv.isVerified = 'declined';
                currentLaundryProv.notifications.push(customerNotifObj);
                firebase
                  .firestore()
                  .collection('laundryProviders')
                  .doc(request.adminDocId)
                  .update(currentLaundryProv);
                // send notification
                if (currentLaundryProv.pushToken)
                  expoNotificationApi.post('/', {
                    to: currentLaundryProv.pushToken,
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
              (item) => item.adminDocId
            );
            if (index >= 0) userCopy.requests.splice(index, 1);
            firebase
              .firestore()
              .collection('higherAdmin')
              .doc(user.docId)
              .update(userCopy);
            setUser(userCopy);
          }
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
            if (request.from === 'customer') {
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
            } else {
              firebase
                .firestore()
                .collection('laundryProviders')
                .doc(request.adminDocId)
                .get()
                .then((doc) => {
                  const currentLaundryProv = doc.data();
                  currentLaundryProv.isVerified = 'verified';
                  currentLaundryProv.notifications.push(customerNotifObj);
                  firebase
                    .firestore()
                    .collection('laundryProviders')
                    .doc(request.adminDocId)
                    .update(currentLaundryProv);
                  // send notification
                  if (currentLaundryProv.pushToken)
                    expoNotificationApi.post('/', {
                      to: currentLaundryProv.pushToken,
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
                (item) => item.adminDocId
              );
              if (index >= 0) userCopy.requests.splice(index, 1);
              firebase
                .firestore()
                .collection('higherAdmin')
                .doc(user.docId)
                .update(userCopy);
              setUser(userCopy);
            }
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
            <View key={item.createdAt}>
              {item.from === 'customer' ? (
                <Customer
                  item={item}
                  height={height}
                  width={width}
                  loading={loading}
                  handleDecline={handleDecline}
                  handleAccept={handleAccept}
                />
              ) : (
                <Shop
                  item={item}
                  height={height}
                  width={width}
                  loading={loading}
                  handleDecline={handleDecline}
                  handleAccept={handleAccept}
                />
              )}
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
