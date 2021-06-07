import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {FlatList, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import axios from 'axios';
import UserTextMessage from '../../chat-messages/text-message/UserTextMessage';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ChatRoom: React.FC = () => {
  const [blogs, setBlogs] = useState<string[]>([]);

  const renderItem = useRef(({item}: {item: string}, index: number) => (
    <UserTextMessage message={item} key={index} />
  )).current;

  const keyExtractor = blog => {
    return blog.id;
  };

  useEffect(() => {
    axios
      .get('http://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const mappedBlogs = response.data.map(blog => blog.title);
        setBlogs(mappedBlogs);
      })
      .catch(_ => console.log('sex'));
  }, []);

  return (
    <View style={styles.rootContainer}>
      <AnimatedFlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
