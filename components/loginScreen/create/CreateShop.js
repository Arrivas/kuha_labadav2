import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import FirstStep from "./shop/FirstStep";
import SafeScreenView from "../../SafeScreenView";
import CreateShopProgress from "./shop/CreateShopProgress";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import "@react-native-firebase/auth";

const CreateShop = () => {
  const handleFirstStepSubmit = (val) => {
    let shopNameErr = "";
    let shopEmailErr = "";
    firebase
      .firestore()
      .collection("laundryProviders")
      .where("name", "==", val.name.trim())
      .limit(1)
      .get()
      .then((data) => {
        if (!data.empty) shopNameErr = "shop name already taken";
      })
      .catch((err) => console.log(err, "shop name"));
    if (shopNameErr) return console.log(shopNameErr);
    firebase
      .firestore()
      .collection("admins")
      .where("email", "==", val.email.trim())
      .limit(1)
      .get()
      .then((data) => {
        if (!data.empty) shopEmailErr = "email already taken";
      })
      .catch((err) => console.log(err, "shop name"));
    if (shopEmailErr) return console.log(shopNameErr);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 justify-center items-center">
          <CreateShopProgress progress={1} />
          <FirstStep handleFirstStepSubmit={handleFirstStepSubmit} />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CreateShop;
