import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import React from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const Pickedup = ({ bookingDetails, user, setLoading }) => {
  const { customerDetails, laundryShopDetails, docId } = bookingDetails;
  const { customerDocId } = customerDetails;
  const { laundry_id } = laundryShopDetails;

  const handlePickedup = () => {
    Alert.alert('Pickedup', 'confirm that the laundry has beend pickedup?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          setLoading(true);
          bookingDetails.status = 'pickedup';
          const currentLaundryProv = { ...user };
          const laundryIndex =
            currentLaundryProv.pendingServices.ongoing.findIndex(
              (item) => item.docId === docId
            );
          if (laundryIndex >= 0) {
            currentLaundryProv.pendingServices.ongoing[laundryIndex].status =
              'pickedup';
          }
          firebase
            .firestore()
            .collection('laundryProviders')
            .doc(laundry_id)
            .update(currentLaundryProv);

          // customer
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
                currentCustomer.confirmedBooking[index].status = 'pickedup';
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
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePickedup}>
      <View className="mx-2">
        <Text>pickedup</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Pickedup;
