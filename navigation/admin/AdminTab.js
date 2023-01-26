import { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from '../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import Icon from '../../components/Icon';
import AdminHomeStack from './AdminHomeStack';
import AdminNotificationStack from './AdminNotificationStack';
import AdminSettingsStack from './AdminSettingsStack';
import AdminChatStack from './AdminChatStack';
import colors from '../../config/colors';

const Tab = createBottomTabNavigator();

const AdminTab = () => {
  const { user } = useContext(AppContext);
  const [unseenMessageCount, setUnseenMessageCount] = useState(0);
  const { pendingServices } = user;
  const { ongoing } = pendingServices;

  useEffect(() => {
    let mounted = true;
    let unsubscribe;
    if (mounted) {
      unsubscribe = ongoing.filter((item) =>
        firebase
          .firestore()
          .collection('customers')
          .doc(item.customerDetails.customerDocId)
          .collection('chats')
          .onSnapshot((snapshot) => {
            const chatData = [];
            snapshot.forEach((doc) => {
              if (doc.data().adminSeen === false) chatData.push(doc.data());
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
        component={AdminHomeStack}
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
        component={AdminChatStack}
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
        component={AdminNotificationStack}
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
        component={AdminSettingsStack}
      />
    </Tab.Navigator>
  );
};

export default AdminTab;
