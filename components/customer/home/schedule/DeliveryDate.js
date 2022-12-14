import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../../../../config/colors";

function DeliveryDate({
  method,
  deliveryDate,
  setDeliveryDate,
  deliveredByItems,
  setDeliveryDateError,
}) {
  return (
    <View
      className={`pt-2 ${
        method.value === "pickupOnly" ? "opacity-30" : "opactiy-100"
      }`}
    >
      <Text
        className="self-start"
        style={{
          fontFamily: "Alexandria-SemiBold",
          fontSize: 16,
        }}
      >
        Delivery Date
      </Text>
      <View className="flex-row justify-between items-center">
        {deliveredByItems.map((item, index) => (
          <TouchableWithoutFeedback
            onPress={() => {
              setDeliveryDate(
                deliveryDate === item.label
                  ? ""
                  : method.value === "pickupOnly"
                  ? ""
                  : item.label
              );
              setDeliveryDateError("");
            }}
            key={index}
          >
            <View
              className={`${
                deliveryDate === item.label
                  ? `bg-[${colors.primary}]`
                  : "bg-gray-100"
              } w-[50%] rounded-md mr-1 p-4 items-center justify-center`}
            >
              <Text
                className={`${
                  deliveryDate === item.label ? "text-white" : "text-black"
                }`}
              >
                {item.label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
}

export default DeliveryDate;
