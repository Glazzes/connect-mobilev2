import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  interpolateColor,
  cancelAnimation,
  useAnimatedGestureHandler,
  withDecay, withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import ProfilePicture from './ProfilePicture';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Profile: React.FC = () => {
  const sizer = useSharedValue<number>(0);
  const sizerThreshold = useSharedValue<number>(0);

  const translateY = useSharedValue<number>(0);
  const scrollY = useDerivedValue<number>(() => {
    const maxScroll = -(1000 - SCREEN_HEIGHT);
    return Math.max(Math.min(translateY.value, 80), maxScroll);
  });

  const isAtTop = useDerivedValue<boolean>(() => {
    return scrollY.value === 0;
  });

  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {y: number}
  >({
    onStart: (_, context) => {
      context.y = scrollY.value;
      cancelAnimation(translateY);
    },
    onActive: (event, context) => {
      translateY.value = context.y + event.translationY;

      sizer.value = event.translationY + sizerThreshold.value;
      if (translateY.value > 80) {
        sizerThreshold.value = -(event.translationY - 80);
      }
    },
    onEnd: event => {
      if (scrollY.value >= -110) {
        sizer.value = withTiming(0);
      }
    },
  });

  const scrollViewStyle = useAnimatedStyle(() => {
    return {
      width: SCREEN_WIDTH,
      height: 1000,
      transform: [{translateY: 0}],
    };
  });

  return (
    <View style={styles.root}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={scrollViewStyle}>
          <ProfilePicture sizer={sizer} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {flex: 1},
});
