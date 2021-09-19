/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import Animated, {withTiming} from 'react-native-reanimated';
import {Client} from '@stomp/stompjs';
// import {BROKER_URL} from './utils/UrlUtil';
import Friend from '../shared/persistence/entities/Friend';
import {View} from 'react-native';

type FriendWebSocketHandlerProps = {
  friend?: Friend;
  statusBadge: Animated.SharedValue<number>;
  messages?: Animated.SharedValue<number>;
};

const FriendWebSocketHandler: React.FC<FriendWebSocketHandlerProps> = ({
  statusBadge,
}) => {
  const client = useRef(
    new Client({
      brokerURL: 'ws://192.168.42.249:8080/ws',
      reconnectDelay: 3000,
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      onConnect: () => {
        client.subscribe('/chatroom/3', modifyStatus);
        client.subscribe('/profile/100/update', msg => console.log(msg));
      },
    }),
  ).current;

  function modifyStatus(e: any) {
    console.log(e);
    statusBadge.value = withTiming(0);
  }

  useEffect(() => {
    client.activate();
  }, []);

  return <View />;
};

export default React.memo(FriendWebSocketHandler);
