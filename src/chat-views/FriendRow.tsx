import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Avatar, Subheading, Caption, Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {ChatStackParamList} from '../navigation/types/ChatStackParamList';

interface FriendRowProps {
  navigation: StackNavigationProp<ChatStackParamList, 'Home'>;
}

const FriendRow: React.FC<FriendRowProps> = ({navigation}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('FriendChat', {
          friend: {
            id: 'Some cool id',
            username: 'Epic glaze',
            nickname: 'Glaze',
            profilePicture: 'https://randomuser.me/api/portraits/women/57.jpg',
          },
        });
      }}>
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
