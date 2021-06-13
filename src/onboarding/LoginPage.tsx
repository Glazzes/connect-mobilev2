import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Title, TextInput} from 'react-native-paper';
import useStore from '../store/Store';
import {Formik} from 'formik';
import {LoginRequest} from '../types/LoginRequest';
import AuthenticationService from '../services/Authentication.service';

const {width, height} = Dimensions.get('screen');

const LoginPage: React.FC = () => {
  const authenticate: any = useStore(state => state.authenticate);
  const loginRequest: LoginRequest = {
    username: '',
    password: '',
    deviceInfo: {
      type: 'MOBILE',
      deviceName: 'Something',
      deviceOperatingSystem: Platform.OS,
      deviceVersion:
        Platform.OS === 'ios'
          ? // @ts-ignore
            Platform.osVersion
          : Platform.Version.toString(),
    },
  };

  return (
    <KeyboardAvoidingView behavior={'position'}>
      <View>
        <Image
          source={require('../assets/onboarding/robo-deer.png')}
          style={styles.robotDeer}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Title style={styles.title}>Welcome to Connect</Title>
        <Formik
          initialValues={{username: '', password: ''}}
          onSubmit={(values, {setSubmitting}) => {
            loginRequest.username = values.username;
            loginRequest.password = values.password;

            AuthenticationService.performUsernamePasswordLogin(
              loginRequest,
              () => {
                authenticate();
                setSubmitting(false);
              },
              () => {
                console.log('Too bad, it failed');
                setSubmitting(false);
              },
            );
          }}>
          {({handleChange, isSubmitting, values, handleSubmit}) => (
            <View>
              <TextInput
                onChangeText={handleChange('username')}
                value={values.username}
                placeholder={'Username'}
                mode={'outlined'}
                underlineColor={'#00E6B3'}
              />
              <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder={'Password'}
                mode={'outlined'}
              />
              <Button
                loading={isSubmitting}
                disabled={isSubmitting}
                onPress={handleSubmit}
                mode={'contained'}
                color={'#142664'}
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

const styles = StyleSheet.create({
  robotDeer: {
    width,
    height: height * 0.45,
  },
  contentWrapper: {
    padding: 15,
  },
  title: {
    color: '#00E6B3',
    fontSize: 25,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
  },
});
