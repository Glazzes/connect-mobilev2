import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Username from './Username';

const HIO = require('../assets/pics/hio.png')

const UserSearchResult: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={HIO} style={styles.image} />
      <View style={styles.infoContainer}>
        <Username searchParam={'glaze'} text={'glazeadito'} />
        <Text style={styles.status}>Last time recently</Text>
      </View>
    </View>
  );
}

export default UserSearchResult;

const IMAGE_SIZE = 50;
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },
  infoContainer: {
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  status: {
    color: 'grey',  
  }
});