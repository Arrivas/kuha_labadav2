import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import Icon from "../../../Icon";

const NavigationButton = ({
  scheduleStep,
  setScheduleStep,
  isPickup,
  fabconEnabled,
}) => {
  return (
    <View
      className={`py-2 ${
        scheduleStep > 1 ? "flex-row" : ""
      } w-full justify-between px-5`}
    >
      {scheduleStep > 1 && (
        <TouchableNativeFeedback
          onPress={() => {
            if (scheduleStep <= 1) return;
            setScheduleStep((scheduleStep -= 1));
          }}
          background={TouchableNativeFeedback.Ripple("#d6d6d6", true)}
        >
          <View className="flex-row items-center justify-center">
            <Icon
              iconLibrary="MaterialCommunityIcons"
              iconName="chevron-left"
              size={30}
            />
            <Text>prev</Text>
          </View>
        </TouchableNativeFeedback>
      )}
      <TouchableNativeFeedback
        onPress={() => {
          if (scheduleStep >= 5 && fabconEnabled) return;
          if (scheduleStep >= 4 && isPickup && !fabconEnabled) return;
          if (scheduleStep >= 3 && isPickup === "no") return;
          setScheduleStep((scheduleStep += 1));
        }}
        background={TouchableNativeFeedback.Ripple("#d6d6d6", true)}
      >
        <View className="flex-row items-center justify-center self-end">
          <Text>next</Text>
          <Icon
            iconLibrary="MaterialCommunityIcons"
            iconName="chevron-right"
            size={30}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default NavigationButton;
