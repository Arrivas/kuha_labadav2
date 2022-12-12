import React, { useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import getDimensions from '../../config/getDimensions';
import SafeScreenView from '../SafeScreenView';
import FormikField from '../forms/FormikField';
import AppFormField from '../forms/AppFormField';
import UserTypePicker from './UserTypePicker';
import SubmitButton from '../forms/SubmitButton';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import * as Yup from 'yup';

function CreateAccount(props) {
  const [selectedUserType, setSelectedUserType] = useState({
    label: 'Customer',
    value: 'customer',
  });
  const { width } = getDimensions();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .min(6, 'password is too short - should be 6 chars minimum.')
      .max(16, 'password is too long - should be 16 chars maximum.'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'passwords must match'
    ),
    phone: Yup.string()
      .matches(phoneRegExp, 'must be a valid phone number 09xxxxxxxxx')
      .min(11, 'too short')
      .max(11, 'too long')
      .required(),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (val) => {
    // check if customer exists
    setLoading(true);
    const user = [];
    const snapshot = await firebase
      .firestore()
      .collection(selectedUserType.value === 'driver' ? 'drivers' : 'customers')
      .where('name', '==', val.name)
      .get();
    snapshot.forEach((doc) => user.push(doc.data()));
    if (user.length !== 0) {
      setLoading(false);
      setNameErr('name is already taken');
    }
    setNameErr('');
    // proceed creating new customer
    const noImg = 'noImage.png';
    const newCustomer = {
      name: val.name,
      email: val.email.trim(),
      password: val.password.trim(),
      confirmPassword: val.confirmPassword.trim(),
      mobileNumber: val.phone,
      bookingHistory: [],
      confirmedBooking: [],
      notifications: [],
      customerAddress: '',
      gender: '',
      userType: selectedUserType.value,
      imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
        firebase.app().options.storageBucket
      }/o/${noImg}?alt=media`,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await firebase
      .auth()
      .createUserWithEmailAndPassword(val.email, val.password)
      .then((userInfo) => (newCustomer.userId = userInfo.user.uid))
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use')
          return setEmailErr('email is already in use');
        console.log(err);
      });
    setEmailErr('');
    // add user details to db
    await firebase
      .firestore()
      .collection(selectedUserType.value === 'driver' ? 'drivers' : 'customers')
      .add(newCustomer)
      .then((data) => {
        data.update({ docId: data.id });
        console.log(data.id);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  return (
    <SafeScreenView>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: width >= 500 ? width * 0.2 : width * 0.08,
            paddingTop: width <= 360 ? 80 : width * 0.08,
            paddingBottom: 20,
          }}
        >
          {width <= 360 ? null : (
            <Image
              className="self-center"
              source={require('../../assets/logo_1_blue.png')}
              style={{
                width: width <= 360 ? 140 : 180,
                height: width <= 360 ? 140 : 180,
                // width >= 500 ? width * 0.35 : width * 0.4
              }}
              resizeMode="contain"
            />
          )}
          <Text
            className=""
            style={{
              fontSize: width >= 500 ? width * 0.018 : width * 0.04,
              fontFamily: 'Alexandria-Regular',
            }}
          >
            Create an account
          </Text>

          {/* forms */}
          <FormikField
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="name"
              iconName="account"
              placeholder="name"
              customerError={nameErr}
            />
            <AppFormField
              name="email"
              iconName="email"
              placeholder="email"
              customerError={emailErr}
            />
            <AppFormField
              onShowPassword={setShowPassword}
              showPassword={showPassword}
              placeholder="password"
              isPassword={true}
              name="password"
              iconName="lock"
            />
            <AppFormField
              onShowPassword={setShowConfirmPass}
              showPassword={showConfirmPass}
              placeholder="confirm password"
              name="confirmPassword"
              isPassword={true}
              iconName="lock"
            />
            <AppFormField
              name="phone"
              iconName="phone"
              placeholder="phone number"
            />
            {/* picker */}
            <UserTypePicker
              selectedUserType={selectedUserType}
              setSelectedUserType={setSelectedUserType}
            />
            <SubmitButton
              textStyle={{
                color: 'white',
                fontSize: width >= 500 ? width * 0.025 : width * 0.035,
              }}
              textClass="font-bold"
              title="Register"
              loading={loading}
              disabled={loading}
            />
          </FormikField>
        </View>
      </ScrollView>
    </SafeScreenView>
  );
}

export default CreateAccount;
