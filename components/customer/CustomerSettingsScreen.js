import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import useAuth from '../../auth/useAuth';
import { useNavigation, CommonActions } from '@react-navigation/native';
import SafeScreenView from '../SafeScreenView';
import { moderateScale, horizontalScale } from '../../config/metrics';
import { AppContext } from '../../context/AppContext';
import SettingsItem from './settings/SettingsItem';

const CustomerSettingsScreen = () => {
  const { logOut } = useAuth();
  const { user, setUser } = useContext(AppContext);
  const { now, setNow } = useState();
  const navigation = useNavigation(new Date());
  const settingsArr = [
    {
      id: 1,
      label: 'Personal Info',
      path: 'PersonalInfo',
      iconName: 'account-circle',
      outerBg: '#f4f4f4',
      iconColor: '#666',
      iconLibrary: 'MaterialCommunityIcons',
    },
    {
      id: 2,
      label: 'My Booking',
      path: 'MyBooking',
      iconName: 'list',
      outerBg: '#fef1e7',
      iconColor: '#e37f48',
      iconLibrary: 'MaterialIcons',
    },
    {
      id: 3,
      label: 'Logout',
      path: '',
      iconName: 'logout',
      outerBg: '#eee',
      iconColor: 'black',
      iconLibrary: 'MaterialIcons',
    },
    // {
    //   id: 2,
    //   label: 'Dark Mode',
    //   path: '',
    //   iconName: 'moon',
    //   outerBg: '#ecebff',
    //   iconColor: '#583be0',
    //   iconLibrary: 'Feather',
    // },
  ];

  return (
    <SafeScreenView>
      <View
        className="flex-1"
        style={{ paddingHorizontal: horizontalScale(20) }}
      >
        <View style={{ flex: 0.5 }} className="mb-2">
          <Text
            className="font-semibold"
            style={{
              fontSize: moderateScale(40),
            }}
          >
            Settings
          </Text>
        </View>

        <View style={{ flex: 0.5 }} className="mb-2 flex-row items-center">
          <Image
            source={{ uri: `${user?.imageUrl}&time=${now}` }}
            className="h-[60px] w-[60px] rounded-full"
          />
          <View className="ml-2">
            <Text
              className="font-bold"
              style={{
                fontSize: moderateScale(20),
              }}
            >
              {user?.verified === 'verified' ? 'Verified' : 'Not yet verified'}
            </Text>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('Verification')}
            >
              <View>
                <Text>
                  {user?.verified === 'verified'
                    ? 'your account is verified'
                    : 'verify your account now'}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={{ flex: 3 }}>
          <Text
            className="pb-2"
            style={{
              fontSize: moderateScale(18),
            }}
          >
            Account
          </Text>
          <ScrollView>
            <View style={{ flex: 1 }}>
              {settingsArr.map((item) => (
                <SettingsItem
                  key={item.id}
                  iconColor={item.iconColor}
                  iconLibrary={item.iconLibrary}
                  iconName={item.iconName}
                  label={item.label}
                  outerBg={item.outerBg}
                  path={item.path}
                  navigation={navigation}
                  logOut={logOut}
                  imageUrl={user?.imageUrl}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default CustomerSettingsScreen;
