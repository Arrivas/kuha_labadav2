import React from 'react';
import { View } from 'react-native';
import Lottie from 'lottie-react-native';

function ActivityIndicator({ isVisible = false, opacity = 80 }) {
  if (!isVisible) return null;
  return (
    <View
      className={`absolute w-full h-full z-50 bg-white opacity-${opacity} items-center justify-center`}
    >
      <Lottie
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
      />
    </View>
  );
}

export default ActivityIndicator;
