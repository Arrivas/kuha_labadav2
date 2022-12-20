import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import CardDetailsLabel from '../home/card/CardDetailsLabel';
import Moment from 'moment';
import { verticalScale } from '../../../config/metrics';
import colors from '../../../config/colors';

const AvailableBookings = () => {
  const formattedDate = (pickupDate, pickupTime) =>
    new Date(`${pickupDate} ${pickupTime}`);

  const properStatus = (status) =>
    status === 'confirmedBooking' ? 'Confirmed Booking' : '-';

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
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 5,
        paddingHorizontal: verticalScale(15),
      }}
    >
      <View
        className="rounded-xl overflow-hidden"
        style={{
          flex: 1,
          backgroundColor: 'white',
          shadowColor: 'black',
          shadowOpacity: 1,
          elevation: 2,
        }}
      >
        {availableBookings.map((item) => (
          <View className="p-5" key={item.docId}>
            <View
              className="flex-row items-center "
              style={{
                flex: 0.5,
              }}
            >
              <Image
                className="rounded-xl self-center"
                style={{
                  height: 80,
                  width: 80,
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
            <TouchableNativeFeedback>
              <View className="self-end p-2">
                <Text>accept</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AvailableBookings;
