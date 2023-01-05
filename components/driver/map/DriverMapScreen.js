import { View, Text } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import SafeScreenView from '../../SafeScreenView';
import MapView, { Marker } from 'react-native-maps';
import { AppContext } from '../../../context/AppContext';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import calculateAngle from '../../../functions/calculateAngle';

const DriverMapScreen = ({ route }) => {
  const { userCurrentLocation, setUserCurrentLocation } =
    useContext(AppContext);
  const { userLocation: customerLocation } = route.params;
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBTPt_hWk7SIAZNeeo4h3PuPEGMynZ8nbs';
  const mapRef = useRef(null);

  const origin = {
    latitude: userCurrentLocation?.latitude,
    longitude: userCurrentLocation?.longitude,
  };
  
  const destination = {
    latitude: customerLocation.latitude,
    longitude: customerLocation.longitude,
  };

  const angle = calculateAngle(userCurrentLocation, customerLocation);

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
      // mapRef.current.fitToCoordinates(["origin"], {
      //   edgePadding: { top: 100, left: 100, bottom: 100, right: 100 },
      // });
      interval = setInterval(() => {
        getLocation();
      }, 4000);
    }
    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, [userCurrentLocation]);
  // console.log(userCurrentLocation);
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
          {origin ? (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              mode="DRIVING"
              onReady={(data) => console.log(data.distance, data.duration)}
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

export default DriverMapScreen;
