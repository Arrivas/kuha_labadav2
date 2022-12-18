import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeScreenView from "../SafeScreenView";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";

const DriverHomeScreen = () => {
  const [availableBookings, setAvailableBookings] = useState([]);
  const fetchAvailableBookings = async () => {
    const availableBookingsRef = firebase
      .firestore()
      .collection("availableBookings");
    const currentAvailableBookings = [];

    await availableBookingsRef
      .get()
      .then((data) => {
        data.forEach((doc) => {
          currentAvailableBookings.push(doc.data());
        });
      })
      .catch((err) => console.log(err));

    return currentAvailableBookings;
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchAvailableBookings().then((res) => setAvailableBookings(res));
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeScreenView>
      <View>
        <Text className="">DriverHomeScreen</Text>
      </View>
    </SafeScreenView>
  );
};

export default DriverHomeScreen;
