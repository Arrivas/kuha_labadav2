import { Text, View, TouchableNativeFeedback } from 'react-native';
import React, { useContext, useState } from 'react';
import SafeScreenView from '../SafeScreenView';
import AvailableBookings from './home/AvailableBookings';
import SelectionTab from './home/SelectionTab';
import OngogingItems from './home/OngogingItems';
import { AppContext } from '../../context/AppContext';

const DriverHomeScreen = () => {
  const { user } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('Available');
  const { ongoing, history } = user.driverDetails.service;

  return (
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
  );
};

export default DriverHomeScreen;
