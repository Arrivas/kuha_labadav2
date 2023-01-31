import {
  View,
  Text,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from '../../Icon';
import DocumentViewer from './DocumentViewer';
import colors from '../../../config/colors';
import Moment from 'moment';

const Shop = ({ item, width, loading, handleDecline, handleAccept }) => {
  return (
    <View
      style={{
        maxWidth: width - 20,
        width: '100%',
      }}
      className=" self-center p-2 rounded-md bg-white border-y border-gray-200"
      key={item.createdAt}
    >
      <View className="flex-row items-center">
        <View className="bg-[#F2F2F2] rounded-full p-2">
          <Icon iconLibrary="Feather" iconName="user" size={30} color="black" />
        </View>
        <View className="flex-col ml-2">
          <Text className="font-bold text-xl">{item.adminName}</Text>
          <Text className="text-xs">{item.from}</Text>
        </View>
      </View>
      <View>
        <View className="my-5">
          <Text className="font-semibold">Submitted documents</Text>
          <Text className="font-semibold">Date & Time Submitted</Text>
          <Text>{Moment(new Date(item.createdAt)).format('LLL')}</Text>
        </View>
        <DocumentViewer images={item.credUrls} selectedId={item?.selectedId} />
      </View>
      <View className="flex-row justify-between px-2 my-3">
        <TouchableNativeFeedback onPress={() => handleDecline(item)}>
          <View className="bg-[#F2F2F2] px-9 py-3 flex-row items-center justify-center rounded-md">
            <Text className=" font-semibold">Decline</Text>
            {loading && <ActivityIndicator color="white" animating={loading} />}
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          disabled={loading}
          onPress={() => handleAccept(item)}
        >
          <View
            className={`bg-[${colors.primary}] px-9 py-3 flex-row items-center justify-center rounded-md`}
          >
            <Text className="text-white font-semibold">Approve</Text>
            {loading && <ActivityIndicator color="white" animating={loading} />}
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default Shop;
