import {
  View,
  Text,
  TouchableNativeFeedback,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import colors from '../../../../config/colors';

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
      className=" flex-1"
      style={{
        paddingHorizontal: horizontalScale(22),
      }}
    >
      <View className="flex-1">
        <Text className="font-semibold py-2 max-w-[80%]">
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
                  return [...prevState, { ...item, qty: 0 }];
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
                    ₱{parseFloat(item.price).toFixed(2)}{' '}
                  </Text>
                </Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
      </View>
      <View style={{ flex: 2 }}>
        {selectedFabcons.length !== 0 && (
          <Text className="font-semibold py-2 max-w-[80%]">
            Selected Fabcons:
          </Text>
        )}

        <ScrollView>
          {selectedFabcons?.map((item, index) => (
            <View
              className="bg-gray-100 p-3 px-3 rounded-full mr-1 mb-1 flex-row justify-between"
              key={index}
            >
              <View>
                <Text className="font-semibold">
                  {item.label}{' '}
                  <Text className="font-light">
                    ₱{parseFloat(item.price).toFixed(2)}{' '}
                  </Text>
                </Text>
              </View>
              <View className="w-[50%] flex-row justify-between">
                <TextInput
                  className="border border-black text-black w-full px-2"
                  value={String(item.qty)}
                  onChangeText={(text) => console.log(text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FabconSelection;
