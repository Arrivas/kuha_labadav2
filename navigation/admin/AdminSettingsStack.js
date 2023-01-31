import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminSettingsScreen from '../../components/admin/AdminSettingsScreen';
import MyShopComponent from '../../components/admin/settings/MyShopComponent';
import Verification from '../../components/admin/settings/Verification';

const Stack = createNativeStackNavigator();

const AdminSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      options={{
        title: '',
        headerShadowVisible: false,
      }}
      component={AdminSettingsScreen}
    />
    <Stack.Screen
      name="MyShop"
      options={{
        title: '',
        headerShadowVisible: false,
      }}
      component={MyShopComponent}
    />
    <Stack.Screen
      name="Verification"
      options={{
        title: 'Verification',
        headerShadowVisible: false,
      }}
      component={Verification}
    />
  </Stack.Navigator>
);

export default AdminSettingsStack;
