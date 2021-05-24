import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';

interface QrLoginAppbarProps {
  navigation: StackNavigationProp<Record<string, object | undefined>, string>;
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#202329',
  },
});

const QrLoginAppbar: React.FC<QrLoginAppbarProps> = ({navigation}) => {
  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.BackAction />
      <Appbar.Content title={'Login with Qr code'} />
    </Appbar.Header>
  );
};

export default QrLoginAppbar;
