import { useEffect, useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from '../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import CustomerHomeStack from './CustomerHomeStack';
import CustomerNotificationsStack from './CustomerNotificationsStack';
import CustomerSettingsStack from './CustomerSettingsStack';
import CustomerChatStack from './CustomerChatStack';

import Icon from '../../components/Icon';
import colors from '../../config/colors';
import getDimensions from '../../config/getDimensions';

const Tab = createBottomTabNavigator();
const { width, height } = getDimensions();

const CustomerTab = () => {
  const { user } = useContext(AppContext);
  const [unseenMessageCount, setUnseenMessageCount] = useState(0);
  const { confirmedBooking } = user;

  useEffect(() => {
    let mounted = true;
    let unsubscribe;
    if (mounted) {
      unsubscribe = confirmedBooking.filter((item) =>
        firebase
          .firestore()
          .collection('customers')
          .doc(item.customerDetails.customerDocId)
          .collection('chats')
          .onSnapshot((snapshot) => {
            const chatData = [];
            snapshot.forEach((doc) => {
              if (doc.data().customerSeen === false) chatData.push(doc.data());
              setUnseenMessageCount(chatData.length);
            });
          })
      );
    }
    () => {
      mounted = false;
      unsubscribe();
    };
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          textAlignVertical: 'center',
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            height: 45,
          },
          tabBarLabelStyle: {
            fontSize: 13,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon
              iconLibrary="Feather"
              iconName="home"
              color={color}
              size={25}
            />
          ),
        }}
        component={CustomerHomeStack}
      />
      <Tab.Screen
        name="ChatStack"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            height: 45,
          },
          tabBarLabelStyle: {
            fontSize: 13,
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon
              iconLibrary="AntDesign"
              iconName="message1"
              color={color}
              size={25}
            />
          ),
          tabBarBadge: unseenMessageCount || null,
        }}
        component={CustomerChatStack}
      />
      <Tab.Screen
        name="NotificationStack"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            height: 45,
          },
          tabBarLabelStyle: {
            fontSize: 13,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon
              iconLibrary="Feather"
              iconName="bell"
              color={color}
              size={25}
            />
          ),
        }}
        component={CustomerNotificationsStack}
      />
      <Tab.Screen
        name="SettingsStack"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            height: 45,
          },
          tabBarLabelStyle: {
            fontSize: 13,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon
              iconLibrary="Feather"
              iconName="settings"
              color={color}
              size={25}
            />
          ),
        }}
        component={CustomerSettingsStack}
      />
    </Tab.Navigator>
  );
};

export default CustomerTab;
