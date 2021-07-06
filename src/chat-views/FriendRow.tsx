import React, {useState} from 'react';
import {WS_ENDPOINT} from '../shared/utils/UrlConstants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Subheading, Caption, Badge} from 'react-native-paper';
import {ChatStackParamList} from '../navigation/types/ChatStackParamList';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

// @ts-ignore
import SockJsClient from 'react-stomp';
import {User} from '../shared/types';

interface FriendRowProps {
  navigation: StackNavigationProp<ChatStackParamList, 'Home'>;
  friend?: User;
}

const FriendRow: React.FC<FriendRowProps> = ({navigation}) => {
  const [clientRef, setClientRef] = useState(null);

  const goToChatroom = () => {
    navigation.navigate('FriendChat', {
      friend: {
        id: 'some cool id',
        username: 'Glaze',
        nickname: 'Epic glaze',
        profilePicture: 'https://randomuser.me/api/portraits/women/57.jpg',
      },
    });
  };

  const onMessage = (message: any) => {
    console.log(message);
  };

  const sendMessage = () => {
    // @ts-ignore
    clientRef?.sendMessage('/app/chat/34', 'A super cool message');
  };

  return (
    <View>
      <SockJsClient
        url={WS_ENDPOINT}
        topics={['/chat/34']}
        onMessage={onMessage}
        onConnect={() => {
          console.log('The connection was made');
        }}
        onDisconnect={() => console.log('Disconnected')}
        ref={setClientRef}
      />

      <TouchableWithoutFeedback onPress={goToChatroom}>
        <View style={styles.friendRow}>
          <View style={styles.container}>
            <Avatar.Image
              source={{uri: 'https://randomuser.me/api/portraits/women/57.jpg'}}
              size={50}
            />
            <View style={styles.messageInfo}>
              <View style={styles.userInfo}>
                <Subheading style={styles.username}>Victoria Secret</Subheading>
                <View style={styles.timeContainer}>
                  <Icon name={'check-all'} size={20} color={'#37c6ff'} />
                  <Caption style={styles.time}> 12:30</Caption>
                </View>
              </View>
              <View style={styles.userInfo}>
                <Text
                  style={styles.message}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}>
                  Hello there! it's been a long time no see
                </Text>
                <Badge style={styles.badge}>4</Badge>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FriendRow;

const styles = StyleSheet.create({
  friendRow: {backgroundColor: '#242630', padding: 10},
  container: {flexDirection: 'row'},
  messageInfo: {flexGrow: 1},
  username: {
    fontWeight: 'bold',
    color: '#f9f8fc',
  },
  userInfo: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  time: {color: '#c9c7c7'},
  message: {
    maxWidth: '85%',
    color: '#c9c7c7',
  },
  badge: {
    backgroundColor: '#f41f43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#c9c7c7',
  },
});
