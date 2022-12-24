import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverTab from "./DriverTab";
import DriverMapScreen from "../../components/driver/map/DriverMapScreen";

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
    <Stack.Screen
      name="MapScreen"
      component={DriverMapScreen}
      options={{
        headerTransparent: true,
        headerTitle: "",
      }}
    />
  </Stack.Navigator>
);

export default DriverRootScreen;
