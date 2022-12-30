import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerHomeStack from './CustomerHomeStack';
import CustomerNotificationsStack from './CustomerNotificationsStack';
import CustomerSettingsStack from './CustomerSettingsStack';
import CustomerChatStack from './CustomerChatStack';

import Icon from '../../components/Icon';
import colors from '../../config/colors';
import getDimensions from '../../config/getDimensions';

const Tab = createBottomTabNavigator();
const { width, height } = getDimensions();

const CustomerTab = () => (
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
          <Icon iconLibrary="Feather" iconName="bell" color={color} size={25} />
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

export default CustomerTab;
