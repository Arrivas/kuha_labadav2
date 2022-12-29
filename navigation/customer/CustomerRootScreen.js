import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerTab from './CustomerTab';
import useNotification from '../../components/hook/useNotification';

const Stack = createNativeStackNavigator();

const CustomerRootScreen = () => {
  useNotification('Notifications');
  const LogoutComp = () => <></>;
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="CustomerTab"
        options={{ headerShown: false }}
        component={CustomerTab}
      />
      <Stack.Screen name="Logout" component={LogoutComp} />
    </Stack.Navigator>
  );
};

export default CustomerRootScreen;
