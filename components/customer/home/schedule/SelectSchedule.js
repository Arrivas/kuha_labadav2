import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import SafeScreenView from "../../../SafeScreenView";
import PickupDate from "./PickupDate";
import Method from "./Method";
import PickupTime from "./PickupTime";
import DeliveryDate from "./DeliveryDate";
import PriceDetails from "./PriceDetails";
import colors from "../../../../config/colors";
import getDimensions from "../../../../config/getDimensions";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import ErrorMessage from "../../../forms/ErrorMessage";
import { AppContext } from "../../../../context/AppContext";

const SelectSchedule = ({ route, navigation }) => {
  const {
    name,
    pricing,
    imageUrl,
    laundry_id,
    availablePickupTimes,
    deliveredByItems,
    selectedServices,
  } = route.params;
  const { user, userCurrentLocation } = useContext(AppContext);

  const [method, setMethod] = useState({
    label: "Pickup & Deliver",
    value: "pickup&deliver",
  });

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [pickUpDateError, setPickupDateError] = useState("");
  const [pickupTimeError, setPickupTimeError] = useState("");
  const [deliveryDateError, setDeliveryDateError] = useState("");
  const { height } = getDimensions();

  const bookNow = async () => {
    const availableBookingsRef = firebase
      .firestore()
      .collection("availableBookings");
    const customersRef = firebase.firestore().collection("customers");
    const currentLaundryProv = [];

    // validation
    if (
      (!pickupDate && method.value === "pickup&deliver") ||
      (!pickupDate && method.value === "pickupOnly")
    )
      return setPickupDateError("select pickup date");
    else if (
      (!pickupTime && method.value === "pickup&deliver") ||
      (!pickupTime && method.value === "pickupOnly")
    )
      return setPickupTimeError("select pickup time");
    else if (
      (!deliveryDate && method.value === "pickup&deliver") ||
      (!deliveryDate && method.value === "deliverOnly")
    )
      return setDeliveryDateError("select pickup time");

    setPickupDateError("");
    setPickupTimeError("");
    setDeliveryDateError("");

    const newBooking = {
      userLocation: userCurrentLocation,
      timeOfBooking: new Date().toISOString(),
      status: "confirmedBooking",
      selectedServices,
      selectedPickupTime: pickupTime,
      selectedPickupDay: pickupDate.actualDate,
      selectedDelivery: deliveryDate,
      priceConfirmed: false,
      method,
      laundry_id,
      laundryServiceName: name,
      laundryImageUrl: imageUrl,
      customerImageUrl: user.imageUrl,
      customerName: user.name,
      customerMobile: user.mobileNumber,
      customerDocId: user.docId,
      customerAddress: user.customerAddress,
    };

    const currentCustomer = [];

    await customersRef
      .where("docId", "==", user.docId)
      .limit(1)
      .get()
      .then((data) => {
        data.forEach((doc) => currentCustomer.push(doc.data()));
        currentCustomer[0].confirmedBooking.push(newBooking);
      })
      .then(async () => {
        await customersRef.doc(user.docId).update(currentCustomer[0]);
        console.log("success");
      })
      .catch((err) => console.log(err));

    await availableBookingsRef
      .add(newBooking)
      .then((data) => {
        data.update({ docId: data.id });
      })
      .catch((err) => console.log(err));

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
      {/* <View>*/}
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 0,
        }}
      > */}
      <View
        className="justify-around"
        style={{
          paddingHorizontal: 20,
          marginBottom: 5,
          height: height - 180,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Method
            method={method}
            setMethod={setMethod}
            setPickupDate={setPickupDate}
            setPickupTime={setPickupTime}
            setDeliveryDate={setDeliveryDate}
            setPickupDateError={setPickupDateError}
            setPickupTimeError={setPickupTimeError}
            setDeliveryDateError={setDeliveryDateError}
          />
          {/* pickup & deliver */}

          <PickupDate
            method={method}
            pickupDate={pickupDate}
            setPickupDate={setPickupDate}
            setPickupDateError={setPickupDateError}
            _
          />
          <ErrorMessage error={pickUpDateError} />
          {/* pickup time */}
          <PickupTime
            method={method}
            pickupTime={pickupTime}
            setPickupTime={setPickupTime}
            setPickupTimeError={setPickupTimeError}
            availablePickupTimes={availablePickupTimes}
          />
          <ErrorMessage error={pickupTimeError} />
          {/* delivery date */}
          <DeliveryDate
            method={method}
            deliveryDate={deliveryDate}
            setDeliveryDate={setDeliveryDate}
            deliveredByItems={deliveredByItems}
            setDeliveryDateError={setDeliveryDateError}
          />
          <ErrorMessage error={deliveryDateError} />
          {/* price details/delivery details */}
          <PriceDetails pricing={pricing} />
        </ScrollView>
      </View>
      {/* button */}
      <View>
        <TouchableNativeFeedback onPress={bookNow}>
          <View
            className="self-center w-[90%] py-4 rounded-xl flex-row items-center justify-center px-10"
            style={{
              backgroundColor: colors.primary,
              // width: width >= 500 ? "40%" : "70%",
            }}
          >
            <Text className="font-bold text-[15px] text-white">Book Now</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      {/* </ScrollView> */}
      {/* </View>  */}
    </SafeScreenView>
  );
};

export default SelectSchedule;
