import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SessionType} from './types/SessionType';

type DeviceProps = {
  session?: SessionType;
};

const Device: React.FC<DeviceProps> = () => {
  return (
    <TouchableWithoutFeedback style={styles.root}>
      <Icon name={'android'} size={40} color={'white'} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Android Firefox v87.546</Text>
        <Text style={styles.ipAddress}>Illium x210</Text>
        <Text style={styles.ipAddress}>192.168.0.1</Text>
        <Divider style={styles.divider} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Device;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    width,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoContainer: {
    paddingHorizontal: 10,
    flexGrow: 1,
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
