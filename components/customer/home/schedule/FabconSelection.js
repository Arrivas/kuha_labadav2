import {
  View,
  Text,
  TouchableNativeFeedback,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import colors from '../../../../config/colors';
import Icon from '../../../Icon';

const FabconSelection = ({
  fabcons,
  selectedFabcons,
  setSelectedFabcons,
  horizontalScale,
}) => {
  const inArray = (array, target) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].label === target) {
        return true;
      }
    }

    return false;
  };

  return (
    <View
      className="flex-1 w-full"
      style={{
        paddingHorizontal: horizontalScale(22),
      }}
    >
      <View className="flex-1">
        <Text className="font-semibold py-2">
          Fabcon Selection<Text className="text-gray-400">(optional):</Text>
        </Text>
        <View className="flex-row flex-wrap">
          {fabcons.map((item, index) => (
            <TouchableNativeFeedback
              key={index}
              onPress={() => {
                setSelectedFabcons((prevState) => {
                  const sFabconsCopy = [...selectedFabcons];
                  const index = sFabconsCopy.findIndex(
                    (fItem) => fItem.label === item.label
                  );
                  if (index >= 0) {
                    sFabconsCopy.splice(index, 1);
                    return sFabconsCopy;
                  }
                  return [...prevState, { ...item, qty: 1 }];
                });
              }}
            >
              <View
                className={`${
                  inArray(selectedFabcons, item.label)
                    ? `bg-[${colors.primary}]`
                    : 'bg-gray-100'
                } p-3 px-3 rounded-full mr-1 mb-1`}
              >
                <Text
                  className={`text-${
                    inArray(selectedFabcons, item.label) ? `white` : 'black'
                  } font-semibold`}
                >
                  {item.label}{' '}
                  <Text
                    className={`text-${
                      inArray(selectedFabcons, item.label) ? `white` : 'black'
                    } font-light`}
                  >
                    ₱{parseFloat(item.price).toFixed(2)}
                  </Text>
                </Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {selectedFabcons.length !== 0 && (
          <Text className="font-semibold py-2 max-w-[80%]">
            Selected Fabcons:
          </Text>
        )}

        <ScrollView>
          {selectedFabcons?.map((item, index) => (
            <View
              className="bg-gray-100 p-3 px-3 rounded-full mr-1 mb-1 flex-row justify-between items-center"
              key={index}
            >
              <View className="flex-1 pl-1">
                <Text className="font-semibold">
                  {item.label}{' '}
                  <Text className="font-light">
                    ₱{parseFloat(item.price).toFixed(2)}{' '}
                  </Text>
                </Text>
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#c7c7c7', true)}
                  onPress={() => {
                    const fabconsCopy = [...selectedFabcons];
                    if (fabconsCopy[index].qty <= 1) return;
                    fabconsCopy[index].qty -= 1;
                    setSelectedFabcons(fabconsCopy);
                  }}
                >
                  <View className="items-center p-2  overflow-hidden">
                    <Icon
                      iconLibrary="AntDesign"
                      iconName="minuscircle"
                      color="#4d4d4d"
                    />
                  </View>
                </TouchableNativeFeedback>
                <View className="flex-1 items-center">
                  <TextInput
                    textAlign="center"
                    className="border-b border-gray-500 text-gray-500 px-2 w-[40%]"
                    value={String(item.qty)}
                    onChangeText={(text) => {
                      if (Math.floor(text) > 99) return;
                      const fabconsCopy = [...selectedFabcons];
                      fabconsCopy[index].qty = Math.floor(
                        text.replace(/[^0-9]/g, '')
                      );

                      setSelectedFabcons(fabconsCopy);
                    }}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableNativeFeedback
                  onPress={() => {
                    const fabconsCopy = [...selectedFabcons];
                    if (fabconsCopy[index].qty >= 99) return;
                    fabconsCopy[index].qty += 1;
                    setSelectedFabcons(fabconsCopy);
                  }}
                  background={TouchableNativeFeedback.Ripple('#c7c7c7', true)}
                >
                  <View className="items-center p-2">
                    <Icon
                      iconLibrary="AntDesign"
                      iconName="pluscircle"
                      color="#4d4d4d"
                    />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FabconSelection;
