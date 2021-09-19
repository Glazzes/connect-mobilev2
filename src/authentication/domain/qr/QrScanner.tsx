import React, {useState} from 'react';
import {Vibration} from 'react-native';
import uuid from 'react-native-uuid';
import useAuthenticationStore from '../../../shared/store/AuthenticationStore';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BarCodeScanningResult, Camera} from 'expo-camera';
import {Appbar, Snackbar} from 'react-native-paper';
import {QrLoginRequest, QrScanEvent} from '../types';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackScreenParams} from '../../../navigation/stack/StackScreenParams';
import {SSEAuthService, AuthService} from '../../application';
import {User} from '../../../shared/persistence';

type QrScannerProps = {
  navigation: StackNavigationProp<StackScreenParams, 'QrScanner'>;
};

const QrScanner: React.FC<QrScannerProps> = ({navigation}) => {
  const [displaySnackbar, setDisplaySnackbar] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const authenticatedUser: User = useAuthenticationStore(state => state.user);

  const goBack = (): void => {
    navigation.goBack();
  };

  const hideSnackbar = () => {
    setDisplaySnackbar(false);
  };

  const onQrCodeScanned = async (result: BarCodeScanningResult) => {
    try {
      const qrData: QrLoginRequest = JSON.parse(result.data);
      setScanning(true);

      // @ts-ignore
      const mobileId: string = uuid.v4();
      qrData.issuedFor = authenticatedUser.username;
      qrData.mobileId = mobileId;

      const qrCodeScanEvent: QrScanEvent = AuthService.getNewQrScanEvent(
        qrData.mobileId,
        authenticatedUser,
      );

      try {
        await SSEAuthService.sendOnQrCodeScannedEvent(
          qrData.browserId,
          qrData,
          qrCodeScanEvent,
        );
        onSuccessfulScan(qrData.browserId);
      } catch (e) {
        onFailedScan();
      }
    } catch (error) {
      setDisplaySnackbar(true);
    }
  };

  const onSuccessfulScan = (browserId: string) => {
    Vibration.vibrate(300);
    navigation.navigate('SuccessfulQrScan', {browserId});
  };

  const onFailedScan = () => {
    navigation.navigate('BrowserNotFound');
  };

  return (
    <View style={styles.root}>
      <View style={styles.appbarContainer}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color={'white'} onPress={goBack} />
          <Appbar.Content title={'Login with qr code'} />
        </Appbar.Header>
      </View>
      <Camera
        style={styles.scanner}
        barCodeScannerSettings={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={onQrCodeScanned}
      />
      <Snackbar
        visible={displaySnackbar}
        onDismiss={hideSnackbar}
        action={{
          label: 'close',
          onPress: hideSnackbar,
          labelStyle: {color: '#FDFFFF'},
        }}
        style={styles.snack}>
        Scan a valid connect qr code
      </Snackbar>
    </View>
  );
};

export default React.memo(QrScanner);

const {width} = Dimensions.get('window');
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
  snack: {
    backgroundColor: '#F04E23',
    color: 'white',
  },
});
