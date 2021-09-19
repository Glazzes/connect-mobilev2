import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Image, View, BackHandler} from 'react-native';
import {Button, Subheading, Title} from 'react-native-paper';
import {StackScreenParams} from '../../../navigation/stack/StackScreenParams';

type SucessfulLoginProps = {
  navigation: StackNavigationProp<StackScreenParams, 'SuccessfulLogin'>;
};

const SYNC = require('./assets/sync.png');

const SuccessfulLogin: React.FC<SucessfulLoginProps> = ({navigation}) => {
  const goHome = (): boolean => {
    navigation.navigate('Home');
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goHome);

    return () => {
      BackHandler.addEventListener('hardwareBackPress', goHome);
    };
  }, []);

  return (
    <View style={styles.root}>
      <Image source={SYNC} style={styles.image} />
      <View style={styles.content}>
        <Title style={[styles.info, styles.text]}>Device synced</Title>
        <Subheading style={styles.text}>
          Your devices have been synchronized successfully.
        </Subheading>
      </View>
      <Button
        mode={'contained'}
        color={'#00ACDD'}
        style={styles.button}
        onPress={goHome}>
        ok
      </Button>
    </View>
  );
};

export default SuccessfulLogin;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: height / 2,
  },
  content: {
    padding: 10,
  },
  info: {
    color: '#FDFFFF',
  },
  text: {
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    width: width * 0.6,
    alignSelf: 'center',
  },
});
