import React from 'react';
import {Dimensions, StyleSheet, View, Image} from 'react-native';
import {Button, Subheading, Title} from 'react-native-paper';
import {Feature} from '../util/features';
import Constants from 'expo-constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {OnBoardStackScreenParams} from '../navigation/OnBoardStackScreenParams';

type SlideProps = {
  feature: Feature;
  isLast: boolean;
  navigation: StackNavigationProp<OnBoardStackScreenParams, 'onBoard'>;
};

const Slide: React.FC<SlideProps> = ({feature, isLast, navigation}) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.root}>
      <Image source={feature.image} style={styles.image} />
      <Title style={[styles.title, styles.text]}>{feature.title}</Title>
      <Subheading style={styles.text}>{feature.content}</Subheading>
      {isLast && (
        <View style={styles.buttonContainer}>
          <Button
            mode={'contained'}
            color={'#00ACDD'}
            style={styles.button}
            onPress={goToLogin}>
            Login
          </Button>
          <Button mode={'text'} color={'#FDFFFF'} style={styles.button}>
            New Account
          </Button>
        </View>
      )}
    </View>
  );
};

export default Slide;

const {width: IMAGE_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    width: IMAGE_WIDTH,
  },
  image: {
    width: undefined,
    height: SCREEN_HEIGHT / 2,
    aspectRatio: 1,
    marginTop: Constants.statusBarHeight,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 10,
    color: '#FDFFFF',
    fontSize: 25,
  },
  buttonContainer: {
    width: IMAGE_WIDTH * 0.6,
    alignSelf: 'center',
    paddingVertical: 20,
  },
  button: {
    marginVertical: 5,
  },
});
