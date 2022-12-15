import React, { useRef } from "react";
import { useEffect } from "react";
import { View, ScrollView, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../../../../config/colors";
import generateWeek from "../../../../functions/generateWeek";

const PickupDate = ({
  method,
  pickupDate,
  setPickupDate,
  setPickupDateError,
}) => {
  const scrollViewRef = useRef();
  const availableWeek = generateWeek.getAvailableDateWeek();

  const slowlyScrollDown = () => {
    if (availableWeek.filter((item) => item.available).length <= 4)
      scrollViewRef.current.scrollTo({ x: 200, y: 0, animated: true });
  };

  useEffect(() => {
    slowlyScrollDown();
  }, []);

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
        ref={scrollViewRef}
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
                  pickupDate.dayWeek === item.dayWeek
                    ? ""
                    : method.value === "deliverOnly"
                    ? ""
                    : item.available
                    ? item
                    : ""
                );
                setPickupDateError("");
              }}
            >
              <View
                className={`${
                  pickupDate.dayWeek === item.dayWeek
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
                    pickupDate.dayWeek === item.dayWeek
                      ? "text-white"
                      : item.available
                      ? "text-black"
                      : "text-gray-200"
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
                    pickupDate.dayWeek === item.dayWeek
                      ? "text-white"
                      : item.available
                      ? "text-black"
                      : "text-gray-200"
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
