import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import FormikField from '../../../forms/FormikField';
import AppFormField from '../../../forms/AppFormField';
import SubmitButton from '../../../forms/SubmitButton';
import ErrorMessage from '../../../forms/ErrorMessage';
import * as Yup from 'yup';
import SelectTime from '../../../forms/SelectTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import Icon from '../../../Icon';
import CreateShopProgress from './CreateShopProgress';
import getDimensions from '../../../../config/getDimensions';

const SecondStep = ({
  openHours,
  handlePrev,
  closeHours,
  setOpenHours,
  openCloseErr,
  setCloseHours,
  setOpenCloseErr,
  secondStepDetails,
  handleSecondStepSubmit,
  progress,
}) => {
  const [timeMode, setTimeMode] = useState('');
  const [selectimeVisible, setSelectTimeVisible] = useState(false);
  const [showGeoModal, setShowGeoModal] = useState(false);
  const { width } = getDimensions();

  const initialValues = {
    max: secondStepDetails?.max || '',
    rate: secondStepDetails?.rate || '',
    latitude: secondStepDetails?.latitude || '',
    longitude: secondStepDetails?.longitude || '',
    vicinity: secondStepDetails?.vicinity || '',
    minPerKilo: secondStepDetails?.minPerKilo || '',
    description: secondStepDetails?.description || '',
    deliveryDate1: secondStepDetails?.deliveryDate1 || 'Today',
    deliveryDate2: secondStepDetails?.deliveryDate2 || 'Tomorow',
  };

  const validationSchema = Yup.object().shape({
    longitude: Yup.number().required(),
    latitude: Yup.number().required(),
    description: Yup.string().required(),
    vicinity: Yup.string().required().label('shop address'),
    minPerKilo: Yup.number().required().typeError('must be a number'),
    max: Yup.number().required().max(100).typeError('must be a number'),
    rate: Yup.number().required().max(10000).typeError('must be a number'),
    deliveryDate1: Yup.string().required().label('delivery date'),
    deliveryDate2: Yup.string().required().label('delivery date'),
  });

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
    console.log();
    setSelectTimeVisible(!selectimeVisible);
  };

  const handleSelectTimeVisible = (mode) => {
    setTimeMode(mode);
    setOpenCloseErr('');
    setSelectTimeVisible(!selectimeVisible);
  };

  return (
    <>
      <View className="items-center justify-center mt-24">
        <CreateShopProgress progress={progress} />
      </View>
      <View style={{ flex: 1 }} className="px-5">
        <FormikField
          onSubmit={handleSecondStepSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <Text className="my-12 text-center font-bold text-xl text-gray-200">
              Shop Description
            </Text>
            {/* shop description */}
            <Text className="pb-1">Shop Description</Text>
            <AppFormField
              placeholder="shop description"
              name="description"
              description={true}
            />
            {/* geo */}
            <View className="flex-row justify-between pb-1">
              <Text>Geo Location(laitutde, longitude)</Text>
              <TouchableNativeFeedback
                onPress={() => setShowGeoModal(!showGeoModal)}
              >
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

            <View className="flex-row w-full space-x-1">
              <View className="flex-1">
                <Text className="pb-1 mx-2">Minimum Per Kilo</Text>
                <AppFormField placeholder="minimum/kilo" name="minPerKilo" />
              </View>
              <View className="flex-1">
                <Text className="pb-1 mx-2">Rate</Text>
                <AppFormField placeholder="rate" name="rate" />
              </View>
            </View>

            {/* divider */}
            <Text className="my-12 text-center font-bold text-xl text-gray-200">
              Time/Scheduling
            </Text>
            {/* opening hours */}
            <Text className="pb-3">Opening/Closing Hours</Text>
            <View className="flex-row w-full space-x-1">
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
            <Text className="py-3">Delivery Date</Text>
            <View className="flex-row w-full space-x-1">
              <View className="flex-1">
                <AppFormField placeholder="Today" name="deliveryDate1" />
              </View>
              <View className="flex-1">
                <AppFormField placeholder="Tomorow" name="deliveryDate2" />
              </View>
            </View>
          </ScrollView>

          <View className="flex-row items-center justify-between top-3 my-3 w-full">
            <TouchableNativeFeedback onPress={handlePrev}>
              <View className="flex-row p-2 self-end items-center">
                <Icon
                  iconName="chevron-left"
                  color="black"
                  iconLibrary="MaterialCommunityIcons"
                  defaultStyle={false}
                  size={25}
                />
                <Text>prev</Text>
              </View>
            </TouchableNativeFeedback>
            <SubmitButton mode="chevronRight" title="next" />
          </View>
        </FormikField>
      </View>
      {selectimeVisible && (
        <DateTimePicker
          is24Hour={false}
          onChange={setDate}
          textColor="#000"
          mode="time"
          value={new Date()}
        />
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showGeoModal}
        onRequestClose={() => setShowGeoModal(!showGeoModal)}
      >
        <TouchableWithoutFeedback
          onPress={() => setShowGeoModal(!showGeoModal)}
        >
          <View className="absolute bg-black/20 h-full w-full" />
        </TouchableWithoutFeedback>
        <View
          className={`self-center my-auto bg-white items-center justify-center  rounded-xl`}
          style={{
            width: width - 40,
            height: 350,
          }}
        >
          <ScrollView className="p-4" keyboardShouldPersistTaps="never">
            <Text className="font-semibold text-lg self-start">
              How to get your current latitude & longitude.
            </Text>
            <Text className="text-gray-500 pb-5 py-2">
              1. Download and install Google Maps from the Google Play Store.
            </Text>
            <Image
              resizeMode="cover"
              className="h-[120px] w-[300px]"
              source={require('../../../../assets/geoHow/geo-how-1.jpg')}
            />
            <Text className="text-gray-500 py-5">
              2. Open your google maps, press and hold to drop a marker exactly
              on where your shop is. E.g:
            </Text>
            <Image
              resizeMode="cover"
              className="h-[300px] w-[300px]"
              source={require('../../../../assets/geoHow/geo-how-2.jpg')}
            />
            <Text className="text-gray-500 py-5">
              3. In the search box, you can find the coordinates. The{' '}
              <Text className="text-red-600">red mark</Text> is your 'latitude'
              and the <Text className="text-blue-400">blue mark</Text> is your
              'longitude'.
            </Text>
            <Image
              resizeMode="cover"
              className="h-[320px] w-[300px] mb-5"
              source={require('../../../../assets/geoHow/geo-how-3.jpg')}
            />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default SecondStep;
