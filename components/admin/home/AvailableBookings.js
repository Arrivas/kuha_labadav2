import {
  Text,
  View,
  Image,
  ScrollView,
  ToastAndroid,
  TouchableNativeFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import CardDetailsLabel from '../home/card/CardDetailsLabel';
import Moment from 'moment';
import { verticalScale } from '../../../config/metrics';
import colors from '../../../config/colors';
import formattedDate from '../../../functions/formattedDate';
import properStatus from '../../../functions/properStatus';

const AvailableBookings = () => {
  const [availableBookings, setAvailableBookings] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchAvailableBookings();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const fetchAvailableBookings = async () => {
    const availableBookingsRef = await firebase
      .firestore()
      .collection('availableBookings');

    try {
      availableBookingsRef
        .where('status', '==', 'confirmedBooking')
        .onSnapshot((data) => {
          const currentAvailableBookings = [];
          data.forEach((doc) => currentAvailableBookings.push(doc.data()));
          setAvailableBookings(currentAvailableBookings);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (selectedItem) => {
    const laundryProvRef = await firebase
      .firestore()
      .collection('laundryProviders');
    firebase
      .firestore()
      .collection('availableBookings')
      .doc(selectedItem.docId)
      .update({
        waitingForDriver: true,
        status: 'waiting for a driver',
      })
      .then(() => {
        const copySelectedItem = { ...selectedItem };
        copySelectedItem.waitingForDriver = true;
        copySelectedItem.status = 'waiting for a driver';

        laundryProvRef
          .doc(selectedItem.laundry_id)
          .get()
          .then((doc) => {
            if (!doc.exists) return;
            const currentLaundryProv = doc.data();
            currentLaundryProv?.pendingServices?.ongoing.push(copySelectedItem);
            return currentLaundryProv;
          })
          .then((currentLaundryProv) => {
            laundryProvRef
              .doc(selectedItem.laundry_id)
              .update(currentLaundryProv);
            ToastAndroid.show('booking accepted', ToastAndroid.SHORT);
          });
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
