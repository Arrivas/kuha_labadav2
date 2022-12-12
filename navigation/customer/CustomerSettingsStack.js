import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerSettingsScreen from '../../components/customer/CustomerSettingsScreen';

const Stack = createNativeStackNavigator();

const CustomerSettingsStack = () => (
  <Stack.Navigator initialRouteName="Settings">
    <Stack.Screen
      name="Settings"
      options={{
        headerShown: false,
      }}
      component={CustomerSettingsScreen}
    />
  </Stack.Navigator>
);

export default CustomerSettingsStack;
