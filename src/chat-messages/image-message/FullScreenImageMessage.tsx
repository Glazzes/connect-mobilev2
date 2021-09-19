import React, {useState} from 'react';
import {Dimensions, StyleSheet, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import FullImage from 'react-native-image-zoom-viewer';
import {StackScreenParams} from '../../navigation/stack/StackScreenParams';
import {useVector} from 'react-native-redash';
import {RouteProp} from '@react-navigation/native';

type FullScreenImageMessageProps = {
  navigation: StackNavigationProp<StackScreenParams, 'FullScreenImageMessage'>;
  route: RouteProp<StackScreenParams, 'FullScreenImageMessage'>;
};

const image = require('../../assets/pics/one.jpg');
const imageDimensions = {width: 821, height: 1280};
const {width, height} = Dimensions.get('window');

const FullScreenImageMessage: React.FC<FullScreenImageMessageProps> = ({
  route,
  navigation,
}) => {
  const [imageHeight, setImageHeight] = useState<number>(0);

  const translate = useVector(0, 0);
  const pinchScale = useSharedValue<number>(1);

  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = translate.x.value;
      ctx.y = translate.y.value;
    },
    onActive: ({translationX, translationY}, ctx) => {
      const X_BOUNDARY = width / 4;
      const Y_BOUNDARY = imageHeight / 4;

      const currentX = ctx.x + translationX;
      const currentY = ctx.y + translationY;

      if (currentX >= -X_BOUNDARY && currentX <= X_BOUNDARY) {
        translate.x.value = currentX;
      }

      if (currentY >= -Y_BOUNDARY && currentY <= Y_BOUNDARY) {
        translate.y.value = currentY;
      }
    },
    onEnd: ({velocityX, velocityY}) => {
      const X_BOUNDARY = (width * pinchScale.value - width) / 4;
      const Y_BOUNDARY = (height * pinchScale.value - height) / 4;

      translate.x.value = withDecay({
        velocity: velocityX,
        clamp: [-X_BOUNDARY, X_BOUNDARY],
      });
      translate.y.value = withDecay({
        velocity: velocityY,
        clamp: [-Y_BOUNDARY, Y_BOUNDARY],
      });
    },
  });

  const pinchHandler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {scale: number}
  >({
    onStart: (_, ctx) => {
      ctx.scale = pinchScale.value;
    },
    onActive: ({scale, focalX, focalY}, ctx) => {
      translate.x.value = -1 * (focalX - width / 2) * (scale - 1);
      translate.y.value = -1 * (focalY - imageHeight / 2) * (scale - 1);
      pinchScale.value = ctx.scale + (scale - 1);
    },
    onEnd: _ => {
      if (pinchScale.value < 1) {
        pinchScale.value = withTiming(1, {duration: 300});
      }
    },
  });

  const tapHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onActive: ({x, y}) => {
      if (pinchScale.value >= 1) {
        translate.x.value = withTiming(0, {duration: 300});
        translate.y.value = withTiming(0, {duration: 300});
        pinchScale.value = withTiming(1, {duration: 300});
      }

      if (pinchScale.value === 1) {
        let tx = -1 * (x - width / 2);
        let ty = -1 * (y - height / 2);

        console.log(tx, ty);

        if (tx > 100) {
          tx = 80;
        }
        if (tx <= -100) {
          tx = -80;
        }

        translate.x.value = withTiming(tx, {duration: 300});
        translate.y.value = withTiming(ty, {duration: 300});
        pinchScale.value = withTiming(2, {duration: 300});
      }
    },
  });

  const pinchStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translate.x.value},
        {translateY: translate.y.value},
        {scale: pinchScale.value},
      ],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={styles.container}>
        <PanGestureHandler onGestureEvent={panHandler} maxPointers={1}>
          <Animated.View>
            <TapGestureHandler numberOfTaps={2} onGestureEvent={tapHandler}>
              <Animated.View style={[styles.image, pinchStyles]}>
                <SharedElement id={`f-image-${route.params.id}`}>
                  <Image
                    source={image}
                    style={styles.image}
                    onLayout={e => setImageHeight(e.nativeEvent.layout.height)}
                  />
                </SharedElement>
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default FullScreenImageMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: width,
    minWidth: width,
    height: undefined,
    aspectRatio: imageDimensions.width / imageDimensions.height,
    overflow: 'hidden',
  },
});
