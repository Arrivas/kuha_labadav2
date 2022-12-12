import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

function Method({
  setMethod,
  method,
  setSelectedDlivery,
  setSelectedPickupDay,
  setSelectedPickupTime,
}) {
  const methodItems = [
    { id: 1, label: 'Pickup & Deliver', value: 'pickup&deliver' },
    { id: 2, label: 'Pickup Only', value: 'pickupOnly' },
    { id: 3, label: 'Deliver Only', value: 'deliverOnly' },
  ];
  return (
    <>
      <View className="flex-1">
        <Text
          className=""
          style={{
            fontFamily: 'Alexandria-SemiBold',
            fontSize: 16,
          }}
        >
          Method
        </Text>
        <View className="flex-row flex-wrap">
          {methodItems.map((item) => (
            <TouchableWithoutFeedback
              onPress={() => {
                // if (item.value === 'pickupOnly') setSelectedDlivery('none');
                // else if (item.value === 'deliverOnly') {
                //   setSelectedPickupDay('none');
                //   setSelectedPickupTime('none');
                // }
                setMethod({ value: item.value, label: item.label });
              }}
              key={item.id}
            >
              <View className="flex-row mb-2 mr-2 items-center">
                <View className="h-[25px] w-[25px] rounded-full bg-black mr-2 items-center justify-center">
                  <View
                    className={`h-[22px] w-[22px] absolute rounded-full bg-black ${
                      method.value === item.value
                        ? 'border-[4px] border-white'
                        : 'bg-white'
                    } mr-2`}
                  ></View>
                </View>
                <Text className="font-semibold">{item.label}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    </>
  );
}

export default Method;
