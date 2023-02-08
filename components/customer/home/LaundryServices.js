import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from '../../Icon';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../config/metrics';
import getDimensions from '../../../config/getDimensions';
import { filterLaundryServices } from '../../../config/filterLaundryServices';

const LaundryServices = ({
  selectedService,
  navigation,
  laundryServices,
  searchText,
  type = 'default',
  toggleAll,
}) => {
  const filteredLaundryServices = selectedService
    ? filterLaundryServices(laundryServices, selectedService)
    : searchText.trim() !== ''
    ? laundryServices.filter((item) =>
        item.name.toLowerCase().startsWith(searchText.toLowerCase())
      )
    : laundryServices;
  const { height } = getDimensions();
  return type === 'default' ? (
    // pt-5
    <View>
      <View className="flex-row justify-between">
        <Text
          style={{
            fontSize: 14,
          }}
        >
          {searchText ? 'result' : 'Services nearby'}
        </Text>
        {/* <Text
      style={{
        fontSize: 14,
      }}
    >
      see all
    </Text> */}
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 5,
        }}
        horizontal
      >
        {filteredLaundryServices
          ?.slice(0, 5)
          .filter((item) => item?.isVerified === 'verified')
          .map((item, index) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('ShopDetails', { item })}
              key={index}
            >
              <View
                className="mt-1 rounded-lg self-start mr-2 h-full bg-white border border-gray-200"
                style={{
                  // width: 230,
                  // width: 'auto',
                  width: horizontalScale(200),
                  // height: width <= 380 ? 295 : 310,
                }}
              >
                <Image
                  className="rounded-lg rounded-b-none"
                  // width >= 500 ? width * 0.25 : width * 0.5
                  style={{
                    height: verticalScale(180),
                    width: 'auto',
                    // width: horizontalScale(150),
                  }}
                  source={{
                    uri: item.imageUrl,
                  }}
                  resizeMode="cover"
                />
                <View className="justify-between h-[110px]">
                  <View className="p-2 items-start">
                    <Text
                      className="font-semibold"
                      style={{
                        fontSize: 17,
                      }}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                  </View>
                  {/* time */}
                  <View className="p-2 w-full">
                    <View className="overflow-hidden flex-row gap-1 items-center">
                      <Icon
                        iconLibrary="MaterialCommunityIcons"
                        iconName="clock-time-four-outline"
                      />
                      <View className="flex-row">
                        <Text>{item?.openHours?.from} - </Text>
                        <Text>{item?.openHours?.to}</Text>
                      </View>
                    </View>
                    {/* km away */}
                    <View className="overflow-hidden flex-row gap-1 items-center">
                      <Icon
                        iconLibrary="SimpleLineIcons"
                        iconName="location-pin"
                      />
                      <Text>{item?.distance.distanceKM.toFixed(1)} km</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
    </View>
  ) : (
    <View className="flex-1">
      <View className="flex-row justify-between">
        <Text
          style={{
            fontSize: 12,
          }}
        >
          Services
        </Text>
        {/* <Text
          style={{
            fontSize: 14,
          }}
        >
          see all
        </Text> */}
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 5,
        }}
        // style={{
        //   height: height - 400,
        // }}
      >
        {filteredLaundryServices
          ?.slice(0, toggleAll ? 20 : 5)
          .filter((item) => item?.isVerified === 'verified')
          .map((item, index) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('ShopDetails', { item })}
              key={index}
            >
              <View
                className="flex-row mt-2 rounded-lg self-start mr-4 bg-white border border-gray-200"
                style={{
                  width: '100%',
                  height: 90,
                  // width: 'auto',
                  maxWidth: horizontalScale(400),
                  // height: width <= 380 ? 295 : 310,
                }}
              >
                <Image
                  className="rounded-lg"
                  // width >= 500 ? width * 0.25 : width * 0.5
                  style={{
                    height: '100%',
                    width: 80,
                    // width: horizontalScale(150),
                  }}
                  source={{
                    uri: item.imageUrl,
                  }}
                  resizeMode="cover"
                />
                <View className="justify-around h-[80px] w-full">
                  <View className="p-2 items-start">
                    <Text
                      className="font-semibold max-w-[72%]"
                      style={{
                        fontSize: moderateScale(15),
                      }}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                  </View>
                  {/* time */}
                  <View className="p-2 w-full">
                    <View className="overflow-hidden flex-row gap-1 items-center">
                      <Icon
                        iconLibrary="MaterialCommunityIcons"
                        iconName="clock-time-four-outline"
                        size={moderateScale(12)}
                      />
                      <View className="flex-row">
                        <Text style={{ fontSize: moderateScale(12) }}>
                          {item?.openHours?.from} -{' '}
                        </Text>
                        <Text style={{ fontSize: moderateScale(12) }}>
                          {item?.openHours?.to}
                        </Text>
                      </View>
                    </View>
                    {/* km away */}
                    <View className="overflow-hidden flex-row gap-1 items-center">
                      <Icon
                        iconLibrary="SimpleLineIcons"
                        iconName="location-pin"
                        size={moderateScale(12)}
                      />
                      <Text style={{ fontSize: moderateScale(12) }}>
                        {item?.distance.distanceKM.toFixed(1)} km
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
    </View>
  );
};

export default LaundryServices;
