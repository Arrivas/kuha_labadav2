import React, { useState, useContext, useEffect } from 'react';
import SafeScreenView from '../SafeScreenView';
import { AppContext } from '../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import SelectionTab from './home/SelectionTab';
import ActivityIndicator from '../ActivityIndicator';

// booking tabs
import AvailableBookings from './home/AvailableBookings';
import OngoingBookings from './home/OngoingBookings';

const AdminHomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Available');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const { ongoing } = user?.pendingServices;

  useEffect(() => {
    let mounted = true;
    let unsubscribe;
    if (mounted) {
      unsubscribe = firebase
        .firestore()
        .collection('laundryProviders')
        .doc(user?.laundry_id)
        .onSnapshot((doc) => {
          if (!doc.exists) return;
          setUser(doc.data());
        });
    }
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <SafeScreenView>
      <ActivityIndicator isVisible={loading} />
      <SelectionTab setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'Available' ? (
        <AvailableBookings laundry_id={user?.laundry_id} user={user} />
      ) : (
        <OngoingBookings ongoingItems={ongoing} setLoading={setLoading} />
      )}
    </SafeScreenView>
  );
};

export default AdminHomeScreen;
