import React from "react";
import { View, ScrollView, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../../../../config/colors";
import generateWeek from "../../../../functions/generateWeek";

const PickupDate = ({
  pickupDate,
  setPickupDate,
  method,
  setPickupDateError,
}) => {
  const availableWeek = generateWeek.getAvailableDateWeek();

  return (
    <View
      className={`${
        method.value === "deliverOnly" ? "opacity-30" : "opactiy-100"
      } py-2`}
    >
      <Text
        style={{
          fontFamily: "Alexandria-SemiBold",
          fontSize: 16,
        }}
      >
        Pickup Date
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View className="flex-row">
          {availableWeek.map((item) => (
            <TouchableWithoutFeedback
              key={item.dayWeek}
              onPress={() => {
                setPickupDate(
                  pickupDate === item.dayWeek
                    ? ""
                    : method.value === "deliverOnly"
                    ? ""
                    : item.dayWeek
                );
                setPickupDateError("");
              }}
            >
              <View
                className={`${
                  pickupDate === item.dayWeek
                    ? `bg-[${colors.primary}]`
                    : "bg-gray-100"
                } items-center justify-between rounded-lg mr-2 py-1`}
                style={{
                  height: 75,
                  width: 60,
                  borderWidth: 1,
                  borderColor: "transparent",
                }}
              >
                <Text
                  className={`${
                    pickupDate === item.dayWeek ? "text-white" : "text-black"
                  }`}
                  style={{
                    fontFamily: "Alexandria-Regular",
                    // fontSize: 15,
                  }}
                >
                  {item.dayWeek.slice(0, 3)}
                </Text>
                <Text
                  className={`${
                    pickupDate === item.dayWeek ? "text-white" : "text-black"
                  }`}
                  style={{
                    fontFamily: "Alexandria-Regular",
                    fontSize: 15,
                  }}
                >
                  {item.dayNumber}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PickupDate;
