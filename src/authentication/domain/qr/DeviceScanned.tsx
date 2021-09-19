import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DeviceScanned: React.FC = () => {
  return (
    <View style={styles.root}>
      <View style={styles.iconContainer}>
        <Icon name={'firefox'} size={40} color={'white'} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Firefox Android v87.546</Text>
        <Text style={styles.ipAddress}>Illium x210</Text>
        <Text style={styles.ipAddress}>192.168.0.1</Text>
      </View>
    </View>
  );
};

export default DeviceScanned;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    width,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: '#4B4E54', 
    borderRadius: 30, 
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  title: {
    color: 'white',
  },
  ipAddress: {
    fontSize: 13,
    color: 'grey',
  },
  divider: {
    marginTop: 5,
    backgroundColor: 'grey',
  },
});
