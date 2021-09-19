import React, { useEffect } from 'react'
import { StyleSheet, Dimensions, BackHandler } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type SearchProps = {
  progress: Animated.SharedValue<number>;
}

const Search: React.FC<SearchProps> = ({progress}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: progress.value}]
    }
  });

  const onBackPress = () => {
    if(progress.value === 1){
      progress.value = withTiming(0);
      return true;
    }  
    
    return false;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);  
    }
  }, []);

  return (
    <Animated.View style={[styles.root, rStyle]}>

    </Animated.View>  
  );  
}

export default Search

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'orange',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  }  
});