import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';
import {AllIcons} from '../../../../assets/icons';
import {COLORS} from '../../../utils';

const performSkipToNext = async () => {
  await TrackPlayer.skipToNext();
};
const performSkipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};

type ControlCentreProps = {
  playbackState: State;
};

export const ControlCentre = ({
  playbackState,
}: ControlCentreProps): React.JSX.Element => {
  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <>
      <View style={style.trackForwardControl}>
        <View onTouchEnd={performSkipToPrevious} style={style.forwardImage}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={AllIcons.ForwardControl}
          />
        </View>
        {playbackState === State.Buffering ? (
          <ActivityIndicator size={40} color={COLORS.primaryColor} />
        ) : (
          <View
            onTouchEnd={() => togglePlayback(playbackState)}
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
                playbackState === State.Playing
                  ? AllIcons.TrackPause
                  : AllIcons.TrackPlay
              }
            />
          </View>
        )}

        <View
          onTouchEnd={performSkipToNext}
          style={[
            style.forwardImage,
            {
              transform: [{rotate: '180deg'}],
            },
          ]}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={AllIcons.ForwardControl}
          />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  trackForwardControl: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  forwardImage: {
    width: 17,
    height: 17,
  },
});
