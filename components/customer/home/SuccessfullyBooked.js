import { View, Text, Alert, BackHandler, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import SafeScreenView from "../../SafeScreenView";
import colors from "../../../config/colors";
import getDimentions from "../../../config/getDimensions";

const SuccessfullyBooked = ({ navigation, route }) => {
  const translation = useRef(new Animated.Value(0)).current;
  const { width } = getDimentions();
  const { pickupDate, pickupTime, deliveryDate } = route.params;

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
    outputRange: [-290, 300],
  });

  const yVal = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const stopAnimation = () => Animated.timing(translation).stop();

  useEffect(() => {
    moveImage();
    navigation.addListener("beforeRemove", (e) => {
      // prevent default behavior of leaving the screen
      e.preventDefault();
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

      navigation.dispatch(e.data.action);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    });

    const handleBackButtonClick = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    };

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  return (
    <SafeScreenView>
      <View className="flex-1">
        <View className="items-center justify-center" style={{ flex: 1 }}>
          <View
            className="bg-white rounded-full overflow-hidden items-center justify-center"
            style={{
              height: width * 0.6,
              width: width * 0.6,
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
              }}
              className="h-44 w-44"
              resizeMode="cover"
              source={require("../../../assets/motorcycle.png")}
            />
          </View>
          <Text
            className="py-2 text-2xl"
            style={{
              fontFamily: "Alexandria-Bold",
            }}
          >
            Successfully Booked
          </Text>
        </View>
        <View className="bg-green-100" style={{ flex: 1 }}></View>
      </View>
    </SafeScreenView>
  );
};

export default SuccessfullyBooked;
