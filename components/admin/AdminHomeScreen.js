import { View, Text, TouchableNativeFeedback } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import SafeScreenView from '../SafeScreenView';
import colors from '../../config/colors';
import { AppContext } from '../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import SelectionTab from './home/SelectionTab';

// booking tabs
import AvailableBookings from './home/AvailableBookings';
import OngoingBookings from './home/OngoingBookings';

const AdminHomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Available');
  const { user, setUser } = useContext(AppContext);
  const { ongoing } = user?.pendingServices;

  const getAdminInfo = async () => {
    let currentLaundryProv = {};

    await firebase
      .firestore()
      .collection('laundryProviders')
      .doc(user?.laundry_id)
      .onSnapshot((doc) => {
        if (!doc.exists) return;
        setUser(doc.data());
      });
    return currentLaundryProv;
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAdminInfo();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeScreenView>
      <SelectionTab setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'Available' ? (
        <AvailableBookings />
      ) : (
        <OngoingBookings ongoingItems={ongoing} />
      )}
    </SafeScreenView>
  );
};

export default AdminHomeScreen;
