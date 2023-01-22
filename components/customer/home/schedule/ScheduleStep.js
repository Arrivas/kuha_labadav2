import { View, Text } from "react-native";
import React from "react";

const ScheduleStep = ({ scheduleStep, colors, isPickup, fabconEnabled }) => {
  const stepObj =
    isPickup === "no"
      ? Array(fabconEnabled ? 4 : 3)
          .fill()
          .map((_, i) => ({ id: i + 1, label: `step ${i + 1}` }))
      : Array(fabconEnabled ? 5 : 4)
          .fill()
          .map((_, i) => ({ id: i + 1, label: `step ${i + 1}` }));

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
              : "bg-gray-100"
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
