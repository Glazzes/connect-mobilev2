import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Keyboard,
} from 'react-native';

import {Formik} from 'formik';
import {LoginRequest} from '../../shared/types';
import useAuthenticationStore from '../../shared/store/AuthenticationStore';
import {Button, Title, TextInput} from 'react-native-paper';
import authService from '../../authentication/application/AuthService';
import {useNetInfo} from '@react-native-community/netinfo';
import {User} from '../../shared/persistence';

const LOGIN = require('./assets/login.png');

const LoginPage: React.FC = () => {
  const netInfo = useNetInfo();

  const store = useAuthenticationStore();
  const loginRequest: LoginRequest = {
    username: '',
    password: '',
    rememberMe: true,
    deviceInfo: {
      type: 'MOBILE_APP',
      appDetails: `connect ${Platform.OS} ${Platform.Version}`,
      deviceDetails: `${Platform.OS} ${
        // @ts-ignore
        Platform.OS == 'ios' ? Platform.osVersion : Platform.Version
      }`,
      // @ts-ignore
      ipAddress: '192.168.42.20',
    },
  };

  useEffect(() => {
    console.log(netInfo);
  });

  return (
    <KeyboardAvoidingView behavior={'position'}>
      <View>
        <Image source={LOGIN} style={styles.image} />
      </View>
      <View style={styles.contentWrapper}>
        <Title style={styles.title}>Welcome to Connect</Title>
        <Formik
          initialValues={{username: '', password: ''}}
          onSubmit={async (values, {setSubmitting}) => {
            Keyboard.dismiss();
            loginRequest.username = values.username;
            loginRequest.password = values.password;

            try {
              const {
                data: successResponse,
              } = await authService.perfomUserNamePasswordLogin(loginRequest);

              await authService.setAuthenticatedUserId(
                successResponse.authenticatedUser.id,
              );

              const authenticatedUser: User = await authService.authenticateUser(
                successResponse.authenticatedUser,
              );

              store.setAuthenticatedUser(authenticatedUser);
              store.authenticate();
            } catch (e) {
              console.log(e);
            } finally {
              setSubmitting(false);
            }
          }}>
          {({handleChange, isSubmitting, values, handleSubmit}) => (
            <View>
              <TextInput
                onChangeText={handleChange('username')}
                value={values.username}
                placeholder={'Username'}
                mode={'outlined'}
                underlineColor={'#00ACDD'}
              />
              <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder={'Password'}
                mode={'outlined'}
                passwordRules={'required:upper; required:lower;'}
              />
              <Button
                loading={isSubmitting}
                disabled={isSubmitting}
                onPress={handleSubmit}
                mode={'contained'}
                color={'#00ACDD'}
                style={styles.button}>
                Log me in
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  image: {
    width,
    height: height / 2,
  },
  contentWrapper: {
    padding: 10,
  },
  title: {
    color: '#FDFFFF',
    fontSize: 25,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
  },
});
