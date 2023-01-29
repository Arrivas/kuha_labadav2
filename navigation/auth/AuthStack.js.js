import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../components/loginScreen/LoginScreen';
import CreateAccount from '../../components/loginScreen/CreateAccount';
import ForgotPassword from '../../components/loginScreen/ForgotPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'Forgot Password',
          headerShown: true,
          // headerTransparent: true,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
