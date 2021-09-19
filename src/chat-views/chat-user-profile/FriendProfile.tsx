import React, {useState} from 'react';
import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StackScreenParams} from '../../navigation/stack/StackScreenParams';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';

type FriendProfileProps = {
  navigation: StackNavigationProp<StackScreenParams, 'FriendProfile'>;
  route: RouteProp<StackScreenParams, 'FriendProfile'>;
};

type context = {y: number};

const {width: IMAGE_SIZE, height} = Dimensions.get('window');
const SHRINK_IMAGE_HEIGHT = 60;
const SYNCHRONIZATION_MARGIN = 5;
const HIO = require('../../assets/pics/hio.png');

const FriendProfile: React.FC<FriendProfileProps> = ({navigation, route}) => {
  const user = route.params.friend;

  const [isGestureEnabled, setIsGestureEnabled] = useState<boolean>(true);
  const [appbarHeight, setAppbarHeight] = useState<number>(0);
  const [backIcon, setBackIconWidth] = useState<number>(0);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const onLayoutAppbar = (e: LayoutChangeEvent) => {
    setAppbarHeight(e.nativeEvent.layout.height);
  };

  const onLayoutBackIcon = (e: LayoutChangeEvent) => {
    setBackIconWidth(e.nativeEvent.layout.width);
  };

  const translationY = useSharedValue<number>(0);
  const scrollY = useSharedValue<number>(0);
  const clampedScrollY = useDerivedValue(() => {
    return Math.max(Math.min(scrollY.value, 0), -1200);
  });

  const tapGestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onActive: _ => {
        translationY.value = withTiming(0, {
          duration: 450,
          easing: Easing.inOut(Easing.quad),
        });
      },
    },
  );

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    context
  >({
    onStart: (event, context) => {
      context.y = translationY.value;
    },
    onActive: (event, context) => {
      const newTranslationY = context.y + event.translationY;
      translationY.value = Math.max(newTranslationY, -200);
    },
    onEnd: _ => {
      if (translationY.value >= -110) {
        translationY.value = withTiming(0);
      }

      if (translationY.value <= -111 && translationY.value >= -160) {
        translationY.value = withTiming(-160);
      }
    },
  });

  const imageAnimatedStyles = useAnimatedStyle(() => {
    const actualHeight = interpolate(
      translationY.value,
      [-210, -160, -130, -110, 0, 80],
      [
        appbarHeight * 0.75,
        appbarHeight * 1.3,
        appbarHeight * 2,
        IMAGE_SIZE - 110,
        IMAGE_SIZE,
        IMAGE_SIZE + 80,
      ],
      Extrapolate.CLAMP,
    );

    const actualWidth = interpolate(
      translationY.value,
      [-210, -160, -130, -110],
      [appbarHeight * 0.75, appbarHeight * 1.3, appbarHeight * 2, IMAGE_SIZE],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translationY.value,
      [-210, -160, -130, -110],
      [
        (appbarHeight * 0.75) / 2,
        (appbarHeight * 1.5) / 2,
        (appbarHeight * 2) / 2,
        0,
      ],
      Extrapolate.CLAMP,
    );

    const translateY = interpolate(
      translationY.value,
      [-200, -160, -130, -110],
      [30, 70, 70, 0],
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(
      translationY.value,
      [-200, -160, -130, -110],
      [60, 10, 10, 0],
      Extrapolate.CLAMP,
    );

    return {
      height: actualHeight,
      width: actualWidth,
      borderRadius,
      transform: [{translateY}, {translateX}],
    };
  });

  const animatedContainerStyles = useAnimatedStyle(() => {
    const actualHeight = interpolate(
      translationY.value,
      [-200, -160, -130, -110, 0, 80],
      [
        appbarHeight * 1.42,
        SHRINK_IMAGE_HEIGHT * 3 - 15,
        SHRINK_IMAGE_HEIGHT * 4 - 30,
        IMAGE_SIZE - 110 - SYNCHRONIZATION_MARGIN,
        IMAGE_SIZE - SYNCHRONIZATION_MARGIN,
        IMAGE_SIZE + 80 - SYNCHRONIZATION_MARGIN,
      ],
      Extrapolate.CLAMP,
    );

    return {height: actualHeight};
  });

  return (
    <View style={styles.root}>
      <View>
        <Appbar.Header style={styles.appbar} onLayout={onLayoutAppbar}>
          <Appbar.BackAction
            color={'white'}
            onLayout={onLayoutBackIcon}
            onPress={goBack}
          />
          <Appbar.Action icon={'dots-vertical'} color={'white'} />
        </Appbar.Header>
        <PanGestureHandler
          onGestureEvent={panGestureHandler}
          enabled={isGestureEnabled}>
          <Animated.View>
            <Animated.View
              style={[styles.imageContainer, animatedContainerStyles]}>
              <TapGestureHandler
                onGestureEvent={tapGestureHandler}
                numberOfTaps={1}>
                <Animated.Image source={HIO} style={[imageAnimatedStyles]} />
              </TapGestureHandler>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default FriendProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  appbar: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    elevation: 0,
    width: IMAGE_SIZE,
    position: 'absolute',
    zIndex: 500,
  },
  imageContainer: {
    backgroundColor: 'rgb(52,52,52)',
    width: IMAGE_SIZE,
    zIndex: 100,
  },
  image: {
    width: IMAGE_SIZE,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    zIndex: 500,
    marginLeft: 10,
  },
});
