import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Button, Subheading, Title} from 'react-native-paper';
import {StackScreenParams} from '../../../navigation/stack/StackScreenParams';
import Constants from 'expo-constants';

type QrWarningProps = {
  navigation: StackNavigationProp<StackScreenParams, 'QrWarning'>;
};

const WARNING = require('./assets/warning.png');

const QrWarning: React.FC<QrWarningProps> = ({navigation}) => {
  const [buttonEnabled, setButtonEnabled] = useState<boolean>();

  const goToScanner = () => {
    setButtonEnabled(false);
    navigation.navigate('QrWarning');
  };

  const goBack = () => {
    setButtonEnabled(false);
    if (navigation.canGoBack()) {
      navigation.goBack();
      setButtonEnabled(true);
    }
  };

  return (
    <View style={styles.root}>
      <Image source={WARNING} style={styles.image} />
      <Title style={styles.title}>Be cautious!</Title>
      <Subheading style={styles.info}>
        Only scan qr codes on your devices, do not scan codes sent by other
        users or your account may be in danger.
      </Subheading>
      <View style={styles.buttonContainer}>
        <Button
          mode={'contained'}
          color={'#00ACDD'}
          onPress={goToScanner}
          disabled={buttonEnabled}
          style={styles.button}>
          Scan code
        </Button>
        <Button
          mode={'text'}
          color={'#FDFFFF'}
          onPress={goBack}
          disabled={buttonEnabled}
          style={styles.button}>
          Go back
        </Button>
      </View>
    </View>
  );
};

export default QrWarning;

const {width: IMAGE_WIDTH, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: IMAGE_WIDTH,
    height: height / 2,
    marginTop: Constants.statusBarHeight,
    marginBottom: 10,
  },
  title: {
    color: '#FDFFFF',
    textAlign: 'center',
  },
  info: {
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingVertical: 10,
    width: IMAGE_WIDTH * 0.6,
    alignSelf: 'center',
  },
  button: {
    marginVertical: 5,
  },
});
