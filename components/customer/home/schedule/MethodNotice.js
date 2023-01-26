import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import Icon from '../../../Icon';

const MethodNotice = ({
  showMethodNotice,
  setShowMethodNotice,
  toBeDeliver,
  isPickup,
}) => {
  return (
    <>
      <View
        className={`bg-[#fff9d5] items-center justify-between mt-1 py-3 px-2 rounded-md flex-row`}
      >
        <View className="flex-row">
          <Icon
            iconLibrary="MaterialIcons"
            iconName="warning"
            color="#ac9457"
            size={20}
          />
          <Text className="font-semibold text-[#ac9457] pl-1">reminder</Text>
        </View>
        <TouchableNativeFeedback
          onPress={() => setShowMethodNotice(!showMethodNotice)}
        >
          <View>
            <Text className="font-semibold text-[#ac9457] p-1">
              {showMethodNotice ? 'hide' : 'show'}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      {showMethodNotice && (
        <View className="bg-[#fff9d5] p-2 rounded-md mt-1">
          {isPickup === 'no' && (
            <Text className="text-[#ac9457] ">
              please drop off your laundry in our shop
            </Text>
          )}
          {toBeDeliver === 'no' && (
            <Text className="text-[#ac9457] ">
              please pickup your laundry on our shop
            </Text>
          )}
        </View>
      )}
    </>
  );
};

export default MethodNotice;
