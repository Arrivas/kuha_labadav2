import {
  View,
  Text,
  TouchableNativeFeedback,
  Modal,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Icon from '../../../Icon';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import StarsRate from './StarsRate';
import { AppContext } from '../../../../context/AppContext';

const BookingItem = ({ itemArry, colors }) => {
  const { user, setUser } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRate = (booking) => {
    const { docId } = booking;
    const { customerDocId, customerName, customerImageUrl } =
      booking.customerDetails;
    const { laundry_id } = booking.laundryShopDetails;
    const rateObj = {
      rating,
      description: description.trim(),
      customerDocId: customerDocId,
      customerName,
      customerImageUrl,
      createdAt: new Date().toISOString(),
    };
    setLoading(true);
    firebase
      .firestore()
      .collection('laundryProviders')
      .doc(laundry_id)
      .collection('ratings')
      .add(rateObj)
      .then((doc) => {
        doc.update({ docId: doc.id });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    const userCopy = { ...user };
    const index = userCopy.bookingHistory.findIndex(
      (item) => item.docId === docId
    );
    if (index >= 0) userCopy.bookingHistory[index].rated = true;
    setUser(userCopy);
    firebase
      .firestore()
      .collection('customers')
      .doc(customerDocId)
      .update(userCopy)
      .then(() => {
        setIsModalOpen(!isModalOpen);
      });
    setLoading(false);
  };
  return (
    <>
      {itemArry.map((item) => {
        const { laundryShopDetails, service, schedule, method, rated, status } =
          item;
        const { laundryShopName, laundry_id, laundryImageUrl } =
          laundryShopDetails;
        const { pickupDateTime, deliveryDate } = schedule;

        return (
          // <TouchableNativeFeedback
          //   background={TouchableNativeFeedback.Ripple('#eee')}
          //   key={item.createdAt}
          // >
          <View className="p-2 mb-2 bg-white px-4 py-5" key={item.createdAt}>
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center justify-center">
                <Icon
                  iconLibrary="MaterialIcons"
                  iconName="storefront"
                  className="mr-2"
                  size={22}
                />
                <Text className="text-[17px] max-w-[80%]" numberOfLines={1}>
                  {laundryShopName}
                </Text>
              </View>
              <Text
                className="max-w-[50%] text-xs"
                style={{
                  color: colors.primary,
                }}
              >
                {item.status}
              </Text>
            </View>
            <View>
              {/* method */}
              {method.pickup === 'yes' && (
                <View className="flex-row justify-between">
                  <Text>Pickup</Text>
                  <Text>{method.pickup || '-'}</Text>
                </View>
              )}
              {method.toBeDeliver === 'yes' && (
                <View className="flex-row justify-between">
                  <Text>Pickup</Text>
                  <Text>{method.toBeDeliver || '-'}</Text>
                </View>
              )}
              {/* pickup date & time */}
              <View className="flex-row justify-between">
                <Text>Pickup Date & Time</Text>
                <Text className="max-w-[50%] text-right">
                  {pickupDateTime || '-'}
                </Text>
              </View>
              {/* delivery date */}
              <View className="flex-row justify-between">
                <Text>Delivery Date</Text>
                <Text>{deliveryDate || '-'}</Text>
              </View>
            </View>
            {rated ? (
              <TouchableNativeFeedback disabled={true}>
                <View
                  className="self-end px-8 py-3 rounded-md mt-2 opacity-60"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                >
                  <Text className="font-semibold text-white">Rate</Text>
                </View>
              </TouchableNativeFeedback>
            ) : (
              status === 'completed' ||
              (status === 'delivered' && (
                <TouchableNativeFeedback
                  onPress={() => setIsModalOpen(!isModalOpen)}
                >
                  <View
                    className="self-end px-8 py-3 rounded-md mt-2"
                    style={{
                      backgroundColor: colors.primary,
                    }}
                  >
                    <Text className="font-semibold text-white">Rate</Text>
                  </View>
                </TouchableNativeFeedback>
              ))
            )}

            <Modal
              animationType="slide"
              transparent={false}
              visible={!item.rated && isModalOpen}
              onRequestClose={() => setIsModalOpen(!isModalOpen)}
            >
              <View className="flex-1">
                <View className="flex-1 items-center justify-center">
                  <Text className="absolute top-1 left-2 font-semibold text-lg">
                    Rate Shop
                  </Text>
                  <Image
                    source={{ uri: laundryImageUrl }}
                    resizeMode="cover"
                    className="h-[80px] w-[80px] rounded-full"
                  />
                  <Text className="font-semibold text-lg">
                    {laundryShopName}
                  </Text>
                  <Text className="text-xs">laundry shop</Text>
                </View>
                <View className="flex-1 p-2 px-5">
                  {/* rate */}
                  <StarsRate rating={rating} setRating={setRating} />
                  {/* dssc */}

                  <Text className="font-semibold my-1">Description</Text>
                  <TextInput
                    className="bg-gray-100 p-3 rounded-md"
                    placeholder="description(optional)"
                    numberOfLines={5}
                    textAlign="left"
                    onChangeText={(text) => setDescription(text)}
                  />
                  <TouchableNativeFeedback onPress={() => handleRate(item)}>
                    <View
                      className="self-end px-10 py-3 rounded-md mt-2"
                      style={{
                        backgroundColor: colors.primary,
                      }}
                    >
                      <View className="flex-row">
                        <Text className="font-semibold text-white mr-1">
                          Submit
                        </Text>
                        {loading && (
                          <ActivityIndicator
                            animating={loading}
                            color="white"
                          />
                        )}
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </Modal>
          </View>
          //  </TouchableNativeFeedback>
        );
      })}
    </>
  );
};

export default BookingItem;
