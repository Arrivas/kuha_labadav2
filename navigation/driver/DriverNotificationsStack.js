import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverNotificationScreen from "../../components/driver/DriverNotificationScreen";

const Stack = createNativeStackNavigator();

const DriverNotifactionStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Notification" component={DriverNotificationScreen} />
  </Stack.Navigator>
);

export default DriverNotifactionStack;
