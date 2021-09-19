import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {Avatar, Badge, Caption, TouchableRipple} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FriendWebSocketHandler from './FriendWebSocketHandler';
import StatusBadge from './StatusBadge';

const FLUTTER = require('./assets/flutter.png');

const FriendRow: React.FC = () => {
  const {width} = useWindowDimensions();
  const infoWidth = useSharedValue<number>(0);
  const statusWidth = useSharedValue<number>(0);
  const badgeWidth = useSharedValue<number>(0);

  const usernameStyle = useAnimatedStyle(() => ({
    maxWidth: infoWidth.value - statusWidth.value - PADDING * 2,
  }));

  const messageStyle = useAnimatedStyle(() => ({
    maxWidth: infoWidth.value - badgeWidth.value - PADDING * 2,
  }));

  const statusBagdeScale = useSharedValue<number>(1);

  return (
    <TouchableRipple
      onPress={() => {
        statusBagdeScale.value = withTiming(0);
      }}>
      <View style={[styles.root, {width}]}>
        <View style={styles.container}>
          <Avatar.Image source={FLUTTER} size={50} />
          <StatusBadge scale={statusBagdeScale} size={IMAGE_SIZE / 3.3} />
        </View>
        <Animated.View
          style={styles.userInfo}
          onLayout={e => {
            infoWidth.value = e.nativeEvent.layout.width;
          }}>
          <View style={styles.userData}>
            <Animated.Text
              style={[styles.username, usernameStyle]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              Glazes Glazes Glazes Glazes Glazes Glazes
            </Animated.Text>
            <Animated.View
              style={styles.status}
              onLayout={e => {
                statusWidth.value = e.nativeEvent.layout.width;
              }}>
              <Icon name={'check-all'} color={'#00AEE1'} size={19} />
              <Caption style={styles.time}> 12:00</Caption>
            </Animated.View>
          </View>
          <View style={styles.messageContainer}>
            <Animated.Text
              style={[styles.message, messageStyle]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              Hello it's been a long time no see, right {'<3'}?
            </Animated.Text>
            <Badge
              style={styles.messageCountBadge}
              onLayout={e => {
                badgeWidth.value = e.nativeEvent.layout.width;
              }}>
              3
            </Badge>
          </View>
        </Animated.View>
        <FriendWebSocketHandler statusBadge={statusBagdeScale} />
      </View>
    </TouchableRipple>
  );
};

export default React.memo(FriendRow);

const PADDING = 10;
const IMAGE_SIZE = 50;

const styles = StyleSheet.create({
  root: {
    marginTop: 100,
    paddingHorizontal: PADDING,
    paddingVertical: PADDING / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    top: 36,
    left: 37,
    backgroundColor: '#00AEE1',
    borderWidth: 1,
    borderColor: '#202329',
  },
  userInfo: {
    flexGrow: 1,
    paddingLeft: PADDING,
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
    color: '#FDFFFF',
    flexGrow: 1,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  time: {
    color: 'grey',
  },
  messageContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  message: {
    color: '#c9c7c7',
  },
  messageCountBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E12729',
  },
});
