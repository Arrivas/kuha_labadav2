import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import useAuth from '../../../auth/useAuth';
import SafeScreenView from '../../SafeScreenView';
import Icon from '../../Icon';

const VerifyEmail = ({ setIsEmailVerified }) => {
  const [email, setEmail] = useState('');
  const { logIn, logOut } = useAuth();
  return (
    <SafeScreenView enablePadding>
      <>
        <View className="flex-1">
          {/* back to log in */}
          <View className="flex-1 items-center justify-center   ">
            <Image
              className="h-[150px] w-[150px]"
              resizeMode="cover"
              source={require('../../../assets/verify_email.png')}
            />
            <TextInput
              className="border border-black w-[80%]"
              onChangeText={(text) => setEmail(text)}
            />
            {/* back to log in */}
            <View className="p-2">
              <TouchableNativeFeedback
                onPress={() => {
                  // logOut();
                  setIsEmailVerified(true);
                }}
              >
                <View className="flex-row">
                  <Icon size={22} iconLibrary="AntDesign" iconName="swapleft" />
                  <Text className="">back to log in</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View className="items-center justify-center flex-1">
            <Text>asd</Text>
          </View>
        </View>
      </>
    </SafeScreenView>
  );
};

export default VerifyEmail;
