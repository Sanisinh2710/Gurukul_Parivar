import TrackPlayer, {RepeatMode, Track} from 'react-native-track-player';
import {SongList} from '../utils';

export const DefaultRepeatMode = RepeatMode.Queue;

export const QueueInitialTracksService = async (): Promise<void> => {
  await TrackPlayer.add([...(SongList as Track[])]);
  await TrackPlayer.setRepeatMode(DefaultRepeatMode);
};
