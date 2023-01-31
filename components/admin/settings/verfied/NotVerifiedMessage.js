import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import Icon from '../../../Icon';

const NotVerifiedMessage = ({ navigation, type = 'default' }) => {
  return (
    <TouchableNativeFeedback
      disabled={type === 'default' ? false : true}
      onPress={() =>
        navigation.navigate('SettingsStack', {
          screen: 'Verification',
          initial: false,
        })
      }
    >
      <View className="bg-[#FFF3CD] p-4 text-center">
        <Text className="text-[#856404] font-bold">
          {type === 'default'
            ? 'Your shop is currently inactive and not visible in the booking selection. To ensure a seamless booking experience for your customers, please verify your shop information first.'
            : 'Kindly submit the required documents for us to verify your shop.'}
        </Text>
        {type === 'default' && (
          <View className="flex-row self-end mt-2">
            <Text className="font-light text-[#856404]">
              tap to get verified
            </Text>
            <Icon iconLibrary="Feather" iconName="chevron-right" size={20} />
          </View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default NotVerifiedMessage;
