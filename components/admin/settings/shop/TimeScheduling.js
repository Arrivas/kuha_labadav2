import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import Icon from '../../../Icon';

const TimeScheduling = ({
  SelectTime,
  openHours,
  closeHours,
  showOptional,
  setShowOptional,
  ErrorMessage,
  AppFormField,
  openCloseErr,
  handleSelectTimeVisible,
}) => {
  return (
    <>
      <Text className="my-12 text-center font-bold text-xl text-gray-200">
        Time/Scheduling
      </Text>
      {/* opening hours */}
      <Text className="pb-3 font-semibold">Opening/Closing Hours</Text>
      <View className="flex-row space-x-1">
        <View style={{ flex: 1 }}>
          <SelectTime
            placeholder="opening"
            name="opening"
            handleOnPress={() => handleSelectTimeVisible('opening')}
            value={openHours}
          />
        </View>
        <View style={{ flex: 1 }}>
          <SelectTime
            placeholder="closing"
            name="opening"
            handleOnPress={() => handleSelectTimeVisible('closing')}
            value={closeHours}
          />
        </View>
      </View>
      <ErrorMessage error={openCloseErr} />
      <Text className="py-3 font-semibold">Delivery Date</Text>
      <View className="flex-row flex-wrap">
        <View className="w-[50%] pr-1">
          <AppFormField placeholder="Today" name="deliveredByItems1" />
        </View>
        <View className="w-[50%]">
          <AppFormField placeholder="Tomorow" name="deliveredByItems2" />
        </View>
        {showOptional ? (
          <View className="flex-row items-center">
            <View className="w-[66%]">
              <AppFormField placeholder="(optional)" name="deliveredByItems3" />
            </View>
            <TouchableNativeFeedback
              onPress={() => {
                setShowOptional(false);
              }}
            >
              <View className="mb-2 p-2">
                <Icon iconName="x" iconLibrary="Feather" />
              </View>
            </TouchableNativeFeedback>
          </View>
        ) : (
          <>
            <TouchableNativeFeedback onPress={() => setShowOptional(true)}>
              <View className="items-center justify-center w-[50%] p-3 rounded-xl">
                <Text className="text-center">add(optional)</Text>
              </View>
            </TouchableNativeFeedback>
          </>
        )}
      </View>
    </>
  );
};

export default TimeScheduling;
