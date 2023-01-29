import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HigherAdminSettingsScreen from '../../components/_higherAdmin/HigherAdminSettingsScreen';

const Stack = createNativeStackNavigator();

const HigherAdminSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={HigherAdminSettingsScreen} />
  </Stack.Navigator>
);

export default HigherAdminSettingsStack;
