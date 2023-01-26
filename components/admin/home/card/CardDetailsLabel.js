import { View, Text } from 'react-native';
import React from 'react';

const CardDetailsLabel = ({ label = '', value, textColor = '#000' }) => {
  return (
    <>
      <View className="flex-row justify-between w-full my-0.5">
        <Text
          style={
            {
              // fontFamily: 'Alexandria-Regular',
            }
          }
        >
          {label}
        </Text>
        <Text
          className="max-w-[50%] text-right"
          style={{
            fontFamily: 'Alexandria-Light',
            color: textColor,
          }}
        >
          {typeof value === 'object' ? `${value}` : value ? value : '-'}
        </Text>
      </View>
    </>
  );
};

export default CardDetailsLabel;
