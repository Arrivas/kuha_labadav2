import { View, Text, TouchableNativeFeedback, Alert } from 'react-native';
import React, { useContext } from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { AppContext } from '../../../../context/AppContext';
import { expoNotificationApi } from '../../../../api/sendNotification';

const CancelBooking = ({ bookingDetails }) => {
  const { user } = useContext(AppContext);
  const { customerDetails, docId, laundryShopDetails } = bookingDetails;
  const { laundry_id, laundryShopName } = laundryShopDetails;
  const { customerDocId } = customerDetails;

  const handleCancel = () =>
    Alert.alert(
      'Cancel Booking',
      'are you sure do you want to cancel this booking?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const customersRef = firebase.firestore().collection('customers');
            const availableBookingsRef = firebase
              .firestore()
              .collection('availableBookings');
            // const laundryProviders = firebase
            //   .firestore()
            //   .collection('laundryProviders');

            // const userCopy = { ...user };
            // const index = userCopy.pendingServices.ongoing.findIndex(
            //   (item) => item.docId === docId
            // );

            // if (index >= 0) {
            //   userCopy.pendingServices.ongoing[index].status = 'cancelled';
            //   userCopy.pendingServices.history.push(
            //     userCopy.pendingServices.ongoing[index]
            //   );
            //   userCopy.pendingServices.ongoing.splice(index, 1);
            //   laundryProviders.doc(laundry_id).update(userCopy);
            // }
            const notifObject = {
              seen: false,
              title: 'Booking Cancelled',
              body: `${laundryShopName} cancelled your booking with the ref id ${docId}.`,
              createdAt: new Date().toISOString(),
            };
            // customer
            customersRef
              .doc(customerDocId)
              .get()
              .then((doc) => {
                const currentCustomer = doc.data();
                const index = currentCustomer.confirmedBooking.findIndex(
                  (item) => item.docId === docId
                );
                currentCustomer.confirmedBooking[index].status = 'cancelled';
                currentCustomer.bookingHistory.push(
                  currentCustomer.confirmedBooking[index]
                );
                currentCustomer.confirmedBooking.splice(index, 1);
                // add notification
                currentCustomer.notifications.push(notifObject);
                customersRef.doc(customerDocId).update(currentCustomer);

                // send notif if customer is logged in
                expoNotificationApi.post('/', {
                  to: currentCustomer.pushToken,
                  title: notifObject.title,
                  body: notifObject.body,
                  sound: 'default',
                });
              })
              .catch((err) => console.log(err));
            availableBookingsRef.doc(docId).delete();
          },
        },
      ]
    );

  return (
    <TouchableNativeFeedback onPress={handleCancel}>
      <View className="p-2">
        <Text>cancel</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CancelBooking;
