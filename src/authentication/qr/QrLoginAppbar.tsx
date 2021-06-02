import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {QrStackParamList} from '../../navigation/types/QrStackParamList';

interface QrLoginAppbarProps {
  navigation: StackNavigationProp<QrStackParamList, 'Scanner'>;
}

const QrLoginAppbar: React.FC<QrLoginAppbarProps> = ({navigation}) => {
  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.BackAction
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      />
      <Appbar.Content title={'Login with Qr code'} />
    </Appbar.Header>
  );
};

export default QrLoginAppbar;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#202329',
  },
});
