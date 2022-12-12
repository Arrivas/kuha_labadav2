import React from 'react';
import { View, Text } from 'react-native';

const PickupTime = ({ availablePickupTimes }) => {
  return (
    <View className="">
      <Text
        style={{
          fontFamily: 'Alexandria-SemiBold',
          fontSize: 16,
        }}
      >
        Pickup Time
      </Text>
      <View className="flex-row flex-wrap w-full justify-between items-center">
        {availablePickupTimes.map((item, index) => (
          <View
            className="p-4 mt-2 rounded-md bg-gray-100 items-center justify-center"
            style={{
              width: '32.5%',
              // flex: 1,
            }}
            key={index}
          >
            <Text>{item.time.toLowerCase()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PickupTime;
