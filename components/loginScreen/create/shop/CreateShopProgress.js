import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import colors from '../../../../config/colors';

const CreateShopProgress = ({ progress }) => {
  const progressTexts = [
    {
      id: 1,
      header: 'Shop Name and Email',
      desc: 'check shop name and email availability.',
    },
    {
      id: 2,
      header: 'Add shop details',
      desc: 'setup your shop by entering necessary informations.',
    },
    {
      id: 3,
      header: 'Shop Image & Services',
      desc: 'upload your shop image, and select your shop services.',
    },
    {
      id: 4,
      header: 'Review Details',
      desc: 'you can still go back to review and change your shop details.',
    },
  ];

  return (
    <View className="flex-row items-center justify-center my-2">
      <Text className="text-xs text-center mx-2">{progress}/4</Text>
      {/* <AnimatedCircularProgress
        className=" self-centeritems-center justify-center text-center"
        size={60}
        width={2}
        fill={
          progress === 1
            ? 25
            : progress === 2
            ? 50
            : progress === 3
            ? 75
            : progress === 4 && 100
        }
        tintColor={colors.primary}
        rotation={0}
        backgroundColor="#ededed"
      >
        {() => <Text className="text-xs text-center">{progress}/4</Text>}
      </AnimatedCircularProgress> */}
      {progressTexts.map((item) => (
        <View key={item.id} className="">
          {item.id === progress && (
            <View className="ml-2">
              <Text className="font-bold text-[16px]">{item.header}</Text>
              <Text className="text-gray-400 w-[70%]">{item.desc}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default CreateShopProgress;
