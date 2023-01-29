import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HigherAdminNotificationScreen from '../../components/_higherAdmin//HigherAdminNotificationScreen';

const Stack = createNativeStackNavigator();

const HigherAdminNotificationStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Notifications"
      component={HigherAdminNotificationScreen}
    />
  </Stack.Navigator>
);

export default HigherAdminNotificationStack;
