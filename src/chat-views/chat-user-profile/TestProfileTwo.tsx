import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const HIO = require('../../assets/pics/hio.png');
const {width: IMAGE_SIZE} = Dimensions.get('window');

const TestProfileTwo: React.FC = () => {
  const paused = useSharedValue<boolean>(false);
  const shrunk = useSharedValue<boolean>(false);

  const height = useSharedValue<number>(IMAGE_SIZE);
  const width = useSharedValue<number>(IMAGE_SIZE);

  const translateY = useSharedValue<number>(0);
  const threshold = useSharedValue<number>(0);
  const onPanGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
    {
      onStart: () => {},
      onActive: event => {
        translateY.value = event.translationY + threshold.value;

        if (translateY.value <= -111 && !paused.value && !shrunk.value) {
          paused.value = true;
        }

        if (translateY.value >= -110 && shrunk.value && !paused.value) {
          paused.value = true;
        }

        if (paused.value && translateY.value < -110) {
          threshold.value = -1 * event.translationY - 110;
        }

        if (translateY.value > 80 && !paused.value) {
          threshold.value = -1 * (event.translationY - 80);
        }
      },
      onEnd: () => {
        threshold.value = 0;
        translateY.value = withTiming(0);
      },
    },
  );

  const rStyle = useAnimatedStyle(() => {
    if (!shrunk.value && paused.value) {
      height.value = withTiming(110);
      width.value = withTiming(110, undefined, isFinished => {
        if (isFinished) {
          paused.value = false;
          shrunk.value = true;
          translateY.value = -150;
        }
      });
    }

    if (shrunk.value && paused.value) {
      height.value = withTiming(IMAGE_SIZE - 110);
      width.value = withTiming(IMAGE_SIZE, undefined, isFinished => {
        if (isFinished) {
          paused.value = false;
          shrunk.value = false;
          translateY.value = -110;
        }
      });
    }

    if (!paused.value) {
      height.value = interpolate(
        translateY.value,
        [-210, -180, -150, -110, 0, 80],
        [40, 55, 110, IMAGE_SIZE - 110, IMAGE_SIZE, IMAGE_SIZE + 80],
        Extrapolate.CLAMP,
      );

      width.value = interpolate(
        translateY.value,
        [-210, -180, -150, -110],
        [40, 55, 110, IMAGE_SIZE],
        Extrapolate.CLAMP,
      );
    }

    return {
      width: width.value,
      height: height.value,
    };
  });

  return (
    <View style={styles.root}>
      <PanGestureHandler onGestureEvent={onPanGesture}>
        <Animated.View style={styles.container}>
          <Animated.Image source={HIO} style={rStyle} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default TestProfileTwo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    backgroundColor: 'orange',
    height: IMAGE_SIZE * 2,
  },
});
