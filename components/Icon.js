import React from "react";
import { View } from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  style,
} from "@expo/vector-icons";

const Icon = ({
  iconLibrary = "",
  iconName = "",
  size = 15,
  color = "#000",
  className = "",
  style,
}) => {
  return (
    <>
      <View className={className} style={style}>
        {iconLibrary === "AntDesign" ? (
          <AntDesign name={iconName} size={size} color={color} />
        ) : iconLibrary === "Feather" ? (
          <Feather name={iconName} size={size} color={color} />
        ) : iconLibrary === "IonIcons" ? (
          <Ionicons name={iconName} size={size} color={color} />
        ) : iconLibrary === "MaterialCommunityIcons" ? (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        ) : iconLibrary === "MaterialIcons" ? (
          <MaterialIcons name={iconName} size={size} color={color} />
        ) : iconLibrary === "SimpleLineIcons" ? (
          <SimpleLineIcons name={iconName} size={size} color={color} />
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

export default Icon;
