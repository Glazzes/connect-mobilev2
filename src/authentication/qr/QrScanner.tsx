import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BarCodeScanningResult, Camera} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';

type DeviceInfo = {
  type: 'PC' | 'MOBILE';
  deviceName: string;
  deviceOperatingSystem: string;
  deviceVersion: string;
};

interface QrCodeAuthenticationObjet {
  issuedFor: string;
  mobileSignature: string;
  webSignature: string;
  deviceInfo: DeviceInfo;
}

const styles = StyleSheet.create({
  root: {flex: 1},
  scanner: StyleSheet.absoluteFillObject,
});

const QrScanner: React.FC = () => {
  const onQrCodeScanned = (result: BarCodeScanningResult): void => {
    try {
      const qrData: QrCodeAuthenticationObjet = JSON.parse(result.data);
      qrData.issuedFor = 'some cool id';
      qrData.mobileSignature = 'some random mobile signature';
      console.log(qrData);
    } catch (error) {
      console.log('An error ocurred while parsing the data');
    }
  };

  return (
    <View style={styles.root}>
      <Camera
        style={styles.scanner}
        barCodeScannerSettings={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={onQrCodeScanned}
      />
    </View>
  );
};

export default React.memo(QrScanner);
