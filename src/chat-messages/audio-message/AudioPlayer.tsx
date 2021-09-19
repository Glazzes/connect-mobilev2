import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import {MAX_LINE_HEIGHT, LINE_WIDTH, getFakeSpectrum} from './fakeSpectrum';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'

type AudioPlayerProps = {
  durationMillis: number;
  positionMillis: Animated.SharedValue<number>;
}

const {width} = Dimensions.get('window');

const AudioPlayer: React.FC<AudioPlayerProps> = ({durationMillis, positionMillis}) => {
  const uas = useAnimatedStyle(() => {
    return {
      width: interpolate(
        positionMillis.value,
        [0, durationMillis],
        [0, width],
        Extrapolate.CLAMP
      )
    }
  }); 

  return (
    <View style={styles.container}>
      
        <MaskedView
          style={{height: 200, width: 400}}
          maskElement={
            <View style={styles.spectrum}>
              {durationMillis > 0 &&
                getFakeSpectrum().map((line, index) => {
                  const style = {
                    height: line,
                    width: LINE_WIDTH,
                    backgroundColor: 'orange'
                  }

                  return <View style={style} key={`line-${index}`}/>
                })
              }
            </View>
          }
        >
          <Animated.View style={[styles.player, uas]} />
        </MaskedView>

    </View>
  )
}

export default React.memo(AudioPlayer);

const styles = StyleSheet.create({
  container: {
    width,
    height: 200,
    backgroundColor: 'grey'
  },
  player: {
    height: 100,
    backgroundColor: 'red',
  },
  spectrum: {
    height: MAX_LINE_HEIGHT,
    width: width * 0.6,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  line: {
    width: LINE_WIDTH,
  },
  masked: {
    backgroundColor: 'transparent',
    height: 100,
    width: 300
  },
})
