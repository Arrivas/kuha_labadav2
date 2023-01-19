import React, { useState } from 'react';
import { TextInput, View, TouchableNativeFeedback } from 'react-native';
import Icon from '../Icon';
import colors from '../../config/colors';
import getDimensions from '../../config/getDimensions';

const InputText = ({
  name,
  iconName,
  showPassword,
  keyboardType,
  isPassword,
  onShowPassword,
  iconColor = '#4c5464',
  setFieldTouched,
  payment,
  credsAvailable,
  checkAvailability = false,
  ...rest
}) => {
  const [applyBorder, setApplyBorder] = useState(false);
  const { width } = getDimensions();

  return (
    <View
      className={`items-center flex-row p-2 ${
        payment ? 'py-1 pt-4' : 'py-3'
      } rounded-xl mb-3 bg-gray-100 bgred-400`}
      style={{
        borderWidth: 1,
        borderColor: applyBorder ? colors.primary : 'transparent',
      }}
    >
      {iconName ? (
        <Icon
          style={{ left: width >= 500 ? width * 0.015 : width * 0.02 }}
          size={width >= 500 ? width * 0.025 : width * 0.045}
          color={applyBorder ? colors.primary : iconColor}
          iconLibrary="MaterialCommunityIcons"
          iconName={iconName}
        />
      ) : null}
      <TextInput
        name={name}
        style={{
          fontSize: width >= 500 ? width * 0.018 : width * 0.035,
          paddingHorizontal: width >= 500 ? width * 0.025 : width * 0.035,
        }}
        clearButtonMode="always"
        secureTextEntry={isPassword ? !showPassword : showPassword}
        onBlur={() => {
          setApplyBorder(false);
          setFieldTouched(name);
        }}
        onFocus={() => setApplyBorder(true)}
        keyboardType={keyboardType}
        className="w-full"
        {...rest}
      />
      {isPassword ? (
        <TouchableNativeFeedback onPress={() => onShowPassword(!showPassword)}>
          <View
            className="absolute "
            style={{
              right: width >= 500 ? width * 0.015 : width * 0.03,
            }}
          >
            <Icon
              className="rounded-none bg-transparent p-2"
              iconName={showPassword ? 'eye-outline' : 'eye-off-outline'}
              color="#4c5464"
              iconLibrary="MaterialCommunityIcons"
              size={width >= 500 ? width * 0.025 : width * 0.05}
            />
          </View>
        </TouchableNativeFeedback>
      ) : null}

      {credsAvailable && checkAvailability ? (
        <Icon
          iconName="checkcircle"
          iconLibrary="AntDesign"
          color="#24c45c"
          className="absolute right-4 my-auto"
        />
      ) : (
        credsAvailable === false &&
        checkAvailability && (
          <Icon
            iconName="closecircle"
            iconLibrary="AntDesign"
            color="#fc7474"
            className="absolute right-4 my-auto"
          />
        )
      )}
    </View>
  );
};

export default InputText;
