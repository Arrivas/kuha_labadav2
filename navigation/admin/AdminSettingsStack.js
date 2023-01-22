import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminSettingsScreen from "../../components/admin/AdminSettingsScreen";
import MyShopComponent from "../../components/admin/settings/MyShopComponent";

const Stack = createNativeStackNavigator();

const AdminSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      options={{
        title: "",
        headerShadowVisible: false,
      }}
      component={AdminSettingsScreen}
    />
    <Stack.Screen
      name="MyShop"
      options={{
        title: "",
        headerShadowVisible: false,
      }}
      component={MyShopComponent}
    />
  </Stack.Navigator>
);

export default AdminSettingsStack;
