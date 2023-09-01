import React from 'react';

import {Slider} from '@miblanchard/react-native-slider';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {CustomFonts} from '../../../utils';

const format = (time: number) => {
  let minutes = Math.trunc(time / 60)
    .toString()
    .padStart(2, '0');
  let second = (Math.trunc(time) % 60).toString().padStart(2, '0');
  return `${minutes}:${second}`;
};

export const TrackProgress = React.memo((): React.JSX.Element => {
  const {position, duration} = useProgress();

  const progress = React.useMemo(() => {
    return position / duration;
  }, [position, duration]);

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
              elevation: 5,
              height: 25,
              width: 25,
              borderRadius: 28,
            }}
            trackClickable={false}
            value={progress}
            // onSlidingComplete={value => {
            //   setProgress(value[0]);
            //   TrackPlayer.seekTo(value[0] * duration);

            // }}
            onSlidingComplete={value => TrackPlayer.seekTo(value[0])}
          />
        </View>
        <View style={{width: '11%', alignItems: 'center'}}>
          <Text style={style.trackProgressText}>{format(duration)}</Text>
        </View>
      </View>
    </>
  );
});

const style = StyleSheet.create({
  trackProgressText: {
    ...CustomFonts.body.large14,
    fontSize: 12,
    color: '#171717',
    lineHeight: 16,
  },
});
