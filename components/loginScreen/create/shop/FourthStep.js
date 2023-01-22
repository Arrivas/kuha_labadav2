import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import React from "react";
import { verticalScale } from "../../../../config/metrics";
import Icon from "../../../Icon";

const FourthStep = ({ handlePrev, handleFourthStepSubmit }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        style={{ height: verticalScale(200) }}
        className="w-full"
        resizeMode="contain"
        source={require("../../../../assets/steps.png")}
      />
      <Text className="text-2xl font-semibold text-gray-300">Almost Done</Text>
      <View className="flex-row items-center justify-between top-3 my-3 w-full bottom-0 absolute">
        <TouchableNativeFeedback onPress={handlePrev}>
          <View className="flex-row p-2 self-end items-center">
            <Icon
              iconName="chevron-left"
              color="black"
              iconLibrary="MaterialCommunityIcons"
              defaultStyle={false}
              size={25}
            />
            <Text>prev</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={handleFourthStepSubmit}>
          <View className="flex-row p-2 self-end items-center">
            <Text>create shop</Text>
            <Icon
              iconName="chevron-right"
              color="black"
              iconLibrary="MaterialCommunityIcons"
              defaultStyle={false}
              size={25}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default FourthStep;
