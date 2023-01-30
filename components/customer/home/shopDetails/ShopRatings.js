import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Icon from '../../../Icon';
import Moment from 'moment';

const ShopRatings = ({ selectedServices, ratings }) => {
  return (
    // ${selectedServices.length !== 0 && 'opacity-50'}
    <View className={`flex-1 `}>
      {ratings.length !== 0 ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
          {ratings?.map((item) => (
            <>
              <View className="mb-3" key={item.docId}>
                <View className="flex-row items-center">
                  <Image
                    resizeMode="contain"
                    className="w-[35px] h-[35px] rounded-full"
                    source={{ uri: item.customerImageUrl }}
                  />
                  <View className="items-start ml-2">
                    <Text className="font-semibold">{item.customerName}</Text>
                    <View className="">
                      {new Array(item.rating).fill().map((item, index) => (
                        <Icon
                          iconLibrary="MaterialIcons"
                          iconName="star"
                          color="#FFC107"
                        />
                      ))}
                    </View>
                    {item?.description && (
                      <Text>
                        {item?.description} asdas dasd asd asd asdasd asdas
                        dasdas dasd asdasd
                      </Text>
                    )}
                    <Text className="text-gray-300 text-xs">
                      {Moment(new Date(item.createdAt)).format('L h:mma')}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="font-semibold text-gray-200">no ratings yet</Text>
        </View>
      )}
    </View>
  );
};

export default ShopRatings;
