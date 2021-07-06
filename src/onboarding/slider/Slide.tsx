import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {OnBoardingStackParamList} from '../../navigation/types/OnBoardingStackParamList';

const {width} = Dimensions.get('screen');

interface SlideProps {
  title: string;
  content: string;
  index: number;
  last: boolean;
  onPress: () => void;
  navigation: StackNavigationProp<OnBoardingStackParamList, 'MainPage'>;
}

const Slide: React.FC<SlideProps> = ({
  title,
  content,
  onPress,
  last,
  navigation,
}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      {last ? (
        <View>
          <Button
            style={{marginBottom: 14}}
            onPress={() => navigation.navigate('Login')}
            color={'#142662'}
            mode={'outlined'}>
            I have an account
          </Button>
          <Button onPress={() => {}} color={'#142662'} mode={'contained'}>
            Create new account
          </Button>
        </View>
      ) : (
        <Button onPress={onPress} color={'#142662'} mode={'contained'}>
          Next
        </Button>
      )}
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  root: {
    width,
    position: 'relative',
    flex: 1,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  title: {
    color: '#00e6b3',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    paddingBottom: 10,
  },
  content: {
    color: '#142662',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 30,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
  },
});
