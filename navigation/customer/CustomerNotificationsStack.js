import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerNotificationScreen from '../../components/customer/CustomerNotificationScreen';

const Stack = createNativeStackNavigator();

const CustomerNotificationsStack = () => (
  <Stack.Navigator initialRouteName="Notification">
    <Stack.Screen
      name="Notification"
      options={{
        headerShown: false,
      }}
      component={CustomerNotificationScreen}
    />
  </Stack.Navigator>
);

export default CustomerNotificationsStack;
