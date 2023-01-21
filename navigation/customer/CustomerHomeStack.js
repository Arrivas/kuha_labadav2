import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerHomeScreen from '../../components/customer/CustomerHomeScreen';
import ShopDetails from '../../components/customer/home/ShopDetails';
import SelectSchedule from '../../components/customer/home/schedule/SelectSchedule';
import SuccessfullyBooked from '../../components/customer/home/SuccessfullyBooked';

const Stack = createNativeStackNavigator();

const CustomerHomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: 'Alexandria-Regular',
        },
      }}
      component={CustomerHomeScreen}
    />
    <Stack.Screen
      name="SelectSchedule"
      component={SelectSchedule}
      options={{
        title: '',
        headerShown: true,
        headerShadowVisible: false,
        // headerTransparent: true,
        headerTitleStyle: {
          fontFamily: 'Alexandria-Regular',
        },
      }}
    />
    <Stack.Screen
      name="ShopDetails"
      options={{
        title: '',
        headerShown: true,
        headerShadowVisible: false,
        headerTransparent: true,
      }}
      component={ShopDetails}
    />
    <Stack.Screen
      name="SuccessfullyBooked"
      component={SuccessfullyBooked}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default CustomerHomeStack;
