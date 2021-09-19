import React from 'react';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {FAB, Portal} from 'react-native-paper';
import {Dimensions, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions} from 'expo-image-picker';

type FriendProfileFABProps = {
  translationY: Animated.SharedValue<number>;
  appbarHeight: number;
  isAuthenticatedUser: boolean;
};

const {width} = Dimensions.get('window');
const IMAGE_DIMENSION = width;
const SHRINK_IMAGE_HEIGHT = 60;
const FAB_DIMENSION = 55;

const withTimingConfig = {
  duration: 150,
  easing: Easing.inOut(Easing.ease),
};

const FriendProfileFAB: React.FC<FriendProfileFABProps> = ({
  translationY,
  appbarHeight,
  isAuthenticatedUser,
}) => {
  const loadProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
    });

    console.log(result);
  };

  const fabContainerStyles = useAnimatedStyle(() => {
    const top = interpolate(
      translationY.value,
      [-200, -160, -130, -110, 0, 80],
      [
        appbarHeight * 1.42 - FAB_DIMENSION / 2,
        SHRINK_IMAGE_HEIGHT * 3 - 15 - FAB_DIMENSION / 2,
        SHRINK_IMAGE_HEIGHT * 4 - 30 - FAB_DIMENSION / 2,
        IMAGE_DIMENSION - 110 - FAB_DIMENSION / 2,
        IMAGE_DIMENSION - FAB_DIMENSION / 2,
        IMAGE_DIMENSION + 80 - FAB_DIMENSION / 2,
      ],
      Extrapolate.CLAMP,
    );

    let scale;
    if (translationY.value >= -195) {
      scale = withTiming(1, withTimingConfig);
    } else {
      scale = withTiming(0, withTimingConfig);
    }

    return {
      position: 'absolute',
      top,
      left: width - FAB_DIMENSION - 20,
      transform: [{scale}],
    };
  });

  return (
    <Portal>
      <Animated.View style={[fabContainerStyles]}>
        <FAB
          onPress={isAuthenticatedUser ? loadProfilePicture : () => {}}
          animated={true}
          icon={isAuthenticatedUser ? 'camera-outline' : 'message-outline'}
          color={'white'}
          style={styles.fab}
        />
      </Animated.View>
    </Portal>
  );
};

export default FriendProfileFAB;

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#15c8ff',
    height: FAB_DIMENSION,
    width: FAB_DIMENSION,
    borderRadius: FAB_DIMENSION / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
