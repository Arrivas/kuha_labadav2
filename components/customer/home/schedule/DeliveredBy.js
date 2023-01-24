import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

const DeliveredBy = ({ deliveredByItems, deliveryDate, setDeliveryDate }) => {
  return (
    <>
      <View className="items-center">
        <Text className="font-semibold py-2 text-center max-w-[70%]">
          When would you prefer to receive your laundry delivery?
        </Text>
        <View className="flex-wrap">
          {deliveredByItems?.map((item, index) => (
            <View key={index}>
              <TouchableWithoutFeedback
                onPress={() => setDeliveryDate(item.label)}
              >
                <View className="flex-row mb-2 mr-2 items-center">
                  <View className="h-[25px] w-[25px] rounded-full bg-black mr-2 items-center justify-center">
                    <View
                      className={`h-[22px] w-[22px] absolute rounded-full bg-black ${
                        deliveryDate === item.label
                          ? 'border-[2px] border-white'
                          : 'bg-white'
                      } mr-2`}
                    ></View>
                  </View>
                  <Text className="font-semibold">{item.label}</Text>
                </View>
              </TouchableWithoutFeedback>
              {item.label.toLowerCase() === 'rush' && (
                <Text className="self-end text-gray-400">double pay</Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default DeliveredBy;
