import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const SafeScreenView = ({ children }) => (
  <SafeAreaView style={style.screen}>{children}</SafeAreaView>
);

const style = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SafeScreenView;
