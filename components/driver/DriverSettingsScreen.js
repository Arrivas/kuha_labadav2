import React from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";
import SafeScreenView from "../SafeScreenView";

import useAuth from "../../auth/useAuth";
const DriverSettingsScreen = (props) => {
  const { logOut } = useAuth();
  return (
    <SafeScreenView>
      <View>
        <TouchableNativeFeedback onPress={() => logOut()}>
          <View className="p-5">
            <Text>logout</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeScreenView>
  );
};

export default DriverSettingsScreen;
