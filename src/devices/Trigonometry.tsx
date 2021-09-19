import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {polar2Canvas} from 'react-native-redash';
import SVG, {Circle} from 'react-native-svg';

const R = 100;
const STROKE_WIDTH = 3;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Tigronometry = () => {
  const theta = useSharedValue<number>(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: theta.value * R,
    };
  });

  const cursorStyles = useAnimatedStyle(() => {
    const canvas = polar2Canvas(
      {radius: R, theta: theta.value},
      {x: CENTER.x, y: CENTER.y},
    );
    return {
      top: canvas.y - R / 4,
      left: canvas.x - R / 4,
    };
  });

  const yLine = useAnimatedStyle(() => {
    const canvas = polar2Canvas(
      {radius: R, theta: theta.value},
      {x: CENTER.x, y: CENTER.y},
    );
    return {
      width: canvas.y,
      transform: [
        {translateX: canvas.x - canvas.y / 2},
        {translateY: canvas.y / 2},
        {rotate: '90deg'},
      ],
    };
  });

  const xLine = useAnimatedStyle(() => {
    const canvas = polar2Canvas(
      {radius: R, theta: theta.value},
      {x: CENTER.x, y: CENTER.y},
    );
    return {
      width: canvas.x,
      transform: [{translateY: canvas.y}],
    };
  });

  const thetaStyles = useAnimatedStyle(() => ({
    transform: [{rotate: `-${theta.value}rad`}],
  }));

  useEffect(() => {
    theta.value = withRepeat(
      withTiming(Math.PI * 2, {duration: 3000}),
      -1,
      false,
    );
  });

  return (
    <View style={styles.root}>
      <SVG width={R * 2 + STROKE_WIDTH * 2} height={R * 2 + STROKE_WIDTH * 2}>
        <AnimatedCircle
          r={R / 4}
          cx={R + STROKE_WIDTH}
          cy={R + STROKE_WIDTH}
          stroke={'purple'}
          strokeWidth={STROKE_WIDTH}
          fill={'transparent'}
          strokeDasharray={R * Math.PI * 2}
          animatedProps={animatedProps}
        />
        <Circle
          r={R}
          cx={R + STROKE_WIDTH}
          cy={R + STROKE_WIDTH}
          stroke={'orange'}
          strokeWidth={STROKE_WIDTH}
          fill={'transparent'}
        />
      </SVG>
      <View style={styles.raduis} />
      <Animated.View style={[styles.theta, thetaStyles]}>
        <View style={{height: 3, width: R}} />
        <View style={{height: 3, width: R, backgroundColor: 'orange'}} />
      </Animated.View>
      <Animated.View style={[styles.line, yLine]} />
      <Animated.View style={[styles.line, xLine]} />
      <Animated.View style={[styles.cursor, cursorStyles]} />
    </View>
  );
};

export default Tigronometry;

const {width, height} = Dimensions.get('window');
const CENTER = {x: width / 2, y: height / 2};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursor: {
    position: 'absolute',
    borderRadius: R / 4,
    width: R / 2,
    height: R / 2,
    backgroundColor: 'lightseagreen',
  },
  line: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    backgroundColor: 'salmon',
  },
  raduis: {
    position: 'absolute',
    top: CENTER.y,
    left: CENTER.x,
    width: R,
    backgroundColor: 'orange',
    height: STROKE_WIDTH,
  },
  theta: {
    height: 3,
    width: R * 2,
    position: 'absolute',
    top: CENTER.y,
    left: CENTER.x - R,
    flexDirection: 'row',
  },
});
