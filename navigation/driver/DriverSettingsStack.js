import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverSettingsScreen from "../../components/driver/DriverSettingsScreen";

const Stack = createNativeStackNavigator();

const DriverStettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={DriverSettingsScreen} />
  </Stack.Navigator>
);

export default DriverStettingsStack;
