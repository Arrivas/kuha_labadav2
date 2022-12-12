import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import generateWeek from '../../../../functions/generateWeek';

const PickupDate = (props) => {
  const availableWeek = generateWeek.getAvailableDateWeek();

  return (
    <View className="">
      <Text
        style={{
          fontFamily: 'Alexandria-SemiBold',
          fontSize: 16,
        }}
      >
        Pickup Date
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View className="flex-row">
          {availableWeek.map((item) => (
            <View
              key={item.dayWeek}
              className="bg-gray-100 items-center justify-between rounded-lg mr-2 py-1"
              style={{
                height: 75,
                width: 60,
                borderWidth: 1,
                borderColor: 'transparent',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Alexandria-Regular',
                  // fontSize: 15,
                }}
              >
                {item.dayWeek.slice(0, 3)}
              </Text>
              <Text
                style={{
                  fontFamily: 'Alexandria-Regular',
                  fontSize: 15,
                }}
              >
                {item.dayNumber}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PickupDate;
