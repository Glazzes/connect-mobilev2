import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View, BackHandler} from 'react-native';
import {Button, Subheading, Title} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackScreenParams} from '../../../navigation/stack/StackScreenParams';

type BrowserNotFound = {
  navigation: StackNavigationProp<StackScreenParams, 'BrowserNotFound'>;
};

const BROWSER_NOT_FOUND = require('./assets/browser.png');

const BrowserNotFound: React.FC<BrowserNotFound> = ({navigation}) => {
  const goHome = (): boolean => {
    navigation.navigate('Home');
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goHome);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goHome);
    };
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Image source={BROWSER_NOT_FOUND} style={styles.image} />
      <View style={styles.content}>
        <Title style={styles.title}>Woops...</Title>
        <Subheading style={styles.info}>
          We could not find the browser, maybe the tab was closed.
        </Subheading>
        <Button
          color={'#00ACDD'}
          mode={'contained'}
          style={styles.button}
          onPress={goHome}>
          ok
        </Button>
      </View>
    </View>
  );
};

export default BrowserNotFound;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: height / 2,
  },
  content: {
    padding: 15,
  },
  title: {
    color: '#FDFFFF',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    paddingBottom: 10,
  },
  info: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 30,
  },
  button: {
    width: width * 0.6,
    alignSelf: 'center',
  },
});
