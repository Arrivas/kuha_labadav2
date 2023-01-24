import { View, Text, Animated, TouchableNativeFeedback } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import SafeScreenView from '../../SafeScreenView';
import colors from '../../../config/colors';
import getDimentions from '../../../config/getDimensions';
import { moderateScale } from '../../../config/metrics';

const SuccessfullyBooked = ({ navigation }) => {
  const translation = useRef(new Animated.Value(0)).current;
  const { height } = getDimentions();

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

  const goBackHome = () => {
    stopAnimation();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <SafeScreenView>
      <View className="flex-1 px-5 items-center justify-center">
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
            source={require('../../../assets/motorcycle.png')}
          />
        </View>
        <View className="py-2">
          <Text
            style={{
              fontFamily: 'Alexandria-Bold',
              fontSize: moderateScale(18),
            }}
          >
            Successfully Booked
          </Text>
          <Text>
            Thank you for choosing us and we look forward to providing you with
            quality laundry service.
          </Text>
        </View>
        <TouchableNativeFeedback onPress={goBackHome}>
          <View
            className="self-end w-[40%] py-4 rounded-full flex-row items-center justify-center px-10 "
            style={{
              backgroundColor: colors.primary,
              // width: width >= 500 ? "40%" : "60%",
            }}
          >
            <Text className="font-bold text-[15px] text-white">Done</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeScreenView>
  );
};

export default SuccessfullyBooked;
