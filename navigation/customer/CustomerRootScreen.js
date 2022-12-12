import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerTab from './CustomerTab';

const Stack = createNativeStackNavigator();

const CustomerRootScreen = () => (
  <Stack.Navigator screenOptions={{
    
  }}>
    <Stack.Screen
      name="CustomerTab"
      options={{ headerShown: false }}
      component={CustomerTab}
    />
  </Stack.Navigator>
);

export default CustomerRootScreen;
