import React from 'react';

import {Image, StyleSheet, View} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {AllIcons} from '../../../../assets/icons';
import {SongControl} from '../../../screens';
import {PlayPauseButton} from './PlayPauseButton';

const performSkipToNext = () => TrackPlayer.skipToNext();
const performSkipToPrevious = () => TrackPlayer.skipToPrevious();

type PlayerControlProps = {
  songControl: SongControl;
};

export const PlayerControl = ({
  songControl,
}: PlayerControlProps): React.JSX.Element => {
  const playback = usePlaybackState();
  // const [queue, setQueue] = React.useState<Track[]>([]);
  // const [currentTrack, setCurrentTrack] = React.useState(0);

  // async function loadPlaylist() {
  //   const queue = await TrackPlayer.getQueue();
  //   setQueue(queue);
  // }

  // React.useEffect(() => {
  //   loadPlaylist();
  // }, []);

  // useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
  //   if (event.state == State.nextTrack) {
  //     TrackPlayer.getCurrentTrack().then(index => setCurrentTrack(index));
  //   }
  // });

  // const playerState = usePlaybackState();

  // async function handlePlayPress() {
  //   if ((await TrackPlayer.getState()) == State.Playing) {
  //     TrackPlayer.pause();
  //   } else {
  //     TrackPlayer.play();
  //   }
  // }

  return (
    <>
      <View style={style.trackForwardControl}>
        <View onTouchEnd={performSkipToPrevious} style={style.forwardImage}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={AllIcons.ForwardControl}
          />
        </View>
        <PlayPauseButton songStatus={songControl.status} />
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
