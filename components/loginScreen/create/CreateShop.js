import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import FirstStep from "./shop/FirstStep";
import SafeScreenView from "../../SafeScreenView";
import CreateShopProgress from "./shop/CreateShopProgress";

const CreateShop = () => {
  const handleFirstStepSubmit = () => {
    console.log("asd");
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
