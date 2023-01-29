import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, RefreshControl, ScrollView } from 'react-native';
import FindServices from './home/FindServices';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import { getPreciseDistance } from 'geolib';

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
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
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
            />
          </View>
          {/* find services */}
          <FindServices
            setSelectedService={setSelectedService}
            selectedService={selectedService}
          />
          {/* laundry services */}
          <LaundryServices
            navigation={navigation}
            laundryServices={laundryServices}
            selectedService={selectedService}
          />
        </View>
      </ScrollView>
    </SafeScreenView>
  );
};

export default CustomerHomeScreen;
