import { View, Text, TouchableNativeFeedback } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '../../../Icon';
import Moment from 'moment';
import ErrorMessage from '../../../forms/ErrorMessage';

const DateTimePickerComponent = ({
  horizontalScale,
  pickupDate,
  setPickupDate,
  pickupTime,
  setPickupTime,
  timeDateError,
  setTimeDateError,
  openHours,
}) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('');
  const [timeError, setTimeError] = useState('');

  const handleDateChange = (event, date) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;

    setShow(false);
    if (type === 'dismissed') return;
    if (mode === 'date') {
      if (
        Moment().isSame(new Date(date), 'day') ||
        Moment(new Date(date)).isAfter()
      ) {
        setTimeDateError('');
        return setPickupDate(Moment(new Date(date)).format('LL'));
      }
    }
    setTimeError('');
    const currentDate = new Date();
    const fromDate = new Date(
      `${currentDate.toDateString()} ${openHours.from}`
    );
    const toDate = new Date(`${currentDate.toDateString()} ${openHours.to}`);

    const isWithinOpenHours = (newDate) => {
      const isAfterFromDate =
        newDate.getHours() > fromDate.getHours() ||
        (newDate.getHours() === fromDate.getHours() &&
          newDate.getMinutes() >= fromDate.getMinutes());
      const isBeforeToDate =
        newDate.getHours() < toDate.getHours() ||
        (newDate.getHours() === toDate.getHours() &&
          newDate.getMinutes() <= toDate.getMinutes());
      return isAfterFromDate && isBeforeToDate;
    };
    const res = isWithinOpenHours(date);
    if (res) {
      // console.log(
      //   'from ' + new Date(date).getHours(),
      //   new Date(`${new Date().toDateString()} ${openHours.from}`).getHours()
      // );
      setPickupTime(Moment(new Date(date)).format('LT'));
      setTimeDateError('');
    } else
      return setTimeError(
        `open hours - ${Moment(fromDate).format(
          'LT'
        )} ${`\n`}close hours - ${Moment(toDate).format('LT')}`
      );
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => showMode('date');

  const showTimepicker = () => showMode('time');

  return (
    <View style={{ paddingHorizontal: horizontalScale(22) }}>
      <Text className="font-semibold py-2 max-w-[80%]">
        What is your preferred date and time for the pickup of your laundry?
      </Text>
      <View>
        <Text className="font-semibold my-2">Pickup Date</Text>
        <View className="flex-row justify-between px-2">
          <Text>{pickupDate || '-'}</Text>
          <TouchableNativeFeedback onPress={showDatepicker}>
            <View className="p-1">
              <Icon
                iconLibrary="MaterialCommunityIcons"
                iconName="calendar-month"
                size={20}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View className="border-b border-gray-200 absolute -bottom-2 w-full h-1" />
      </View>

      <View className="my-2">
        <Text className="font-semibold my-2">Pickup Time</Text>
        <View className="flex-row justify-between px-2">
          <Text>{pickupTime || '-'}</Text>
          <TouchableNativeFeedback onPress={showTimepicker}>
            <View className="p-1">
              <Icon
                iconLibrary="MaterialCommunityIcons"
                iconName="clock"
                size={20}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View className="border-b border-gray-200 absolute -bottom-2 w-full h-1" />
      </View>
      <View className="max-w-[90%]">
        <ErrorMessage error={timeDateError || timeError} />
      </View>
      {show && (
        <DateTimePicker
          value={new Date()}
          onChange={handleDateChange}
          mode={mode}
          is24Hour={false}
        />
      )}
    </View>
  );
};

export default DateTimePickerComponent;
