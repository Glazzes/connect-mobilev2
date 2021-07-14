import React, {useEffect, useState} from 'react';
import FastImage, {OnProgressEvent} from 'react-native-fast-image';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackScreenParams } from '../../navigation/types/StackScreenParams';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const image = require('../../assets/pics/one.jpg');
const imageDimensions = {width: 821, height: 1280};
const {width, height} = Dimensions.get('window');

type ImageMessageProps = {
  navigation: StackNavigationProp<StackScreenParams, 'Home'>;
}

const ImageMessage: React.FC<ImageMessageProps> = ({navigation}) => {
  const [dimension, setDimensions] = useState({width: 1, height: 1});
  const [opacity, setOpacity] = useState<0 | 1>(0);

  const onImageDownload = (event: OnProgressEvent) => {
    console.log(
      `Loaded => ${event.nativeEvent.loaded} total => ${event.nativeEvent.total}`,
    );
  };

  const goToFullScreen = () => {
    navigation.navigate('FullScreenImageMessage', {id: 'one'});
    setOpacity(0);
  }

  useFocusEffect(() => {
    if(navigation.isFocused()){
      setOpacity(1);
    }
  })

  return (
    <View style={[styles.container, {opacity}]}>
      <TouchableWithoutFeedback
        style={styles.image}
        onPress={goToFullScreen}
      >
        <View style={styles.image}>
          <SharedElement id={'one'}>
            <Image 
              source={image}
              style={styles.image}
            />
          </SharedElement>
        </View>
      </TouchableWithoutFeedback>
      {
        /*
        <FastImage
        source={{
          uri: require('../../assets/messages/large.jpg'),
          cache: FastImage.cacheControl.immutable,
        }}
        onProgress={onImageDownload}
        style={[
          styles.image,
          {aspectRatio: dimension.width / dimension.height},
        ]}
        />
         */
      }
    </View>
  );
};

export default ImageMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    minWidth: width / 2,
    maxWidth: width / 2,
    height: undefined,
    aspectRatio: (imageDimensions.width / 2) / (imageDimensions.height / 2),
    borderRadius: 5
  },
});
