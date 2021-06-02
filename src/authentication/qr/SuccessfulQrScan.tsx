import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import AuthenticationService from '../../services/Authentication.service';
import {QrStackParamList} from '../../navigation/types/QrStackParamList';

const {width, height} = Dimensions.get('screen');

interface SuccessfulQrScanProps {
  navigation: StackNavigationProp<QrStackParamList>;
  route: RouteProp<QrStackParamList, 'SuccessfulScan'>;
}

const SuccessfulQrScan: React.FC<SuccessfulQrScanProps> = ({
  navigation,
  route,
}) => {
  const authorizeQrLogin = () => {
    const browserId: string = route.params.browserId;
    AuthenticationService.sendQrLoginSSE(
      browserId,
      () => {
        navigation.navigate('SuccessfulLogin');
      },
      () => console.log('Error while sending qr login'),
    );
  };

  return (
    <View style={styles.root}>
      <View>
        <Image
          source={require('../../assets/qr/keys.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.warning}>
            Only scan QR codes in your own web browser, don't scan a QR code
            sent by any other person your account may be in danger.
          </Text>
        </View>
        <View>
          <Button
            color={'#142664'}
            mode={'contained'}
            style={{marginBottom: 15}}
            onPress={authorizeQrLogin}>
            Log me in
          </Button>
          <Button color={'#142664'} mode={'text'}>
            Cancel
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SuccessfulQrScan;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    width,
    height: height * 0.5,
  },
  content: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-around',
  },
  warning: {
    color: '#FF2E93',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
});
