import React from 'react';
import {Appbar} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackScreenParams} from '../../navigation/stack/StackScreenParams';
import {User} from '../../shared/types';
import {SharedElement} from 'react-navigation-shared-element';

type ChatroomAppbarProps = {
  navigation: StackNavigationProp<StackScreenParams, 'Chatroom'>;
  friend: User;
};

const ChatRoomAppbar: React.FC<ChatroomAppbarProps> = ({
  friend,
  navigation,
}) => {
  const goToFriendProfile = () => {
    navigation.navigate('FriendProfile', {friend: friend});
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.BackAction onPress={goBack} />
      <View style={styles.appbarContent}>
        <View style={styles.userInfo}>
          <TouchableWithoutFeedback onPress={goToFriendProfile}>
            <SharedElement id={`pfp-${friend.id}`}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/women/57.jpg',
                }}
                style={styles.avatar}
              />
            </SharedElement>
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
  appbar: {backgroundColor: 'orange', elevation: 0},
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
  avatar: {width: 40, height: 40, borderRadius: 20},
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
