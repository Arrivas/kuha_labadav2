import React from "react";
import { View, TextInput, TouchableNativeFeedback, Text } from "react-native";
import Icon from "../Icon";

function SelectTime({ value, handleOnPress, name, error, ...rest }) {
  return (
    <>
      <View
        className={`${
          error ? "border border-red-400" : ""
        } flex flex-row self-center ml-0.5 items-center justify-center bg-gray-100 rounded-xl p-3 overflow-hidden`}
      >
        <TextInput
          className="w-[90%] text-gray-600 px-4"
          editable={false}
          clearButtonMode="always"
          value={value}
          {...rest}
        />
        <TouchableNativeFeedback onPress={handleOnPress}>
          <View>
            <Icon
              iconLibrary="MaterialCommunityIcons"
              iconName="clock-edit-outline"
              size={18}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      {error ? (
        <Text className="text-red-400">
          {name} {error}
        </Text>
      ) : null}
    </>
  );
}

export default SelectTime;
