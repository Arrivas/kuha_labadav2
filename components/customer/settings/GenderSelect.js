import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import colors from '../../../config/colors';
import Icon from '../../Icon';

function GenderSelect({ selectedGender, setSelectedGender }) {
  const genderItems = [
    { id: 1, label: 'Male', iconName: 'male' },
    { id: 2, label: 'Female', iconName: 'female' },
  ];

  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-gray-500">Gender</Text>
      <View className="flex-row w-[75%]">
        {genderItems.map((item) => (
          <View key={item.id} className="items-center pr-5">
            <TouchableWithoutFeedback
              onPress={() => setSelectedGender(item.iconName)}
            >
              <View
                className={`rounded-full items-center justify-center ${
                  selectedGender === item.iconName
                    ? `bg-[${colors.primary}]`
                    : 'bg-gray-100'
                } h-[60px] w-[60px]`}
              >
                <Icon
                  iconName={item.iconName}
                  iconLibrary="IonIcons"
                  defaultStyle={false}
                  color={selectedGender === item.iconName ? 'white' : 'black'}
                  size={20}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text className={`text-[10px]`}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default GenderSelect;
