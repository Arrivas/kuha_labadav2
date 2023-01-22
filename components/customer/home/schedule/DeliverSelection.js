import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";

const DeliverSelection = ({ toBeDeliver, setToBeDeliver }) => {
  const deliverItems = [
    { id: 1, label: "Yes", value: "yes" },
    { id: 2, label: "No", value: "no" },
  ];

  return (
    <View className="items-center">
      <Text
        style={{
          fontSize: 16,
        }}
        className="font-semibold py-2"
      >
        Would you prefer for your laundry to be delivered to you?
      </Text>
      <View className="flex-wrap">
        {deliverItems.map((item) => (
          <TouchableWithoutFeedback
            onPress={() => {
              setToBeDeliver(item.value);
            }}
            key={item.id}
          >
            <View className="flex-row mb-2 mr-2 items-center">
              <View className="h-[25px] w-[25px] rounded-full bg-black mr-2 items-center justify-center">
                <View
                  className={`h-[22px] w-[22px] absolute rounded-full bg-black ${
                    toBeDeliver === item.value
                      ? "border-[2px] border-white"
                      : "bg-white"
                  } mr-2`}
                ></View>
              </View>
              <Text className="font-semibold">{item.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

export default DeliverSelection;
