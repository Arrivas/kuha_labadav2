import { View, Text, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

// buttons
import ChatCustomer from './home/buttonActions/ChatCustomer';
import Pickedup from './home/buttonActions/Pickedup';
import Delivered from './home/buttonActions/Delivered';

const HandleAdminBookingActions = ({
  method,
  status,
  bookingDetails,
  setLoading,
}) => {
  const { user } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View className="self-end p-2">
      {/* method.pickup === 'no' &&
      method.toBeDeliver === 'no' && */}
      {method.pickup === 'no' &&
      method.toBeDeliver === 'no' &&
      status !== 'completed' ? (
        <View className="flex-row">
          <Delivered
            bookingDetails={bookingDetails}
            user={user}
            method={method}
            setLoading={setLoading}
            status={status}
          />
          <ChatCustomer
            navigation={navigation}
            bookingDetails={bookingDetails}
          />
        </View>
      ) : method.pickup === 'yes' && status === 'confirmed booking' ? (
        <Pickedup
          bookingDetails={bookingDetails}
          user={user}
          setLoading={setLoading}
        />
      ) : status === 'pickedup' ? (
        <>
          <ChatCustomer
            navigation={navigation}
            bookingDetails={bookingDetails}
          />
        </>
      ) : method.toBeDeliver === 'yes' && status === 'estimated payment' ? (
        <Delivered
          bookingDetails={bookingDetails}
          user={user}
          method={method}
          status={status}
          setLoading={setLoading}
        />
      ) : method.toBeDeliver === 'no' && status === 'estimated payment' ? (
        <>
          <Delivered
            bookingDetails={bookingDetails}
            user={user}
            method={method}
            status={status}
            setLoading={setLoading}
          />
        </>
      ) : (
        <View className="flex-row">
          <ChatCustomer
            navigation={navigation}
            bookingDetails={bookingDetails}
          />
        </View>
      )}
    </View>
  );
};

export default HandleAdminBookingActions;

{
  /* <View className="self-end p-2">

{method.pickup === 'no' &&
method.toBeDeliver === 'no' &&
status === 'confirmed booking' ? (
  <View className="flex-row">
    <Delivered
      bookingDetails={bookingDetails}
      user={user}
      method={method}
      setLoading={setLoading}
    />
    <ChatCustomer
      navigation={navigation}
      bookingDetails={bookingDetails}
    />
  </View>
) : method.pickup === 'yes' && status === 'confirmed booking' ? (
  <Pickedup
    bookingDetails={bookingDetails}
    user={user}
    setLoading={setLoading}
  />
) : method.toBeDeliver === 'yes' && status === 'pickedup' ? (
  <>
    <ChatCustomer
      navigation={navigation}
      bookingDetails={bookingDetails}
    />
  </>
) : method.toBeDeliver === 'yes' && status === 'estimated payment' ? (
  <Delivered
    bookingDetails={bookingDetails}
    user={user}
    setLoading={setLoading}
  />
) : (
  <></>
)}
</View> */
}
