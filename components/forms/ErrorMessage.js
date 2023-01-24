import React from 'react';
import { View, Text } from 'react-native';

const ErrorMessage = ({ error, styleProp }) => {
  return (
    <>
      {error ? (
        <View className="my-1">
          <Text className={`text-red-400 px-5 ${styleProp}`}>{error}</Text>
        </View>
      ) : null}
    </>
  );
};

export default ErrorMessage;
