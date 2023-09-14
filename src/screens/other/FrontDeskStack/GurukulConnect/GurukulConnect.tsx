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
  DropDownModel,
  Loader,
  MusicPlayer,
  ScreenHeader,
  ScreenWrapper,
  SearchBar,
} from '../../../../components';
import {
  ADD_UPDATE_SONGS,
  SET_ACTIVE_TRACKDATA,
} from '../../../../redux/ducks/musicSlice';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  GurkulAudioCategoriesGetApi,
  GurkulAudioGetApi,
  GurkulAudioGetFromCategoriesGetApi,
  addTracks,
  resetAndAddTracks,
  setupPlayer,
} from '../../../../services';
import {RootStackParamList, SongType} from '../../../../types';
import {COLORS, CustomFonts} from '../../../../utils';
import {styles} from './styles';

async function handleControl(wantToPlayItemId: any) {
  try {
    const allTracks = await TrackPlayer.getQueue();
    const skipToIndex = allTracks.findIndex(
      item => item?.id === wantToPlayItemId,
    );

    const trackStatus = await TrackPlayer.getState();
    const track = await TrackPlayer.getCurrentTrack();

    if (skipToIndex != track) {
      await TrackPlayer.skip(skipToIndex);
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

  const [loader, setLoader] = React.useState<boolean>(false);

  const [wantNewSong, setWantNewSongs] = React.useState<boolean>(false);

  const [isSearching, setIsSearching] = React.useState<boolean>(false);

  const {allSongs, activeTrack, activeTrackPosition, selectedCategories} =
    useAppSelector(state => state.music);

  const [searchData, setSearchData] = React.useState<Array<SongType | Track>>([
    ...allSongs,
  ]);

  const [modal, setModal] = React.useState(false);
  const [categoryList, setCategoryList] = React.useState<Array<any>>([]);
  const [selectedItem, setSelectedItem] = React.useState<Array<any>>([]);

  const dispatch = useAppDispatch();

  const screenFocused = useIsFocused();

  const playbackState = usePlaybackState();

  const {position, duration} = useProgress();

  const setup = async () => {
    setLoader(true);
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();

    console.log(queue.length, 'queue setup time');

    if (isSetup && queue.length <= 0) {
      try {
        const res = await GurkulAudioGetApi();

        console.log('audio got from api');

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
            newItem.is_multiple = wholeitem['is_multiple'] ?? false;

            Songs.push(newItem);
          });
          console.log('backend data receoivd');

          await addTracks([
            ...Songs.filter(item => item.is_multiple === false),
          ]);
          console.log('came in try track added');

          dispatch(ADD_UPDATE_SONGS({songs: Songs}));
          const playingTrack = await TrackPlayer.getTrack(0);
          if (playingTrack !== null) {
            if (activeTrack && activeTrackPosition) {
              const newQueue = await TrackPlayer.getQueue();
              await TrackPlayer.skip(
                newQueue.findIndex((item: any) => item.id === activeTrack?.id),
                activeTrackPosition,
              );
              const currentTrackDuration = await TrackPlayer.getDuration();

              await TrackPlayer.updateMetadataForTrack(
                newQueue.findIndex((item: any) => item.id === activeTrack?.id),
                {
                  title: activeTrack?.title,
                  artist: activeTrack?.artist,
                  duration: currentTrackDuration,
                },
              );
              dispatch(
                SET_ACTIVE_TRACKDATA({
                  activeTrackDataPayload: {
                    track: activeTrack,
                    position: activeTrackPosition,
                  },
                }),
              );
            } else {
              dispatch(
                SET_ACTIVE_TRACKDATA({
                  activeTrackDataPayload: {
                    track: playingTrack,
                  },
                }),
              );
            }
          }

          console.log('dispatch done');
        }
      } catch (error) {
        console.log(error);
      }
    }
    const response = await GurkulAudioCategoriesGetApi();

    if (response.resType === 'SUCCESS') {
      setCategoryList(response.data.categories);
    }

    setLoader(false);
    setIsPlayerReady(isSetup);
  };

  React.useMemo(async () => {
    await setup();
  }, []);

  React.useMemo(async () => {
    if (selectedItem.length > 0) {
      setLoader(true);

      const response = await GurkulAudioGetFromCategoriesGetApi(selectedItem);

      if (response.resType === 'SUCCESS') {
        console.log(response.data.gurukul_audios, 'response fetched success');
      }

      setLoader(false);
    }
  }, [selectedItem]);

  // React.useMemo(async () => {
  //   if (screenFocused && isPlayerReady) {
  //     const queue = await TrackPlayer.getQueue();

  //     console.log('queue llength in screen focused', queue.length);

  //     if (
  //       queue.length > 0 &&
  //       playbackState !== State.Playing &&
  //       playbackState !== State.Paused &&
  //       activeTrack &&
  //       activeTrackPosition
  //     ) {
  //       console.log('came in if');

  //       await TrackPlayer.skip(
  //         queue.findIndex((item: any) => item.id === activeTrack?.id),
  //         activeTrackPosition,
  //       );
  //     } else {
  //       console.log('came in else');
  //       const playingTrackIndex = await TrackPlayer.getCurrentTrack();
  //       console.log('came in else', playingTrackIndex);

  //       if (playingTrackIndex !== null) {
  //         const playingTrack = await TrackPlayer.getTrack(playingTrackIndex);
  //         if (playingTrack !== null) {
  //           dispatch(
  //             SET_ACTIVE_TRACKDATA({
  //               activeTrackDataPayload: {
  //                 track: playingTrack,
  //               },
  //             }),
  //           );
  //         }
  //       }
  //     }
  //   }
  // }, [screenFocused, isPlayerReady]);

  React.useEffect(() => {
    if (allSongs.length > 0) {
      setSearchData(allSongs);
    }
  }, [allSongs]);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    async event => {
      switch (event.type) {
        case Event.PlaybackTrackChanged:
          if (
            playbackState !== State.Buffering &&
            playbackState !== State.Connecting &&
            playbackState !== 'idle'
          ) {
            const playingTrack = await TrackPlayer.getTrack(event.nextTrack);

            const currentTrackDuration = await TrackPlayer.getDuration();

            if (playingTrack !== null) {
              await TrackPlayer.updateMetadataForTrack(event.nextTrack, {
                title: playingTrack?.title,
                artist: playingTrack?.artist,
                duration: currentTrackDuration,
              });

              dispatch(
                SET_ACTIVE_TRACKDATA({
                  activeTrackDataPayload: {
                    track: playingTrack,
                  },
                }),
              );
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

              if (playingTrack1 !== null) {
                await TrackPlayer.updateMetadataForTrack(currTrack, {
                  title: playingTrack1?.title,
                  artist: playingTrack1?.artist,
                  duration: currentTrackDuration1,
                });
              }

              if (playingTrack1 !== null) {
                dispatch(
                  SET_ACTIVE_TRACKDATA({
                    activeTrackDataPayload: {
                      track: playingTrack1,
                    },
                  }),
                );
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
      dispatch(
        SET_ACTIVE_TRACKDATA({
          activeTrackDataPayload: {track: activeTrack, position: trackPosition},
        }),
      );

      navigation.goBack();
    } else {
      navigation.goBack();
    }

    return true;
  }, [activeTrack, trackPosition]);

  const onBlurScreen = React.useCallback(() => {
    if (activeTrack) {
      dispatch(
        SET_ACTIVE_TRACKDATA({
          activeTrackDataPayload: {track: activeTrack, position: trackPosition},
        }),
      );
    }

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
            newItem.is_multiple = wholeitem['is_multiple'] ?? false;

            Songs.push(newItem);
          });

          await resetAndAddTracks([
            ...Songs.filter(item => item.is_multiple === false),
          ]);

          dispatch(ADD_UPDATE_SONGS({songs: Songs}));
        }
      } catch (error) {
        console.log(error);
      }
      const playingTrack = await TrackPlayer.getTrack(0);
      if (playingTrack !== null) {
        dispatch(
          SET_ACTIVE_TRACKDATA({
            activeTrackDataPayload: {
              track: playingTrack,
            },
          }),
        );
      }
    }
    setWantNewSongs(false);
  };

  if (!isPlayerReady || loader || isSearching) {
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
            onPress: () => {
              setModal(true);
            },
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="always"
          contentContainerStyle={[
            commonStyle.commonContentView,
            {
              paddingBottom: '20%',
              marginTop: '3%',
            },
          ]}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl
              colors={[COLORS.primaryColor, COLORS.green]}
              refreshing={wantNewSong}
              onRefresh={onRefresh}
            />
          }>
          <SearchBar
            setSearchData={setSearchData}
            dataForSearch={[...allSongs]}
            placeholder={t('common.SearchSpeech')}
            setIsSearching={setIsSearching}
          />

          {Array.isArray(selectedItem) && selectedItem.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                flexWrap: 'wrap',
                marginVertical: '1.5%',
              }}>
              {selectedItem.map((mainitem, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: COLORS.primaryLightColor,
                      paddingLeft: 16,
                      paddingRight: 10,
                      height: 35,
                      alignItems: 'center',
                      borderRadius: 60,
                      gap: 10,
                    }}>
                    <Text
                      style={{
                        ...CustomFonts.body.large14,
                        fontSize: 16,
                        color: COLORS.black,
                      }}>
                      {categoryList.find(item => item.id === mainitem)?.name}
                    </Text>
                    <View
                      onTouchEnd={() => {
                        let newValues: string[] = JSON.parse(
                          JSON.stringify(selectedItem),
                        );
                        newValues.splice(index, 1);
                        setSelectedItem(newValues);
                      }}
                      style={{
                        width: 14,
                        height: 14,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={AllIcons.RoundCross}
                        style={{
                          flex: 1,
                          tintColor: COLORS.primaryColor,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          <View>
            {allSongs.length > 0 && (
              <FlatList
                data={searchData}
                overScrollMode="always"
                scrollEnabled={false}
                contentContainerStyle={{
                  paddingBottom: activeTrack ? '40%' : 0,
                }}
                renderItem={({item, index}) => (
                  <View
                    key={index}
                    style={[
                      style.songContainer,
                      {
                        borderColor:
                          item?.id == activeTrack?.id
                            ? 'rgba(172, 43, 49, 1)'
                            : 'rgba(172, 43, 49, 0.3)',
                      },
                    ]}>
                    <View>
                      <Text style={style.songTitle}>
                        {item?.id}
                        {'. '}
                        {item?.title}
                      </Text>
                      <Text style={style.songArtist}>{item?.description}</Text>
                    </View>
                    {item.is_multiple === true ? (
                      <View
                        onTouchEnd={() => {}}
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View style={{height: 15, width: 15}}>
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              resizeMode: 'contain',
                              tintColor: COLORS.primaryColor,
                              transform: [
                                {
                                  rotate: '270deg',
                                },
                              ],
                            }}
                            source={AllIcons.ChevronArrowDown}
                          />
                        </View>
                        <View style={{height: 15, width: 15, marginLeft: -7}}>
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              resizeMode: 'contain',
                              tintColor: COLORS.primaryColor,
                              transform: [
                                {
                                  rotate: '270deg',
                                },
                              ],
                            }}
                            source={AllIcons.ChevronArrowDown}
                          />
                        </View>
                      </View>
                    ) : (
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
                            handleControl(item?.id);
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
                                item?.id == activeTrack?.id &&
                                trackPlaying === 'PLAYING'
                                  ? AllIcons.PauseSong
                                  : AllIcons.PlaySong
                              }
                            />
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                )}
              />
            )}
          </View>
        </ScrollView>
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
        <DropDownModel
          modelVisible={modal}
          setModelVisible={setModal}
          modalHeight="70%"
          type="multi-select"
          inputList={categoryList}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          wantResetButton={true}
          label="G-connect Categories"
          wantApplyButton={true}
        />
      </ScreenWrapper>
    );
  }
};
