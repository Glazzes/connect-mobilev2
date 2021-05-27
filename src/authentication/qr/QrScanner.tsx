import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BarCodeScanningResult, Camera} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {QrLoginRequest} from '../../types/QrLoginRequest';
import useStore from '../../store/Store';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {QrAuthenticationRouteList} from '../../types/QrAuthenticationRouteList';
import AuthenticationService from '../../services/Authentication.service';
import {User} from '../../types/User';
import uuid from 'react-native-uuid';
import {QrCodeScanEvent} from '../../types/QrCodeScanEvent';
import {ActivityIndicator} from 'react-native-paper';

interface QrScannerProps {
  navigation: StackNavigationProp<QrAuthenticationRouteList>;
}

const QrScanner: React.FC<QrScannerProps> = ({navigation}) => {
  const [processingScan, setProcessingScan] = useState<boolean>(false);
  const authenticatedUser: User = useStore(state => state.user);

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
        mobileSignature: qrData.mobileSignature
          ? qrData.mobileSignature
          : 'Invalid Signature',
      };

      AuthenticationService.scanQrCode(
        qrData,
        qrData.webSignature,
        qrCodeScanEvent,
        () => {
          navigation.navigate('SuccessfulScan', {id: qrData.webSignature});
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.root}>
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
  scanner: StyleSheet.absoluteFillObject,
});
