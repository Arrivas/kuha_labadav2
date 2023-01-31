import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import '@react-native-firebase/firestore';
import SafeScreenView from '../../SafeScreenView';
import { AppContext } from '../../../context/AppContext';
import NotVerified from './verfied/NotVerified';
import ActivityIndicator1 from '../../ActivityIndicator';
import VerifyOnWait from './verfied/VerifyOnWait';

const Verification = () => {
  const { user, setUser } = useContext(AppContext);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (setImage) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!user?.name) return;
    const imageExtension1 = image1.split('.')[image1.split('.').length - 1];
    const imageExtension2 = image2.split('.')[image2.split('.').length - 1];
    const imageExtension3 = image3.split('.')[image3.split('.').length - 1];

    let returnUrls = [];
    setLoading(true);
    try {
      const images = [
        {
          uri: image1,
          name: `${user?.name}_userCredential1.${imageExtension1}`,
        },
        {
          uri: image2,
          name: `${user?.name}_userCredential2.${imageExtension2}`,
        },
        {
          uri: image3,
          name: `${user?.name}_userCredential3.${imageExtension3}`,
        },
      ];

      const promises = images.map(async (image) => {
        // const response = await fetch(image.uri);
        // const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref()
          .child(`shopImages/${user?.name}/${image.name}`);
        await ref.putFile(image.uri);
        return await ref.getDownloadURL();
      });

      const urls = await Promise.all(promises);
      returnUrls = urls;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
    return returnUrls;
  };

  const handleSubmit = async () => {
    if (!image1 || !image2 || !image3) return;
    const urls = await uploadImage().then((res) => res);
    setLoading(true);
    const toSubmit = {
      from: 'admin',
      credUrls: urls,
      adminDocId: user.laundry_id,
      createdAt: new Date().toISOString(),
      adminName: user.name,
    };
    console.log(toSubmit);
    firebase
      .firestore()
      .collection('higherAdmin')
      .doc('zkZjboPA8AUGHrU4Cpfl')
      .get()
      .then((doc) => {
        if (!doc.exists) {
          setLoading(false);
          return console.log('cannot get higher admin');
        }
        const currentHigherAdmin = doc.data();
        const index = currentHigherAdmin.requests?.findIndex(
          (item) => item.docId === user.docId
        );
        if (index >= 0) return;
        currentHigherAdmin.requests.push(toSubmit);
        // update
        firebase
          .firestore()
          .collection('higherAdmin')
          .doc('zkZjboPA8AUGHrU4Cpfl')
          .update(currentHigherAdmin)
          .then(() => {
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setLoading(true);
    const userCopy = { ...user };
    userCopy.isVerified = 'waiting';
    userCopy.submittedCredentials = toSubmit;
    setUser(userCopy);
    firebase
      .firestore()
      .collection('laundryProviders')
      .doc(user?.laundry_id)
      .update(userCopy);
    setLoading(false);
  };

  return (
    <SafeScreenView>
      <ActivityIndicator1 isVisible={loading} />
      <View className="flex-1">
        {user?.isVerified === 'declined' || !user?.isVerified ? (
          <NotVerified
            image1={image1}
            image2={image2}
            image3={image3}
            setImage1={setImage1}
            setImage2={setImage2}
            setImage3={setImage3}
            pickImage={pickImage}
            handleSubmit={handleSubmit}
          />
        ) : (
          <VerifyOnWait />
        )}
      </View>
    </SafeScreenView>
  );
};

export default Verification;
