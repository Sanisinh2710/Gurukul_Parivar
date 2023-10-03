import {ControlCentre, SongInfo, SongProgress} from '@components';
import React from 'react';
import {State, Track} from 'react-native-track-player';

type MusicPlayerProps = {
  playbackState: State;
  activeTrack: Track;
  position: number;
  duration: number;
};

export const MusicPlayer = ({
  playbackState,
  activeTrack,
  position,
  duration,
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
      <SongProgress position={position} duration={duration} />
      <ControlCentre playbackState={playbackState} />
    </>
  );
};
