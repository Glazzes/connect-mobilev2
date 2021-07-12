import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { StackScreenParams } from '../../navigation/types/StackScreenParams';
import {snapPoint, useVector} from 'react-native-redash';
import { RouteProp } from '@react-navigation/native';

const image = require('../../assets/pics/one.jpg');
const imageDimensions = {width: 821, height: 1280};
const {width, height} = Dimensions.get('window');

type FullScreenImageMessageProps = {
    navigation: StackNavigationProp<StackScreenParams, 'FullScreenImageMessage'>;
    route: RouteProp<StackScreenParams, 'FullScreenImageMessage'>;
}

const FullScreenImageMessage: React.FC<FullScreenImageMessageProps> = ({route, navigation}) => {
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

  const imageStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 10 : 0, {duration: 200})  
    }  
  })

  return(
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.container, style]}>
        <SharedElement id={route.params.id}>
          <Animated.Image source={image} style={[styles.image]} />    
        </SharedElement>
      </Animated.View>  
    </PanGestureHandler>
  )  
}

export default FullScreenImageMessage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'  
  },
  image: {
    maxWidth: width,
    minWidth: width,
    height: undefined,
    aspectRatio: imageDimensions.width / imageDimensions.height
  }  
})