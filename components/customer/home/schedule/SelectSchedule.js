import React, { useContext, useState } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import SafeScreenView from '../../../SafeScreenView';
import colors from '../../../../config/colors';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { AppContext } from '../../../../context/AppContext';
import { horizontalScale } from '../../../../config/metrics';

import ScheduleStep from './ScheduleStep';
import PickupSelection from './PickupSelection';
import DeliverSelection from './DeliverSelection';
import NavigationButton from './NavigationButton';
import Summary from './Summary';
import DateTimePickerComponent from './DateTimePickerComponent';
import DeliveredBy from './DeliveredBy';
import Moment from 'moment';
import FabconSelection from './FabconSelection';

const SelectSchedule = ({ route, navigation }) => {
  const {
    name,
    pricing,
    fabcons,
    imageUrl,
    laundry_id,
    fabconEnabled,
    deliveredByItems,
    selectedServices,
  } = route.params;
  const { user } = useContext(AppContext);

  const [isPickup, setIsPickup] = useState('no');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [toBeDeliver, setToBeDeliver] = useState('no');
  const [scheduleStep, setScheduleStep] = useState(1);
  const [timeDateError, setTimeDateError] = useState('');
  const [selectedFabcons, setSelectedFabcons] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(deliveredByItems[0].label);
  const [doneBooking, setDoneBooking] = useState(false);

  let formattedDateTime =
    pickupTime && pickupDate
      ? Moment(new Date(`${pickupDate} ${pickupTime}`)).format('LLLL')
      : '';

  const stepObj =
    isPickup === 'no' && toBeDeliver === 'no'
      ? Array(fabconEnabled ? 4 : 3)
          .fill()
          .map((_, i) => ({ id: i + 1, label: `step ${i + 1}` }))
      : (isPickup === 'yes' && toBeDeliver === 'no') ||
        (isPickup === 'no' && toBeDeliver === 'yes')
      ? Array(fabconEnabled ? 5 : 4)
          .fill()
          .map((_, i) => ({ id: i + 1, label: `step ${i + 1}` }))
      : isPickup === 'yes' && toBeDeliver === 'yes'
      ? Array(fabconEnabled ? 6 : 5)
          .fill()
          .map((_, i) => ({ id: i + 1, label: `step ${i + 1}` }))
      : Array(fabconEnabled ? 5 : 4)
          .fill()
          .map((_, i) => ({ id: i + 1, label: `step ${i + 1}` }));

  const handleBookNow = async () => {
    if (doneBooking) return;
    if (isPickup === 'no') {
      setPickupDate('');
      setPickupTime('');
    }

    const currentBooking = {
      laundryShopDetails: {
        laundryShopName: name,
        laundry_id,
        laundryImageUrl: imageUrl,
      },
      customerDetails: {
        customerName: user.name,
        customerMobileNumber: user.mobileNumber,
        customerDocId: user.docId,
        customerAddress: user.customerAddress,
        customerImageUrl: user.imageUrl,
      },
      method: {
        pickup: isPickup,
        toBeDeliver,
      },
      schedule: {
        pickupDateTime: isPickup === 'yes' ? formattedDateTime : '',
        deliveryDate: toBeDeliver === 'yes' ? deliveryDate : '',
      },
      service: selectedServices,
      fabcons: selectedFabcons,
      status: 'confirmed booking',
      createdAt: new Date().toISOString(),
    };

    await firebase
      .firestore()
      .collection('availableBookings')
      .add(currentBooking)
      .then((doc) => {
        currentBooking.docId = doc.id;
        doc.update({
          docId: doc.id,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setDoneBooking(true);
      })
      .catch((err) => {
        ToastAndroid.show(
          'cannot process booking, something went wrong',
          ToastAndroid.SHORT
        );
      });

    const userCopy = { ...user };
    userCopy.confirmedBooking.push(currentBooking);
    firebase
      .firestore()
      .collection('customers')
      .doc(user?.docId)
      .update(userCopy)
      .then(() => {
        console.log('successfully booked');
        setDoneBooking(true);
        // redirect user to success page
        navigation.replace('SuccessfullyBooked');
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeScreenView>
      {/* step */}
      <View className="flex-1">
        <View className="items-center">
          <ScheduleStep
            stepObj={stepObj}
            colors={colors}
            isPickup={isPickup}
            toBeDeliver={toBeDeliver}
            scheduleStep={scheduleStep}
            fabconEnabled={fabconEnabled}
          />
          <Text className="font-bold text-lg pt-5">
            {scheduleStep === stepObj[stepObj.length - 1].id
              ? 'Summary'
              : scheduleStep === stepObj[stepObj.length - 2].id && fabconEnabled
              ? 'Additionals'
              : 'Set Schedule'}
          </Text>
        </View>
        {/* step 1 */}
        {scheduleStep === 1 ? (
          <View className=" items-center justify-center flex-1">
            <PickupSelection isPickup={isPickup} setIsPickup={setIsPickup} />
            {isPickup === 'no' && (
              <Text className="text-xs w-[120px] self-end right-5">
                please drop off your laundry in our shop
              </Text>
            )}
          </View>
        ) : (scheduleStep === 2 && isPickup === 'no') ||
          (scheduleStep === 3 && isPickup === 'yes') ? (
          <>
            <View className=" items-center justify-center flex-1">
              <DeliverSelection
                toBeDeliver={toBeDeliver}
                setToBeDeliver={setToBeDeliver}
                horizontalScale={horizontalScale}
              />
              {toBeDeliver === 'no' && (
                <Text className="text-xs self-end right-5 w-[120px]">
                  please pickup your laundry on our shop
                </Text>
              )}
            </View>
          </>
        ) : scheduleStep === 2 && isPickup === 'yes' ? (
          <View className=" items-center justify-center flex-1">
            <DateTimePickerComponent
              pickupDate={pickupDate}
              pickupTime={pickupTime}
              setPickupDate={setPickupDate}
              setPickupTime={setPickupTime}
              timeDateError={timeDateError}
              horizontalScale={horizontalScale}
              setTimeDateError={setTimeDateError}
            />
          </View>
        ) : (scheduleStep === 3 && toBeDeliver === 'yes') ||
          (scheduleStep === 4 &&
            toBeDeliver === 'yes' &&
            isPickup === 'yes') ? (
          <View className=" items-center justify-center flex-1">
            <DeliveredBy
              deliveryDate={deliveryDate}
              setDeliveryDate={setDeliveryDate}
              deliveredByItems={deliveredByItems}
            />
          </View>
        ) : stepObj[stepObj.length - 2].id === scheduleStep && fabconEnabled ? (
          <View className="items-center justify-center flex-1">
            <FabconSelection
              fabcons={fabcons}
              selectedFabcons={selectedFabcons}
              horizontalScale={horizontalScale}
              setSelectedFabcons={setSelectedFabcons}
            />
          </View>
        ) : (
          stepObj[stepObj.length - 1].id === scheduleStep && (
            <Summary
              user={user}
              pricing={pricing}
              isPickup={isPickup}
              imageUrl={imageUrl}
              laundryShopName={name}
              toBeDeliver={toBeDeliver}
              deliveryDate={deliveryDate}
              selectedFabcons={selectedFabcons}
              horizontalScale={horizontalScale}
              selectedServices={selectedServices}
              setTimeDateError={setTimeDateError}
              formattedDateTime={formattedDateTime}
            />
          )
        )}
      </View>
      <NavigationButton
        stepObj={stepObj}
        isPickup={isPickup}
        pickupDate={pickupDate}
        pickupTime={pickupTime}
        toBeDeliver={toBeDeliver}
        doneBooking={doneBooking}
        scheduleStep={scheduleStep}
        fabconEnabled={fabconEnabled}
        setPickupDate={setPickupDate}
        setPickupTime={setPickupTime}
        handleBookNow={handleBookNow}
        setScheduleStep={setScheduleStep}
        setTimeDateError={setTimeDateError}
      />
    </SafeScreenView>
  );
};

export default SelectSchedule;
