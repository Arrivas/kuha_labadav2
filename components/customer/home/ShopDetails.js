import React from 'react';
import { useState, useContext } from 'react';
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

const ShopDetails = ({ navigation, route }) => {
  const {
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
  } = route.params.item;
  const { user } = useContext(AppContext);
  const { width } = getDimensions();
  const [selectedServices, setSelectedService] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const { customerAddress } = user;
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
            <ShopRatings />
          )}
        </View>
      </View>
      {/* button */}
      {selectedServices.length !== 0 ? (
        <TouchableNativeFeedback
          onPress={() => {
            // aa
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
