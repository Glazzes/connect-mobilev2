import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Dimensions, StyleSheet, Text} from 'react-native';

type FriendUsernameProps = {
  translationY: Animated.SharedValue<number>;
  username: string;
};

const {width} = Dimensions.get('window');
const IMAGE_DIMENSION = width;
const SHRINK_IMAGE_HEIGHT = 60;

const FriendUsername: React.FC<FriendUsernameProps> = ({translationY}) => {
  const containerStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      translationY.value,
      [-200, -160, -130, -110, 0, 80],
      [
        33,
        SHRINK_IMAGE_HEIGHT * 1.3 + 10,
        SHRINK_IMAGE_HEIGHT * 2 - 10,
        IMAGE_DIMENSION - 110 - 70,
        IMAGE_DIMENSION - 70,
        IMAGE_DIMENSION + 80 - 70,
      ],
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(
      translationY.value,
      [-200, -160, -130, -110],
      [110, SHRINK_IMAGE_HEIGHT * 1.3 + 20, SHRINK_IMAGE_HEIGHT * 2 + 10, 15],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY}, {translateX}],
      elevation: 10,
      position: 'absolute',
      zIndex: 500,
    };
  });

  const textStyles = useAnimatedStyle(() => {
    const fontSize = interpolate(
      translationY.value,
      [-200, -160, -130, -110],
      [14, 20, 25, 30],
      Extrapolate.CLAMP,
    );

    return {
      fontSize,
      fontWeight: 'bold',
      color: 'white',
    };
  });

  return (
    <Animated.View style={containerStyles}>
      <Animated.Text
        style={textStyles}
        numberOfLines={1}
        ellipsizeMode={'tail'}>
        Santiago
      </Animated.Text>

      <Text
        style={styles.onlineStatus}
        numberOfLines={1}
        ellipsizeMode={'tail'}>
        en linea
      </Text>
    </Animated.View>
  );
};

export default FriendUsername;

const styles = StyleSheet.create({
  onlineStatus: {
    color: 'white',
  },
});
