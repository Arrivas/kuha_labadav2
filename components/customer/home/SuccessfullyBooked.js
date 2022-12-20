import { View, Text, Animated, TouchableNativeFeedback } from "react-native";
import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import Moment from "moment";
import SafeScreenView from "../../SafeScreenView";
import colors from "../../../config/colors";
import getDimentions from "../../../config/getDimensions";
import {
  moderateScale,

} from "../../../config/metrics";

const SuccessfullyBooked = ({ navigation, route }) => {
  const translation = useRef(new Animated.Value(0)).current;
  const {  height } = getDimentions();
  const { pickupDate, pickupTime, deliveryDate, method } = route.params;

  const moveImage = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translation, {
          toValue: 0,
          duration: 0,
          delay: 50,
          useNativeDriver: true,
        }),
        Animated.timing(translation, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  };

  const xVal = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  const yVal = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const stopAnimation = () => Animated.timing(translation).stop();

  useEffect(() => {
    moveImage();
  }, []);

  const formattedDate = new Date(`${pickupDate.actualDate}, ${pickupTime}`);

  const bookedDetails = [
    {
      id: 1,
      label: "Method",
      value: method.label,
    },
    {
      id: 2,
      label: "Pickup date and time",
      value:
        formattedDate instanceof Date && !isNaN(formattedDate)
          ? Moment(new Date(formattedDate), "ddd DD-MMM-YYYY, hh:mm A").format(
              "lll"
            )
          : "-",
    },
    { id: 3, label: "Delivery date", value: deliveryDate },
  ];

  const goBackHome = () => {
    stopAnimation();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }],
      })
    );
  };

  return (
    <SafeScreenView>
      <View className="flex-1 px-5">
        <View className="items-center justify-center" style={{ flex: 1 }}>
          <View
            className="bg-white rounded-full overflow-hidden items-center justify-center"
            style={{
              height: height * 0.35,
              width: height * 0.35,
              borderWidth: 8,
              borderColor: colors.primary,
            }}
          >
            <Animated.Image
              style={{
                transform: [
                  { translateY: yVal },
                  {
                    translateX: xVal,
                  },
                ],
                height: height * 0.25,
                width: height * 0.25,
              }}
              // className="h-44 w-44"
              resizeMode="cover"
              source={require("../../../assets/motorcycle.png")}
            />
          </View>
          <Text
            className="pt-3"
            style={{
              fontFamily: "Alexandria-Bold",
              fontSize: moderateScale(18),
            }}
          >
            Successfully Booked
          </Text>
          <View className="border-b border-gray-200 w-[80%] h-[1px] absolute bottom-0 self-center" />
        </View>
        <View className=" w-full" style={{ flex: 1 }}>
          <View
            className="p-5"
            style={{
              flex: 1,
            }}
          >
            {bookedDetails.map((item) => (
              <View
                key={item.id}
                className="w-full justify-between flex-row py-2"
              >
                <Text
                  style={{
                    fontSize: moderateScale(13),
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(13),
                  }}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
          {/* button */}
          <TouchableNativeFeedback onPress={goBackHome}>
            <View
              className="self-center w-[90%] py-4 rounded-full flex-row items-center justify-center px-10 bottom-5"
              style={{
                backgroundColor: colors.primary,
                // width: width >= 500 ? "40%" : "60%",
              }}
            >
              <Text className="font-bold text-[15px] text-white">Home</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default SuccessfullyBooked;
