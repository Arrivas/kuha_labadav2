import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../components/Icon';
import AdminHomeStack from './AdminHomeStack';
import AdminNotificationStack from './AdminNotificationStack';
import AdminSettingsStack from './AdminSettingsStack';
import AdminChatStack from './AdminChatStack';
import colors from '../../config/colors';

const Tab = createBottomTabNavigator();

const AdminTab = () => (
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
          <Icon iconLibrary="Feather" iconName="home" color={color} size={25} />
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
          <Icon iconLibrary="Feather" iconName="bell" color={color} size={25} />
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

export default AdminTab;
