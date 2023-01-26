import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import React from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const Delivered = ({ bookingDetails, user, setLoading, method, status }) => {
  const { customerDetails, laundryShopDetails, docId } = bookingDetails;
  const { customerDocId } = customerDetails;
  const { laundry_id } = laundryShopDetails;

  const handleDelivered = () => {
    Alert.alert(
      `${
        (method.pickup === 'no' && method.toBeDeliver === 'no') ||
        (method.toBeDeliver === 'no' && status === 'estimated payment')
          ? 'Completed'
          : 'Delivered'
      }`,
      `${
        (method.pickup === 'no' && method.toBeDeliver === 'no') ||
        (method.toBeDeliver === 'no' && status === 'estimated payment')
          ? 'confirm that the laundry process has been completed?'
          : 'confirm that the laundry has been delivered?'
      }`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            setLoading(true);
            const currentLaundryProv = { ...user };
            const laundryIndex =
              currentLaundryProv.pendingServices.ongoing.findIndex(
                (item) => item.docId === docId
              );
            if (laundryIndex >= 0) {
              bookingDetails.status = 'delivered';
              currentLaundryProv.pendingServices.history.push(bookingDetails);
              currentLaundryProv.pendingServices.ongoing.splice(
                laundryIndex,
                1
              );
            }
            firebase
              .firestore()
              .collection('laundryProviders')
              .doc(laundry_id)
              .update(currentLaundryProv);

            // // customer
            firebase
              .firestore()
              .collection('customers')
              .doc(customerDocId)
              .get()
              .then((doc) => {
                const currentCustomer = doc.data();
                const index = currentCustomer.confirmedBooking.findIndex(
                  (item) => item.docId === docId
                );
                if (laundryIndex >= 0) {
                  currentCustomer.bookingHistory.push(bookingDetails);
                  currentCustomer.confirmedBooking.splice(index, 1);
                }
                return firebase
                  .firestore()
                  .collection('customers')
                  .doc(customerDocId)
                  .update(currentCustomer);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
            setLoading(false);
          },
        },
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handleDelivered}>
      <View className="mx-2">
        <Text>
          {(method.pickup === 'no' && method.toBeDeliver === 'no') ||
          (method.toBeDeliver === 'no' && status === 'estimated payment')
            ? 'completed'
            : 'delivered'}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Delivered;
