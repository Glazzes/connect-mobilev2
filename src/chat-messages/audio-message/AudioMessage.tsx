import React from 'react';
import {View} from 'react-native';
import {Audio} from 'expo-av';

const AudioMessage: React.FC = () => {
  return (
    <View>
      <Audio source={require('../../assets/audio/PixelEmpire.mp3')} />
    </View>
  )
}

export default AudioMessage;
