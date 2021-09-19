import React, {useRef, useState} from 'react';
import {Dimensions, View, ViewToken} from 'react-native';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import UserTextMessage from '../../chat-messages/text-message/UserTextMessage';
import {Post} from '../../shared/types/Post';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackScreenParams} from '../../navigation/stack/StackScreenParams';
import ScrollToEndFAB from './ScrollToEndFAB';
import ChatRoomAppbar from './ChatroomAppbar';
import {RouteProp} from '@react-navigation/native';

type ChatRoomProps = {
  navigation: StackNavigationProp<StackScreenParams, 'Chatroom'>;
  route: RouteProp<StackScreenParams, 'Chatroom'>;
};

const {width} = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 200,
  itemVisiblePercentThreshold: 50,
  waitForInteraction: false,
};

function renderItem({item}: {item: Post}, index: number): React.ReactNode {
  return <UserTextMessage message={item.title} key={item.id} />;
}

function keyExtractor(item: Post): string {
  return item.title;
}

const ChatRoom: React.FC<ChatRoomProps> = ({navigation, route}) => {
  // component
  const [messages, setMessages] = useState<Post[]>([]);

  const onViewAbleItemsChange = useRef(
    ({changed}: {changed: Array<ViewToken>}) => {
      console.log(changed);
    },
  ).current;

  // Animation
  const scrollRef = useAnimatedRef();
  const offsetY = useSharedValue<number>(0);
  const shouldDisplayFAB = useSharedValue<boolean>(true);

  const animatedScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (event.contentOffset.y > offsetY.value && offsetY.value >= 0) {
        shouldDisplayFAB.value = false;
      } else {
        shouldDisplayFAB.value = true;
      }

      offsetY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.rootContainer}>
      <ChatRoomAppbar friend={route.params.friend} navigation={navigation} />
      <AnimatedFlatList
        // @ts-ignore
        ref={scrollRef}
        data={[]}
        onViewableItemsChanged={onViewAbleItemsChange}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onScroll={animatedScrollHandler}
        // @ts-ignore
        keyExtractor={keyExtractor}
        // @ts-ignore
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <ScrollToEndFAB
        shouldDisplayFAB={shouldDisplayFAB}
        scrollRef={scrollRef}
      />
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  list: {
    width,
    height: 600,
    backgroundColor: '#202329',
  },
});
