import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import Icon from '../../../Icon';
import MethodNotice from './MethodNotice';

const Summary = ({
  deliveryDate,
  laundryShopName,
  pricing,
  user,
  toBeDeliver,
  isPickup,
  horizontalScale,
  selectedServices,
  formattedDateTime,
  selectedFabcons,
}) => {
  const [showMethodNotice, setShowMethodNotice] = useState(false);
  const textLabelClass = 'font-semibold text-gray-400';

  return (
    <View
      className="w-full flex-1"
      style={{
        paddingHorizontal: horizontalScale(22),
      }}
    >
      <View className="self-center items-center">
        <Text className="text-xl font-bold">Laundry Shop</Text>
        <Text className="text-xl" numberOfLines={2}>
          {laundryShopName}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        <View className="flex-row justify-between">
          <Text className="font-bold">Service</Text>
          <View className="max-w-[50%] flex-row">
            {selectedServices?.map((item, index) => (
              <Text className="text-right" key={index}>
                {' '}
                {item}
                {selectedServices[selectedServices.length - 1] === item
                  ? ''
                  : ','}
              </Text>
            ))}
          </View>
        </View>
        <View className=" rounded-md py-3 my-1">
          <Text className="font-bold">Shipping Address</Text>
          <View className="flex-row justify-between">
            <Text className={textLabelClass}>Name</Text>
            <Text>{user?.name}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className={textLabelClass}>Address</Text>
            <Text className="max-w-[70%] text-end" numberOfLines={2}>
              {user?.customerAddress || '-'}
            </Text>
          </View>
        </View>

        {/* sched */}
        <View className=" rounded-md py-3 my-1">
          <Text className="font-bold">Schedule</Text>
          <View className="flex-row justify-between">
            <Text className={textLabelClass}>pickup date & time</Text>
            <Text className="max-w-[50%] text-right">
              {isPickup === 'yes' ? formattedDateTime : '-'}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className={textLabelClass}>delivery date</Text>
            <Text className="max-w-[50%] text-right" numberOfLines={2}>
              {toBeDeliver === 'yes' ? deliveryDate : '-'}
            </Text>
          </View>
        </View>
        {/* additionals */}
        <View className=" rounded-md py-3 my-1">
          <Text className="font-bold">Additionals</Text>
          <View className="flex-row justify-between">
            <Text className={textLabelClass}>fabcons</Text>
            <View className="max-w-[50%]">
              {selectedFabcons.length !== 0 ? (
                selectedFabcons?.map((item, index) => (
                  <Text className="text-right" key={index}>
                    {item.label} x{item.qty}
                  </Text>
                ))
              ) : (
                <Text>-</Text>
              )}
            </View>
          </View>
        </View>

        {/* method */}
        <View className=" rounded-md mt-1">
          <Text className="font-bold">Method</Text>
          <View className="flex-row justify-between">
            <Text className={textLabelClass}>pickup</Text>
            <Text className="max-w-[50%] text-right">{isPickup || '-'}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className={textLabelClass}>to be deliver</Text>
            <Text className="max-w-[50%] text-right" numberOfLines={2}>
              {toBeDeliver || '-'}
            </Text>
          </View>
          {/* notice */}
          {isPickup === 'no' || toBeDeliver === 'no' ? (
            <MethodNotice
              isPickup={isPickup}
              toBeDeliver={toBeDeliver}
              showMethodNotice={showMethodNotice}
              setShowMethodNotice={setShowMethodNotice}
            />
          ) : null}
        </View>
        {/* pricing */}
        <View
          className={`bg-gray-100 w-full flex-row items-center justify-start p-2 rounded-md my-1`}
        >
          <Text className={`text-gray-500 tracking-widest text-sm`}>
            This shop requires at least{' '}
            <Text className={`italic`}>
              {`\n`}minimum of {pricing.minPerKilo} kilo
            </Text>
          </Text>
        </View>
        <View
          className={`w-full flex-row items-center justify-start p-2 rounded-md`}
        >
          <Text className={`text-xl px-3`}>₱</Text>
          <View>
            <Text className={`font-bold text-sm`}>Shop Rate</Text>
            <Text className={`text-sm font-semibold`}>
              {pricing.rate} per {pricing.minPerKilo} kilo
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Summary;
