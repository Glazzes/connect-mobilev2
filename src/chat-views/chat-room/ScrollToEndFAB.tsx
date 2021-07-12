import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { FAB, Portal } from 'react-native-paper'
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated'

type ScrollToEndFABProps = {
  shouldDisplayFAB: Animated.SharedValue<boolean>;
  scrollRef: any;
}

const {width, height} = Dimensions.get('window');

const FAB_SIZE = 60;
const MARGIN = 10;
const ANIMATION_CONFIG = {
  duration: 100,
  easing: Easing.inOut(Easing.ease)  
}

const ScrollToEndFAB: React.FC<ScrollToEndFABProps> = ({shouldDisplayFAB, scrollRef}) => {
  const style = useAnimatedStyle(() => {
    const top = shouldDisplayFAB.value 
      ? withTiming(height - (FAB_SIZE + MARGIN), ANIMATION_CONFIG)
      : withTiming(height, ANIMATION_CONFIG)
    
    return {top}  
  })  

  return (
    <Portal>
      <Animated.View style={[styles.fabContainer, style]}>
        <FAB 
          color={'white'}
          icon={'chevron-down'}
          animated={true}
          onPress={()=> scrollRef?.current?.scrollToOffset({offset: height})}
          style={styles.fab}
        />    
      </Animated.View>  
    </Portal>    
  )
}

export default ScrollToEndFAB

const styles = StyleSheet.create({
  fabContainer: {
    left: width - (FAB_SIZE + MARGIN),
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE/2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    backgroundColor: '#37c6ff'
  }
});
