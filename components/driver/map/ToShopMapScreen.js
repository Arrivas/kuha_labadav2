import { View, Text } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import SafeScreenView from '../../SafeScreenView';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { AppContext } from '../../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import calculateAngle from '../../../functions/calculateAngle';

const ToShopMapScreen = ({ route }) => {
  const { userCurrentLocation, setUserCurrentLocation } =
    useContext(AppContext);
  const [shopGeoLocation, setShopGeoLocation] = useState('');
  const { laundry_id } = route.params;

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBTPt_hWk7SIAZNeeo4h3PuPEGMynZ8nbs';
  const mapRef = useRef(null);

  const fetchLaundryShopLocation = async () => {
    await firebase
      .firestore()
      .collection('laundryProviders')
      .doc(laundry_id)
      .get()
      .then((doc) => {
        const currentLaundryProv = doc.data();
        setShopGeoLocation(currentLaundryProv.geometryLocation);
      })
      .catch((err) => console.log(err));
  };

  const angle = calculateAngle(userCurrentLocation, shopGeoLocation);

  const origin = {
    latitude: userCurrentLocation?.latitude,
    longitude: userCurrentLocation?.longitude,
  };

  const destination = {
    latitude: shopGeoLocation?.lat,
    longitude: shopGeoLocation?.lng,
  };

  const getLocation = async () => {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    // if (!latitude) return console.log("cannot get location");
    setUserCurrentLocation({ longitude, latitude });
  };

  useEffect(() => {
    let mounted = true;
    let interval;
    if (mounted) {
      fetchLaundryShopLocation();
      interval = setInterval(() => {
        getLocation();
      }, 4000);
    }

    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, [userCurrentLocation]);

  return (
    <SafeScreenView>
      <View className="flex-1">
        <MapView
          ref={mapRef}
          style={{
            flex: 1,
          }}
          initialRegion={{
            latitude: userCurrentLocation?.latitude,
            longitude: userCurrentLocation?.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          followsUserLocation
          loadingEnabled
          toolbarEnabled={false}
        >
          {shopGeoLocation?.lat ? (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              mode="DRIVING"
              onReady={(data) => {
                // console.log(data.distance, data.duration)
              }}
              onError={(err) => console.log('error in directions', err)}
            />
          ) : null}
          {/* driver marker */}
          <Marker.Animated
            identifier="origin"
            icon={require('../../../assets/driverMarker.png')}
            coordinate={{
              latitude: userCurrentLocation?.latitude,
              longitude: userCurrentLocation?.longitude,
            }}
            rotation={angle}
          />
        </MapView>
      </View>
    </SafeScreenView>
  );
};

export default ToShopMapScreen;
