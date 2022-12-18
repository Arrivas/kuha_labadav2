import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverTab from "./DriverTab";

const Stack = createNativeStackNavigator();

const DriverRootScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="DriverTab"
      component={DriverTab}
    />
  </Stack.Navigator>
);

export default DriverRootScreen;
