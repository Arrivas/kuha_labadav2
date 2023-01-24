import { View, Text } from 'react-native';
import React from 'react';

const ScheduleStep = ({
  scheduleStep,
  colors,
  isPickup,
  fabconEnabled,
  toBeDeliver,
  stepObj,
}) => {
  return (
    <View className=" flex-row space-x-1 self-center mt-5 max-w-[80%]">
      {stepObj.map((item) => (
        <View
          className={`${
            scheduleStep >= 1 && item.id === 1
              ? `rounded-l bg-[${colors.primary}]`
              : stepObj.length === stepObj[stepObj.length - 1].id &&
                scheduleStep === stepObj[stepObj.length - 1].id
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
