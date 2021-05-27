import React, {useEffect, useState} from 'react';
import FastImage, {OnProgressEvent} from 'react-native-fast-image';

import {Image, View} from 'react-native';

const ImageMessage: React.FC = () => {
  const [dimension, setDimensions] = useState({width: 1, height: 1});

  const onImageDownload = (event: OnProgressEvent) => {
    console.log(
      `Loaded => ${event.nativeEvent.loaded} total => ${event.nativeEvent.total}`,
    );
  };

  useEffect(() => {
    Image.getSize(
      'https://static1.e621.net/data/c7/af/c7afb50e16d97d2f98e5db950399ce54.png',
      (width, height) => setDimensions({width, height}),
      _ => console.log('Could not get dimensions'),
    );
  }, []);

  return (
    <View>
      <FastImage
        source={{
          uri:
            'https://static1.e621.net/data/c7/af/c7afb50e16d97d2f98e5db950399ce54.png',
          cache: FastImage.cacheControl.immutable,
        }}
        onProgress={onImageDownload}
        style={{
          minWidth: '75%',
          maxWidth: '75%',
          height: undefined,
          aspectRatio: dimension.width / dimension.height,
        }}
      />
    </View>
  );
};

export default ImageMessage;