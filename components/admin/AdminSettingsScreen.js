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
  // console.log(user);
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
              source={{ uri: user?.imageUrl }}
              className="h-[70px] w-[70px] rounded-full"
            />
            <Text className="font-semibold text-lg ml-5">{user?.name}</Text>
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
