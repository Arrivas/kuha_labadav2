import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import Icon from '../../../Icon';

const BookingItem = ({ itemArry, colors }) => {
  return (
    <>
      {itemArry.map((item) => {
        const { laundryShopDetails, service, schedule, method } = item;
        const { laundryShopName } = laundryShopDetails;
        const { pickupDateTime, deliveryDate } = schedule;

        return (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#eee')}
            key={item.createdAt}
          >
            <View className="p-2 mb-2 bg-white px-4">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center justify-center">
                  <Icon
                    iconLibrary="MaterialIcons"
                    iconName="storefront"
                    className="mr-2"
                    size={22}
                  />
                  <Text className="text-[17px] max-w-[80%]" numberOfLines={1}>
                    {laundryShopName}
                  </Text>
                </View>
                <Text
                  className="max-w-[50%] text-xs"
                  style={{
                    color: colors.primary,
                  }}
                >
                  {item.status}
                </Text>
              </View>
              <View>
                {/* pickup date & time */}
                <View className="flex-row justify-between">
                  <Text>Pickup Date & Time</Text>
                  <Text className="max-w-[50%] text-right">
                    {pickupDateTime}
                  </Text>
                </View>
                {/* delivery date */}
                <View className="flex-row justify-between">
                  <Text>Delivery Date</Text>
                  <Text>{deliveryDate}</Text>
                </View>
              </View>
              <View className="flex-row self-end items-center justify-center pt-2">
                <Text>see more</Text>
                <Icon
                  iconLibrary="MaterialIcons"
                  iconName="chevron-right"
                  size={20}
                />
              </View>
            </View>
          </TouchableNativeFeedback>
        );
      })}
    </>
  );
};

export default BookingItem;
