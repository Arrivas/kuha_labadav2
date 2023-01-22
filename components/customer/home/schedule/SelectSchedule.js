import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import SafeScreenView from "../../../SafeScreenView";
import PriceDetails from "./PriceDetails";
import colors from "../../../../config/colors";
import getDimensions from "../../../../config/getDimensions";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import ErrorMessage from "../../../forms/ErrorMessage";
import { AppContext } from "../../../../context/AppContext";

import ScheduleStep from "./ScheduleStep";
import PickupSelection from "./PickupSelection";
import DeliverSelection from "./DeliverSelection";
import NavigationButton from "./NavigationButton";

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
    availablePickupTimes,
  } = route.params;
  const { user, userCurrentLocation } = useContext(AppContext);

  const [method, setMethod] = useState({
    label: "Pickup & Deliver",
    value: "pickup&deliver",
  });

  // const [pickupDate, setPickupDate] = useState('');
  // const [pickupTime, setPickupTime] = useState('');
  // const [deliveryDate, setDeliveryDate] = useState('');
  // const [pickUpDateError, setPickupDateError] = useState('');
  // const [pickupTimeError, setPickupTimeError] = useState('');
  // const [deliveryDateError, setDeliveryDateError] = useState('');
  const { height } = getDimensions();

  const [scheduleStep, setScheduleStep] = useState(1);
  const [isPickup, setIsPickup] = useState("no");
  const [toBeDeliver, setToBeDeliver] = useState("no");

  const bookNow = async () => {
    const availableBookingsRef = firebase
      .firestore()
      .collection("availableBookings");
    const customersRef = firebase.firestore().collection("customers");

    // redirect user to success page
    navigation.replace("SuccessfullyBooked", {
      name,
      method,
      pickupDate,
      pickupTime,
      deliveryDate,
    });
  };

  return (
    <SafeScreenView>
      {/* step */}

      <View className="flex-1 items-center self-center max-w-[80%]">
        <View
          className="items-center"
          //  style={{ flex: 1 }}
        >
          <ScheduleStep
            colors={colors}
            isPickup={isPickup}
            scheduleStep={scheduleStep}
            fabconEnabled={fabconEnabled}
          />
          <Text className="font-bold text-lg pt-5">Set Schedule</Text>
        </View>
        {/* step 1 */}
        {scheduleStep === 1 ? (
          <View className=" items-center justify-center flex-1">
            <PickupSelection isPickup={isPickup} setIsPickup={setIsPickup} />
            {isPickup === "no" && (
              <Text className="text-xs w-[150px] self-end">
                please drop off your laundry in our shop
              </Text>
            )}
          </View>
        ) : (
          scheduleStep === 2 &&
          isPickup === "no" && (
            <>
              <View className=" items-center justify-center flex-1">
                <DeliverSelection
                  toBeDeliver={toBeDeliver}
                  setToBeDeliver={setToBeDeliver}
                />
              </View>
            </>
          )
        )}
      </View>
      <NavigationButton
        isPickup={isPickup}
        scheduleStep={scheduleStep}
        fabconEnabled={fabconEnabled}
        setScheduleStep={setScheduleStep}
      />
    </SafeScreenView>
  );
};

export default SelectSchedule;

// <View
//   className="justify-around"
//   style={{
//     paddingHorizontal: 20,
//     marginBottom: 5,
//     height: height - 150,
//   }}
// >
//   <ScrollView
//     contentContainerStyle={{
//       justifyContent: 'space-between',
//       flexGrow: 1,
//     }}
//   >
//     <Method
//       method={method}
//       setMethod={setMethod}
//       setPickupDate={setPickupDate}
//       setPickupTime={setPickupTime}
//       setDeliveryDate={setDeliveryDate}
//       setPickupDateError={setPickupDateError}
//       setPickupTimeError={setPickupTimeError}
//       setDeliveryDateError={setDeliveryDateError}
//     />
//     {/* pickup & deliver */}

//     <PickupDate
//       method={method}
//       pickupDate={pickupDate}
//       setPickupDate={setPickupDate}
//       setPickupDateError={setPickupDateError}
//       _
//     />
//     <ErrorMessage error={pickUpDateError} />
//     {/* pickup time */}
//     <PickupTime
//       method={method}
//       pickupTime={pickupTime}
//       setPickupTime={setPickupTime}
//       setPickupTimeError={setPickupTimeError}
//       availablePickupTimes={availablePickupTimes}
//     />
//     <ErrorMessage error={pickupTimeError} />
//     {/* delivery date */}
//     <DeliveryDate
//       method={method}
//       deliveryDate={deliveryDate}
//       setDeliveryDate={setDeliveryDate}
//       deliveredByItems={deliveredByItems}
//       setDeliveryDateError={setDeliveryDateError}
//     />
//     <ErrorMessage error={deliveryDateError} />
//     {/* price details/delivery details */}
//     <PriceDetails pricing={pricing} />
//   </ScrollView>
// </View>
// {/* button */}
// <View>
//   <TouchableNativeFeedback onPress={bookNow}>
//     <View
//       className="self-center w-[90%] py-4 rounded-xl flex-row items-center justify-center px-10"
//       style={{
//         backgroundColor: colors.primary,
//       }}
//     >
//       <Text className="font-bold text-[15px] text-white">Book Now</Text>
//     </View>
//   </TouchableNativeFeedback>
// </View>
