import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import getDimensions from '../../config/getDimensions';
import SafeScreenView from '../SafeScreenView';
import FormikField from '../forms/FormikField';
import AppFormField from '../forms/AppFormField';
import SubmitButton from '../forms/SubmitButton';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import * as Yup from 'yup';
import CustomerDriver from './create/CustomerDriver';
import CreateShop from './create/CreateShop';

function CreateAccount(props) {
  const [selectedUserType, setSelectedUserType] = useState({
    label: 'Customer',
    value: 'customer',
  });
  const [loading, setLoading] = useState(false);
  const { width } = getDimensions();

  return (
    <SafeScreenView>
      {selectedUserType.label === 'Customer' ? (
        <ScrollView>
          <CustomerDriver
            width={width}
            loading={loading}
            setLoading={setLoading}
            FormikField={FormikField}
            SubmitButton={SubmitButton}
            AppFormField={AppFormField}
            selectedUserType={selectedUserType}
            setSelectedUserType={setSelectedUserType}
          />
        </ScrollView>
      ) : (
        <CreateShop setSelectedUserType={setSelectedUserType} />
      )}
    </SafeScreenView>
  );
}

export default CreateAccount;
