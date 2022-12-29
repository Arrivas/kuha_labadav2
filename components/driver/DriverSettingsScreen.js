import React from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import SafeScreenView from '../SafeScreenView';
import useAuth from '../../auth/useAuth';
import { useNavigation, CommonActions } from '@react-navigation/native';

const DriverSettingsScreen = (props) => {
  const { logOut } = useAuth();
  const navigation = useNavigation();
  return (
    <SafeScreenView>
      <View>
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
    </SafeScreenView>
  );
};

export default DriverSettingsScreen;
