import { View, Text, Alert, TouchableNativeFeedback } from 'react-native';
import React from 'react';

const StartPickup = ({
  expoNotificationApi,
  bookingDetails,
  driverDetails,
  navigation,
  firebase,
}) => {
  return (
    <>
      <TouchableNativeFeedback
        onPress={() => {
          Alert.alert(
            'Picked-up',
            'Are you sure that the laundry has been picked-up?',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => {
                  let laundryProvPushToken = '';
                  bookingDetails.status = 'picked-up';
                  firebase
                    .firestore()
                    .collection('customers')
                    .doc(bookingDetails.customerDocId)
                    .get()
                    .then((doc) => {
                      const currentCustomer = doc.data();
                      const index = currentCustomer.confirmedBooking.findIndex(
                        (item) => item.docId === bookingDetails.docId
                      );
                      currentCustomer.confirmedBooking[index] = bookingDetails;
                      firebase
                        .firestore()
                        .collection('customers')
                        .doc(bookingDetails.customerDocId)
                        .update(currentCustomer);
                      return bookingDetails;
                    })
                    .then((bookingDetails) => {
                      firebase
                        .firestore()
                        .collection('laundryProviders')
                        .doc(bookingDetails.laundry_id)
                        .get()
                        .then((doc) => {
                          const currentLaundryProv = doc.data();
                          laundryProvPushToken = currentLaundryProv.pushToken;
                          const index =
                            currentLaundryProv.pendingServices.ongoing.findIndex(
                              (item) => item.docId === bookingDetails.docId
                            );
                          currentLaundryProv.pendingServices.ongoing[index] =
                            bookingDetails;
                          currentLaundryProv.notifications.push({
                            title: driverDetails.name,
                            body: `The laundry of customer ${bookingDetails.customerName} has been picked-up.`,
                            read: false,
                            timeStamp: new Date().toISOString(),
                          });
                          firebase
                            .firestore()
                            .collection('laundryProviders')
                            .doc(bookingDetails.laundry_id)
                            .update(currentLaundryProv);
                        });
                      return bookingDetails;
                    })
                    .then((bookingDetails) => {
                      firebase
                        .firestore()
                        .collection('drivers')
                        .doc(driverDetails.docId)
                        .get()
                        .then((doc) => {
                          const currentDriver = doc.data();
                          const index = currentDriver.service.ongoing.findIndex(
                            (item) => item.docId === bookingDetails.docId
                          );
                          currentDriver.service.ongoing[index] = bookingDetails;
                          firebase
                            .firestore()
                            .collection('drivers')
                            .doc(driverDetails.docId)
                            .update(currentDriver);
                        });
                    });
                  // send notification if laundry provider is logged in
                  expoNotificationApi.post('/', {
                    to: laundryProvPushToken,
                    title: driverDetails.name,
                    body: `The laundry of ${bookingDetails.customerName} has been picked-up.`,
                    sound: 'default',
                  });
                },
              },
            ]
          );
        }}
      >
        <View className="self-end p-2">
          <Text>picked-up</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => {
          // action
          firebase
            .firestore()
            .collection('customers')
            .doc(bookingDetails.customerDocId)
            .get()
            .then((doc) => {
              if (!doc.exists) return;
              const currentCustomer = doc.data();

              // add driver details to customer booking info
              const index = currentCustomer.confirmedBooking.findIndex(
                (item) => item.docId === bookingDetails.docId
              );

              if (
                currentCustomer.confirmedBooking[index].driverDetails ===
                undefined
              ) {
                Alert.alert(
                  'Proceed to map screen',
                  'This will notify customer that you are on your way to pick-up.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        // send notification if user is logged in
                        expoNotificationApi.post('/', {
                          to: currentCustomer?.pushToken,
                          title: driverDetails.name,
                          body: 'The driver is on its way to pick up your laundry.',
                          sound: 'default',
                        });
                        currentCustomer.confirmedBooking[index] =
                          bookingDetails;
                        currentCustomer.notifications.push({
                          title: driverDetails.name,
                          body: 'The driver is on its way to pick up your laundry.',
                          read: false,
                          timeStamp: new Date().toISOString(),
                        });
                        // update db
                        firebase
                          .firestore()
                          .collection('customers')
                          .doc(bookingDetails.customerDocId)
                          .update(currentCustomer);
                        // proceed to map screen
                        navigation.navigate('MapScreen', {
                          userLocation: bookingDetails.userLocation,
                        });
                      },
                    },
                  ]
                );
              } else {
                // proceed to map screen
                navigation.navigate('MapScreen', {
                  userLocation: bookingDetails.userLocation,
                });
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        <View className="self-end p-2">
          <Text>map screen</Text>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

export default StartPickup;
