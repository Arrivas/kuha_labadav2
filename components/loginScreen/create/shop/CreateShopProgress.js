import { View, Text } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import colors from "../../../../config/colors";

const CreateShopProgress = ({ progress }) => {
  const progressTexts = [
    {
      id: 1,
      header: "Shop Name and Email",
      desc: "check shop name and email availability.",
    },
    {
      id: 2,
      header: "Add shop details",
      desc: "setup your shop by entering necessary informations.",
    },
    {
      id: 3,
      header: "Shop Image & Services",
      desc: "upload your shop image, and select your shop services.",
    },
    {
      id: 4,
      header: "Review Details",
      desc: "you can still go back to review and change your shop details.",
    },
  ];

  return (
    <View className="flex-row items-center py-5">
      <AnimatedCircularProgress
        size={50}
        width={3}
        fill={
          progress === 1
            ? 25
            : progress === 2
            ? 50
            : progress === 3
            ? 75
            : progress === 4 && 100
        }
        tintColor={colors.primary}
        rotation={0}
        backgroundColor="#ededed"
      >
        {() => <Text>{progress}/4</Text>}
      </AnimatedCircularProgress>
      {progressTexts.map((item) => (
        <View key={item.id} className="max-w-[70%]">
          {item.id === progress && (
            <View className="ml-2">
              <Text className="font-bold text-[16px]">{item.header}</Text>
              <Text className="text-gray-400 w-[70%]">{item.desc}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default CreateShopProgress;
