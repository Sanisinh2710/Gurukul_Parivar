import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
  Track,
} from 'react-native-track-player';

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

  //   TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
  //     console.log('Event.RemoteJumpForward', event);
  //     TrackPlayer.seekBy(event.interval);
  //   });

  //   TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
  //     console.log('Event.RemoteJumpBackward', event);
  //     TrackPlayer.seekBy(-event.interval);
  //   });

  // TrackPlayer.addEventListener(Event.RemoteSeek, event => {
  //   console.log('Event.RemoteSeek', event);
  //   TrackPlayer.seekTo(event.position);
  // });

  // TrackPlayer.addEventListener(Event.RemoteDuck, async event => {
  //   console.log('Event.RemoteDuck', event);
  // });

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

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks(SongList: Array<Track>) {
  try {
    await TrackPlayer.add(SongList);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } catch (error) {
    console.log('Add Track', error);
  }
}
