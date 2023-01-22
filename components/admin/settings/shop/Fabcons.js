import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  Switch,
} from 'react-native';
import React from 'react';
import { FieldArray } from 'formik';
import colors from '../../../../config/colors';
import ErrorMessage from '../../../forms/ErrorMessage';

const Fabcons = ({
  fabconEnabled,
  setFabconEnabled,
  fabconText,
  fabconPrice,
  fabcons,
  setFabcons,
  setFabconPrice,
  setFabconText,
  fabconErr,
}) => {
  return (
    <>
      <View className="flex-row my-2 items-center justify-between">
        <Text className="font-semibold">Fabric Conditioners</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#75a1e6' }}
          thumbColor={fabconEnabled ? '#fff' : '#f4f3f4'}
          value={fabconEnabled}
          onChange={() => setFabconEnabled(!fabconEnabled)}
          className="ml-5"
        />
      </View>
      {fabconEnabled ? (
        <FieldArray name="fabcons">
          {(fieldArrayProps) => {
            const { push, remove, form } = fieldArrayProps;
            const { values } = form;
            return (
              <>
                <View>
                  <View className="flex-row">
                    <View
                      style={{
                        flex: 0.4,
                      }}
                    >
                      <TextInput
                        value={fabconPrice}
                        onChangeText={(text) =>
                          setFabconPrice(text.replace(/[^0-9]/g, ''))
                        }
                        placeholder="price"
                        className="bg-gray-100 p-2 rounded-full pl-4"
                        keyboardType="numeric"
                      />
                    </View>
                    <View className="flex-1">
                      <TextInput
                        value={fabconText}
                        onChangeText={(text) => setFabconText(text)}
                        placeholder="fabcon"
                        className="bg-gray-100 p-2 rounded-full pl-4"
                      />
                      <TouchableNativeFeedback
                        onPress={() => {
                          if (!fabconText || !fabconPrice) return;
                          if (fabcons.length >= 8) return;
                          push({
                            label: fabconText,
                            price: fabconPrice,
                          });
                          setFabcons((oldItem) => [
                            ...oldItem,
                            {
                              label: fabconText.trim(),
                              price: fabconPrice.trim(),
                            },
                          ]);
                          setFabconText('');
                          setFabconPrice();
                        }}
                      >
                        <View
                          className={`absolute right-2 top-1 my-auto bg-[${colors.primary}] p-2 px-6 rounded-full`}
                        >
                          <Text className="text-white">add</Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  </View>
                  <Text className="py-2">
                    your fabcons
                    {fabcons?.length !== 0 ? '(tap to remove)' : ':'}
                  </Text>
                  <View className="flex-row flex-wrap max-w-[80%]">
                    {fabcons.map((item, index) => (
                      <TouchableNativeFeedback
                        key={index}
                        onPress={() => {
                          const filtered = fabcons.filter(
                            (fItem) => fItem.label !== item.label
                          );
                          setFabcons(filtered);
                        }}
                      >
                        <View className="bg-gray-100 p-3 px-5 rounded-full mr-1 mb-1">
                          <Text className="font-semibold">
                            {item.label}{' '}
                            <Text className="font-light">
                              ₱{parseFloat(item.price).toFixed(2)}{' '}
                            </Text>
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                    ))}
                  </View>
                </View>
              </>
            );
          }}
        </FieldArray>
      ) : null}
      <ErrorMessage error={fabconErr} />
    </>
  );
};

export default Fabcons;
