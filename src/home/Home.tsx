import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import HomeAppbar from './HomeAppbar';
import {emitter} from '../shared/utils/EventEmitter';
import UserSearchResult from './UserSearchResult';

const Home: React.FC = () => {
  const progress = useSharedValue<number>(0);

  useEffect(() => {
    emitter.addListener('animate', () => {
      progress.value = progress.value === 0 ? withTiming(1) : withTiming(0);
    });

    return () => {
      emitter.removeAllListeners();
    };
  }, [progress]);

  return (
    <View style={styles.root}>
      <HomeAppbar progress={progress} />
      <UserSearchResult />
      <UserSearchResult />
      <UserSearchResult />
      <UserSearchResult />
      <UserSearchResult />
      <UserSearchResult />
      <UserSearchResult />
      <UserSearchResult />
      <UserSearchResult />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#202430',
  },
});
