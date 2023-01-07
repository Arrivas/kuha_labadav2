import React from "react";
import {
  TouchableNativeFeedback,
  View,
  Text,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useFormikContext } from "formik";
import colors from "../../config/colors";
import Icon from "../Icon";

function SubmitButton({
  title = "",
  containerStyle = "",
  disabled = false,
  defaultStyle = true,
  mode = "default",
  loading = false,
  textStyle = "",
  textClass = "",
}) {
  const { handleSubmit } = useFormikContext();
  return (
    <View>
      <TouchableNativeFeedback
        disabled={disabled}
        onPress={() => {
          Keyboard.dismiss();
          return handleSubmit();
        }}
      >
        {mode === "default" ? (
          <View
            className={
              defaultStyle
                ? `${
                    disabled ? "opacity-70" : "opacity-100"
                  } p-4 rounded-full w-[100%] my-1 self-center items-center ${
                    loading ? "flex-row justify-center items-center" : ""
                  } ${containerStyle}`
                : containerStyle
            }
            style={{
              backgroundColor: defaultStyle ? colors.primary : "",
            }}
          >
            <Text className={textClass} style={textStyle}>
              {title}
            </Text>
            {loading ? <ActivityIndicator size="small" color="white" /> : <></>}
          </View>
        ) : mode === "chevronRight" ? (
          <View className="flex-row p-2 self-end items-center">
            <Text className={textClass} style={textStyle}>
              {title}
            </Text>
            <Icon
              iconName="chevron-right"
              color="black"
              iconLibrary="MaterialCommunityIcons"
              defaultStyle={false}
              size={25}
            />
          </View>
        ) : (
          <View
            className={`flex-row self-end bg-[${colors.primary}] rounded-md items-center p-2 m-2`}
          >
            <Text className={textClass} style={textStyle}>
              {title}
            </Text>
            <Icon
              className="pl-1"
              iconName="send"
              library="MaterialIcons"
              iconColor="white"
              defaultStyle={false}
            />
          </View>
        )}
      </TouchableNativeFeedback>
    </View>
  );
}

export default SubmitButton;
