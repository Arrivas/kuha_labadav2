import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import SafeScreenView from '../SafeScreenView';
import getDimensions from '../../config/getDimensions';
import FormikField from '../forms/FormikField';
import AppFormField from '../forms/AppFormField';
import SubmitButton from '../forms/SubmitButton';
import GoogleSvg from './GoogleSvg';
import colors from '../../config/colors';
import ErrorMessage from '../forms/ErrorMessage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import ActivityIndicator from '../ActivityIndicator';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as Yup from 'yup';

function LoginScreen({ navigation }) {
  const [showPassword, onShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const { width } = getDimensions();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const handleSubmit = async (val) => {
    setLoading(true);
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(val.email.trim(), val.password.trim());
      setLoginError('');
      setLoading(false);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setLoading(false);
        return setLoginError('email is not registered');
      } else if (error.code === 'auth/wrong-password') {
        setLoading(false);
        return setLoginError('invalid email or password');
      }
      console.log(error.code);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '910338142085-5vq3qejpmvnoiahmaao0t598i3703j9g.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCred = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      firebase.auth().signInWithCredential(googleCred);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('cancelled');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('cancelled');
      } else {
        // some other error happened
        console.log('cancelled 4', error);
      }
    }
  };

  return (
    <>
      <ActivityIndicator isVisible={loading} />
      <SafeScreenView>
        <ScrollView keyboardShouldPersistTaps="never">
          <View
            style={{
              paddingHorizontal: width >= 500 ? width * 0.2 : width * 0.08,
              paddingTop: width * 0.08,
            }}
          >
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
            <Text
              className="self-center py-2 "
              style={{
                fontFamily: 'Alexandria-Regular',
                // fontSize: width >= 500 ? width * 0.02 : width * 0.025,
              }}
            >
              Welcome, login to your account
            </Text>

            <FormikField
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              <AppFormField
                wrapperClass="w-[99%]"
                name="email"
                iconName="email"
                placeholder="email"
              />

              <AppFormField
                wrapperClass="w-[99%]"
                name="password"
                iconName="lock"
                placeholder="password"
                isPassword={true}
                showPassword={showPassword}
                onShowPassword={onShowPassword}
              />
              <ErrorMessage error={loginError} />
              <SubmitButton
                loading={loading}
                textStyle={{
                  color: 'white',
                  fontSize: width >= 500 ? width * 0.025 : width * 0.035,
                }}
                textClass="font-bold"
                title="Login"
              />
            </FormikField>
            <View className="pt-3">
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <View className="self-start">
                  <Text
                    className="text-gray-400 py-1"
                    style={{
                      // fontSize: width >= 500 ? width * 0.018 : width * 0.032,
                      fontSize: 13,
                    }}
                  >
                    forgot password?
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('CreateAccount')}
              >
                <View className="self-start">
                  <Text
                    className="text-gray-400 text-xs py-1"
                    style={{
                      // fontSize: width >= 500 ? width * 0.018 : width * 0.032,
                      fontSize: 13,
                    }}
                  >
                    create account
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View
            className="border-b border-gray-200 w-[70%] self-center"
            style={{
              paddingVertical: width * 0.03,
            }}
          />
          <TouchableWithoutFeedback onPress={handleGoogleSignIn}>
            <View
              className="flex-row self-center justify-center items-center"
              style={{
                paddingVertical: width * 0.09,
              }}
            >
              <GoogleSvg />
              <Text
                className="ml-2 font-semibold"
                style={{
                  color: colors.primary,
                  fontSize: width >= 500 ? width * 0.025 : width * 0.035,
                }}
              >
                Sign In With Google
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeScreenView>
    </>
  );
}

export default LoginScreen;
