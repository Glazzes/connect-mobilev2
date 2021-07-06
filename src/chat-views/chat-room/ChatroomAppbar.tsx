import React from 'react';
import {Appbar, Avatar} from 'react-native-paper';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Scene,
  StackNavigationProp,
} from '@react-navigation/stack/lib/typescript/src/types';
import {ChatStackParamList} from '../../navigation/types/ChatStackParamList';
import {User} from '../../shared/types/User';
import {RouteProp} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

type ChatroomAppbarProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'FriendChat'>;
  scene: Scene<RouteProp<ChatStackParamList, 'FriendChat'>>;
};

const ChatRoomAppbar: React.FC<ChatroomAppbarProps> = ({navigation, scene}) => {
  const friend: User = scene.route.params.friend;

  const goToFriendProfile = () => {
    navigation.navigate('FriendProfile', {friend: friend});
  };

  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
      <View style={styles.appbarContent}>
        <View style={styles.userInfo}>
          <TouchableWithoutFeedback onPress={goToFriendProfile}>
            <Avatar.Image
              source={{
                uri: 'https://randomuser.me/api/portraits/women/57.jpg',
              }}
              size={40}
            />
          </TouchableWithoutFeedback>
          <View style={styles.infoContainer}>
            <Text style={styles.username}>{friend.username}</Text>
            <Text style={styles.online}>Online</Text>
          </View>
        </View>
        <Icon name={'dots-vertical'} size={25} color={'white'} />
      </View>
    </Appbar.Header>
  );
};

export default ChatRoomAppbar;

const styles = StyleSheet.create({
  appbar: {backgroundColor: '#202329', elevation: 0},
  appbarContent: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
  },
  infoContainer: {
    paddingLeft: 10,
  },
  username: {
    fontWeight: 'bold',
    color: '#f9f8fc',
  },
  online: {
    color: '#37c6ff',
  },
  offline: {
    color: '#c9c7c7',
  },
});
