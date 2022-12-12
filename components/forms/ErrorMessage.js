import React from 'react';
import { View, Text } from 'react-native';

const ErrorMessage = ({ error, styleProp }) => {
  return (
    <>
      {error ? (
        <View>
          <Text className={`text-red-400 px-5 bottom-1 ${styleProp}`}>
            {error}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default ErrorMessage;
