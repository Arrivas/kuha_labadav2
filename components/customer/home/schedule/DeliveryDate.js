import React from 'react';
import { View, Text } from 'react-native';

function DeliveryDate({ deliveredByItems }) {
  return (
    <View className="">
      <Text
        className="self-start"
        style={{
          fontFamily: 'Alexandria-SemiBold',
          fontSize: 16,
        }}
      >
        Delivery Date
      </Text>
      <View className="flex-row justify-between items-center">
        {deliveredByItems.map((item, index) => (
          <View
            className="w-[50%] bg-gray-100 rounded-md mr-1 p-4 items-center justify-center"
            key={index}
          >
            <Text>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default DeliveryDate;
