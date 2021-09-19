import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Autolink} from 'react-native-autolink';
import {Caption} from 'react-native-paper';

const FriendTextMessage: React.FC = () => {
  return (
    <View style={styles.rootContainer}>
      <View>
        <FastImage
          source={{
            uri: 'https://randomuser.me/api/portraits/women/57.jpg',
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.friendAvatar}
        />
      </View>
      <View style={styles.messageContainer}>
        <View style={styles.friendMessage}>
          <Autolink text={'Flutter is cool too <3'} />
        </View>
        <View>
          <Caption>12:00</Caption>
        </View>
      </View>
    </View>
  );
};

export default React.memo(FriendTextMessage);

const styles = StyleSheet.create({
  rootContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  friendAvatar: {height: 40, width: 40, borderRadius: 40},
  messageContainer: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  friendMessage: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
})
