import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../components/Icon';

import HigherAdminHomeStack from './HigherAdminHomeStack';
import HigherAdminSettingsStack from './HigherAdminSettingsStack';
import HigherAdminNotificationStack from './HigherAdminNotificationStack';

const Tab = createBottomTabNavigator();

const HigherAdminTab = () => (
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
      component={HigherAdminHomeStack}
      options={{
        tabBarLabel: '',
        tabBarStyle: {
          height: 45,
        },
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Icon iconLibrary="Feather" iconName="home" color={color} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="NotificationStack"
      component={HigherAdminNotificationStack}
      options={{
        tabBarLabel: '',
        tabBarStyle: {
          height: 45,
        },
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Icon iconLibrary="Feather" iconName="bell" color={color} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="SettingsStack"
      component={HigherAdminSettingsStack}
      options={{
        tabBarLabel: '',
        tabBarStyle: {
          height: 45,
        },
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Icon
            iconLibrary="Feather"
            iconName="settings"
            color={color}
            size={25}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default HigherAdminTab;
