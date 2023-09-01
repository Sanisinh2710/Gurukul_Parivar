// import TrackPlayer, {
//   AppKilledPlaybackBehavior,
//   Capability,
//   Event,
//   RepeatMode,
// } from 'react-native-track-player';
// import {SongList} from '../utils';

// export async function PlaybackService() {
//   TrackPlayer.addEventListener(Event.RemotePause, () => {
//     console.log('Event.RemotePause');
//     TrackPlayer.pause();
//   });

//   TrackPlayer.addEventListener(Event.RemotePlay, () => {
//     console.log('Event.RemotePlay');
//     TrackPlayer.play();
//   });

//   TrackPlayer.addEventListener(Event.RemoteNext, () => {
//     console.log('Event.RemoteNext');
//     TrackPlayer.skipToNext();
//   });

//   TrackPlayer.addEventListener(Event.RemotePrevious, () => {
//     console.log('Event.RemotePrevious');
//     TrackPlayer.skipToPrevious();
//   });
//   TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
//     console.log('Event.PlaybackQueueEnded', event);
//   });
// }

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
    // storage.set('trackSetup', JSON.stringify(true));
  } catch {
    await TrackPlayer.setupPlayer();
    // await TrackPlayer.updateOptions({
    //   android: {
    //     appKilledPlaybackBehavior:
    //       AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    //   },
    //   capabilities: [
    //     Capability.Play,
    //     Capability.Pause,
    //     Capability.SkipToNext,
    //     Capability.SkipToPrevious,
    //     Capability.SeekTo,
    //   ],
    //   compactCapabilities: [
    //     Capability.Play,
    //     Capability.Pause,
    //     Capability.SkipToNext,
    //   ],
    //   progressUpdateEventInterval: 2,
    // });

    isSetup = true;
    // storage.set('trackSetup', JSON.stringify(true));
  } finally {
    return isSetup;
  }
}

// export async function addTracks() {
//   await TrackPlayer.add(SongList);
//   await TrackPlayer.setRepeatMode(RepeatMode.Queue);
// }

import TrackPlayer, {Event} from 'react-native-track-player';

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    console.log('Event.RemoteSeek', event);
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async event => {
    console.log('Event.RemoteDuck', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
    console.log('Event.PlaybackQueueEnded', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackState, event => {
    console.log('Event.PlaybackState', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackMetadataReceived, event => {
    console.log('Event.PlaybackMetadataReceived', event);
  });

  TrackPlayer.addEventListener(
    Event.PlaybackMetadataReceived,
    async ({title, artist}) => {
      const activeTrackIndex = await TrackPlayer.getCurrentTrack();
      if (activeTrackIndex) {
        const activeTrack = await TrackPlayer.getTrack(activeTrackIndex);

        TrackPlayer.updateNowPlayingMetadata({
          artist: [title, artist].filter(Boolean).join(' - '),
          title: activeTrack?.title,
          artwork: activeTrack?.artwork,
        });
      }
    },
  );
}
