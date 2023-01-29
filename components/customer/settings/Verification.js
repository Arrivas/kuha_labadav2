import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import SelectId from './verification/SelectId';
import SafeScreenView from '../../SafeScreenView';
import colors from '../../../config/colors';

const Verification = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [selectedId1, setSelectedId1] = useState(null);
  const [selectedId2, setSelectedId2] = useState(null);

  const pickImage = async (setImage) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeScreenView>
      <View className="flex-1">
        <View className="bg-yellow-400 p-4 border border-yellow-400 text-center">
          <Text className="text-yellow-900 font-bold">
            Verify your identity for security purposes before proceeding with
            the booking.
          </Text>
        </View>
        <SelectId
          selectedId1={selectedId1}
          setSelectedId1={setSelectedId1}
          selectedId2={selectedId2}
          setSelectedId2={setSelectedId2}
        />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 5 }}
        >
          {selectedId1 && (
            <>
              <Text className="font-semibold">{selectedId1}</Text>

              <View className="flex-row w-full px-2 py-1 overflow-hidden">
                <TouchableNativeFeedback onPress={() => pickImage(setImage1)}>
                  {image1 ? (
                    <Image
                      source={{ uri: image1 }}
                      className="flex-1 h-48 rounded-md mr-1"
                    />
                  ) : (
                    <View className="flex-1 h-48 mr-1 bg-gray-400/20 rounded-md items-center justify-center">
                      <Text className="font-semibold text-gray-400">front</Text>
                    </View>
                  )}
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => pickImage(setImage2)}>
                  {image2 ? (
                    <Image
                      source={{ uri: image2 }}
                      className="flex-1 h-48 rounded-md mr-1"
                    />
                  ) : (
                    <View className="flex-1 h-48 bg-gray-400/20 rounded-md mr-1 items-center justify-center">
                      <Text className="font-semibold text-gray-400">back</Text>
                    </View>
                  )}
                </TouchableNativeFeedback>
              </View>
            </>
          )}

          {selectedId2 && (
            <>
              <Text className="font-semibold">{selectedId2}</Text>
              <View className="flex-row w-full px-2 py-1 overflow-hidden">
                <TouchableNativeFeedback
                  onPress={() => pickImage(setImage3)}
                  className="w-1/3 p-4"
                >
                  {image3 ? (
                    <Image
                      source={{ uri: image3 }}
                      className="flex-1 h-48  rounded-md mr-1"
                    />
                  ) : (
                    <View className="flex-1 h-48 mr-1 bg-gray-400/20 rounded-md items-center justify-center">
                      <Text className="font-semibold text-gray-400">front</Text>
                    </View>
                  )}
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => pickImage(setImage4)}
                  className="w-1/3 p-4"
                >
                  {image4 ? (
                    <Image
                      source={{ uri: image4 }}
                      className="flex-1 h-48  rounded-md mr-1"
                    />
                  ) : (
                    <View className="flex-1 h-48 bg-gray-400/20 rounded-md mr-1 items-center justify-center">
                      <Text className="font-semibold text-gray-400">back</Text>
                    </View>
                  )}
                </TouchableNativeFeedback>
              </View>
            </>
          )}
          {image1 &&
            image2 &&
            image3 &&
            image4 &&
            selectedId1 &&
            selectedId2 && (
              <TouchableNativeFeedback>
                <View
                  className="self-end px-6 py-3 my-3 rounded-full"
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
    </SafeScreenView>
  );
};

export default Verification;
