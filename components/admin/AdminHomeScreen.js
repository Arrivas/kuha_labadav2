import React, { useState, useContext, useEffect } from 'react';
import SafeScreenView from '../SafeScreenView';
import { AppContext } from '../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import SelectionTab from './home/SelectionTab';
import ActivityIndicator from '../ActivityIndicator';
import HistoryBookings from './home/HistoryBookings';

// booking tabs
import AvailableBookings from './home/AvailableBookings';
import OngoingBookings from './home/OngoingBookings';

const AdminHomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Available');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const { ongoing, history } = user?.pendingServices;
  const [now, setNow] = useState(new Date());

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
        <AvailableBookings
          laundry_id={user?.laundry_id}
          user={user}
          now={now}
        />
      ) : activeTab === 'Ongoing' ? (
        <OngoingBookings
          ongoingItems={ongoing}
          setLoading={setLoading}
          now={now}
        />
      ) : (
        <HistoryBookings bookingHistory={history} now={now} />
      )}
    </SafeScreenView>
  );
};

export default AdminHomeScreen;
