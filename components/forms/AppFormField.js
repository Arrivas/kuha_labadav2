import React from 'react';
import { View, Text } from 'react-native';
import { useFormikContext } from 'formik';
import AppTextInput from './AppTextInput';

const AppFormField = ({
  name = '',
  showPassword,
  onShowPassword,
  onShowSelectTime,
  containerStyle = '',
  setProgress,
  iconName = '',
  customerError,
  payment = false,
  ...rest
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();
  // if (errors[name] && touched[name]) {
  //   if (credsAvailable?.email && credsAvailable?.name) {
  //     setProgress(1);
  //     setCredsAvailable({ name: '', email: '' });
  //   }
  // }

  return (
    <View className={containerStyle}>
      <AppTextInput
        value={values[name]}
        onChangeText={handleChange(name)}
        name={name}
        setFieldTouched={setFieldTouched}
        showPassword={showPassword}
        onShowPassword={onShowPassword}
        onShowSelectTime={onShowSelectTime}
        iconName={iconName}
        payment={payment}
        {...rest}
      />
      {errors[name] && touched[name] && (
        <Text className={`text-red-400 px-5 bottom-2`}>
          {customerError ? customerError : errors[name]}
        </Text>
      )}
      {customerError && (
        <Text className={`text-red-400 px-5 bottom-2`}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default AppFormField;
