import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

type ProfilePictureProps = {
  sizer: Animated.SharedValue<number>;
};

const {width: IMAGE_SIZE} = Dimensions.get('window');
const HIO = require('../../assets/pics/hio.png');

const ProfilePicture: React.FC<ProfilePictureProps> = ({sizer}) => {
  const imageStyles = useAnimatedStyle(() => {
    const height = interpolate(
      sizer.value,
      [-110, 0, 80],
      [IMAGE_SIZE - 110, IMAGE_SIZE, IMAGE_SIZE + 80],
      Extrapolate.CLAMP,
    );

    return {
      width: IMAGE_SIZE,
      height,
    };
  });

  return <Animated.Image source={HIO} style={imageStyles} />;
};

export default ProfilePicture;
