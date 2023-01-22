import React from "react";
import { View, Text, TouchableWithoutFeedback, ScrollView } from "react-native";
import colors from "../../../../config/colors";
import Icon from "../../../Icon";

function ServicesOffered({
  servicesOffered,
  selectedServices,
  setSelectedService,
  type = "default",
}) {
  return (
    <>
      {type === "default" ? (
        <>
          <Text className="font-semibold text-lg">Services Offered</Text>
          <View className="flex-row flex-wrap w-full">
            <ScrollView horizontal>
              {servicesOffered.map((item) => (
                <View
                  className="mr-1 mb-1.5 rounded-full"
                  style={{
                    backgroundColor: selectedServices.includes(item.value)
                      ? colors.primary
                      : "#F3F4F6",
                  }}
                  key={item.value}
                >
                  <TouchableWithoutFeedback
                    onPress={() =>
                      setSelectedService(
                        selectedServices.includes(item.value)
                          ? selectedServices.filter((ss) => ss !== item.value)
                          : [...selectedServices, item.value]
                      )
                    }
                  >
                    <View className="flex-row items-center p-1 pl-2">
                      <Icon
                        color={
                          selectedServices.includes(item.value)
                            ? "white"
                            : "black"
                        }
                        iconName={
                          item.value === "ironing"
                            ? "iron-outline"
                            : item.value === "wash-dry-fold"
                            ? "local-laundry-service"
                            : item.value === "dry-cleaning"
                            ? "dry-cleaning"
                            : "ios-layers"
                        }
                        iconLibrary={
                          item.value === "wash-dry-fold" ||
                          item.value === "dry-cleaning"
                            ? "MaterialIcons"
                            : item.value === "comforter/blankets"
                            ? "IonIcons"
                            : "MaterialCommunityIcons"
                        }
                        size={20}
                      />
                      <Text
                        className="pr-2 py-1"
                        style={{
                          color: selectedServices.includes(item.value)
                            ? "white"
                            : "black",
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))}
            </ScrollView>
          </View>
        </>
      ) : (
        <>
          <Text className="font-semibold text-[15px] mt-2">
            Select your shop services
          </Text>
          <View className="w-full pb-10">
            <ScrollView className="">
              {servicesOffered.map((item) => (
                <View
                  className={`my-1 rounded-lg py-5 h-[80px] w-full justify-center mr-2 ${
                    selectedServices.some((ss) => {
                      if (ss.value === item.value) return ss.offering;
                    })
                      ? `bg-[${colors.primary}]`
                      : "bg-[#F3F4F6]"
                  }`}
                  key={item.value}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      const sServiceCopy = [...selectedServices];
                      sServiceCopy.filter((ss) => {
                        if (item.value === ss.value) {
                          return (ss.offering = !ss.offering);
                        }
                      });

                      setSelectedService([...sServiceCopy]);
                    }}
                  >
                    <View className="flex-row items-center p-1 pl-2 px-5">
                      <Icon
                        color={
                          selectedServices.some((ss) => {
                            if (ss.value === item.value) return ss.offering;
                          })
                            ? "white"
                            : "black"
                        }
                        iconName={
                          item.value === "ironing"
                            ? "iron-outline"
                            : item.value === "wash-dry-fold"
                            ? "local-laundry-service"
                            : item.value === "dry-cleaning"
                            ? "dry-cleaning"
                            : "ios-layers"
                        }
                        iconLibrary={
                          item.value === "wash-dry-fold" ||
                          item.value === "dry-cleaning"
                            ? "MaterialIcons"
                            : item.value === "comforter/blankets"
                            ? "IonIcons"
                            : "MaterialCommunityIcons"
                        }
                        size={25}
                      />
                      <Text
                        className="px-2 py-1 text-[15px]"
                        style={{
                          color: selectedServices.some((ss) => {
                            if (ss.value === item.value) return ss.offering;
                          })
                            ? "white"
                            : "black",
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
}

export default ServicesOffered;
