import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../components/loginScreen/LoginScreen';
import CreateAccount from '../../components/loginScreen/CreateAccount';
import { TouchableNativeFeedback, View } from 'react-native';
import Icon from '../../components/Icon';
import { useNavigation } from '@react-navigation/native';
import getDimensions from '../../config/getDimensions';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();
  const { width } = getDimensions();
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
          headerShadowVisible: false,
          headerTransparent: true,
          headerLeft: () => (
            <View style={{ marginHorizontal: width * 0.02 }}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#d3d3d3', true)}
                onPress={() => navigation.navigate('Login')}
              >
                <View className="rounded-full">
                  <Icon
                    className="rounded-full p-1"
                    iconName="arrowleft"
                    iconLibrary="AntDesign"
                    size={22}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
