import { ScrollView, Text, View } from "react-native";
import React from "react";
import Icon from "../../../Icon";

const PriceDetails = ({ pricing }) => {
  return (
    <View className="pt-2">
      <Text
        className="self-start"
        style={{
          fontFamily: "Alexandria-SemiBold",
          fontSize: 16,
        }}
      >
        Price Details
      </Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View className="bg-[#fff9d5] h-20 flex-row items-center">
          <Icon
            iconLibrary="MaterialIcons"
            iconName="warning"
            color="#ac9457"
            size={20}
            className="items-center"
            style={{
              flex: 1,
            }}
          />
          <View
            style={{
              flex: 5,
            }}
          >
            <Text
              className="text-[#ac9457]"
              style={{
                fontFamily: "Alexandria-SemiBold",
              }}
            >
              TAKE NOTE
            </Text>
            <Text
              className="text-[#ac9457] "
              style={{
                fontFamily: "Alexandria-Light",
              }}
            >
              This shop requires at least{" "}
            </Text>
            <Text className=" text-[#ac9457] italic">
              minimum of {pricing.minPerKilo} kilo
            </Text>
          </View>
        </View>
        <View className="h-14 flex-row items-center">
          <View className="items-center justify-center flex-1 ">
            <Text className="text-xl" style={{ fontFamily: "Alexandria-Bold" }}>
              ₱
            </Text>
          </View>
          <View
            style={{
              flex: 5,
            }}
          >
            <Text
              className="font-bold text-sm"
              style={{
                fontFamily: "Alexandria-SemiBold",
              }}
            >
              Shop Rate
            </Text>
            <Text className="text-sm font-semibold">
              {pricing.rate} per {pricing.minPerKilo} kilo
            </Text>
          </View>
        </View>
        <View className="h-14 flex-row items-center">
          <Icon
            iconLibrary="MaterialCommunityIcons"
            iconName="account-cash"
            size={20}
            className="items-center"
            style={{
              flex: 1,
            }}
          />
          <View
            style={{
              flex: 5,
            }}
          >
            <Text
              classNam="font-semibold"
              style={{
                fontFamily: "Alexandria-SemiBold",
              }}
            >
              Cash on Delivery
            </Text>
            <Text>100 - 150</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PriceDetails;
