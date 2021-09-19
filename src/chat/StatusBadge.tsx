import React from 'react';
import {StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

type StatusBadgeProps = {
  scale: Animated.SharedValue<number>;
  size: number;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({scale, size}) => {
  const rStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={[styles.root, rStyle]}>
      <Badge style={styles.badge} size={size} />
    </Animated.View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 36,
    left: 37,
  },
  badge: {
    backgroundColor: '#00AEE1',
    borderWidth: 1,
    borderColor: '#202329',
  },
});
