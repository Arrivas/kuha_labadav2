import { View, Text, TouchableNativeFeedback, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const HandleDriverButtonAtion = ({ method, status, bookingDetails }) => {
  const navigation = useNavigation();

  const startPickup = (
    <TouchableNativeFeedback
      onPress={() => {
        Alert.alert(
          "Proceed to map screen",
          "This will notify customer that you are on your way to pick-up.",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                // action
                navigation.navigate("MapScreen", {
                  userLocation: bookingDetails.userLocation,
                });
              },
            },
          ]
        );
      }}
    >
      <View className="self-end p-2">
        <Text>map screen</Text>
      </View>
    </TouchableNativeFeedback>
  );
  return (
    <>
      {method === "pickup&deliver" && status === "pick-up" ? (
        startPickup
      ) : (
        <></>
      )}
    </>
  );
};

export default HandleDriverButtonAtion;
