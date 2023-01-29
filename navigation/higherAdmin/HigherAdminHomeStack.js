import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HigherAdminHomeScreen from '../../components/_higherAdmin/HigherAdminHomeScreen';

const Stack = createNativeStackNavigator();

const HigherAdminHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HigherAdminHomeScreen} />
  </Stack.Navigator>
);

export default HigherAdminHomeStack;
