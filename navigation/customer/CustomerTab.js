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

const Tab = createBottomTabNavigator();

const CustomerTab = () => {
  const { user, setUser } = useContext(AppContext);
  const [unseenMessageCount, setUnseenMessageCount] = useState(0);
  const { confirmedBooking } = user;

  useEffect(() => {
    let mounted = true;
    let unsubscribe;
    if (mounted) {
      unsubscribe = confirmedBooking?.filter((item) =>
        firebase
          .firestore()
          .collection('customers')
          .doc(item.customerDetails.customerDocId)
          .collection('chats')
          .onSnapshot((snapshot) => {
            const chatData = [];
            snapshot.forEach((doc) => {
              if (doc.data().customerSeen === false) {
                chatData.push(doc.data());
                return setUnseenMessageCount(chatData.length);
              }
              setUnseenMessageCount(0);
            });
          })
      );
      unsubscribe = firebase
        .firestore()
        .collection('customers')
        .doc(user.docId)
        .onSnapshot((doc) => {
          setUser(doc.data());
        });
    }
    return () => {
      mounted = false;
      unsubscribe();
      // fetchUserSubscribe();
    };
  }, []);

  const notificationCount = user?.notifications.filter(
    (item) => item.seen === false
  );

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
          tabBarBadge: notificationCount?.length || null,
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
