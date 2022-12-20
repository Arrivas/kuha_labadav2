import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const SafeScreenView = ({ children, enablePadding = false }) => {
  const style = StyleSheet.create({
    screen: {
      paddingTop: enablePadding ? Constants.statusBarHeight : 0,
      flex: 1,
      backgroundColor: '#fff',
    },
  });
  return <SafeAreaView style={style.screen}>{children}</SafeAreaView>;
};

export default SafeScreenView;
