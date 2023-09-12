import React from 'react';

import {BASE_URL} from '@env';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  AppState,
  BackHandler,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  Track,
  usePlaybackState,
  useProgress,
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
import {
  GurkulAudioGetApi,
  addTracks,
  resetAndAddTracks,
  setupPlayer,
} from '../../../../services';
import {storage} from '../../../../storage';
import {RootStackParamList, SongType} from '../../../../types';
import {COLORS} from '../../../../utils';
import {styles} from './styles';

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

  const [loader, setLoader] = React.useState<boolean>(false);

  const [wantNewSong, setWantNewSongs] = React.useState<boolean>(false);

  const [allSongs, setAllSongs] = React.useState<Array<SongType | Track>>([]);

  const screenFocused = useIsFocused();

  const playbackState = usePlaybackState();

  const {position, duration} = useProgress();

  const setup = async () => {
    setLoader(true);
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();

    if (isSetup && queue.length <= 0) {
      try {
        const res = await GurkulAudioGetApi();

        if (res.resType === 'SUCCESS') {
          let Songs: Array<SongType> = [];

          const apiData: Array<any> = JSON.parse(
            JSON.stringify(res.data.gurukul_audios),
          );

          apiData.map((wholeitem, mainindex) => {
            let newItem: SongType = {
              id: '',
              url: '',
              title: '',
              artist: '',
              description: '',
            };
            newItem.url = `${BASE_URL}${wholeitem['audio']}`;
            newItem.id = wholeitem['id'] ?? '';
            newItem.title = wholeitem['title'] ?? '';
            newItem.description = wholeitem['description'] ?? '';
            newItem.artist = wholeitem['artist'] ?? '';

            Songs.push(newItem);
          });

          await addTracks(Songs);
          // dispatch(ADD_SONGS({songs: Songs}));
        }
      } catch (error) {
        console.log(error);
      }
    }
    const songs = await TrackPlayer.getQueue();

    setAllSongs(songs);
    setLoader(false);
    setIsPlayerReady(isSetup);
  };

  React.useMemo(async () => {
    await setup();
  }, []);

  React.useMemo(async () => {
    if (screenFocused && isPlayerReady) {
      const trackFromStore = storage.getString('currMusic');

      if (trackFromStore) {
        const trackData: {track: Track; position: number} =
          JSON.parse(trackFromStore);

        const currentTrackPosition = await TrackPlayer.getPosition();

        await TrackPlayer.skip(
          allSongs.findIndex((item: any) => item.id === trackData.track?.id),
          playbackState === State.Playing || playbackState === State.Paused
            ? currentTrackPosition
            : trackData.position,
        );
        setActiveTrack(trackData.track);
      }
    }
  }, [screenFocused, isPlayerReady]);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    async event => {
      switch (event.type) {
        case Event.PlaybackTrackChanged:
          if (
            playbackState !== State.Buffering &&
            playbackState !== State.Connecting &&
            playbackState !== State.Ready &&
            playbackState !== 'idle'
          ) {
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
          }
          break;

        case Event.PlaybackState:
          if (
            (playbackState === State.Playing ||
              playbackState === State.Paused ||
              playbackState === State.Stopped) &&
            playbackState !== 'idle'
          ) {
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
          }
          break;

        default:
          break;
      }
    },
  );

  const trackPlaying = React.useMemo((): 'PLAYING' | 'BUFFERING' | 'OTHER' => {
    return playbackState === State.Playing
      ? 'PLAYING'
      : playbackState === State.Buffering
      ? 'BUFFERING'
      : 'OTHER';
  }, [playbackState]);

  const trackPosition = React.useMemo(() => {
    return position;
  }, [position]);

  const onBackPress = React.useCallback(() => {
    if (activeTrack) {
      storage.set(
        'currMusic',
        JSON.stringify({track: activeTrack, position: trackPosition}),
      );

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }

    // Return true to stop default back navigaton
    // Return false to keep default back navigaton
    return true;
  }, [activeTrack, trackPosition]);

  const onBlurScreen = React.useCallback(() => {
    if (activeTrack) {
      storage.set(
        'currMusic',
        JSON.stringify({track: activeTrack, position: trackPosition}),
      );
    }

    // Return true to stop default back navigaton
    // Return false to keep default back navigaton
    return true;
  }, [activeTrack, trackPosition]);

  const ExitCallBack = React.useCallback(() => {
    // Add Event Listener for hardwareBackPress
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    const blurListner = AppState.addEventListener('blur', onBlurScreen);

    return () => {
      // Once the Screen gets blur Remove Event Listener
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      blurListner.remove();
    };
  }, [activeTrack, trackPosition]);

  Platform.OS === 'ios' ? null : useFocusEffect(ExitCallBack);

  const onRefresh = async () => {
    setWantNewSongs(true);
    let isSetup = await setupPlayer();

    if (isSetup) {
      try {
        const res = await GurkulAudioGetApi();

        if (res.resType === 'SUCCESS') {
          let Songs: Array<SongType> = [];

          const apiData: Array<any> = JSON.parse(
            JSON.stringify(res.data.gurukul_audios),
          );

          apiData.map((wholeitem, mainindex) => {
            let newItem: SongType = {
              id: '',
              url: '',
              title: '',
              artist: '',
              description: '',
            };
            newItem.url = `${BASE_URL}${wholeitem['audio']}`;
            newItem.id = wholeitem['id'] ?? '';
            newItem.title = wholeitem['title'] ?? '';
            newItem.description = wholeitem['description'] ?? '';
            newItem.artist = wholeitem['artist'] ?? '';

            Songs.push(newItem);
          });
          await resetAndAddTracks(Songs);
        }
      } catch (error) {
        console.log(error);
      }
      const songs = await TrackPlayer.getQueue();

      setAllSongs(songs);
    }
    setWantNewSongs(false);
  };

  if (!isPlayerReady) {
    return <Loader screenHeight={'100%'} />;
  } else if (loader) {
    return <Loader screenHeight={'100%'} />;
  } else {
    return (
      <ScreenWrapper>
        <ScreenHeader
          showLeft={true}
          headerTitleAlign={'left'}
          leftOnPress={onBackPress}
          headerTitle={t('frontDesk.Connect')}
          headerRight={{
            icon: AllIcons.Filter,
            onPress: () => {},
          }}
        />
        <View
          style={[commonStyle.commonContentView, {flex: 1, marginTop: '3%'}]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="always"
            contentContainerStyle={{
              paddingBottom: '20%',
            }}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl
                colors={[COLORS.primaryColor, COLORS.green]}
                refreshing={wantNewSong}
                onRefresh={onRefresh}
              />
            }>
            <Text style={{color: '#000'}}>Search</Text>
            <View>
              {allSongs.length > 0 && (
                <FlatList
                  data={allSongs}
                  overScrollMode="always"
                  scrollEnabled={false}
                  contentContainerStyle={{
                    paddingBottom: '40%',
                  }}
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
                          {item.id == activeTrack?.id &&
                          trackPlaying === 'BUFFERING' ? (
                            <ActivityIndicator
                              size={25}
                              color={COLORS.primaryColor}
                            />
                          ) : (
                            <Image
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                              source={
                                item.id == activeTrack?.id &&
                                trackPlaying === 'PLAYING'
                                  ? AllIcons.PauseSong
                                  : AllIcons.PlaySong
                              }
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
          </ScrollView>
        </View>
        <>
          {activeTrack && (
            <View style={style.trackControlContainer}>
              <MusicPlayer
                playbackState={playbackState}
                activeTrack={activeTrack}
                position={position}
                duration={duration}
              />
            </View>
          )}
        </>
      </ScreenWrapper>
    );
  }
};
