import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import SafeScreenView from '../SafeScreenView';
import AvailableBookings from './home/AvailableBookings';
import SelectionTab from './home/SelectionTab';
import OngogingItems from './home/OngogingItems';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const DriverHomeScreen = () => {
  const { user, setUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('Available');
  const { ongoing, history } = user.service;

  useEffect(() => {
    let mounted = true;
    let unsubscribe;
    if (mounted) {
      unsubscribe = firebase
        .firestore()
        .collection('drivers')
        .doc(user?.docId)
        .onSnapshot((doc) => {
          setUser(doc.data());
        });
    }
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <>
      <SafeScreenView>
        <SelectionTab activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'Available' ? (
          <AvailableBookings />
        ) : activeTab === 'Ongoing' ? (
          <OngogingItems ongoingItems={ongoing} />
        ) : (
          <></>
        )}
      </SafeScreenView>
    </>
  );
};

export default DriverHomeScreen;
