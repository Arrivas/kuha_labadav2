import { View, Text, Switch } from 'react-native';
import { FieldArray } from 'formik';
import React from 'react';

const ServicesOffered = ({ handleSetService }) => {
  return (
    <>
      <Text className="font-semibold">Services Offered</Text>
      <FieldArray name="servicesoffered">
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const { servicesOffered } = values;
          return (
            <View className="w-[80%] mx-auto">
              {servicesOffered.map((item, index) => (
                <View
                  className="flex-row items-center justify-between"
                  key={index}
                >
                  <Text>{item.value}</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#75a1e6' }}
                    thumbColor={item.value ? '#fff' : '#f4f3f4'}
                    value={item.offering}
                    onChange={() => handleSetService(item.value)}
                  />
                </View>
              ))}
            </View>
          );
        }}
      </FieldArray>
    </>
  );
};

export default ServicesOffered;
