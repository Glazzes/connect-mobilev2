import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ChatStackParamList} from '../../navigation/types/ChatStackParamList';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {Appbar} from 'react-native-paper';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

type FriendProfileProps = {
  navigation: StackNavigationProp<ChatStackParamList, 'FriendProfile'>;
  route: RouteProp<ChatStackParamList, 'FriendProfile'>;
};

const FriendProfile: React.FC<FriendProfileProps> = ({navigation, route}) => {
  const user = route.params.friend;

  // styles
  const pictureBorderRadius = useSharedValue<number>(0);
  const pictureImageHeight = useSharedValue<number>(height / 2);
  const pictureImageWidth = useSharedValue<number>(width);

  const appBarBgColor = useSharedValue<number>(0);

  const animatedAppbarStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        appBarBgColor.value,
        [180, 250],
        ['transparent', '#202329'],
        'RGB',
      ),
    };
  });

  const animatedPictureStyles = useAnimatedStyle(() => {
    return {
      width: pictureImageWidth.value,
      height: pictureImageHeight.value,
      borderRadius: pictureBorderRadius.value,
    };
  });

  const scrollHanlder = useAnimatedScrollHandler({
    onScroll: event => {
      appBarBgColor.value = event.contentOffset.y;
    },

  });

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Animated.View style={[styles.appbarContainer, animatedAppbarStyles]}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color={'white'} onPress={goBack} />
        </Appbar.Header>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHanlder}>
        <Animated.View>
          <Animated.Image
            source={{uri: user.profilePicture}}
            style={animatedPictureStyles}
          />
          <View style={styles.testingContainer} />
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

export default FriendProfile;

const styles = StyleSheet.create({
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
    height,
    backgroundColor: '#202329',
  },
});
