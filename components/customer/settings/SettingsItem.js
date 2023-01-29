import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from '../../Icon';

function SettingsItem({
  label,
  outerBg,
  iconColor,
  iconName,
  setIsDarkMode,
  isDarkMode,
  path,
  navigation,
  iconLibrary,
  logOut,
}) {
  return (
    <>
      {iconName === 'logout' && (
        <View className="border-b border-gray-100 my-5" />
      )}
      <TouchableNativeFeedback
        onPress={() => {
          if (iconName === 'logout') return logOut();
          navigation.navigate(path ? path : null);
        }}
      >
        <View
          className={`flex-row items-center ${iconName === 'list' && 'mt-5'}`}
        >
          <View
            className=" p-3 rounded-full"
            style={{
              backgroundColor: outerBg,
            }}
          >
            <Icon
              iconLibrary={iconLibrary}
              iconName={iconName}
              color={iconColor}
              size={24}
            />
          </View>
          <Text className="p-3 font-semibold flex-1 ml-8 text-lg ">
            {label}
          </Text>
          {iconName !== 'logout' ? (
            <View className="self-start p-2 items-center rounded-md bg-gray-100 my-auto">
              <Icon
                iconLibrary="MaterialIcons"
                iconName="chevron-right"
                size={25}
              />
            </View>
          ) : null}
        </View>
      </TouchableNativeFeedback>
    </>
  );
}

export default SettingsItem;
