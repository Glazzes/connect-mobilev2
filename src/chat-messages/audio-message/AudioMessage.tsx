import React, { useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {Audio, AVPlaybackStatus} from 'expo-av';
import { IconButton } from 'react-native-paper';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import AudioPlayer from './AudioPlayer';

const AudioMessage: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound>(new Audio.Sound());
  const [status, setStatus] = useState<AVPlaybackStatus>();

  const positionMillis = useSharedValue<number>(0);

  function updatePositionInMillis(status: AVPlaybackStatus):void{
    'worklet';
    positionMillis.value = withTiming(
      // @ts-ignore
      status?.positionMillis,
      {duration: 1000}
    );
  }

  const playSound = () => {
    // @ts-ignore
    if(status.isPlaying){
      sound.pauseAsync()
        .then(status => setStatus(status))
        .catch(_ => console.log('Status playing, but could not resume play'));
    }else{
      sound.playAsync()
        .then(status => setStatus(status))
        .catch(e => console.log(e));
    }
  }

  useEffect(() => {
    (async () => {
      try{
        let status = await sound.loadAsync(require('../../assets/audio/Chartreuse.mp3'));
        sound._onPlaybackStatusUpdate = updatePositionInMillis;
        status = await sound.setProgressUpdateIntervalAsync(1000);
        
        setSound(sound);
        setStatus(status);
      }catch(e){
        console.log('error loading mp3 file');
      }
    })()

    return () => {
      (async() => {
        await sound.unloadAsync();
      })();
    }
  }, [])

  return (
    <View style={styles.container}>
      <IconButton 
        animated={true}
        // @ts-ignore
        icon={status?.isPlaying ? 'pause' : 'play'}
        color={'white'}
        size={40}
        style={styles.playButton} 
        onPress={playSound} 
      />
      <AudioPlayer 
        positionMillis={positionMillis}
        // @ts-ignore
        durationMillis={status?.durationMillis ?? 0}  
      />
    </View>
  )
};

export default AudioMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playButton: {
    backgroundColor: 'blue',
  }
})
