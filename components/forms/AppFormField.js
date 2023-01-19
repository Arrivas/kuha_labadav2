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
  customError,
  payment = false,
  credsAvailable,
  setCredsAvailable,
  checkAvailability,
  ...rest
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();

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
        credsAvailable={credsAvailable}
        setCredsAvailable={setCredsAvailable}
        checkAvailability={checkAvailability}
        {...rest}
      />
      {errors[name] && touched[name] && (
        <Text className={`text-red-400 px-5 bottom-2`}>
          {customError ? customError : errors[name]}
        </Text>
      )}
      {customError && (
        <Text className={`text-red-400 px-5 bottom-2`}>{customError}</Text>
      )}
    </View>
  );
};

export default AppFormField;
