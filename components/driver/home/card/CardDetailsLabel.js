import { View, Text } from 'react-native';
import React from 'react';
import colors from '../../../../config/colors';

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
          style={{
            fontFamily: 'Alexandria-Light',
            color: textColor,
          }}
        >
          {typeof value === 'object' ? `${value}` : value}
        </Text>
      </View>
    </>
  );
};

export default CardDetailsLabel;
