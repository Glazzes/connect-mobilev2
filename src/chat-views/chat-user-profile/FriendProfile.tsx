import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ChatStackParamList} from '../../navigation/types/ChatStackParamList';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {Appbar} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

type FriendProfileProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'FriendProfile'>;
  route: RouteProp<ChatStackParamList, 'FriendProfile'>;
};

const FriendProfile: React.FC<FriendProfileProps> = ({navigation, route}) => {
  const user = route.params.friend;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.appbarContainer}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color={'white'} onPress={goBack} />
        </Appbar.Header>
      </View>
      <Image source={{uri: user.profilePicture}} style={styles.image} />
    </View>
  );
};

export default FriendProfile;

const styles = StyleSheet.create({
  image: {
    width,
    height: height / 2,
  },
  appbarContainer: {
    position: 'absolute',
    zIndex: 100,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
    width,
  },
});
