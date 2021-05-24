import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const {width} = Dimensions.get('screen');

interface SlideProps {
  title: string;
  content: string;
  index: number;
  onPress: () => void;
}

const Slide: React.FC<SlideProps> = ({title, content, onPress}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <Button onPress={onPress} color={'#142662'} mode={'contained'}>Next</Button>
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
    fontSize: 30,
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
});
