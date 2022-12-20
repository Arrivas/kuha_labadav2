import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeScreenView from '../SafeScreenView';
import AvailableBookings from './home/AvailableBookings';
import colors from '../../config/colors';

const DriverHomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Available');
  const tabItems = [
    { id: 1, label: 'Available' },
    { id: 2, label: 'Ongoing' },
    { id: 3, label: 'History' },
  ];
  return (
    <SafeScreenView>
      <View className="flex-row items-center justify-center p-2 px-3">
        {tabItems.map((item) => (
          <TouchableNativeFeedback
            onPress={() => setActiveTab(item.label)}
            key={item.id}
          >
            <View
              style={{
                flex: 1,
                paddingVertical: 10,
                borderBottomColor: colors.primary,
                borderBottomWidth: activeTab === item.label ? 1 : 0,
              }}
            >
              <Text
                className="text-center"
                style={{
                  fontFamily: 'Alexandria-Regular',
                }}
              >
                {item.label}
              </Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </View>
      <AvailableBookings />
    </SafeScreenView>
  );
};

export default DriverHomeScreen;
