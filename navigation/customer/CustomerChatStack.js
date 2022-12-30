import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from '../../components/Icon';
import CustomerChatScreen from '../../components/customer/chat/CustomerChatScreen';
import CustomerChatList from '../../components/customer/chat/CustomerChatList'

const Stack = createNativeStackNavigator();

const CustomerChatStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='ChatList' component={CustomerChatList}/>
    <Stack.Screen name='ChatScreen' component={CustomerChatScreen}/>
  </Stack.Navigator>
);

export default CustomerChatStack;
