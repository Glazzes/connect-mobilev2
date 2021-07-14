import React, { useRef } from 'react'
import { Dimensions, StyleSheet, Image } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { StackScreenParams } from '../../navigation/types/StackScreenParams';
import {snapPoint, useVector} from 'react-native-redash';
import { RouteProp } from '@react-navigation/native';
import { withTimingAnimationConfig } from '../../shared/utils/AnimationConfig';

type FullScreenImageMessageProps = {
    navigation: StackNavigationProp<StackScreenParams, 'FullScreenImageMessage'>;
    route: RouteProp<StackScreenParams, 'FullScreenImageMessage'>;
}

const image = require('../../assets/pics/one.jpg');
const imageDimensions = {width: 821, height: 1280};
const {width, height} = Dimensions.get('window');

const FullScreenImageMessage: React.FC<FullScreenImageMessageProps> = ({route, navigation}) => {
  const panRef = useRef<PanGestureHandler>();
  const pinchRef = useRef<PinchGestureHandler>();

  const translate = useVector(0, 0);
  const isGestureActive = useSharedValue<boolean>(false);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: _ => isGestureActive.value = true,  
    onActive: e => {
      translate.x.value = e.translationX;
      translate.y.value = e.translationY;  
    },
    onEnd: e => {
      const destination = snapPoint(translate.y.value, e.velocityY, [0, height]);
      if(destination === height){
        runOnJS(navigation.goBack)()
      }else{
        translate.x.value = withSpring(0, {velocity: e.velocityX});
        translate.y.value = withSpring(0, {velocity: e.velocityY}); 
      }

      isGestureActive.value = false
    }  
  })  

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translate.y.value,
      [0, height],
      [1, 0.3],
      Extrapolate.CLAMP  
    )

    return {
      transform: [
        {translateX: translate.x.value},
        {translateY: translate.y.value},
        {scale}
      ]  
    }  
  });

  const gestureScale = useSharedValue<number>(1)
  const t = useVector(0, 0)

  const pinchHandler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {originX: number, originY: number, scale: number}
  >({
    onStart: (e, ctx) => {
      ctx.scale = gestureScale.value;
    },
    onActive: ({scale, focalX, focalY}, ctx) => {
      gestureScale.value = ctx.scale + (scale - 1);
      console.log(`x ${focalX}, y: ${focalY}, scale ${scale}`)
    }
  })

  const imageStyle = useAnimatedStyle(() => {
    const radius = isGestureActive.value
      ? withTiming(15, withTimingAnimationConfig)
      : withTiming(0, withTimingAnimationConfig);

    return {
      borderRadius: radius,
      transform: [
        {translateX: t.x.value},
        {translateY: t.y.value},
        {scale: gestureScale.value}
      ]
    }  
  })

  return(
    <PinchGestureHandler 
      onGestureEvent={pinchHandler}
      ref={pinchRef}
      simultaneousHandlers={panRef}
      enabled={true}
      >
      <Animated.View style={[styles.container, style]}>
        <PanGestureHandler 
          onGestureEvent={onGestureEvent}
          ref={panRef}
          simultaneousHandlers={pinchRef}  
          
        >
          <Animated.View style={[styles.image, imageStyle]}>
            <SharedElement id={route.params.id}>
              <Image source={image} style={styles.image} onLayout={(e => {
                console.log(e.nativeEvent.layout.height)
              })} />    
            </SharedElement>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>  
    </PinchGestureHandler>
  )  
}

export default FullScreenImageMessage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    maxWidth: width,
    minWidth: width,
    height: undefined,
    aspectRatio: imageDimensions.width / imageDimensions.height,
    overflow: 'hidden',
  }  
})