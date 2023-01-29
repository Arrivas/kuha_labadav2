import { View, Text } from 'react-native';
import React from 'react';

const NotificationItem = ({ notification }) => {
  const { body, title, seen } = notification;

  return (
    <View
      className="px-5 py-4  opacity-60"
      style={{
        backgroundColor: seen ? 'white' : '#ececec',
      }}
    >
      <Text className="font-bold">{title}</Text>
      <Text>{body}</Text>
    </View>
  );
};

export default NotificationItem;
