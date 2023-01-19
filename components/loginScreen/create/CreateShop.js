import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import CreateShopProgress from './shop/CreateShopProgress';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import SafeScreenView from '../../SafeScreenView';

// steps
import FirstStep from './shop/FirstStep';
import SecondStep from './shop/SecondStep';

const CreateShop = () => {
  const [progress, setProgress] = useState(2);
  const [credsAvailable, setCredsAvailable] = useState({});
  const [firstStepDetails, setFirstStepDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFirstStepSubmit = (val) => {
    setLoading(true);
    firebase
      .firestore()
      .collection('laundryProviders')
      .where('name', '==', val.name.trim())
      .limit(1)
      .get()
      .then((data) => {
        if (!data.empty) {
          ToastAndroid.show(
            'please select other shop name that is not taken',
            ToastAndroid.SHORT
          );
          setLoading(false);
          return setCredsAvailable({ name: false });
        }
        setCredsAvailable({
          name: true,
        });
      })
      .catch((err) => console.log(err, 'shop name'));

    firebase
      .firestore()
      .collection('admins')
      .where('email', '==', val.email.trim())
      .limit(1)
      .get()
      .then((data) => {
        if (!data.empty) {
          ToastAndroid.show(
            'please select other email that is not taken',
            ToastAndroid.SHORT
          );
          setLoading(false);
          return setCredsAvailable((lastState) => ({
            ...lastState,
            email: false,
          }));
        }
        setCredsAvailable((lastState) => ({
          ...lastState,
          email: true,
        }));
      })
      .catch((err) => console.log(err, 'shop name'));
    setFirstStepDetails(val);
    setLoading(false);
    if (credsAvailable.email && credsAvailable.name) setProgress(2);
  };

  return (
    <>
      {progress === 1 ? (
        <FirstStep
          loading={loading}
          credsAvailable={credsAvailable}
          firstStepDetails={firstStepDetails}
          setCredsAvailable={setCredsAvailable}
          handleFirstStepSubmit={handleFirstStepSubmit}
        />
      ) : progress === 2 ? (
        <View className="flex-1 justify-center p-2">
          <CreateShopProgress progress={progress} />
          <SecondStep />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateShop;
