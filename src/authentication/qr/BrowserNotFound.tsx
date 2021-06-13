import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {QrStackParamList} from '../../navigation/types/QrStackParamList';

const {width, height} = Dimensions.get('window');

type BrowserNotFound = {
  navigation: StackNavigationProp<QrStackParamList, 'BrowserNotFound'>;
};

const BrowserNotFound: React.FC<BrowserNotFound> = ({navigation}) => {
  const sendToQrScanner = () => {
    navigation.navigate('Scanner');
  };

  return (
    <View style={styles.rootContainer}>
      <Image
        source={require('../../assets/qr/browser-not-found.png')}
        style={styles.browser}
      />
      <View style={styles.content}>
        <Text style={styles.title}>We could not find this browser.</Text>
        <Text style={styles.info}>
          The browser you're looking for could not be found, probably the
          browser tab was closed or it did not exist in the first place.
        </Text>
        <Button color={'#142662'} mode={'contained'} onPress={sendToQrScanner}>
          Scan a new code
        </Button>
      </View>
    </View>
  );
};

export default BrowserNotFound;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  browser: {
    width,
    height: height / 2,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  title: {
    color: '#00e6b3',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    paddingBottom: 10,
  },
  info: {
    color: '#142662',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 30,
  },
});
