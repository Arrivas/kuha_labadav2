import React, { useContext } from 'react';
import { View, Image, Text, TouchableNativeFeedback } from 'react-native';
import SecureStore from '../../auth/storage';

// screen
import SafeScreenView from '../SafeScreenView';

const WelcomeScreen = ({ isFirstUse, setIsFirstUse }) => {
  const proceedToLogin = async () => {
    await SecureStore.setWelcome();
    setIsFirstUse(false);
  };
  console.log(isFirstUse);
  return (
    <>
      {isFirstUse ? (
        <SafeScreenView>
          <Image
            className="h-full w-full flex-1"
            source={require('../../assets/welcome_1.png')}
            resizeMode="contain"
          />
          <View className="flex-1 items-center px-8">
            <Text className="font-bold text-3xl">Kuha Labada App</Text>
            <Text className="text-lg text-center">
              Get ready to make your life easy with single click of app, which
              makes laundry things handle better.
            </Text>
            <TouchableNativeFeedback onPress={proceedToLogin}>
              <View className="p-4 bg-[#75a1e6] rounded-full my-24">
                <Text className="text-white font-semibold">Get Started</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </SafeScreenView>
      ) : (
        <></>
      )}
    </>
  );
};

export default WelcomeScreen;

// SecureStore.setWelcome()
