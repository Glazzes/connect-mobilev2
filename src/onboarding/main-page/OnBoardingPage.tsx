import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import features from './Features';
import SlideImage from './SlideImage';
import Dot from './Dot';
import Slide from './Slide';

const {width, height} = Dimensions.get('screen');

const OnBoardingPage: React.FC = () => {
  const navigation = useNavigation();
  const scrollRef = useRef<Animated.ScrollView>(null);
  const scrollValue = useSharedValue<number>(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollValue.value = event.contentOffset.x;
    },
  });

  const translateStyles = useAnimatedStyle(() => {
    return {
      translateX: -scrollValue.value,
    };
  });

  return (
    <View style={styles.root}>
      <View style={styles.imageList}>
        <Animated.ScrollView
          ref={scrollRef}
          style={styles.imageList}
          onScroll={scrollHandler}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          horizontal>
          {features.map(({id, image}, index) => (
            <View>
              <SlideImage
                key={id}
                currentScrollPosition={scrollValue}
                route={image}
                index={index}
              />
            </View>
          ))}
        </Animated.ScrollView>
      </View>
      <View style={styles.dotSection}>
        {features.map(({id}, index) => (
          <Dot key={id} animated={scrollValue} index={index} />
        ))}
      </View>
      <View style={{flex: 1}}>
        <Animated.View style={[translateStyles, styles.contentSection]}>
          {features.map(({id, title, content}, index) => {
            const onPress = () => {
              if (scrollRef.current) {
                scrollRef.current?.scrollTo({
                  x: width * (index + 1),
                  animated: true,
                });
              }
            };

            const last: boolean = index === features.length - 1;

            return (
              <Slide
                key={id}
                navigation={navigation}
                title={title}
                content={content}
                index={index}
                onPress={onPress}
                last={last}
              />
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
};

export default OnBoardingPage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageList: {
    width,
    height: height * 0.55,
  },
  dotSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  contentSection: {
    width: width * features.length,
    flexDirection: 'row',
  },
});