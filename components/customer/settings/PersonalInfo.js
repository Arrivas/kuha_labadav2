import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import React, { useContext, useState } from 'react';
import SafeScreenView from '../../SafeScreenView';
import { AppContext } from '../../../context/AppContext';
import { horizontalScale } from '../../../config/metrics';
import FormikField from '../../forms/FormikField';
import AppFormField from '../../forms/AppFormField';
import SubmitButton from '../../forms/SubmitButton';
import * as ImagePicker from 'expo-image-picker';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';
import GenderSelect from './GenderSelect';
import * as Yup from 'yup';

const PersonalInfo = () => {
  const { user, setUser } = useContext(AppContext);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState('male');

  const initialValues = {
    name: user?.name || '',
    customerAddress: user?.customerAddress || '',
    mobileNumber: user?.mobileNumber || '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    customerAddress: Yup.string().required().label('address'),
    mobileNumber: Yup.string().required().label('mobile number'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    let imageUrl = await uploadImage().then((url) => url);
    let userCopy = { ...user };
    if (imageUrl) userCopy.imageUrl = imageUrl;
    userCopy.name = values.name;
    userCopy.gender = selectedGender;
    userCopy.customerAddress = values.customerAddress;
    userCopy.mobileNumber = values.mobileNumber;

    firebase
      .firestore()
      .collection('customers')
      .doc(userCopy.docId)
      .update(userCopy)
      .then(() => {
        ToastAndroid.show('updated successfully', ToastAndroid.SHORT);
        setUser(userCopy);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setLoading(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!user?.name || !image) return;
    const imageExtension = image.split('.')[image.split('.').length - 1];
    try {
      const ref = firebase
        .storage()
        .ref(
          `userImages/${user?.name}/${user?.name}_userProfile.${imageExtension}`
        );
      await ref.putFile(image);
      // url
      // console.log(
      //   `https://firebasestorage.googleapis.com/v0/b/labada-app.appspot.com/o/shopImages%2F${user?.name}%2F${user?.name}_shopImage.${imageExtension}?alt=media`
      // );
    } catch (error) {
      console.log(error);
    }
    return `https://firebasestorage.googleapis.com/v0/b/labada-app.appspot.com/o/userImages%2F${user?.name}%2F${user?.name}_userProfile.${imageExtension}?alt=media`;
  };

  return (
    <>
      <SafeScreenView>
        <View
          className="flex-1"
          style={{ paddingHorizontal: horizontalScale(20) }}
        >
          <View style={{ flex: 1 }} className="justify-center">
            <Text className="font-semibold">User Profile</Text>
            <View className="items-center">
              <Image
                resizeMode="contain"
                source={{
                  uri:
                    image ||
                    `${user?.imageUrl}&random=${Math.random()
                      .toString(36)
                      .substring(7)}
                      }`,
                  // &random=${Math.random()
                  //   .toString(36)
                  //   .substring(7)}
                }}
                className="rounded-full w-[120px] h-[120px]"
              />
              <TouchableNativeFeedback onPress={pickImage}>
                <View className="items-center justify-center p-2 px-3 bg-gray-200 rounded-full my-2">
                  <Text>select image</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <FormikField
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <ScrollView>
                <Text className="font-light">Name</Text>
                <AppFormField name="name" placeholder="name" />
                <GenderSelect
                  selectedGender={selectedGender}
                  setSelectedGender={setSelectedGender}
                />
                <Text className="font-light">Address</Text>
                <AppFormField name="customerAddress" placeholder="address" />
                <Text className="font-light">Mobile Number</Text>
                <AppFormField name="mobileNumber" placeholder="mobile number" />
                <SubmitButton
                  title="Save"
                  textClass="text-white"
                  containerStyle="self-end w-[30%] py-3 mb-2 mt-3"
                  loading={loading}
                  disabled={loading}
                />
              </ScrollView>
            </FormikField>
          </View>
        </View>
      </SafeScreenView>
    </>
  );
};

export default PersonalInfo;
