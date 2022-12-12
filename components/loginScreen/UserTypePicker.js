import React, { useState } from 'react';
import {
  Text,
  View,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native';
import colors from '../../config/colors';
import getDimensions from '../../config/getDimensions';
import Icon from '../Icon';

const UserTypePicker = ({ selectedUserType, setSelectedUserType }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = getDimensions();
  const usertypeItem = [
    {
      id: 1,
      label: 'Customer',
      iconName: 'account',
      iconLibrary: 'MaterialCommunityIcons',
      value: 'customer',
    },
    {
      id: 2,
      label: 'Driver',
      iconName: 'two-wheeler',
      iconLibrary: 'MaterialIcons',
      value: 'driver',
    },
    {
      id: 3,
      value: 'or',
    },
    {
      id: 4,
      label: 'Create Shop',
      iconName: 'storefront',
      iconLibrary: 'MaterialIcons',
      value: 'createShop',
    },
  ];
  return (
    <>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View className="flex-1">
            <TouchableWithoutFeedback
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View className="absolute top-0 left-0 bg-black/20 w-full h-full" />
            </TouchableWithoutFeedback>
            <View className="absolute bottom-0 p-2 w-full bg-white rounded-lg">
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <View className="flex-row justify-between px-3 items-center">
                  <Text
                    style={{
                      fontFamily: 'Alexandria-SemiBold',
                      fontSize: width >= 500 ? width * 0.018 : width * 0.04,
                    }}
                  >
                    Select user type
                  </Text>
                  <Icon
                    size={22}
                    iconLibrary="MaterialCommunityIcons"
                    iconName="window-close"
                  />
                </View>
              </Pressable>
              <View className="flex-row items-center justify-around">
                {usertypeItem.map((item) => (
                  <View key={item.id}>
                    <View className={`mt-2 items-center`}>
                      {item.value === 'or' ? (
                        <View className="bg-gray-300 h-16 w-[0.5px]" />
                      ) : (
                        <TouchableNativeFeedback
                          onPress={() => setSelectedUserType(item)}
                          background={TouchableNativeFeedback.Ripple(
                            '#ccccc',
                            true
                          )}
                        >
                          <View>
                            <Icon
                              color={
                                item.value === selectedUserType.value
                                  ? 'white'
                                  : 'black'
                              }
                              size={45}
                              iconName={item.iconName}
                              iconLibrary={item.iconLibrary}
                              className="rounded-full p-2"
                              style={{
                                backgroundColor:
                                  item.value === selectedUserType.value
                                    ? colors.primary
                                    : '#efefef',
                              }}
                            />
                          </View>
                        </TouchableNativeFeedback>
                      )}
                      <Text
                        style={{
                          fontFamily: 'Alexandria-Light',
                        }}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Modal>
        <Pressable onPress={() => setModalVisible(true)}>
          <View className="p-2 py-4 mb-3 rounded-xl bg-gray-100 items-center flex-row">
            <Icon
              iconName="account-convert"
              iconLibrary="MaterialCommunityIcons"
              size={width >= 500 ? width * 0.025 : width * 0.04}
              style={{ left: width >= 500 ? width * 0.015 : width * 0.02 }}
            />
            <Text
              className="w-full"
              style={{
                fontSize: width >= 500 ? width * 0.018 : width * 0.035,
                paddingHorizontal: width >= 500 ? width * 0.025 : width * 0.035,
              }}
            >
              {selectedUserType.label}
            </Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default UserTypePicker;
