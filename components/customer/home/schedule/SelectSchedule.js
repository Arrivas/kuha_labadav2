import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native';
import SafeScreenView from '../../../SafeScreenView';
import PickupDate from './PickupDate';
import Method from './Method';
import PickupTime from './PickupTime';
import DeliveryDate from './DeliveryDate';
import Icon from '../../../Icon';
import colors from '../../../../config/colors';
import getDimensions from '../../../../config/getDimensions';

const SelectSchedule = ({ route }) => {
  const { laundry_id, name, availablePickupTimes, deliveredByItems } =
    route.params;
  const [method, setMethod] = useState('');
  const { width } = getDimensions();

  return (
    <SafeScreenView>
      {/* <View>*/}
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 0,
        }}
      > */}
      <View
        className="justify-around"
        style={{
          paddingHorizontal: 20,
          flex: 2,
          marginBottom: 8,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'space-between',
          }}
        >
          <Method method={method} setMethod={setMethod} />

          {/* pickup & deliver */}
          <PickupDate />
          {/* pickup time */}
          <PickupTime availablePickupTimes={availablePickupTimes} />
          {/* delivery date */}
          <DeliveryDate deliveredByItems={deliveredByItems} />
          <View>
            <Text
              className="self-start"
              style={{
                fontFamily: 'Alexandria-SemiBold',
                fontSize: 16,
              }}
            >
              Price Details
            </Text>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <View className="bg-red-200 h-20"></View>
              <View className="bg-green-200 h-20"></View>
              <View className="bg-orange-200 h-20"></View>
            </ScrollView>
          </View>
          {/* price details/delivery details */}
        </ScrollView>
      </View>
      {/* button */}
      <View
        style={{
          flex: 0.2,
        }}
      >
        <TouchableNativeFeedback>
          <View
            className="self-center  py-4 rounded-full flex-row items-center justify-between px-10"
            style={{
              backgroundColor: colors.primary,
              width: width >= 500 ? '40%' : '70%',
            }}
          >
            <Text className="font-bold text-[15px] text-white">
              Proceed Booking
            </Text>
            <Icon
              iconName="arrowright"
              iconLibrary="AntDesign"
              color="white"
              size={16}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      {/* </ScrollView> */}
      {/* </View>  */}
    </SafeScreenView>
  );
};

export default SelectSchedule;
