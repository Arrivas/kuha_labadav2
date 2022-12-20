import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminNotificationScreen from '../../components/admin/AdminNotificationScreen';

const Stack = createNativeStackNavigator();

const AdminNotificationStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Notification" component={AdminNotificationScreen} />
  </Stack.Navigator>
);

export default AdminNotificationStack;
