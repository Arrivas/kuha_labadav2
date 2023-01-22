import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import ErrorMessage from "../../../forms/ErrorMessage";
import ServicesOffered from "../../../customer/home/shopDetails/ServicesOffered";
import Icon from "../../../Icon";

const ThirdStep = ({
  image,
  setImage,
  imageError,
  handlePrev,
  setImageError,
  selectedServices,
  setSelectedService,
  selectedServicesError,
  handleThirdStepSubmit,
}) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
    });
    setImageError("");
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageError("");
    }
  };

  const servicesOffered = [
    { id: 1, offering: true, value: "wash-dry-fold" },
    {
      id: 2,
      offering: true,
      value: "dry-cleaning",
    },
    {
      id: 3,
      offering: true,
      value: "ironing",
    },
    {
      id: 4,
      offering: true,
      value: "comforter/blankets",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View className="flex-1 items-center justify-center">
        <View
          className={`h-[200px] w-[200px] border-2 ${
            imageError ? "border-red-400" : "border-gray-400"
          } rounded-full overflow-hidden items-center justify-center`}
        >
          <Image
            className="h-[200px] w-[200px]"
            resizeMode="cover"
            source={{
              uri:
                image ||
                "https://firebasestorage.googleapis.com/v0/b/labada-app.appspot.com/o/noShop.png?alt=media&token=73f8cfb6-9677-414d-bf6f-0b1c19decfbd",
            }}
          />
        </View>
        <TouchableNativeFeedback onPress={pickImage}>
          <View className="py-2">
            <Text className="text-[15px] ">Select Image</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <ErrorMessage error={imageError} />
      <View className="mx-5" style={{ flex: 0.8 }}>
        <ServicesOffered
          servicesOffered={servicesOffered}
          selectedServices={selectedServices}
          setSelectedService={setSelectedService}
          type="register"
        />
      </View>
      <ErrorMessage error={selectedServicesError} />
      <View className="flex-row items-center justify-between top-3 my-3 w-full">
        <TouchableNativeFeedback onPress={handlePrev}>
          <View className="flex-row p-2 self-end items-center">
            <Icon
              iconName="chevron-left"
              color="black"
              iconLibrary="MaterialCommunityIcons"
              defaultStyle={false}
              size={25}
            />
            <Text>prev</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={handleThirdStepSubmit}>
          <View className="flex-row p-2 self-end items-center">
            <Text>next</Text>
            <Icon
              iconName="chevron-right"
              color="black"
              iconLibrary="MaterialCommunityIcons"
              defaultStyle={false}
              size={25}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default ThirdStep;
