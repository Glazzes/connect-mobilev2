import React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {ChatStackParamList} from '../../navigation/types/ChatStackParamList';

type FriendProfileAppbarProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'FriendProfile'>;
};

const FriendProfileAppbar: React.FC<FriendProfileAppbarProps> = ({
  navigation,
}) => {
  const goOneBack = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.BackAction color={'white'} onPress={goOneBack} />
    </Appbar.Header>
  );
};

export default FriendProfileAppbar;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'red',
    position: 'absolute',
    elevation: 0,
    width: '100%',
    zIndex: 1000,
  },
});
