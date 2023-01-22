import React from "react";
import { ScrollView, Text, View } from "react-native";
import Icon from "../../../Icon";
import ServicesOffered from "./ServicesOffered";

const ShopOverview = ({
  description,
  selectedServices,
  vicinity,
  pendingServices,
  servicesOffered,
  setSelectedService,
}) => {
  return (
    <>
      <View className="flex-2 w-full">
        <View className="flex-row items-center">
          <Icon iconLibrary="SimpleLineIcons" iconName="location-pin" />
          <Text>{vicinity}</Text>
        </View>
        <View className="flex-row items-center">
          <Icon
            iconLibrary="MaterialCommunityIcons"
            iconName="calendar-month"
          />
          <View className="flex-row">
            <Text>Currently Booked - </Text>
            <Text>{pendingServices?.ongoing?.length}/</Text>
            <Text>{pendingServices?.max}</Text>
          </View>
        </View>
        <ServicesOffered
          servicesOffered={servicesOffered}
          selectedServices={selectedServices}
          setSelectedService={setSelectedService}
        />
      </View>
      {/* description */}
      <View className="flex-1 w-full">
        <Text
          className={`text-[18px] font-semibold self-start `}
          style={{
            opacity: selectedServices.length === 0 ? 1 : 0.2,
          }}
        >
          Description
        </Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View>
            <Text
              style={{
                opacity: selectedServices.length === 0 ? 1 : 0.2,
              }}
            >
              {description}
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ShopOverview;
