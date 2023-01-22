import { View, Text } from 'react-native';
import React from 'react';

const ShopDescription = ({ AppFormField }) => {
  return (
    <>
      <Text className="my-12 text-center font-bold text-xl text-gray-200">
        Shop Description
      </Text>

      <Text className="pb-1 font-semibold">Shop Description</Text>
      <AppFormField
        placeholder="shop description"
        name="description"
        description={true}
      />
      {/* shop address */}
      <Text className="pb-1 font-semibold">Shop Address</Text>
      <AppFormField
        description={true}
        placeholder="shop address"
        name="vicinity"
      />
      {/* geo */}
      <View className="flex-row space-x-1">
        <View className="flex-1">
          <Text className="font-semibold">laitutde</Text>
          <AppFormField placeholder="latitude" name="latitude" />
        </View>
        <View className="flex-1">
          <Text className="font-semibold">longitude</Text>
          <AppFormField placeholder="longitude" name="longitude" />
        </View>
      </View>

      {/* accepting limit */}
      <View className="flex-row items-center">
        <Text className="pb-3 flex-1 font-semibold">
          Shop Accepting Limit(max of 100)
        </Text>
        <View style={{ flex: 0.4 }}>
          <AppFormField placeholder="50" name="max" />
        </View>
      </View>
      {/* min per kilo */}

      <View className="flex-row w-full space-x-1">
        <View className="flex-1">
          <Text className="pb-1 mx-2 font-semibold">Minimum Per Kilo</Text>
          <AppFormField placeholder="minimum/kilo" name="minPerKilo" />
        </View>
        <View className="flex-1">
          <Text className="pb-1 mx-2 font-semibold">Rate</Text>
          <AppFormField placeholder="rate" name="rate" />
        </View>
      </View>
    </>
  );
};

export default ShopDescription;
