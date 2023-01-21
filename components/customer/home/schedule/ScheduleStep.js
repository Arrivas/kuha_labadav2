import { View, Text } from 'react-native';
import React from 'react';

const ScheduleStep = ({ scheduleStep, colors }) => {
  const stepObj = [
    { id: 1, label: 'step 1' },
    { id: 2, label: 'step 2' },
    { id: 3, label: 'step 3' },
    { id: 4, label: 'step 4' },
  ];

  return (
    <View className=" flex-row space-x-1 self-center mt-5">
      {stepObj.map((item) => (
        <View
          className={`${
            scheduleStep >= 1 && item.id === 1
              ? `rounded-l bg-[${colors.primary}]`
              : scheduleStep >= 4 && item.id === 4
              ? `rounded-r bg-[${colors.primary}]`
              : scheduleStep === item.id || scheduleStep >= item.id
              ? `bg-[${colors.primary}]`
              : 'bg-gray-100'
          }  flex-1 py-1 `}
          key={item.id}
        >
          {scheduleStep === item.id && (
            <Text className="self-center absolute -top-5 font-semibold">
              {item.label}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default ScheduleStep;
