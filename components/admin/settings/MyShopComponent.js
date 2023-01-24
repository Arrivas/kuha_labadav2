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
import SelectTime from '../../forms/SelectTime';
import ErrorMessage from '../../forms/ErrorMessage';
import SubmitButton from '../../forms/SubmitButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import ServicesOffered from './shop/ServicesOffered';
import ShopDescription from './shop/ShopDescription';
import TimeScheduling from './shop/TimeScheduling';
import Fabcons from './shop/Fabcons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

const MyShopComponent = () => {
  const { user, setUser } = useContext(AppContext);
  const [timeMode, setTimeMode] = useState('');
  const [openHours, setOpenHours] = useState(user?.openHours.from || '');
  const [closeHours, setCloseHours] = useState(user?.openHours.to || '');
  const [openCloseErr, setOpenCloseErr] = useState('');
  const [selectimeVisible, setSelectTimeVisible] = useState(false);
  const [showOptional, setShowOptional] = useState(
    user?.deliveredByItems[2]?.label ? true : false
  );
  const [fabconEnabled, setFabconEnabled] = useState(
    user?.fabconEnabled || false
  );
  const [fabconText, setFabconText] = useState('');
  const [fabcons, setFabcons] = useState(user?.fabcons || []);
  const [fabconErr, setFabconErr] = useState('');
  const [fabconPrice, setFabconPrice] = useState();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    max: user?.pendingServices?.max || '',
    latitude: user?.geometryLocation?.lat || '',
    longitude: user?.geometryLocation?.lng || '',
    vicinity: user?.vicinity || '',
    rate: user?.pricing?.rate || '',
    minPerKilo: user?.pricing?.minPerKilo || '',
    description: user?.description || '',
    deliveredByItems1: user?.deliveredByItems[0].label || 'Today',
    deliveredByItems2: user?.deliveredByItems[1].label || 'Tomorow',
    deliveredByItems3: user?.deliveredByItems[2]?.label || '',
    servicesOffered: user?.servicesOffered || [],
    fabcons: user?.fabcons || [],
  };

  const handleSubmit = (values) => {
    setLoading(true);
    let userCopy = { ...user };
    userCopy.vicinity = values.vicinity;
    userCopy.pendingServices.max = values.max;
    userCopy.openHours = { from: openHours, to: closeHours };
    userCopy.servicesOffered = values.servicesOffered;
    userCopy.pricing = { minPerKilo: values.minPerKilo, rate: values.rate };
    userCopy.description = values.description;
    userCopy.deliveredByItems = [
      {
        label: values.deliveredByItems1,
      },
      {
        label: values.deliveredByItems2,
      },
    ];
    userCopy.imageUrl = image || user?.imageUrl;
    userCopy.fabcons = fabcons;
    userCopy.fabconEnabled = fabconEnabled;

    if (!openHours || !closeHours) {
      setLoading(false);
      return setOpenCloseErr('fields must not be empty');
    }
    setOpenCloseErr('');

    if (showOptional)
      userCopy.deliveredByItems.push({
        label: values.deliveredByItems3,
      });
    else {
      if (userCopy.deliveredByItems.length === 2) {
      } else {
        userCopy.deliveredByItems.pop();
      }
    }
    if (values.fabcons.length === 0 && fabconEnabled) {
      setLoading(false);
      return setFabconErr('add at least one');
    }
    if (!fabconEnabled) {
      setFabcons([]);
      delete userCopy.fabcons;
    }
    setFabconErr('');

    // console.log(userCopy.fabcons);
    firebase
      .firestore()
      .collection('laundryProviders')
      .doc(user?.laundry_id)
      .set(userCopy)
      .then(() => {
        ToastAndroid.show('shop updated successfully', ToastAndroid.SHORT);
        setUser(userCopy);
        setLoading(false);
      })
      .catch((err) => {
        ToastAndroid.show(
          'update failed, something went wrong',
          ToastAndroid.SHORT
        );
        setLoading(false);
      });
    uploadImage();
    setLoading(false);
  };

  const setDate = (e, date) => {
    if (e.type === 'dismissed') return;

    if (typeof timeMode === 'number') {
      const availableTimeCopy = [...availablePickupTimes];
      availableTimeCopy.forEach((item, index) => {
        if (index === timeMode) {
          item.time = Moment(date).format('LT');
        }
      });
      return setSelectTimeVisible(!selectimeVisible);
    }

    if (timeMode === 'opening') {
      setOpenHours(Moment(date).format('LT'));
    } else setCloseHours(Moment(date).format('LT'));
    console.log();
    setSelectTimeVisible(!selectimeVisible);
  };

  const handleSelectTimeVisible = (mode) => {
    setTimeMode(mode);
    setOpenCloseErr('');
    setSelectTimeVisible(!selectimeVisible);
  };

  const handleSetService = (serviceName) => {
    const userCopy = { ...user };
    userCopy?.servicesOffered.filter((item) => {
      if (item.value === serviceName) {
        item.offering = !item.offering;
      }
    });
    setUser(userCopy);
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
    if (!user?.name || !image)
      return console.log('cannot upload image or no image to upload');
    const imageExtension = image.split('.')[image.split('.').length - 1];
    try {
      const ref = firebase
        .storage()
        .ref(
          `shopImages/${user?.name}/${user?.name}_shopImage.${imageExtension}`
        );
      await ref.putFile(image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeScreenView>
        <View
          className="flex-1"
          style={{ paddingHorizontal: horizontalScale(20) }}
        >
          <View style={{ flex: 1 }} className="justify-center">
            <Text className="font-semibold">Shop Logo</Text>
            <View className="items-center">
              <Image
                resizeMode="contain"
                source={{ uri: image || user?.imageUrl }}
                className="rounded-full w-[120px] h-[120px]"
              />
              <TouchableNativeFeedback onPress={pickImage}>
                <View className="items-center justify-center p-2">
                  <Text>select image</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <FormikField initialValues={initialValues} onSubmit={handleSubmit}>
              <ScrollView>
                {/* shop description */}
                <ShopDescription AppFormField={AppFormField} />

                {/* scheduling */}
                <TimeScheduling
                  openHours={openHours}
                  closeHours={closeHours}
                  SelectTime={SelectTime}
                  showOptional={showOptional}
                  setShowOptional={setShowOptional}
                  openCloseErr={openCloseErr}
                  ErrorMessage={ErrorMessage}
                  AppFormField={AppFormField}
                  handleSelectTimeVisible={handleSelectTimeVisible}
                />
                {/* services */}
                <Text className="my-12 text-center font-bold text-xl text-gray-200">
                  Services
                </Text>
                <ServicesOffered handleSetService={handleSetService} />
                {/* fabcons */}
                <Fabcons
                  fabconEnabled={fabconEnabled}
                  fabconPrice={fabconPrice}
                  fabconText={fabconText}
                  fabcons={fabcons}
                  setFabconEnabled={setFabconEnabled}
                  setFabconPrice={setFabconPrice}
                  setFabconText={setFabconText}
                  setFabcons={setFabcons}
                  fabconErr={fabconErr}
                />

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
      {selectimeVisible && (
        <DateTimePicker
          is24Hour={false}
          onChange={setDate}
          textColor="#000"
          mode="time"
          value={new Date()}
        />
      )}
    </>
  );
};

export default MyShopComponent;
