import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
} from 'react-native-track-player';
import {SongType} from '../types';

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
  console.log(songs, 'to be added');
  await TrackPlayer.add(songs);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function resetAndAddTracks(songs: Array<SongType>) {
  const queue = await TrackPlayer.getQueue();

  let newSongs: Array<SongType> = [];

  queue.map((queueItem, index) => {
    newSongs.push(songs.find(item => item.id != queueItem?.id)!);
  });

  console.log(newSongs, 'to be added');

  // await TrackPlayer.reset();
  await TrackPlayer.add(newSongs);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

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
}
