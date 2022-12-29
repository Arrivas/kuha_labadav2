import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import CardDetailsLabel from '../home/card/CardDetailsLabel';
import Moment from 'moment';
import { verticalScale } from '../../../config/metrics';
import colors from '../../../config/colors';
import formattedDate from '../../../functions/formattedDate';
import properStatus from '../../../functions/properStatus';
import { AppContext } from '../../../context/AppContext';

const AvailableBookings = () => {
  const { user } = useContext(AppContext);
  const [availableBookings, setAvailableBookings] = useState([]);

  const fetchAvailableBookings = async () => {
    const availableBookingsRef = firebase
      .firestore()
      .collection('availableBookings');

    try {
      await availableBookingsRef
        .where('waitingForDriver', '==', true)
        .onSnapshot((data) => {
          const currentAvailableBookings = [];
          data.forEach((doc) => currentAvailableBookings.push(doc.data()));
          setAvailableBookings(currentAvailableBookings);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchAvailableBookings();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handleAccept = async (bookingDetails) => {
    const driversRef = await firebase.firestore().collection('drivers');
    const availableBookingsRef = await firebase
      .firestore()
      .collection('availableBookings');
    const laundryProvRef = await firebase
      .firestore()
      .collection('laundryProviders');

    // copy and update local state
    const bookingDetailsCopy = { ...bookingDetails };
    const driverDetailsCopy = user;
    bookingDetailsCop = {
      name: user?.name,
      docId: user?.docId,
      mobileNumber: user?.mobileNumber,
    };
    bookingDetailsCopy.waitingForDriver = false;
    bookingDetailsCopy.status = 'pick-up';

    driverDetailsCopy.service.ongoing.push(bookingDetailsCopy);
    // update db
    laundryProvRef
      .doc(bookingDetails.laundry_id)
      .get()
      .then((doc) => {
        if (!doc.exists) return;
        const currentLaundryProv = doc.data();
        const index = currentLaundryProv?.pendingServices?.ongoing.findIndex(
          (item) => item.docId === bookingDetails.docId
        );
        if (index > -1)
          currentLaundryProv.pendingServices.ongoing[index] =
            bookingDetailsCopy;
        return laundryProvRef
          .doc(bookingDetails.laundry_id)
          .update(currentLaundryProv);
      })
      .then(() => {
        driversRef.doc(user?.docId).update(driverDetailsCopy);
        availableBookingsRef.doc(bookingDetails.docId).delete();
        return ToastAndroid.show('booking accepted', ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 5,
        paddingHorizontal: verticalScale(15),
      }}
    >
      {availableBookings.map((item) => (
        <View
          className="rounded-xl overflow-hidden"
          style={{
            flex: 1,
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOpacity: 1,
            elevation: 2,
            marginBottom: 15,
          }}
          key={item.docId}
        >
          <View className="p-5">
            <View
              className="flex-row items-center "
              style={{
                flex: 0.5,
              }}
            >
              <Image
                className="rounded-xl self-center"
                style={{
                  height: 60,
                  width: 60,
                }}
                source={{ uri: item.customerImageUrl }}
              />
              <View className="mx-2">
                <Text
                  style={{
                    fontFamily: 'Alexandria-Regular',
                  }}
                >
                  Customer Name
                </Text>
                <Text>{item.customerName}</Text>
              </View>
            </View>
            <View
              className="border-t border-b border-gray-200 my-2 py-1"
              style={{ flex: 1 }}
            >
              <CardDetailsLabel label="Service" value={item.selectedServices} />
              <CardDetailsLabel label="Method" value={item.method.label} />
              <CardDetailsLabel
                label="Pickup Date & Time"
                value={Moment(
                  new Date(
                    formattedDate(
                      item.selectedPickupDay,
                      item.selectedPickupTime
                    )
                  ),
                  'ddd DD-MMM-YYYY, hh:mm A'
                ).format('lll')}
              />
              <CardDetailsLabel label="Address" value={item.customerAddress} />
              <CardDetailsLabel label="Phone#" value={item.customerMobile} />
              <CardDetailsLabel
                textColor={colors.primary}
                label="Status"
                value={properStatus(item.status)}
              />
            </View>
            {/* button */}
            <TouchableNativeFeedback onPress={() => handleAccept(item)}>
              <View className="self-end p-2">
                <Text>accept</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default AvailableBookings;
