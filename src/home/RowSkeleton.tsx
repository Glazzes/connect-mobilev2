import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width: ROW_WIDTH} = Dimensions.get('window');

const RowSkeleton: React.FC = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.circle} />
      <View style={styles.info}></View>
    </View>
  );
};

export default RowSkeleton;

const CIRCLE_SIZE = 50;
const PADDING_H = 10;
const PADDING_V = 5;

export const SKELETON_HEIGHT = CIRCLE_SIZE + PADDING_V;

const styles = StyleSheet.create({
  rootContainer: {
    width: ROW_WIDTH,
    paddingHorizontal: PADDING_H,
    paddingVertical: PADDING_V,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  info: {
    paddingHorizontal: PADDING_H,
    paddingVertical: PADDING_V,
    flexGrow: 1,
  },
});
