import React from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  Extrapolate,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

interface DotProps {
  animated: Animated.SharedValue<number>;
  index: number;
}

const Dot: React.FC<DotProps> = ({animated, index}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      borderRadius: 5,
      marginLeft: 5,
      backgroundColor: interpolateColor(
        animated.value,
        [width * (index - 1), width * index, width * (index + 1)],
        ['grey', '#00E6B3', 'grey'],
        'RGB',
      ),
      width: interpolate(
        animated.value,
        [width * (index - 1), width * index, width * (index + 1)],
        [5, 10, 5],
        Extrapolate.CLAMP,
      ),
      height: interpolate(
        animated.value,
        [width * (index - 1), width * index, width * (index + 1)],
        [5, 10, 5],
        Extrapolate.CLAMP,
      ),
    };
  });

  return <Animated.View style={animatedStyles} />;
};

export default Dot;
