import React from 'react';
import {State, Track} from 'react-native-track-player';
import {ControlCentre} from './ControlCentre';
import {SongInfo} from './SongInfo';
import {SongProgress} from './SongProgress';

type MusicPlayerProps = {
  playbackState: State;
  activeTrack: Track;
};

export const MusicPlayer = ({
  playbackState,
  activeTrack,
}: MusicPlayerProps): React.JSX.Element => {
  const [track, setTrack] = React.useState<Track>(activeTrack);

  React.useEffect(() => {
    if (activeTrack) {
      setTrack(activeTrack);
    }
  }, [activeTrack]);

  return (
    <>
      <SongInfo track={track} />
      <SongProgress />
      <ControlCentre playbackState={playbackState} />
    </>
  );
};
