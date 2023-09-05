import React from 'react';

import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, View} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  Track,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Loader,
  MusicPlayer,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {addTracks, setupPlayer} from '../../../../services';
import {RootStackParamList} from '../../../../types';
import {COLORS, SongList} from '../../../../utils';
import {styles} from './styles';

export type SongControl = {
  status?: boolean;
  songId: string | number;
  songTitle: string;
};

async function handleControl(item: any) {
  try {
    const trackStatus = await TrackPlayer.getState();
    const track = await TrackPlayer.getCurrentTrack();
    if (item != track) {
      await TrackPlayer.skip(item);
      await TrackPlayer.play();
    } else if (trackStatus == State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  } catch (e) {
    console.log(e);
  }
}

export const GurukulConnect = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const commonStyle = CommonStyle();
  const style = styles();
  const {t} = useTranslation();
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);

  const [activeTrack, setActiveTrack] = React.useState<Track>();

  const screenFocused = useIsFocused();

  const playbackState = usePlaybackState();

  const setup = async () => {
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();

    if (isSetup && queue.length <= 0) {
      await addTracks();
    }

    setIsPlayerReady(isSetup);
  };

  React.useMemo(async () => {
    await setup();
  }, []);

  React.useMemo(async () => {
    if (screenFocused) {
      const currTrack = await TrackPlayer.getCurrentTrack();

      if (currTrack !== null) {
        let playingTrack1 = await TrackPlayer.getTrack(currTrack);

        if (playingTrack1) {
          setActiveTrack(playingTrack1);
        }
      }
    }
  }, [screenFocused]);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    async event => {
      switch (event.type) {
        case Event.PlaybackTrackChanged:
          const playingTrack = await TrackPlayer.getTrack(event.nextTrack);

          const currentTrackDuration = await TrackPlayer.getDuration();

          await TrackPlayer.updateMetadataForTrack(event.nextTrack, {
            title: playingTrack?.title,
            artist: playingTrack?.artist,
            duration: currentTrackDuration,
          });

          if (playingTrack !== null) {
            setActiveTrack(playingTrack);
          }
          break;

        case Event.PlaybackState:
          const currTrack = await TrackPlayer.getCurrentTrack();

          if (currTrack !== null) {
            const playingTrack1 = await TrackPlayer.getTrack(currTrack);

            const currentTrackDuration1 = await TrackPlayer.getDuration();

            await TrackPlayer.updateMetadataForTrack(currTrack, {
              title: playingTrack1?.title,
              artist: playingTrack1?.artist,
              duration: currentTrackDuration1,
            });

            if (playingTrack1 !== null) {
              setActiveTrack(playingTrack1);
            }
          }
          break;

        default:
          break;
      }
    },
  );

  const trackPlaying = React.useMemo(() => {
    return playbackState === State.Playing ? true : false;
  }, [playbackState]);

  if (!isPlayerReady) {
    return <Loader screenHeight={'100%'} />;
  } else {
    return (
      <ScreenWrapper>
        <ScreenHeader
          showLeft={true}
          headerTitleAlign={'left'}
          leftOnPress={() => navigation.goBack()}
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
                        item.id == activeTrack?.id
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
                      }}
                      style={{height: 24, width: 24}}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                        source={
                          item.id == activeTrack?.id && trackPlaying
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
          {activeTrack && (
            <View style={style.trackControlContainer}>
              <MusicPlayer
                playbackState={playbackState}
                activeTrack={activeTrack}
              />
            </View>
          )}
        </>
      </ScreenWrapper>
    );
  }
};
