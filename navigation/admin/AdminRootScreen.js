import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminTab from './AdminTab';

const Stack = createNativeStackNavigator();

const AdminRootScreen = () => {
  const Logout = () => <></>;
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AdminTab"
        component={AdminTab}
      />
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
  );
};

export default AdminRootScreen;
