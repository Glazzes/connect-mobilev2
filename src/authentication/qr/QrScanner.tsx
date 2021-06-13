import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BarCodeScanningResult, Camera} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {QrLoginRequest} from '../../types/QrLoginRequest';
import useStore from '../../store/Store';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import AuthenticationService from '../../services/Authentication.service';
import {User} from '../../types/User';
import uuid from 'react-native-uuid';
import {QrCodeScanEvent} from '../../types/QrCodeScanEvent';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import {QrStackParamList} from '../../navigation/types/QrStackParamList';

const {width} = Dimensions.get('window');

interface QrScannerProps {
  navigation: StackNavigationProp<QrStackParamList, 'Scanner'>;
}

const QrScanner: React.FC<QrScannerProps> = ({navigation}) => {
  const [processingScan, setProcessingScan] = useState<boolean>(false);
  const authenticatedUser: User = useStore(state => state.user);

  const goBack = (): void => {
    navigation.goBack();
  };

  const onQrCodeScanned = (result: BarCodeScanningResult): void => {
    try {
      const qrData: QrLoginRequest = JSON.parse(result.data);
      setProcessingScan(true);

      // @ts-ignore
      const mobileSignature: string = uuid.v4();

      qrData.issuedFor = authenticatedUser.username;
      qrData.mobileSignature = mobileSignature;

      const qrCodeScanEvent: QrCodeScanEvent = {
        username: authenticatedUser.username,
        nickname: authenticatedUser.nickname,
        profilePicture: authenticatedUser.profilePicture,
        mobileSignature: qrData.mobileSignature ?? 'Invalid signature',
      };

      AuthenticationService.scanQrCode(
        qrData,
        qrData.webSignature,
        qrCodeScanEvent,
        () => {
          navigation.navigate('SuccessfulScan', {
            browserId: qrData.webSignature,
          });
        },
      );
    } catch (error) {
      navigation.navigate('BrowserNotFound');
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.appbarContainer}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color={'white'} onPress={goBack} />
          <Appbar.Content title={'Login with qr code'} />
        </Appbar.Header>
      </View>
      {processingScan ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <Camera
          style={styles.scanner}
          barCodeScannerSettings={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeScanned={onQrCodeScanned}
        />
      )}
    </View>
  );
};

export default React.memo(QrScanner);

const styles = StyleSheet.create({
  root: {flex: 1},
  appbarContainer: {
    position: 'absolute',
    zIndex: 200,
  },
  appbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    width,
  },
  scanner: StyleSheet.absoluteFillObject,
});
