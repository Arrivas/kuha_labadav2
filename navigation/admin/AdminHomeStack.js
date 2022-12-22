import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHomeScreen from '../../components/admin/AdminHomeScreen';

const Stack = createNativeStackNavigator();

const AdminHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{
        headerShadowVisible: false,
      }}
      component={AdminHomeScreen}
    />
  </Stack.Navigator>
);

export default AdminHomeStack;
