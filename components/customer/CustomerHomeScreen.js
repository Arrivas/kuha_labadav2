import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import FindServices from './home/FindServices';
import getDimensions from '../../config/getDimensions';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

// components
import SafeScreenView from '../SafeScreenView';
import LaundryServices from './home/LaundryServices';
import { AppContext } from '../../context/AppContext';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../config/metrics';

const CustomerHomeScreen = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState('all');
  const [laundryServices, setLaundryServices] = useState(null);
  const { user } = useContext(AppContext);
  const { width } = getDimensions();

  const fetchLaundryServices = async () => {
    const fetchedLaundryServices = [];
    // console.log('yes');
    await firebase
      .firestore()
      .collection('laundryProviders')
      .get()
      .then((data) => {
        data.forEach((doc) => {
          fetchedLaundryServices.push(doc.data());
        });
      })
      .catch((error) => console.log(error));
    return fetchedLaundryServices;
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchLaundryServices().then((data) => setLaundryServices(data));
    }
    () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeScreenView>
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
            source={{ uri: user?.imageUrl }}
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
          laundryServices={laundryServices}
          navigation={navigation}
        />
      </View>
    </SafeScreenView>
  );
};

export default CustomerHomeScreen;
