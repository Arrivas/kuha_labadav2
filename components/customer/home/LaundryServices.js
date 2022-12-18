import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import getDimensions from "../../../config/getDimensions";
import Icon from "../../Icon";
import { horizontalScale, verticalScale } from "../../../config/metrics";
import { filterLaundryServices } from "../../../config/filterLaundryServices";

const LaundryServices = ({ selectedService, navigation, laundryServices }) => {
  const filteredLaundryServices = selectedService
    ? filterLaundryServices(laundryServices, selectedService)
    : laundryServices;

  return (
    <View className="pt-5">
      <View className="flex-row justify-between">
        <Text
          style={{
            fontSize: 14,
          }}
        >
          Services nearby
        </Text>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          see all
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 5,
        }}
        horizontal
      >
        {filteredLaundryServices?.map((item, index) => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("ShopDetails", { item })}
            key={index}
          >
            <View
              className="mt-1 rounded-lg self-start mr-4 h-full bg-white border border-gray-200"
              style={{
                // width: 230,
                // width: 'auto',
                width: horizontalScale(200),
                // height: width <= 380 ? 295 : 310,
              }}
            >
              <Image
                className="rounded-lg rounded-b-none"
                // width >= 500 ? width * 0.25 : width * 0.5
                style={{
                  height: verticalScale(180),
                  width: "auto",
                  // width: horizontalScale(150),
                }}
                source={{
                  uri: item.imageUrl,
                }}
                resizeMode="cover"
              />
              <View className="justify-between h-[110px]">
                <View className="p-2 items-start">
                  <Text
                    className="font-semibold"
                    style={{
                      fontSize: 17,
                    }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                </View>
                {/* time */}
                <View className="p-2 w-full">
                  <View className="overflow-hidden flex-row gap-1 items-center">
                    <Icon
                      iconLibrary="MaterialCommunityIcons"
                      iconName="clock-time-four-outline"
                    />
                    <View className="flex-row">
                      <Text>{item?.openHours?.from} - </Text>
                      <Text>{item?.openHours?.to}</Text>
                    </View>
                  </View>
                  {/* km away */}
                  <View className="overflow-hidden flex-row gap-1 items-center">
                    <Icon
                      iconLibrary="SimpleLineIcons"
                      iconName="location-pin"
                    />
                    <Text>1.4km</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default LaundryServices;
