import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

interface OnBoardingImageProps {
  currentScrollPosition: Animated.SharedValue<number>;
  route: any;
  index: number;
}

const SlideImage: React.FC<OnBoardingImageProps> = ({
  route,
  index,
  currentScrollPosition,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        currentScrollPosition.value,
        [width * (index - 0.5), width * index, width * (index + 0.5)],
        [0, 1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <Animated.Image style={[styles.image, animatedStyles]} source={route} />
  );
};

export default SlideImage;

const styles = StyleSheet.create({
  image: {
    width,
    height: height * 0.55,
  },
});
