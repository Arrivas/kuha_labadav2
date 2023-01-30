import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '../../../Icon';

const StarsRate = ({ setRating, rating }) => {
  return (
    <>
      <Text className="font-bold">
        Please rate your experience by selecting a star.
      </Text>
      <View className="flex-row self-center my-5">
        <TouchableOpacity onPress={() => setRating(1)}>
          <Icon
            iconName={rating >= 1 ? 'star' : 'star-outline'}
            iconLibrary="MaterialIcons"
            size={40}
            color="#FFC107"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRating(2)}>
          <Icon
            iconName={rating >= 2 ? 'star' : 'star-outline'}
            iconLibrary="MaterialIcons"
            size={40}
            color="#FFC107"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRating(3)}>
          <Icon
            iconName={rating >= 3 ? 'star' : 'star-outline'}
            iconLibrary="MaterialIcons"
            size={40}
            color="#FFC107"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRating(4)}>
          <Icon
            iconName={rating >= 4 ? 'star' : 'star-outline'}
            iconLibrary="MaterialIcons"
            size={40}
            color="#FFC107"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRating(5)}>
          <Icon
            iconName={rating >= 5 ? 'star' : 'star-outline'}
            iconLibrary="MaterialIcons"
            size={40}
            color="#FFC107"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default StarsRate;
