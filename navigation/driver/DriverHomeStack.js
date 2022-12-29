import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverHomeScreen from '../../components/driver/DriverHomeScreen';

const Stack = createNativeStackNavigator();

const DriverHomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={DriverHomeScreen}
      options={{
        headerShown: true,
        headerShadowVisible: false,
      }}
    />
  </Stack.Navigator>
);

export default DriverHomeStack;
