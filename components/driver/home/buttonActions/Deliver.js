import { View, Text, TouchableNativeFeedback, Alert } from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '../../../../context/AppContext';

const Deliver = ({
  firebase,
  navigation,
  driverDetails,
  bookingDetails,
  expoNotificationApi,
}) => {
  const { user } = useContext(AppContext);
  const { customerDocId, laundryServiceName, laundry_id } = bookingDetails;
  const hadleToDeliver = () => {
    const customerRef = firebase.firestore().collection('customers');
    const laundryProvRef = firebase.firestore().collection('laundryProviders');
    const driversRef = firebase.firestore().collection('drivers');
    // action
    customerRef
      .doc(customerDocId)
      .get()
      .then((doc) => {
        if (!doc.exists) return;
        const currentCustomer = doc.data();

        // add driver details to customer booking info
        const index = currentCustomer.confirmedBooking.findIndex(
          (item) => item.docId === bookingDetails.docId
        );
        if (index < 0) return console.log('cannot find index');
        if (
          currentCustomer.confirmedBooking[index].driverDetails === undefined
        ) {
          Alert.alert(
            'Proceed to map screen',
            'This will notify customer that you are on your way to deliver',
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
                    body: 'The driver is on its way to deliver laundry.',
                    sound: 'default',
                  });
                  bookingDetails.status = 'out for delivery';
                  currentCustomer.confirmedBooking[index] = bookingDetails;
                  currentCustomer.confirmedBooking[index].driverDetails = {
                    driverName: driverDetails.name,
                    driverDocId: driverDetails.docId,
                    mobileNumber: driverDetails.mobileNumber,
                  };
                  currentCustomer.notifications.push({
                    title: driverDetails.name,
                    body: 'The driver is on its way to deliver your laundry.',
                    read: false,
                    timeStamp: new Date().toISOString(),
                  });
                  // update db
                  customerRef.doc(customerDocId).update(currentCustomer);

                  laundryProvRef
                    .doc(laundry_id)
                    .get()
                    .then((doc) => {
                      if (!doc.exists) return;
                      const currentLaundryProv = doc.data();
                      const index =
                        currentLaundryProv.pendingServices.ongoing.findIndex(
                          (item) => item.docId === bookingDetails.docId
                        );
                      if (index < 0)
                        return console.log('cannot find index on laundryprov');
                      currentLaundryProv.pendingServices.ongoing[index].status =
                        'out for delivery';
                      laundryProvRef.doc(laundry_id).update(currentLaundryProv);
                    });

                  const currentDriver = { ...user };
                  const index = currentDriver.service.ongoing.findIndex(
                    (item) => item.docId === bookingDetails.docId
                  );
                  if (index < 0)
                    return console.log('cannot find index on driver');
                  currentDriver.service.ongoing[index].status =
                    'out for delivery';
                  driversRef.doc(driverDetails.docId).update(currentDriver);

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
  };

  const handleDelivered = () => {
    const laundryProvRef = firebase.firestore().collection('laundryProviders');
    const driversRef = firebase.firestore().collection('drivers');
    const customerRef = firebase.firestore().collection('customers');

    Alert.alert('Delivered', 'Confirm that the laundry has been delivered?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          laundryProvRef
            .doc(laundry_id)
            .get()
            .then((doc) => {
              if (!doc.exists) return;
              const currentLaundryProv = doc.data();
              const index =
                currentLaundryProv.pendingServices.ongoing.findIndex(
                  (item) => item.docId === bookingDetails.docId
                );
              if (index < 0)
                return console.log('cannot find index on laundryprov');
              currentLaundryProv.pendingServices.ongoing[index].status =
                'delivered';

              currentLaundryProv.pendingServices.history.push(
                currentLaundryProv.pendingServices.ongoing[index]
              );
              currentLaundryProv.pendingServices.ongoing.splice(index, 1);

              laundryProvRef.doc(laundry_id).update(currentLaundryProv);
              return driversRef.doc(driverDetails.docId).get();
            })
            .then((doc) => {
              if (!doc.exists) return;
              const currentDriver = doc.data();
              const index = currentDriver.service.ongoing.findIndex(
                (item) => item.docId === bookingDetails.docId
              );
              if (index < 0) return console.log('cannot find index on driver');
              currentDriver.service.ongoing[index].status = 'delivered';
              currentDriver.service.history.push(
                currentDriver.service.ongoing[index]
              );
              currentDriver.service.ongoing.splice(index, 1);

              driversRef.doc(driverDetails.docId).update(currentDriver);

              return customerRef.doc(customerDocId).get();
            })
            .then((doc) => {
              if (!doc.exists) return;
              const currentCustomer = doc.data();
              const index = currentCustomer.confirmedBooking.findIndex(
                (item) => item.docId === bookingDetails.docId
              );
              if (index < 0)
                return console.log('cannot find index on customer');
              currentCustomer.confirmedBooking[index].status = 'delivered';
              currentCustomer.notifications.push({
                title: laundryServiceName,
                body: 'Laundry has been delivered',
                read: false,
                timeStamp: new Date().toISOString(),
              });

              currentCustomer.bookingHistory.push(
                currentCustomer.confirmedBooking[index]
              );
              currentCustomer.confirmedBooking.splice(index, 1);
              
              customerRef.doc(customerDocId).update(currentCustomer);
              // send notif if customer is logged in
              expoNotificationApi.post('/', {
                to: currentCustomer?.pushToken,
                title: laundryServiceName,
                body: 'Laundry has been delivered',
                sound: 'default',
              });
            })
            .catch((err) => console.log(err));
        },
      },
    ]);
  };
  return (
    <>
      <TouchableNativeFeedback onPress={handleDelivered}>
        <View className="p-2">
          <Text>Delivered</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={hadleToDeliver}>
        <View className="p-2">
          <Text>Map Screen</Text>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

export default Deliver;
