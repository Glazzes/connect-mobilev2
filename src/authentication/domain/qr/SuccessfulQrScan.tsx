import React from 'react';
import Constants from 'expo-constants';
import {Button, Subheading, Title} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {SSEAuthService} from '../../application';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import DeviceScanned from './DeviceScanned';
import {QrStackScreenParams} from '../navigation/QrStackScreenParams';

type SuccessfulQrScanProps = {
  navigation: StackNavigationProp<QrStackScreenParams, 'SuccessfulQrScan'>;
  route: RouteProp<QrStackScreenParams, 'SuccessfulQrScan'>;
};

const SUCCESS = require('./assets/BUTTerfly.png');

const SuccessfulQrScan: React.FC<SuccessfulQrScanProps> = ({
  navigation,
  route,
}) => {
  const sendQrLoginEvent = async () => {
    try {
      const browserId: string = route.params.browserId;
      await SSEAuthService.sendQrLoginEvent(browserId);
      navigation.navigate('SucessfulLogin');
    } catch (e) {
      console.log(e);
      navigation.navigate('BrowserNotFound');
    }
  };

  return (
    <View style={styles.root}>
      <View>
        <Image source={SUCCESS} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View>
          <Title style={styles.title}>We found your device!</Title>
          <Subheading style={styles.warning}>
            If this is not your device, please cancel.
          </Subheading>
        </View>
        <DeviceScanned />
        <View style={styles.buttonContainer}>
          <Button
            color={'#00ACDD'}
            mode={'contained'}
            onPress={sendQrLoginEvent}
            style={styles.button}>
            Log me in
          </Button>
          <Button color={'#FDFFFF'} mode={'text'} style={styles.button}>
            Cancel
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SuccessfulQrScan;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height / 2.2,
    marginTop: Constants.statusBarHeight,
    marginLeft: width * 0.05,
  },
  title: {
    color: '#FDFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  warning: {
    textAlign: 'center',
    fontSize: 13,
  },
  buttonContainer: {
    width: width * 0.6,
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    marginVertical: 5,
  },
});
