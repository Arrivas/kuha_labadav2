import React from 'react';
import { View, Text } from 'react-native';

const VerifyOnWait = () => {
  return (
    <View
      className="flex-1"
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <View className="px-5">
        <Text className="text-xl font-medium text-center">
          Verification is on process
        </Text>
        <Text className="font-medium text-center">
          Your submitted credentials are being reviewed for verification
          purposes. Please wait for the process to complete.
        </Text>
      </View>
    </View>
  );
};

export default VerifyOnWait;
