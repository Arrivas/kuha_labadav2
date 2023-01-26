import { View, Text } from 'react-native';
import React from 'react';

const NoItemsYet = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white absolute w-full h-full right-0 top-0">
      <Text className="text-gray-400 font-bold">no items available yet</Text>
    </View>
  );
};

export default NoItemsYet;
