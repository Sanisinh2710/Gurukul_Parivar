import React from 'react';
import {
  FlatList,
  Image,
  Text,
  AppState,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  DropDownModel,
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
  SearchBar,
  TrackControl,
} from '../../../../components';
import {RootStackParamList, SongType} from '../../../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {useTranslation} from 'react-i18next';
import TrackPlayer, {
  Event,
  State,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {addTracks, setupPlayer} from '../../../../services/PlaybackService';
import {COLORS, downloadSong} from '../../../../utils';
import {styles} from './styles';
import {storage} from '../../../../storage';
import {useIsFocused} from '@react-navigation/native';
import {
  GurkulAudioApi,
  GurkulAudioCategoriesGetApi,
} from '../../../../services';
import Toast from 'react-native-simple-toast';
import {BASE_URL} from '@env';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  ADD_UPDATE_SONGS,
  SET_ACTIVE_TRACKDATA,
} from '../../../../redux/ducks/musicSlice';

export const GurukulConnect = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const screenGoToAlbum = React.useRef(false);
  const {allSongs, activeTrack, activeTrackPosition, selectedCategories} =
    useAppSelector(state => state.music);
  const dispatch = useAppDispatch();
  const commonStyle = CommonStyle();
  const style = styles();
  const {t} = useTranslation();

  const [songData, setSongData] = React.useState<Array<any>>([...allSongs]);
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [loader, setLoader] = React.useState({
    status: false,
    index: -1,
  });

  const [categoryList, setCategoryList] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState<string[]>([]);
  const screenFocused = useIsFocused();
  const {position} = useProgress();

  const handleControl = async (itemId: any) => {
    try {
      const isAlbum = songData.filter(item => item.id == activeTrack?.id);
      console.log(isAlbum, 'Is Album >><<>><>><>');
      if (isAlbum.length > 0) {
        if (isAlbum[0].is_multiple) {
          screenGoToAlbum.current = false;
          await TrackPlayer.reset();
          await setup();
        }
      }
      const trackStatus = await TrackPlayer.getState();
      const track = await TrackPlayer.getCurrentTrack();
      const queue = await TrackPlayer.getQueue();

      const trackSkipIndex = queue.findIndex(item => item.id == itemId);

      if (trackSkipIndex != track) {
        await TrackPlayer.skip(trackSkipIndex);
        await TrackPlayer.play();
      } else if (trackStatus == State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setDataToRedux = async (response: any) => {
    const trackStatus: State = await TrackPlayer.getState();
    console.log('Set Redux calling....', screenGoToAlbum.current, trackStatus);

    if (
      response.resType === 'SUCCESS' &&
      response.data.gurukul_audios.length > 0
    ) {
      const SongList: Array<SongType> = [];
      const trackList: Array<any> = [];

      response.data.gurukul_audios.forEach((audioObj: any) => {
        if (!audioObj.is_multiple) {
          trackList.push({
            id: audioObj.id,
            title: audioObj.title,
            url: BASE_URL + audioObj.audio,
            status: trackStatus == State.Playing ? true : false,
            description: audioObj.description,
          });
        }
        SongList.push({
          id: audioObj.id,
          title: audioObj.title,
          url: BASE_URL + audioObj.audio,
          status: trackStatus == State.Playing ? true : false,
          description: audioObj.description,
          is_multiple: audioObj.is_multiple,
        });
      });

      if (
        (screenGoToAlbum.current == false && trackStatus == State.Paused) ||
        trackStatus == State.None
      ) {
        await addTracks(trackList);
        dispatch(ADD_UPDATE_SONGS({songs: SongList}));
        const track = await TrackPlayer.getTrack(0);
        if (track != null) {
          dispatch(
            SET_ACTIVE_TRACKDATA({
              activeTrackDataPayload: {
                track: track,
              },
            }),
          );
        }
      } else {
        dispatch(ADD_UPDATE_SONGS({songs: SongList}));
      }
    }
  };

  const setup = async () => {
    try {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      const response = await GurkulAudioApi();
      console.log(queue, 'Queues');
      if (isSetup && queue.length <= 0) {
        await setDataToRedux(response);
      } else {
        await setDataToRedux(response);
        screenGoToAlbum.current = true;
      }
      setIsPlayerReady(isSetup);
    } catch (e) {
      console.log('Player Setup Error', e);
    }
  };

  React.useMemo(async () => {
    setup();

    const response = await GurkulAudioCategoriesGetApi();

    if (response.resType === 'SUCCESS') {
      setCategoryList(response.data.categories);
    }
  }, []);

  React.useMemo(() => {
    if (screenFocused) {
      setup();
    }
  }, [screenFocused]);

  React.useEffect(() => {
    if (allSongs.length > 0) {
      setSongData(allSongs);
    }
  }, [allSongs]);

  useTrackPlayerEvents(
    [
      Event.PlaybackTrackChanged,
      Event.PlaybackState,
      Event.PlaybackProgressUpdated,
    ],
    async event => {
      try {
        switch (event.type) {
          case Event.PlaybackTrackChanged:
            if (event.nextTrack != null) {
              const track = await TrackPlayer.getTrack(event.nextTrack);
              const trackStatus = await TrackPlayer.getState();
              // const cloneControl = {...activeTrack};
              // console.log(cloneControl, "CLONE CONTROLLL");
              if (track != null) {
                // cloneControl.songId = track.id;
                // cloneControl.songTitle = track.title;
                // cloneControl.status =
                //   trackStatus == State.Playing ? true : false;
                // cloneControl.songIndex = event.nextTrack;
                // cloneControl.url = track.url;
                dispatch(
                  SET_ACTIVE_TRACKDATA({
                    activeTrackDataPayload: {
                      track: track,
                    },
                  }),
                );
              }
            }
            break;
          case Event.PlaybackState:
            const trackStatus = await TrackPlayer.getState();
            const cloneControlStatus = {...activeTrack};
            cloneControlStatus.status =
              trackStatus == State.Playing ? true : false;

            dispatch(
              SET_ACTIVE_TRACKDATA({
                activeTrackDataPayload: {
                  track: cloneControlStatus,
                },
              }),
            );

            break;

          default:
            break;
        }
      } catch (e) {
        console.log(e, 'EVENT');
      }
    },
  );

  React.useEffect(() => {
    const listener = AppState.addEventListener('blur', async () => {
      dispatch(
        SET_ACTIVE_TRACKDATA({
          activeTrackDataPayload: {
            track: activeTrack,
            position: position,
          },
        }),
      );
      return true;
    });
    return () => listener.remove();
  }, [activeTrack]);

  if (!isPlayerReady) {
    return <Loader />;
  }

  /* JSX Return Start */
  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          dispatch(
            SET_ACTIVE_TRACKDATA({
              activeTrackDataPayload: {
                track: activeTrack,
                position: position,
              },
            }),
          );
          navigation.goBack();
        }}
        headerTitle={t('frontDesk.Connect')}
        headerRight={{
          icon: AllIcons.Filter,
          onPress: () => {
            setModal(true);
          },
        }}
      />
      <View style={[commonStyle.commonContentView, {flex: 1}]}>
        <SearchBar dataForSearch={songData} setSearchData={setSongData} />

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

        <View style={{flex: 1}}>
          {songData.length > 0 ? (
            <FlatList
              data={songData}
              renderItem={({item, index}) => (
                <View
                  key={index}
                  style={[
                    style.songContainer,
                    {
                      borderColor:
                        item.id == activeTrack.id
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
                    <Text style={style.songArtist}>{item.description}</Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 6}}>
                    {item.is_multiple == false ? (
                      <>
                        <View
                          style={{height: 24, width: 24}}
                          onTouchEnd={async () => {
                            setLoader({
                              status: true,
                              index: index,
                            });
                            const response = await downloadSong(
                              item.url,
                              item.title,
                            );
                            if (response == 'SUCCESS') {
                              setLoader({
                                status: false,
                                index: index,
                              });
                            } else {
                              setLoader({
                                status: false,
                                index: index,
                              });
                            }
                          }}>
                          {loader.status && loader.index == index ? (
                            <ActivityIndicator size={20} />
                          ) : (
                            <Image
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                                tintColor: COLORS.primaryColor,
                              }}
                              source={AllIcons.DownloadSong}
                            />
                          )}
                        </View>
                        <View
                          onTouchEnd={async () => {
                            handleControl(item.id);
                          }}
                          style={{height: 24, width: 24}}>
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              resizeMode: 'contain',
                            }}
                            source={
                              item.id == activeTrack.id &&
                              activeTrack.status == true
                                ? AllIcons.PauseSong
                                : AllIcons.PlaySong
                            }
                          />
                        </View>
                      </>
                    ) : (
                      <View
                        style={{height: 24, width: 24}}
                        onTouchEnd={async () => {
                          navigation.navigate('albumSong', {
                            playListName: item.title,
                            id: item.id,
                          });
                          screenGoToAlbum.current = true;
                        }}>
                        <Image
                          style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                            tintColor: COLORS.primaryColor,
                          }}
                          source={AllIcons.AlbumRightArrow}
                        />
                      </View>
                    )}
                  </View>
                </View>
              )}
            />
          ) : (
            <NoData />
          )}
        </View>
      </View>

      <TrackControl activeTrackProp={activeTrack} />

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
  /* JSX Return Start */
};
