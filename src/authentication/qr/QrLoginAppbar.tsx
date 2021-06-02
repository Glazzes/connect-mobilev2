import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {QrStackRouteList} from './QrStackNavigator';

interface QrLoginAppbarProps {
  navigation: StackNavigationProp<QrStackRouteList, 'Scanner'>;
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#202329',
  },
});

const QrLoginAppbar: React.FC<QrLoginAppbarProps> = ({navigation}) => {
  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.BackAction onPress={navigation.goBack} />
      <Appbar.Content title={'Login with Qr code'} />
    </Appbar.Header>
  );
};

export default QrLoginAppbar;
