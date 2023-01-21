import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import Icon from '../../../Icon';

const NavigationButton = () => {
  return (
    <View className="py-1 flex-row justify-around w-full">
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#d6d6d6', true)}
      >
        <View className="flex-row items-center justify-center">
          <Text>next</Text>
          <Icon
            iconLibrary="MaterialCommunityIcons"
            iconName="chevron-right"
            size={30}
          />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#d6d6d6', true)}
      >
        <View className="flex-row items-center justify-center">
          <Text>next</Text>
          <Icon
            iconLibrary="MaterialCommunityIcons"
            iconName="chevron-right"
            size={30}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default NavigationButton;
