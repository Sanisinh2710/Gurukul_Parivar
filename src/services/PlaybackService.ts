import {SongType} from '@types';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        // Capability.SkipToNext,
        // Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      // compactCapabilities: [
      //   Capability.Play,
      //   Capability.Pause,
      //   Capability.SkipToNext,
      // ],
      // progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks(songs: Array<SongType>) {
  await TrackPlayer.add(songs);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function resetAndAddTracks(songs: Array<SongType>) {
  await TrackPlayer.reset();
  await TrackPlayer.add(songs);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export const PlaybackService = async function () {
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

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
    console.log('Event.PlaybackQueueEnded', event);
  });
};
