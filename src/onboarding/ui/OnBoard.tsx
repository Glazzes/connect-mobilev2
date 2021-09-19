import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {OnBoardStackScreenParams} from '../navigation/OnBoardStackScreenParams';
import {features} from '../util/features';
import Footer from './Footer';
import Slide from './Slide';

type OnBoardProps = {
  navigation: StackNavigationProp<OnBoardStackScreenParams, 'onBoard'>;
};

const OnBoard: React.FC<OnBoardProps> = ({navigation}) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const offsetX = useSharedValue<number>(0);

  const scrollHanlder = useAnimatedScrollHandler({
    onScroll: event => {
      offsetX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={scrollHanlder}
        ref={scrollViewRef}>
        {features.map((feature, index) => {
          const isLast = index === features.length - 1;

          return (
            <Slide
              navigation={navigation}
              feature={feature}
              key={`feature-${index}`}
              isLast={isLast}
            />
          );
        })}
      </Animated.ScrollView>
      <Footer scrollViewRef={scrollViewRef} offsetX={offsetX} />
    </View>
  );
};

export default OnBoard;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
