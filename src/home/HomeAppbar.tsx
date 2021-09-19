import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Appbar, IconButton} from 'react-native-paper';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {emitter} from '../shared/utils/EventEmitter';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type HomeAppbarProps = {
  progress: Animated.SharedValue<number>;
};

const HomeAppbar: React.FC<HomeAppbarProps> = ({progress}) => {
  const animate = () => {
    emitter.emit('animate');
  };

  const rInputStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(progress.value, [0, 1], [0, 270]),
    };
  });

  return (
    <Appbar.Header style={styles.appbar}>
      <Animated.View style={{flexDirection: 'row'}}>
        <IconButton icon={'menu'} onPress={animate} />
        <AnimatedTextInput
          style={[styles.input, rInputStyle]}
          numberOfLines={1}
        />
      </Animated.View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#202329',
    elevation: 0,
  },
  input: {
    backgroundColor: '#202733',
    width: 0,
    color: 'white',
    borderRadius: 5,
  },
});

export default HomeAppbar;
