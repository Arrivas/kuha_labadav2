import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native';
import React, { useState } from 'react';
import FormikField from '../../../forms/FormikField';
import AppFormField from '../../../forms/AppFormField';
import SubmitButton from '../../../forms/SubmitButton';
import * as Yup from 'yup';
import getDimensions from '../../../../config/getDimensions';
import SelectTime from '../../../forms/SelectTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

const SecondStep = ({ handleSecondSubmit }) => {
  const [openHours, setOpenHours] = useState('');
  const [closeHours, setCloseHours] = useState('');
  const [timeMode, setTimeMode] = useState('');
  const [selectimeVisible, setSelectTimeVisible] = useState(false);
  const { height } = getDimensions();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(6).max(32).label('shop name'),
    email: Yup.string().email().required().label('email'),
    password: Yup.string().min(6).max(32).required(),
  });

  const initialValues = {
    longitude: '',
    latitude: '',
    password: '',
    vicinity: '',
    limit: '',
  };

  const setDate = (e, date) => {
    if (e.type === 'dismissed') return;

    if (typeof timeMode === 'number') {
      const availableTimeCopy = [...availablePickupTimes];
      availableTimeCopy.forEach((item, index) => {
        if (index === timeMode) {
          item.time = Moment(date).format('LT');
        }
      });
      setAvailablePickupTimes(availableTimeCopy);
      return setSelectTimeVisible(!selectimeVisible);
    }

    if (timeMode === 'opening') {
      setOpenHours(Moment(date).format('LT'));
    } else setCloseHours(Moment(date).format('LT'));

    setSelectTimeVisible(!selectimeVisible);
  };

  const handleSelectTimeVisible = (mode) => {
    setTimeMode(mode);
    setSelectTimeVisible(!selectimeVisible);
  };

  return (
    <>
      <FormikField
        initialValues={initialValues}
        onSubmit={handleSecondSubmit}
        validationSchema={validationSchema}
      >
        <View style={{ flex: 1, maxHeight: height - 200 }} className="px-5">
          <ScrollView>
            <Text className="my-12 text-center font-bold text-xl text-gray-200">
              Shop Description
            </Text>
            {/* geo */}
            <View className="flex-row justify-between pb-1">
              <Text>Geo Location(laitutde, longitude)</Text>
              <TouchableNativeFeedback>
                <View>
                  <Text className="text-blue-400 underline">show how</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View className="flex-row space-x-1">
              <View className="flex-1">
                <AppFormField placeholder="latitude" name="latitude" />
              </View>
              <View className="flex-1">
                <AppFormField placeholder="longitude" name="longitude" />
              </View>
            </View>
            {/* shop address */}
            <Text className="pb-1">Shop Address</Text>
            <AppFormField placeholder="shop address" name="vicinity" />
            {/* accepting limit */}
            <View className="flex-row items-center">
              <Text className="pb-3 flex-1">
                Shop Accepting Limit(max of 100)
              </Text>
              <View style={{ flex: 0.4 }}>
                <AppFormField placeholder="50" name="max" />
              </View>
            </View>
            {/* min per kilo */}
            <Text className="pb-1">Minimum Per Kilo</Text>
            <View className="flex-row w-full space-x-1">
              <View className="flex-1">
                <AppFormField placeholder="minimum/kilo" name="minPerKilo" />
              </View>
              <View className="flex-1">
                <AppFormField placeholder="rate" name="rate" />
              </View>
            </View>

            {/* divider */}
            <Text className="my-12 text-center font-bold text-xl text-gray-200">
              Time/Scheduling
            </Text>
            {/* opening hours */}
            <Text className="pb-3">Opening/Closing Hours</Text>
            <View className="flex-row">
              <View className="w-full" style={{ flex: 1 }}>
                <SelectTime
                  placeholder="opening"
                  name="opening"
                  handleOnPress={() => handleSelectTimeVisible('opening')}
                  value={openHours}
                />
              </View>
              <View className="w-full" style={{ flex: 1 }}>
                <SelectTime
                  placeholder="closing"
                  name="opening"
                  handleOnPress={() => handleSelectTimeVisible('closing')}
                  value={closeHours}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </FormikField>
      {selectimeVisible && (
        <DateTimePicker
          is24Hour={false}
          onChange={setDate}
          textColor="#000"
          mode="time"
          value={new Date()}
        />
      )}
    </>
  );
};

export default SecondStep;
