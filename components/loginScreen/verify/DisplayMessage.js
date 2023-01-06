import { View, Text,TouchableNativeFeedback } from 'react-native'
import React from 'react'
import Icon from '../../Icon'

const DisplayMessage = ({setDisplayMessage}) => {
  return (
    <View className="flex-row max-w-[80%]">
    <View
      className="bg-green-100 p-3 my-2 flex-row items-center rounded-md justify-center "
      style={{
        flex: 5,
      }}
    >
      <Text className="max-w-[100%] text-center">
        verification link has been sent to your email. check
        your spam folder
      </Text>
    </View>
    <TouchableNativeFeedback
      onPress={() => setDisplayMessage(false)}
    >
      <View
        className="max-w-[10%] bg-green-100 mx-[2px] my-2 rounded-md items-center justify-center"
        style={{
          flex: 1,
        }}
      >
        <Icon iconLibrary="Feather" iconName="x" />
      </View>
    </TouchableNativeFeedback>
  </View>
  )
}

export default DisplayMessage