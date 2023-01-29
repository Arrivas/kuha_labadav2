import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import useAuth from '../../auth/useAuth';

const HigherAdminSettingsScreen = () => {
  const { logOut } = useAuth();
  return (
    <TouchableNativeFeedback onPress={logOut}>
      <View className="p-5">
        <Text>logout</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default HigherAdminSettingsScreen;
