import { View, Text, TouchableNativeFeedback, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../../context/AppContext';
import colors from '../../../../config/colors';
import BookingItem from './BookingItem';
import NoItemsYet from '../../../NoItemsYet';

const MyBooking = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('ongoing');
  const { user } = useContext(AppContext);
  const { confirmedBooking, bookingHistory } = user;

  const tabItems = [
    { id: 1, label: 'ongoing' },
    { id: 2, label: 'history' },
    { id: 3, label: 'cancelled' },
  ];

  const filterBookings = (arr) => {
    const toFilterArr = [...arr];
    const history = [];
    const cancelled = [];
    toFilterArr?.filter((item) => {
      if (item.status === 'cancelled') cancelled.push(item);
      else history.push(item);
    });
    return { history, cancelled };
  };
  const { history, cancelled } = filterBookings(bookingHistory);

  return (
    <>
      <View className="flex-row w-full justify-between bg-white">
        {tabItems.map((item) => (
          <TouchableNativeFeedback
            key={item.id}
            onPress={() => setSelectedTab(item.label)}
          >
            <View
              className="border-b-2 flex-1 p-3 items-center"
              style={{
                borderBottomColor:
                  selectedTab === item.label ? colors.primary : 'white',
              }}
            >
              <Text>{item.label}</Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {selectedTab === 'ongoing' ? (
          confirmedBooking.length !== 0 ? (
            <BookingItem itemArry={confirmedBooking} colors={colors} />
          ) : (
            <NoItemsYet />
          )
        ) : selectedTab === 'history' ? (
          history.length !== 0 ? (
            <BookingItem itemArry={history} colors={colors} />
          ) : (
            <NoItemsYet />
          )
        ) : cancelled.length !== 0 ? (
          <BookingItem itemArry={cancelled} colors={colors} />
        ) : (
          <NoItemsYet />
        )}
      </ScrollView>
    </>
  );
};

export default MyBooking;
