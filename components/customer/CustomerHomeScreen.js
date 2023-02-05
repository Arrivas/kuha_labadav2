import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
  TouchableNativeFeedback,
} from 'react-native';
import FindServices from './home/FindServices';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import { getPreciseDistance } from 'geolib';
import Icon from '../Icon';

// components
import SafeScreenView from '../SafeScreenView';
import LaundryServices from './home/LaundryServices';
import { AppContext } from '../../context/AppContext';
import { moderateScale } from '../../config/metrics';

const CustomerHomeScreen = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState('');
  const [laundryServices, setLaundryServices] = useState([]);
  const { user, userCurrentLocation } = useContext(AppContext);
  const [now, setNow] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [toggleAll, setToggleAll] = useState(false);

  const fetchLaundryServices = async () => {
    const getNearbyGeo = [];
    await firebase
      .firestore()
      .collection('laundryProviders')
      .get()
      .then((data) => {
        data.forEach((doc) => {
          if (!doc.exists) return;
          const { lat, lng } = doc.data().geometryLocation;
          const dis = getPreciseDistance(
            {
              latitude: userCurrentLocation.latitude,
              longitude: userCurrentLocation.longitude,
            },
            {
              latitude: lat,
              longitude: lng,
            }
          );
          doc.data().distance = { distanceKM: dis / 1000 };
          getNearbyGeo.push(doc.data());
        });
      })
      .catch((error) => console.log(error));
    return (
      getNearbyGeo.sort((a, b) => (a.distanceKM > b.distanceKM ? 1 : -1)) || []
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const getNearbyGeo = [];
    await firebase
      .firestore()
      .collection('laundryProviders')
      .get()
      .then((data) => {
        data.forEach((doc) => {
          if (!doc.exists) return;
          const { lat, lng } = doc.data().geometryLocation;
          const dis = getPreciseDistance(
            {
              latitude: userCurrentLocation.latitude,
              longitude: userCurrentLocation.longitude,
            },
            {
              latitude: lat,
              longitude: lng,
            }
          );
          doc.data().distance = { distanceKM: dis / 1000 };
          getNearbyGeo.push(doc.data());
        });
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
        console.log(error);
      });
    setLaundryServices(
      getNearbyGeo.sort((a, b) => (a.distanceKM > b.distanceKM ? 1 : -1)) || []
    );
    setRefreshing(false);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchLaundryServices().then((data) => {
        setLaundryServices(data);
      });
    }
    () => {
      mounted = false;
    };
  }, [userCurrentLocation]);

  return (
    <SafeScreenView enablePadding={true}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 10,
            flex: 1,
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text
              style={{
                // fontSize: width * 0.05,
                // fontSize: 30,
                fontSize: moderateScale(30),
                fontFamily: 'Alexandria-SemiBold',
              }}
              className="tracking-widest"
            >
              Discover
            </Text>
            {/* profile */}
            <Image
              className="rounded-full"
              source={{
                uri: `${user?.imageUrl}&time=${now}`,
              }}
              style={{
                // height: width * 0.09,
                // width: width * 0.09,
                height: 42,
                width: 42,
              }}
              resizeMode="contain"
            />
          </View>
          {/* find services */}
          <FindServices
            setSelectedService={setSelectedService}
            selectedService={selectedService}
          />
          {/* search */}
          <View className="flex-row pr-10 items-center">
            <View className="mt-3 mb-1 w-full justify-center">
              <TextInput
                value={searchText}
                className="text-black bg-gray-100 px-4 pr-8 py-3 rounded-md w-full"
                placeholder="search"
                onChangeText={(text) => setSearchText(text)}
              />
              {searchText === '' ? (
                <Icon
                  iconLibrary="Feather"
                  iconName="search"
                  className="absolute right-4"
                />
              ) : (
                <TouchableNativeFeedback onPress={() => setSearchText('')}>
                  <View className="absolute right-2 p-2">
                    <Icon iconLibrary="Feather" iconName="x" />
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
            <TouchableNativeFeedback onPress={() => setToggleAll(!toggleAll)}>
              <View className="p-2">
                {toggleAll ? (
                  <Icon
                    iconLibrary="MaterialIcons"
                    iconName="table-rows"
                    size={30}
                  />
                ) : (
                  <Icon
                    iconLibrary="MaterialIcons"
                    iconName="view-column"
                    size={30}
                  />
                )}
              </View>
            </TouchableNativeFeedback>
          </View>
          {/* laundry services */}
          {toggleAll === false && !searchText.trim() ? (
            <LaundryServices
              navigation={navigation}
              laundryServices={laundryServices}
              selectedService={selectedService}
              searchText={searchText}
              toggleAll={toggleAll}
            />
          ) : (
            <LaundryServices
              navigation={navigation}
              laundryServices={laundryServices}
              selectedService={selectedService}
              searchText={searchText}
              type="second"
              toggleAll={toggleAll}
            />
          )}
        </View>
      </ScrollView>
    </SafeScreenView>
  );
};

export default CustomerHomeScreen;
