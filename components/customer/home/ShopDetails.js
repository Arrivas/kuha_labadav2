import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import getDimensions from '../../../config/getDimensions';
import ShopOverview from './shopDetails/ShopOverview';
import Icon from '../../Icon';
import ShopRatings from './shopDetails/ShopRatings';
import colors from '../../../config/colors';
import { AppContext } from '../../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const ShopDetails = ({ navigation, route }) => {
  const {
    max,
    name,
    pricing,
    fabcons,
    imageUrl,
    vicinity,
    laundry_id,
    description,
    fabconEnabled,
    pendingServices,
    servicesOffered,
    deliveredByItems,
    availablePickupTimes,
    openHours,
  } = route.params.item;
  const { user } = useContext(AppContext);
  const { width } = getDimensions();
  const [selectedServices, setSelectedService] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const { customerAddress, confirmedBooking } = user;
  const [ratings, setRatings] = useState([]);

  const isCurrentlyBooked = confirmedBooking.filter(
    (item) => item.laundryShopDetails.laundry_id === laundry_id
  );

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('laundryProviders')
      .doc(laundry_id)
      .collection('ratings')
      .onSnapshot((data) => {
        const currentRatings = [];
        data.forEach((doc) => currentRatings.push(doc.data()));
        setRatings(currentRatings);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <View className="flex-1 bg-white">
        <Image
          style={{
            height: width <= 360 ? 280 : 500,
            width: 'auto',
            flex: 1,
          }}
          source={{
            uri: imageUrl,
          }}
          resizeMode="cover"
        />
        <View
          className="self-center w-full bg-white rounded-t-[40px] pt-5"
          style={{
            paddingHorizontal: width <= 360 ? 14 : 22,
            bottom: width >= 500 ? 20 : width <= 360 ? 21 : 24,
            height: 310,
          }}
        >
          <Text className="font-bold text-2xl leading-6 py-1" numberOfLines={2}>
            {name}
          </Text>
          {/* buttons */}
          <View className="flex-row">
            <TouchableWithoutFeedback
              onPress={() => setSelectedTab('overview')}
            >
              <View className="py-1 mr-4 self-start">
                <Text
                  className={`font-bold text-lg ${
                    selectedTab === 'overview' ? 'text-black' : 'text-gray-300'
                  }`}
                >
                  Overview
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setSelectedTab('ratings')}>
              <View className="py-1 self-start">
                <Text
                  className={`font-bold text-lg ${
                    selectedTab === 'ratings' ? 'text-black' : 'text-gray-300'
                  }`}
                >
                  Ratings
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* overview */}
          {selectedTab === 'overview' ? (
            <ShopOverview
              vicinity={vicinity}
              description={description}
              pendingServices={pendingServices}
              servicesOffered={servicesOffered}
              selectedServices={selectedServices}
              setSelectedService={setSelectedService}
            />
          ) : (
            <ShopRatings
              selectedServices={selectedServices}
              ratings={ratings}
            />
          )}
        </View>
      </View>
      {/* button */}
      {selectedServices.length !== 0 ? (
        <TouchableNativeFeedback
          onPress={() => {
            // check if user is verified
            if (
              user?.isVerified === 'waiting' ||
              user?.isVerified === 'declined' ||
              !user?.isVerified
            ) {
              navigation.navigate('SettingsStack', {
                screen: 'Verification',
                initial: false,
              });
              return alert(
                'verify your identity for security purposes before proceeding with the booking.'
              );
            }
            // check if shop is full
            if (pendingServices.max <= pendingServices.ongoing.length)
              return alert('this shop is currently full');
            // if user is curerntly booked in this shop
            if (isCurrentlyBooked.length !== 0)
              return alert(
                'please complete your booking at this laundry shop before booking again'
              );
            // no address
            if (!customerAddress) {
              navigation.navigate('SettingsStack', {
                screen: 'PersonalInfo',
                initial: false,
              });
              return alert('please complete your profile first before booking');
            }
            navigation.navigate('SelectSchedule', {
              name,
              pricing,
              fabcons,
              imageUrl,
              laundry_id,
              fabconEnabled,
              deliveredByItems,
              selectedServices,
              availablePickupTimes,
              openHours,
            });
          }}
        >
          <View
            className="self-center absolute bottom-2 py-4 rounded-full flex-row items-center justify-between px-10"
            style={{
              backgroundColor: colors.primary,
              width: width >= 500 ? '40%' : '70%',
            }}
          >
            <Text className="font-bold text-[15px] text-white">
              Proceed Booking
            </Text>
            <Icon
              iconName="arrowright"
              iconLibrary="AntDesign"
              color="white"
              size={16}
            />
          </View>
        </TouchableNativeFeedback>
      ) : null}
    </>
  );
};

export default ShopDetails;
