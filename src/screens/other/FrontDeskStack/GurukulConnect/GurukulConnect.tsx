import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import TrackPlayer, {State, Track} from 'react-native-track-player';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  PlayerControl,
  ScreenHeader,
  ScreenWrapper,
  TrackInfo,
  TrackProgress,
} from '../../../../components';
import {QueueInitialTracksService, setupPlayer} from '../../../../services';
import {RootStackParamList} from '../../../../types';
import {COLORS, SongList} from '../../../../utils';
import {styles} from './styles';

export type SongControl = {
  status?: boolean;
  songId?: string | number;
  songTitle?: string;
};

async function handleControl(item: any) {
  try {
    const trackStatus = await TrackPlayer.getState();
    const track = await TrackPlayer.getCurrentTrack();
    if (item != track) {
      TrackPlayer.skip(item);
      TrackPlayer.play();
    } else if (trackStatus == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  } catch (e) {
    console.log(e);
  }
}

// const format = (time: number) => {
//   let minutes = Math.trunc(time / 60)
//     .toString()
//     .padStart(2, '0');
//   let second = (Math.trunc(time) % 60).toString().padStart(2, '0');
//   return `${minutes}:${second}`;
// };

// const TrackSet = (value: any) => {
//   let n = value[0] * 267;
//   return n;
// };

export const GurukulConnect = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const commonStyle = CommonStyle();
  const style = styles();
  const {t} = useTranslation();
  const [songControl, setSongControl] = React.useState<SongControl>();
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);

  const [activeTrack, setActiveTrack] = React.useState<Track>();

  React.useMemo(async () => {
    const getCurrentTrackIndex = await TrackPlayer.getCurrentTrack();

    if (getCurrentTrackIndex !== null && getCurrentTrackIndex !== undefined) {
      const newTrack = await TrackPlayer.getTrack(getCurrentTrackIndex);

      if (newTrack) {
        setActiveTrack(newTrack);
      }
    }
  }, [songControl, TrackPlayer]);

  React.useMemo(async () => {
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();

    if (isSetup && queue.length <= 0) {
      await QueueInitialTracksService();
    }

    setIsPlayerReady(isSetup);
  }, []);

  console.log(activeTrack, 'active');

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  } else {
    return (
      <ScreenWrapper>
        <ScreenHeader
          showLeft={true}
          headerTitleAlign={'left'}
          leftOnPress={() => {
            navigation.goBack();
          }}
          headerTitle={t('frontDesk.Connect')}
          headerRight={{
            icon: AllIcons.Filter,
            onPress: () => {},
          }}
        />
        <View style={[commonStyle.commonContentView, {flex: 1, marginTop: 25}]}>
          <Text style={{color: '#000'}}>Search</Text>
          <View>
            <FlatList
              data={SongList}
              renderItem={({item, index}) => (
                <View
                  key={index}
                  style={[
                    style.songContainer,
                    {
                      borderColor:
                        item.id == songControl?.songId
                          ? 'rgba(172, 43, 49, 1)'
                          : 'rgba(172, 43, 49, 0.3)',
                    },
                  ]}>
                  <View>
                    <Text style={style.songTitle}>
                      {item.id}
                      {'. '}
                      {item.title}
                    </Text>
                    <Text style={style.songArtist}>{item.artist}</Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 6}}>
                    <View style={{height: 24, width: 24}}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                          tintColor: COLORS.primaryColor,
                        }}
                        source={AllIcons.DownloadSong}
                      />
                    </View>
                    <View
                      onTouchEnd={() => {
                        handleControl(index);
                        if (songControl) {
                          if (songControl.songId != item.id) {
                            let cloneControl = {...songControl};
                            cloneControl.songId = item.id;
                            cloneControl.songTitle = item.title;
                            cloneControl.status = true;
                            setSongControl(cloneControl);
                          } else {
                            setSongControl({
                              ...songControl,
                              status: !songControl?.status,
                            });
                          }
                        } else {
                          let cloneControl: SongControl = {};
                          cloneControl.songId = item.id;
                          cloneControl.songTitle = item.title;
                          cloneControl.status = true;
                          setSongControl(cloneControl);
                        }
                      }}
                      style={{height: 24, width: 24}}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                        source={
                          item.id == songControl?.songId && songControl?.status
                            ? AllIcons.PauseSong
                            : AllIcons.PlaySong
                        }
                      />
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        <>
          {songControl && (
            <View style={style.trackControlContainer}>
              <TrackInfo track={activeTrack} />
              <TrackProgress />
              <PlayerControl songControl={songControl} />
            </View>
          )}
        </>
      </ScreenWrapper>
    );
  }
};
