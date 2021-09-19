import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';

const {width: IMAGE_SIZE, height: SCREEN_HEIGHT} = Dimensions.get('window');
const HIO = require('../../assets/pics/robin.png');

const MAX_TY = -1 * (IMAGE_SIZE * 3 - SCREEN_HEIGHT);

type Context = {
  scrollY: number;
  height: number;
};

const TestScrollView = () => {
  const canScroll = useSharedValue<boolean>(false);
  const hasBeenShrunk = useSharedValue<boolean>(false);

  const scrollY = useSharedValue<number>(0);
  const pause = useSharedValue<boolean>(false);

  const clampedScrollY = useDerivedValue(() => {
    return Math.max(Math.min(scrollY.value, 0), MAX_TY);
  });

  const translationY = useSharedValue<number>(0);
  const yThreshold = useSharedValue<number>(0);

  const onPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (_, context) => {
      context.scrollY = clampedScrollY.value;
      cancelAnimation(scrollY);
    },
    onActive: (event, context) => {
      if (canScroll.value) {
        scrollY.value = context.scrollY + event.translationY;
      }

      if (clampedScrollY.value === 0) {
        translationY.value = event.translationY + yThreshold.value;

        if (translationY.value > 80) {
          yThreshold.value = -(event.translationY - 80);
        }

        if (
          translationY.value < -110 &&
          translationY.value > -150 &&
          pause.value
        ) {
          yThreshold.value = -1 * event.translationY - 110;
        }

        if (translationY.value >= -110 && hasBeenShrunk.value && pause.value) {
          yThreshold.value = -1 * event.translationY - 110;
        }

        if (
          translationY.value <= -110 &&
          !pause.value &&
          !hasBeenShrunk.value
        ) {
          pause.value = true;
        }

        if (!pause.value && hasBeenShrunk.value && translationY.value > -110) {
          pause.value = true;
        }
      }
    },
    onEnd: event => {
      yThreshold.value = 0;
      if (translationY.value >= -110) {
        translationY.value = withTiming(0, {duration: 200});
      }

      if (translationY.value <= -111 && translationY.value >= -180) {
        translationY.value = withTiming(-180);
      }
    },
  });

  const onTapGesture = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onEnd: _ => {
        hasBeenShrunk.value = false;
        pause.value = false;
        translationY.value = withTiming(0, undefined, isFinished => {
          if (isFinished) {
            fullInterpolation.value = false;
          }
        });
      },
    },
  );

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: 'orange',
      transform: [{translateY: clampedScrollY.value}],
    };
  });

  const fullInterpolation = useSharedValue<boolean>(false);
  const height = useSharedValue<number>(IMAGE_SIZE);
  const width = useSharedValue<number>(IMAGE_SIZE);
  const borderRadius = useSharedValue<number>(0);

  const rImageStyles = useAnimatedStyle(() => {
    if (!hasBeenShrunk.value && !pause.value) {
      height.value = interpolate(
        translationY.value,
        [-110, 0, 80],
        [IMAGE_SIZE - 110, IMAGE_SIZE, IMAGE_SIZE + 80],
        Extrapolate.CLAMP,
      );

      width.value = IMAGE_SIZE;
    }

    if (!hasBeenShrunk.value && pause.value) {
      height.value = withTiming(110);
      borderRadius.value = withTiming(55);
      width.value = withTiming(110, undefined, isFinished => {
        if (isFinished) {
          hasBeenShrunk.value = true;
          pause.value = false;
        }
      });
    }

    if (hasBeenShrunk.value && !pause.value) {
      height.value = interpolate(
        translationY.value,
        [-210, -180, -111],
        [40, 55, 110],
        Extrapolate.CLAMP,
      );

      width.value = interpolate(
        translationY.value,
        [-210, -180, -111],
        [40, 55, 110],
        Extrapolate.CLAMP,
      );

      borderRadius.value = interpolate(
        translationY.value,
        [-210, -180, -111],
        [40 / 2, 55 / 2, 110 / 2],
        Extrapolate.CLAMP,
      );
    }

    if (hasBeenShrunk.value && pause.value) {
      borderRadius.value = withTiming(0);
      height.value = withTiming(IMAGE_SIZE - 110);
      width.value = withTiming(IMAGE_SIZE, undefined, isFinished => {
        if (isFinished) {
          hasBeenShrunk.value = false;
          pause.value = false;
        }
      });
    }

    return {
      height: height.value,
      width: width.value,
      borderRadius: borderRadius.value,
    };
  });

  return (
    <View style={styles.root}>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Animated.View style={rStyle}>
          <TapGestureHandler onGestureEvent={onTapGesture} numberOfTaps={1}>
            <Animated.Image source={HIO} style={rImageStyles} />
          </TapGestureHandler>
          <View style={styles.testContainer} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default TestScrollView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  testContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE * 3,
  },
});
