import React from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from '../../Icon';
import colors from '../../../config/colors';

const FindServices = ({ selectedService, setSelectedService }) => {
  const findServiceItems = [
    {
      id: 1,
      label: 'Dry Cleaning',
      value: 'dry-cleaning',
      iconName: 'dry-cleaning',
      iconLibrary: 'MaterialIcons',
    },
    {
      id: 2,
      label: 'Wash-Dry-Fold',
      value: 'wash-dry-fold',
      iconName: 'local-laundry-service',
      iconLibrary: 'MaterialIcons',
    },
    {
      id: 3,
      label: 'Comforter/Blankets',
      value: 'comforter/blankets',
      iconName: 'ios-layers',
      iconLibrary: 'IonIcons',
    },
    {
      id: 4,
      label: 'Ironing',
      value: 'ironing',
      iconName: 'iron-outline',
      iconLibrary: 'MaterialCommunityIcons',
    },
  ];

  return (
    <>
      <View className="pt-4">
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {findServiceItems.map((item) => (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() =>
                setSelectedService(
                  item.value === selectedService ? !selectedService : item.value
                )
              }
            >
              <View
                className={`mr-2 p-2 my-1 ml-1 w-[150px] items-center flex-row rounded-md overflow-hidden`}
                style={{
                  borderWidth: 1,
                  borderColor:
                    item.value === selectedService ? '#75a1e6' : 'transparent',
                  backgroundColor: 'white',
                  shadowColor: 'black',
                  shadowOpacity: 1,
                  elevation: 2,
                }}
              >
                {item.value === selectedService ? (
                  <>
                    <View
                      className="h-2 w-[80px] absolute bottom-0 right-0 self-center rounded-full"
                      style={{
                        backgroundColor: colors.primary,
                        opacity: 0.5,
                      }}
                    />
                    <View
                      className="h-2 w-[80px] absolute top-0 left-0 self-center rounded-full"
                      style={{
                        backgroundColor: colors.primary,
                        opacity: 0.5,
                      }}
                    />
                  </>
                ) : null}

                <Icon
                  iconLibrary={item.iconLibrary}
                  iconName={item.iconName}
                  className="z-50"
                  // color={item.value === selectedService ? 'white' : 'black'}
                  size={25}
                />
                <View>
                  <Text
                    className="text-start tracking-wide ml-2"
                    style={{
                      fontFamily: 'Alexandria-SemiBold',
                      fontSize: 13,
                      // color: item.value === selectedService ? 'white' : 'black',
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default FindServices;
