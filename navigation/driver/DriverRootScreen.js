import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverTab from './DriverTab';
import DriverMapScreen from '../../components/driver/map/DriverMapScreen';
import useNotification from '../../components/hook/useNotification';
import ToShopMapScreen from '../../components/driver/map/ToShopMapScreen';

const Stack = createNativeStackNavigator();

const DriverRootScreen = () => {
  const Logout = () => <></>;
  useNotification('Notifications');
  return (
    <Stack.Navigator initialRouteName="DriverTab">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DriverTab"
        component={DriverTab}
      />
      <Stack.Screen
        name="MapScreen"
        component={DriverMapScreen}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="ToShopMapScreen"
        component={ToShopMapScreen}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DriverRootScreen;
