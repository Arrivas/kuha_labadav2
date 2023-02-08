import { View, Text, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import Icon from '../../../Icon';

const NavigationButton = ({
  isPickup,
  stepObj,
  pickupDate,
  pickupTime,
  toBeDeliver,
  scheduleStep,
  setPickupDate,
  setPickupTime,
  fabconEnabled,
  handleBookNow,
  setScheduleStep,
  setTimeDateError,
  formattedDateTime,
  doneBooking,
}) => {
  return (
    <View
      className={`py-2 ${
        scheduleStep > 1 ? 'flex-row' : ''
      } w-full justify-between px-5`}
    >
      {scheduleStep > 1 && (
        <TouchableNativeFeedback
          onPress={() => {
            if (scheduleStep <= 1) return;
            setScheduleStep((scheduleStep -= 1));
          }}
          background={TouchableNativeFeedback.Ripple('#d6d6d6', true)}
        >
          <View className="flex-row items-center justify-center">
            <Icon
              iconLibrary="MaterialCommunityIcons"
              iconName="chevron-left"
              size={30}
            />
            <Text className="text-[17px]">prev</Text>
          </View>
        </TouchableNativeFeedback>
      )}
      <TouchableNativeFeedback
        disabled={doneBooking}
        onPress={() => {
          if (scheduleStep === stepObj[stepObj.length - 1].id)
            return handleBookNow();

          if (isPickup === 'no') {
            setPickupDate('');
            setPickupTime('');
            formattedDateTime = '';
          }

          // validation
          if (scheduleStep === 2 && isPickup === 'yes')
            if (!pickupDate || !pickupTime)
              return setTimeDateError('please set date or time');
          setTimeDateError('');
          if (scheduleStep >= 6 && fabconEnabled) return;
          if (
            scheduleStep >= 5 &&
            isPickup === 'yes' &&
            toBeDeliver === 'yes' &&
            !fabconEnabled
          )
            return;
          if (
            (scheduleStep >= 4 &&
              isPickup === 'yes' &&
              toBeDeliver === 'no' &&
              !fabconEnabled) ||
            (scheduleStep >= 4 &&
              isPickup === 'no' &&
              toBeDeliver === 'yes' &&
              !fabconEnabled)
          )
            return;
          if (
            scheduleStep >= 3 &&
            isPickup === 'no' &&
            toBeDeliver === 'no' &&
            !fabconEnabled
          )
            return;

          setScheduleStep((scheduleStep += 1));
        }}
        background={TouchableNativeFeedback.Ripple('#d6d6d6', true)}
      >
        <View className="flex-row items-center justify-center self-end">
          <Text className="text-[17px]">
            {scheduleStep === stepObj[stepObj.length - 1].id
              ? 'book now'
              : 'next'}
          </Text>
          <Icon
            iconLibrary="MaterialCommunityIcons"
            iconName="chevron-right"
            size={30}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default NavigationButton;
