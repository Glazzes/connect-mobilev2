import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StackScreenParams} from '../../navigation/types/StackScreenParams';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {Appbar} from 'react-native-paper';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import ProfilePicture from './ProfilePicture';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerScreenParams } from '../../navigation/types/DrawerScreenParams';

type FriendProfileProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<StackScreenParams, 'FriendProfile'>,
    DrawerNavigationProp<DrawerScreenParams>
  >;
  route: RouteProp<StackScreenParams, 'FriendProfile'>;
};

const {width, height} = Dimensions.get('window');
const IMAGE_HEIGHT = 300;
const ANIMATION_CONFIG  = {
  duration: 200,
  easing: Easing.inOut(Easing.ease)
}

const FriendProfile: React.FC<FriendProfileProps> = ({navigation, route}) => {
  const user = route.params.friend;

  const translateY = useSharedValue<number>(0);
  const tyHeight = useSharedValue<number>(0);
  const isAtTop = useSharedValue<boolean>(true);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent, {y: number}
  >({
    onStart: (_, ctx) => {
      ctx.y = translateY.value
    },
    onActive: (e, ctx) => {
      const newValue = ctx.y + e.translationY
      
      if(newValue <= 0 && newValue >= -IMAGE_HEIGHT){
        translateY.value = newValue
      }

      if(translateY.value >= -5 && translateY.value <= 5){
        isAtTop.value = true
      }else{
        isAtTop.value = false
      }

      if(translateY.value >= -5 && isAtTop.value){
        tyHeight.value = e.translationY
      }
    },
    onEnd: _ => {
      tyHeight.value = withTiming(0, ANIMATION_CONFIG);
    }
  })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}]
    }
  })
  
  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[animatedStyles]}>
        <ProfilePicture tyHeight={tyHeight} picture={user.profilePicture} />
        <View style={styles.testingContainer} />
      </Animated.View>
    </PanGestureHandler>  
  );
};

export default FriendProfile;

const styles = StyleSheet.create({
  image: {
    width,
    height: 300
  },
  appbarContainer: {
    position: 'absolute',
    zIndex: 100,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
    width,
  },
  testingContainer: {
    width,
    height: height * 2,
    backgroundColor: '#202329',
  },
});
