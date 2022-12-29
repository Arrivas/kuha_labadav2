import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminChatList from '../../components/admin/chat/AdminChatList';
import AdminChatScreen from '../../components/admin/chat/AdminChatScreen';

const Stack = createNativeStackNavigator();

const AdminChatStack = () => (
  <Stack.Navigator initialRouteName="ChatList">
    <Stack.Screen
      name="ChatList"
      options={{
        title: 'Messages',
      }}
      component={AdminChatList}
    />
    <Stack.Screen name="ChatScreen" component={AdminChatScreen} />
  </Stack.Navigator>
);

export default AdminChatStack;
