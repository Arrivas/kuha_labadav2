import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DriverHomeStack from './DriverHomeStack';
import DriverNotificationsStack from './DriverNotificationsStack';
import DriverSettingsStack from './DriverSettingsStack';
import Icon from '../../components/Icon';
import colors from '../../config/colors';

const Tab = createBottomTabNavigator();

const DriverTab = () => (
  <Tab.Navigator
    initialRouteName="HomeStack"
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
      name="HomeStack"
      component={DriverHomeStack}
    />
    <Tab.Screen
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
      name="NotificationStack"
      component={DriverNotificationsStack}
    />
    <Tab.Screen
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
      name="SettingsStack"
      component={DriverSettingsStack}
    />
  </Tab.Navigator>
);

export default DriverTab;
