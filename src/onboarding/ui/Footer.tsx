import React, {RefObject} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

type DotProps = {
  index: number;
  offsetX: Animated.SharedValue<number>;
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const Dot: React.FC<DotProps> = ({index, offsetX}) => {
  const rStyle = useAnimatedStyle(() => {
    const backgroundColor =
      Math.round(offsetX.value / SCREEN_WIDTH) === index
        ? withTiming('#00AEE1', {duration: 150})
        : '#202329';

    return {
      borderRadius: 12.5,
      height: 20,
      width: 20,
      backgroundColor,
      borderColor: '#00AEE1',
      borderWidth: 1,
    };
  });

  return <Animated.View style={rStyle} />;
};

type FooterProps = {
  offsetX: Animated.SharedValue<number>;
  scrollViewRef: RefObject<Animated.ScrollView>;
};

const Footer: React.FC<FooterProps> = ({offsetX, scrollViewRef}) => {
  const onPress = () => {
    if (scrollViewRef.current) {
      // @ts-ignore
      scrollViewRef.current.scrollTo({
        x: offsetX.value + SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const rStyle = useAnimatedStyle(() => {
    const translateY =
      Math.round(offsetX.value / SCREEN_WIDTH) == 3
        ? withTiming(100, {duration: 750})
        : withTiming(0);

    return {
      transform: [{translateY}],
    };
  });

  return (
    <Animated.View style={[styles.root, rStyle]}>
      <View style={styles.dotContainer}>
        {new Array(4).fill(0).map((_, index) => {
          return <Dot index={index} offsetX={offsetX} key={`dot-${index}`} />;
        })}
      </View>
      <IconButton
        icon={'arrow-right'}
        color={'#00AEE1'}
        size={25}
        onPress={onPress}
      />
    </Animated.View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
});
