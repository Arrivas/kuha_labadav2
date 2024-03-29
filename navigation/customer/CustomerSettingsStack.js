import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerSettingsScreen from '../../components/customer/CustomerSettingsScreen';
import PersonalInfo from '../../components/customer/settings/PersonalInfo';
import MyBooking from '../../components/customer/settings/booking/MyBooking';
import Verification from '../../components/customer/settings/Verification';

const Stack = createNativeStackNavigator();

const CustomerSettingsStack = () => (
  <Stack.Navigator initialRouteName="Settings">
    <Stack.Screen
      name="Settings"
      options={{
        // headerShown: false,
        headerShadowVisible: false,
        title: '',
      }}
      component={CustomerSettingsScreen}
    />
    <Stack.Screen
      name="PersonalInfo"
      options={{
        // headerShown: false,
        headerShadowVisible: false,
        title: '',
      }}
      component={PersonalInfo}
    />
    <Stack.Screen
      name="MyBooking"
      options={{
        // headerShown: false,
        headerShadowVisible: false,
        title: 'My Bookings',
      }}
      component={MyBooking}
    />
    <Stack.Screen
      name="Verification"
      options={{
        // headerShown: false,
        headerShadowVisible: false,
        title: 'Verify',
      }}
      component={Verification}
    />
  </Stack.Navigator>
);

export default CustomerSettingsStack;
