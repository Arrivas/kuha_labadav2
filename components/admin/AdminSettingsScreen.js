import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import useAuth from '../../auth/useAuth';
import { useNavigation, CommonActions } from '@react-navigation/native';

const AdminSettingsScreen = () => {
  const { logOut } = useAuth();
  const navigation = useNavigation();
  return (
    <View>
      <Text>AdminSettingsScreen</Text>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'Logout' }],
            })
          );
          logOut();
        }}
      >
        <View className="p-5">
          <Text>logout</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default AdminSettingsScreen;
