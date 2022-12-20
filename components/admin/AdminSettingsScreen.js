import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import useAuth from '../../auth/useAuth';

const AdminSettingsScreen = () => {
  const { logOut } = useAuth();
  return (
    <View>
      <Text>AdminSettingsScreen</Text>
      <TouchableNativeFeedback onPress={() => logOut()}>
        <View className="p-5">
          <Text>logout</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default AdminSettingsScreen;
