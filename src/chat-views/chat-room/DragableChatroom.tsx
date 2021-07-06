import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  item: {
    width,
    height: 60,
    backgroundColor: 'salmon',
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});

const items = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10];

const Item: React.FC<{index: number}> = ({index}) => {
  const positions = {x: 0, y: 0};
  const sharedPositions = useSharedValue({...positions});

  const isGestureActive = useSharedValue<boolean>(false);
  const tx = useSharedValue<number>(0);
  const ty = useSharedValue<number>(index * 70);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (event, context) => {
      isGestureActive.value = true;
      context.x = tx.value;
      context.y = ty.value;
    },
    onActive: (event, context) => {
      tx.value = context.x + event.translationX;
      ty.value = context.y + event.translationY;
    },
    onEnd: ({velocityX}) => {
      ty.value = withSpring(index * 70, {});
      tx.value = withSpring(0, {velocity: velocityX});
      isGestureActive.value = false;
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: isGestureActive.value ? 'lightgreen' : 'salmon',
      zIndex: isGestureActive.value ? 100 : 0,
      transform: [{translateX: tx.value}, {translateY: ty.value}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.item, style]}>
        <Text style={styles.text}>{index}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const DraggableChatroom: React.FC = () => {
  return (
    <Animated.ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        position: 'relative',
        height: items.length * 70,
      }}>
      {items.map((thing, index) => {
        const style = {
          transform: [{translateY: index * 65}],
        };

        return <Item key={`item-${index}`} index={index} style={style} />;
      })}
    </Animated.ScrollView>
  );
};

export default DraggableChatroom;
