import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Subheading, Caption, Badge} from 'react-native-paper';
import {BlurView} from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  friendRow: {backgroundColor: '#2a3035', padding: 10},
  container: {flexDirection: 'row'},
  messageInfo: {flexGrow: 1},
  username: {},
  userInfo: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {color: '#fff'},
  badge: {
    backgroundColor: '#f41f43',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface FriendRowProps {}

const FriendRow: React.FC<FriendRowProps> = () => {
  return (
    <View style={styles.friendRow}>
      <BlurView style={StyleSheet.absoluteFillObject} intensity={20} />
      <View style={styles.container}>
        <Avatar.Image
          source={{uri: 'https://randomuser.me/api/portraits/women/57.jpg'}}
          size={50}
        />
        <View style={styles.messageInfo}>
          <View style={styles.userInfo}>
            <Subheading>Victoria Secret</Subheading>
            <Caption style={styles.time}>12:30</Caption>
          </View>
          <View style={styles.userInfo}>
            <Icon name={'done-all'} size={20} color={'#017bff'} />
            <Badge style={styles.badge}>4</Badge>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FriendRow;
