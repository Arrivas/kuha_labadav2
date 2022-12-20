import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminTab from './AdminTab';

const Stack = createNativeStackNavigator();

const AdminRootScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="AdminTab"
      component={AdminTab}
    />
  </Stack.Navigator>
);

export default AdminRootScreen;
