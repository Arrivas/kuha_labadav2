import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import NotVerifiedMessage from './NotVerifiedMessage';
import colors from '../../../../config/colors';

const NotVerified = ({
  image1,
  setImage1,
  image2,
  setImage2,
  image3,
  setImage3,
  pickImage,
  handleSubmit,
}) => {
  return (
    <>
      <NotVerifiedMessage type="2" />
      <View className="px-5 flex-1">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 10,
            paddingTop: 5,
          }}
        >
          {/* BIR */}
          <View className="mt-4">
            <Text className="font-semibold">BIR Permit</Text>
            <TouchableNativeFeedback onPress={() => pickImage(setImage1)}>
              {image1 ? (
                <Image
                  source={{ uri: image1 }}
                  className=" h-48 rounded-md mr-1"
                  resizeMode="contain"
                />
              ) : (
                <View className="h-48 mr-1 bg-gray-400/20 rounded-md items-center justify-center">
                  <Text className="font-semibold text-gray-400">
                    select image
                  </Text>
                </View>
              )}
            </TouchableNativeFeedback>
          </View>
          {/* DTI */}
          <View className="mt-4">
            <Text className="font-semibold">DTI Permit</Text>
            <TouchableNativeFeedback onPress={() => pickImage(setImage2)}>
              {image2 ? (
                <Image
                  source={{ uri: image2 }}
                  className=" h-48 rounded-md mr-1"
                  resizeMode="contain"
                />
              ) : (
                <View className="h-48 bg-gray-400/20 rounded-md mr-1 items-center justify-center">
                  <Text className="font-semibold text-gray-400 text-center">
                    select image
                  </Text>
                </View>
              )}
            </TouchableNativeFeedback>
          </View>
          {/* mayors permit */}
          <View className="mt-4">
            <Text className="font-semibold">Mayor's Permit/ID</Text>
            <TouchableNativeFeedback onPress={() => pickImage(setImage3)}>
              {image3 ? (
                <Image
                  source={{ uri: image3 }}
                  className="h-48 rounded-md mr-1"
                  resizeMode="contain"
                />
              ) : (
                <View className="h-48 bg-gray-400/20 rounded-md mr-1 items-center justify-center">
                  <Text className="font-semibold text-gray-400 text-center">
                    select image
                  </Text>
                </View>
              )}
            </TouchableNativeFeedback>
          </View>
          {image1 && image2 && image3 && (
            <TouchableNativeFeedback onPress={handleSubmit}>
              <View
                className="self-end px-6 py-3 mt-3 rounded-full"
                style={{
                  backgroundColor: colors.primary,
                }}
              >
                <Text className="text-white">submit</Text>
              </View>
            </TouchableNativeFeedback>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default NotVerified;
