import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  ScrollView,
} from 'react-native';
import React, { useContext } from 'react';
import useAuth from '../../auth/useAuth';
import { useNavigation, CommonActions } from '@react-navigation/native';
import SafeScreenView from '../SafeScreenView';
import { moderateScale, horizontalScale } from '../../config/metrics';
import { AppContext } from '../../context/AppContext';
import SettingsItem from './settings/SettingsItem';
import colors from '../../config/colors';

const AdminSettingsScreen = () => {
  const { logOut } = useAuth();
  const { user, setUser } = useContext(AppContext);
  const navigation = useNavigation();
  const settingsArr = [
    {
      id: 1,
      label: 'My Shop',
      path: 'MyShop',
      iconName: 'storefront',
      outerBg: '#e6f7fe',
      iconColor: '#2fa1db',
      iconLibrary: 'MaterialIcons',
    },
    {
      id: 2,
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
  // console.log(`${user?.imageUrl}?${new Date().toISOString()}`);
  return (
    <SafeScreenView>
      <View
        className="flex-1"
        style={{ paddingHorizontal: horizontalScale(20) }}
      >
        <View className="flex-1">
          <Text
            className="font-semibold"
            style={{
              fontSize: moderateScale(40),
            }}
          >
            Settings
          </Text>
        </View>
        <View className="flex-1 justify-center">
          <Text
            style={{
              fontSize: moderateScale(25),
            }}
          >
            Account
          </Text>
        </View>

        <View className="flex-1 justify-center">
          <View className="flex-row items-center py-10">
            <Image
              resizeMode="cover"
              source={{
                uri: `${user?.imageUrl}&random=${Math.random()
                  .toString(36)
                  .substring(7)}`,
              }}
              className="h-[70px] w-[70px] rounded-full"
            />
            <View className="ml-2">
              <Text
                className="font-bold"
                style={{
                  fontSize: moderateScale(20),
                }}
              >
                {user?.isVerified === 'verified'
                  ? 'Verified'
                  : 'Not yet verified'}
              </Text>
              <TouchableNativeFeedback
                disabled={user?.isVerified === 'verified' ? true : false}
                onPress={() => navigation.navigate('Verification')}
              >
                <View>
                  <Text
                    style={{
                      color:
                        user?.isVerified === 'verified'
                          ? 'black'
                          : colors.primary,
                    }}
                    className={`${
                      user?.isVerified === 'verified' ? '' : 'underline'
                    }`}
                  >
                    {user?.isVerified === 'verified'
                      ? 'your account is verified'
                      : 'verify your account now'}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>

        <View className="flex-1 justify-center">
          <Text
            style={{
              fontSize: moderateScale(25),
            }}
          >
            Settings
          </Text>
        </View>
        <View style={{ flex: 4 }}>
          <ScrollView>
            <View style={{ flex: 1 }} className=" ">
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
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default AdminSettingsScreen;
