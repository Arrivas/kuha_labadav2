import { useEffect, useContext } from 'react';
import * as Notifications from 'expo-notifications';
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import {
  expoTokenCustomer,
  expoTokenDriver,
  expoTokenAdmin,
} from '../../api/setExpoToken.js';

export default useNotifications = (navigateTo) => {
  const { user, setUser } = useContext(AppContext);
  const navigation = useNavigation();
  useEffect(() => {
    registerForPushNotifications();
    if (navigateTo)
      Notifications.addNotificationResponseReceivedListener((notification) =>
        navigation.navigate(navigateTo)
      );
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Notifications.requestPermissionsAsync();
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (!existingStatus === 'granted')
        return alert('please enable notification');
      if (!permission.granted)
        return alert('Failed to get push token for push notification!');

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      if (user?.userType === 'customer') {
        const userCopy = { ...user };
        userCopy.pushToken = token;
        setUser(userCopy);
        return expoTokenCustomer(user?.docId.trim(), token);
      } else if (user?.userType === 'admin') {
        const userCopy = { ...user };
        userCopy.pushToken = token;
        setUser(userCopy);
        return expoTokenAdmin(user?.laundry_id.trim(), token);
      } else if (user?.driverDetails?.userType === 'driver') {
        const userCopy = { ...user };
        userCopy.driverDetails.pushToken = token;
        setUser(userCopy);
        return expoTokenDriver(user?.driverDetails?.docId.trim(), token);
      }
    } catch (error) {
      console.log('cannot use notification', error);
    }
  };
};
