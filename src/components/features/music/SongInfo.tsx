import React from 'react';

import {CustomFonts} from '@utils';
import {StyleSheet, Text, View} from 'react-native';
import MarqueeText from 'react-native-marquee';
import {Track} from 'react-native-track-player';

type SongInfoProps = {
  track: Track;
};

export const SongInfo = ({track}: SongInfoProps): React.JSX.Element => {
  return (
    <View style={{flexDirection: 'row', gap: 5}}>
      <Text style={style.trackTitle}>{track?.id}.</Text>
      <MarqueeText
        style={style.trackTitle}
        speed={0.2}
        marqueeOnStart={true}
        loop={true}
        delay={1000}>
        {track?.title}
      </MarqueeText>
    </View>
  );
};

const style = StyleSheet.create({
  trackTitle: {
    ...CustomFonts.header.small18,
    fontSize: 16,
    color: '#000000',
    lineHeight: 20,
  },
});
