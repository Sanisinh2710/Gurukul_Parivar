import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {Track} from 'react-native-track-player';
import {CustomFonts} from '../../../utils';

type SongInfoProps = {
  track: Track;
};

export const SongInfo = ({track}: SongInfoProps): React.JSX.Element => {
  return (
    <>
      <View>
        <Text style={style.trackTitle}>
          {track?.id} {track?.title}
        </Text>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  trackTitle: {
    // ...CustomFonts.,
    fontSize: 16,
    color: '#000000',
    lineHeight: 20,
  },
});
