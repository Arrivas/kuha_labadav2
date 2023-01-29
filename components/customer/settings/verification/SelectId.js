import React from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectId = ({
  selectedId1,
  setSelectedId1,
  selectedId2,
  setSelectedId2,
}) => {
  const options = [
    'UMID',
    'National ID',
    'TIN Number',
    'Passport',
    'PhilHealth',
  ];

  return (
    <View className="p-4">
      <Text className="font-semibold mb-2 text-[16px]">
        Kindly select two of the following required identification documents for
        submission:
      </Text>

      <View className="mb-4">
        <Picker
          selectedValue={selectedId1}
          onValueChange={(itemValue) => setSelectedId1(itemValue)}
          className="bg-white border border-gray-400 rounded"
        >
          <Picker.Item label="Select an option" value={null} />
          {options
            .filter((item) => item !== selectedId2)
            .map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
        </Picker>
      </View>

      <View>
        <Picker
          selectedValue={selectedId2}
          onValueChange={(itemValue) => setSelectedId2(itemValue)}
          className="bg-white border border-gray-400 rounded"
        >
          <Picker.Item label="Select an option" value={null} />
          {options
            .filter((item) => item !== selectedId1)
            .map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
        </Picker>
      </View>
    </View>
  );
};

export default SelectId;
