import React from 'react';

import {ActivityIndicator, Image, View} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';
import {AllIcons} from '../../../../assets/icons';
import {COLORS} from '../../../utils';

type PlayPauseButtonProps = {
  songStatus: boolean;
};

export const PlayPauseButton = ({
  songStatus,
}: PlayPauseButtonProps): React.JSX.Element => {
  const [playing, setPlaying] = React.useState<
    'PLAYING' | 'PAUSE' | 'BUFFERING'
  >();

  React.useMemo(async () => {
    const TrackPlayerState = await TrackPlayer.getState();

    if (TrackPlayerState == State.Playing) {
      setPlaying('PLAYING');
    } else if (TrackPlayerState == State.Buffering) {
      setPlaying('BUFFERING');
    } else {
      setPlaying('PAUSE');
    }
  }, [songStatus]);

  console.log(playing, 'playing in button');

  return (
    <>
      {playing === 'BUFFERING' ? (
        <ActivityIndicator color={COLORS.primaryColor} size={25} />
      ) : (
        <View
          onTouchEnd={
            playing === 'PLAYING' ? TrackPlayer.pause : TrackPlayer.play
          }
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            shadowColor: '#3dadfc',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.15,
            shadowRadius: 13.84,
            elevation: 7,
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={
              playing === 'PAUSE' ? AllIcons.TrackPause : AllIcons.TrackPlay
            }
          />
        </View>
      )}
    </>
  );
};
