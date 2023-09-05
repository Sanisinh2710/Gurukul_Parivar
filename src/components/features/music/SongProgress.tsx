import React from 'react';

import {Slider} from '@miblanchard/react-native-slider';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {CustomFonts} from '../../../utils';

const format = (time: number) => {
  return new Date(time * 1000).toISOString().substring(15, 19);
};

export const SongProgress = (): React.JSX.Element => {
  const {position, duration} = useProgress();

  const [progress, setProgress] = React.useState(position);

  React.useEffect(() => {
    if (position) {
      setProgress(position);
    }
  }, [position]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <View style={{width: '11%', alignItems: 'center'}}>
          <Text style={style.trackProgressText}>{format(position)}</Text>
        </View>
        <View style={{width: '75%'}}>
          <Slider
            trackStyle={{width: '100%', height: 3.5, borderRadius: 10}}
            animateTransitions={true}
            animationType="timing"
            minimumTrackTintColor="#DBB159"
            maximumTrackTintColor="#78788029"
            thumbStyle={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#70eaff',
              elevation: 10,
              height: 25,
              width: 25,
              borderRadius: 28,
            }}
            trackClickable={true}
            value={progress}
            minimumValue={0}
            maximumValue={duration}
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value[0]);
              setProgress(value[0]);
            }}
          />
        </View>
        <View style={{width: '11%', alignItems: 'center'}}>
          <Text style={style.trackProgressText}>{format(duration)}</Text>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  trackProgressText: {
    ...CustomFonts.body.large14,
    fontSize: 12,
    color: '#171717',
    lineHeight: 16,
  },
});
