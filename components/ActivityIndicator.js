import React from "react";
import { View, Text } from "react-native";
import Lottie from "lottie-react-native";
import getDimensions from "../config/getDimensions";

function ActivityIndicator({ isVisible = false, opacity = 80 }) {
  const { height } = getDimensions();
  if (!isVisible) return null;
  return (
    <View
      className={`absolute w-full h-full z-50 bg-white opacity-${opacity} items-center justify-center`}
    >
      <Lottie
        source={require("../assets/animations/loading.json")}
        autoPlay
        loop
        height={height - 20}
      />
    </View>
  );
}

export default ActivityIndicator;
