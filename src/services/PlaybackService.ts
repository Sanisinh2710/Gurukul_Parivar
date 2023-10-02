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
  try{
    
    await TrackPlayer.add(songs);
    return true;
  }
  catch(error)
  {
    console.log(error,"Tracks Add Error");
  }
}

export async function resetAndAddTracks(songs: Array<SongType>) {
  await TrackPlayer.reset();
  await TrackPlayer.add(songs);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export const PlaybackService =  async function() {
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

  // TrackPlayer.addEventListener(Event.PlaybackProgressUpdated , event =>{
  //   // console.log('Event.PlayBackProgress' , event);
  //   storage.set('trackProgress',JSON.stringify(event.position));
  // })
  // TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, event => {
  //   console.log('Event.PlaybackActiveTrackChanged', event);
  // });

  //   TrackPlayer.addEventListener(Event.PlaybackPlayWhenReadyChanged, event => {
  //     console.log('Event.PlaybackPlayWhenReadyChanged', event);
  //   });

  // TrackPlayer.addEventListener(Event.PlaybackState, event => {
  //   console.log('Event.PlaybackState', event);
  // });

  // TrackPlayer.addEventListener(
  //   Event.PlaybackMetadataReceived,
  //   async ({title, artist}) => {

  //     let trackIndex = await TrackPlayer.getCurrentTrack();
  //     let trackObject = await TrackPlayer.getTrack(trackIndex ?? 0);
  //     TrackPlayer.updateNowPlayingMetadata({
  //       artist: [title, artist].filter(Boolean).join(' - '),
  //       title: trackObject?.title,
  //       artwork: trackObject?.artwork,
  //     });
  //   },
  // );
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    // capabilities: [
    //   Capability.Play,
    //   Capability.Pause,
    //   Capability.SkipToNext,
    //   Capability.SkipToPrevious,
    //],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
    ],
    progressUpdateEventInterval: 2,
  });
}
