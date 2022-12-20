import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminSettingsScreen from '../../components/admin/AdminSettingsScreen';

const Stack = createNativeStackNavigator();

const AdminSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={AdminSettingsScreen} />
  </Stack.Navigator>
);

export default AdminSettingsStack;
