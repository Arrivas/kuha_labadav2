import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import SafeScreenView from "../../SafeScreenView";

const MyShopComponent = () => {
  return (
    <SafeScreenView>
      <View className="flex-1">
        <View style={{ flex: 1 }} className="bg-red-50">
          <Text>MyShopComponent</Text>
        </View>
        <View style={{ flex: 2 }} className="bg-green-50">
          <ScrollView>
            <Text>MyShopComponent</Text>
          </ScrollView>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default MyShopComponent;
