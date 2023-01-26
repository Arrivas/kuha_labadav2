import { View, Text, TouchableNativeFeedback, Alert } from 'react-native';
import React, { useContext } from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { AppContext } from '../../../../context/AppContext';

const CancelBooking = ({ bookingDetails }) => {
  const { user } = useContext(AppContext);
  const { customerDetails, docId, laundryShopDetails } = bookingDetails;
  const { laundry_id } = laundryShopDetails;
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
                customersRef.doc(customerDocId).update(currentCustomer);
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
