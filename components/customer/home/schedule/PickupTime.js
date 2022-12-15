import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../../../../config/colors";

const PickupTime = ({
  method,
  pickupTime,
  setPickupTime,
  setPickupTimeError,
  availablePickupTimes,
}) => {
  const getDate = (time) =>
    new Date(`${new Date().toLocaleDateString("en-us")} ${time}`);
  return (
    <View
      className={`p-2 ${
        method.value === "deliverOnly" ? "opacity-30" : "opactiy-100"
      }`}
    >
      <Text
        style={{
          fontFamily: "Alexandria-SemiBold",
          fontSize: 16,
        }}
      >
        Pickup Time
      </Text>
      <View className="flex-row flex-wrap w-full justify-between items-center">
        {availablePickupTimes.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              setPickupTime(
                pickupTime === item.time
                  ? ""
                  : method.value === "deliverOnly"
                  ? ""
                  : getDate(item.time) < new Date()
                  ? ""
                  : item.time
              );
              setPickupTimeError("");
            }}
          >
            <View
              className={`${
                pickupTime === item.time
                  ? `bg-[${colors.primary}]`
                  : "bg-gray-100"
              } p-4 mt-2 rounded-md items-center justify-center`}
              style={{
                width: "32.5%",
                // flex: 1,
              }}
            >
              <Text
                className={`${
                  pickupTime === item.time
                    ? "text-white"
                    : getDate(item.time) < new Date()
                    ? "text-gray-200"
                    : "text-black"
                }`}
              >
                {item.time.toLowerCase()}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

export default PickupTime;
