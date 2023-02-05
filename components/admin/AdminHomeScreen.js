import React, { useState, useContext, useEffect } from 'react';
import { RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import SafeScreenView from '../SafeScreenView';
import { AppContext } from '../../context/AppContext';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import SelectionTab from './home/SelectionTab';
import ActivityIndicator from '../ActivityIndicator';
import HistoryBookings from './home/HistoryBookings';
import NotVerifiedMessage from './settings/verfied/NotVerifiedMessage';

// booking tabs
import AvailableBookings from './home/AvailableBookings';
import OngoingBookings from './home/OngoingBookings';

const AdminHomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Available');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const { ongoing, history } = user?.pendingServices;
  const [now, setNow] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = () => {
    firebase
      .firestore()
      .collection('laundryProviders')
      .doc(user?.laundry_id)
      .get()
      .then((doc) => {
        const currentLaundryProv = doc.data();
        setUser(currentLaundryProv);
      })
      .catch((err) =>
        ToastAndroid.show('cannot retreive data, please try again later')
      );
  };

  return (
    <SafeScreenView>
      <ActivityIndicator isVisible={loading} />
      {!user?.isVerified ||
      user?.isVerified === 'waiting' ||
      user?.isVerified === 'declined' ? (
        <NotVerifiedMessage navigation={navigation} />
      ) : null}
      <SelectionTab setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'Available' ? (
        <AvailableBookings
          laundry_id={user?.laundry_id}
          user={user}
          now={now}
          refreshing={refreshing}
          handleRefresh={handleRefresh}
        />
      ) : activeTab === 'Ongoing' ? (
        <OngoingBookings
          ongoingItems={ongoing}
          setLoading={setLoading}
          now={now}
          refreshing={refreshing}
          handleRefresh={handleRefresh}
        />
      ) : (
        <HistoryBookings
          bookingHistory={history}
          now={now}
          refreshing={refreshing}
          handleRefresh={handleRefresh}
        />
      )}
    </SafeScreenView>
  );
};

export default AdminHomeScreen;
