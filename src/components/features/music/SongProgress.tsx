import React from 'react';

import { Slider } from '@miblanchard/react-native-slider';
import { StyleSheet, Text, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { CustomFonts } from '../../../utils';

const format = (time: number) => {
  return new Date(time * 1000)
    .toISOString()
    .substring(11, 19)
    .substring(0, 2) === '00'
    ? new Date(time * 1000).toISOString().substring(14, 19)
    : new Date(time * 1000).toISOString().substring(11, 19);
};

type SongProgressProps = {
  position: number;
  duration: number;
};

export const SongProgress = ({
  position,
  duration,
}: SongProgressProps): React.JSX.Element => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (position >= 0) {
      setProgress(position);
    }
  }, [position]);

  return (
    <>
      <View
        style={style.songProgressMianView}>
        <View style={style.progressCountView}>
          <Text style={style.trackProgressText}>{format(progress)}</Text>
        </View>
        <View style={{ width: '70%' }}>
          <Slider
            trackStyle={style.trackStyle}
            animateTransitions={true}
            animationType="timing"
            minimumTrackTintColor="#DBB159"
            maximumTrackTintColor="#78788029"
            thumbStyle={style.thumbStyle}
            trackClickable={true}
            value={progress}
            minimumValue={0}
            maximumValue={duration}
            onValueChange={async value => {
              setProgress(value[0]);
            }}
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value[0]);
              setProgress(value[0]);
            }}
          />
        </View>
        <View style={style.progressCountView}>
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
  songProgressMianView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  progressCountView: { width: '15%', alignItems: 'center' },
  trackStyle: { width: '100%', height: 3.5, borderRadius: 10 },
  thumbStyle: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#70eaff',
    elevation: 10,
    height: 25,
    width: 25,
    borderRadius: 28,
  }
});
