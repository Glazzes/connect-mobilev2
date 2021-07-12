import React from 'react';
import {Appbar, Avatar} from 'react-native-paper';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Scene, StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackScreenParams} from '../../navigation/types/StackScreenParams';
import {User} from '../../shared/types/User';
import { RouteProp } from '@react-navigation/native';

type ChatroomAppbarProps = {
  navigation: StackNavigationProp<StackScreenParams>;
  scene: Scene<RouteProp<StackScreenParams, 'Chatroom'>>;
};

const ChatRoomAppbar: React.FC<ChatroomAppbarProps> = ({navigation, scene}) => {
  const friend: User = scene.route.params.friend;

  const goToFriendProfile = () => {
    navigation.navigate('FriendProfile', {friend: friend})
  };

  const goBack = () => {
   navigation.goBack()
  }

  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.BackAction onPress={goBack} />
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
