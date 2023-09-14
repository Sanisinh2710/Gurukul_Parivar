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
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
  SearchBar,
  TrackControl,
} from '../../../../components';
import {
  InitialSongsType,
  RootStackParamList,
  SongType,
} from '../../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import TrackPlayer, {
  Event,
  State,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {addTracks, setupPlayer} from '../../../../services/PlaybackService';
import {COLORS, downloadSong} from '../../../../utils';
import {styles} from './styles';
import {GurukulMultiPartAudio} from '../../../../services';
import Toast from 'react-native-simple-toast';
import {BASE_URL} from '@env';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  ADD_UPDATE_SONGS,
  SET_ACTIVE_TRACKDATA,
} from '../../../../redux/ducks/musicSlice';

export const AlbumSong = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'albumSong'>) => {
  console.log('Vishwa Dayan');

  const {playListName, id} = route.params;
  const {allSongs, activeTrack, activeTrackPosition, selectedCategories} =
    useAppSelector(state => state.music);
  const dispatch = useAppDispatch();
  const commonStyle = CommonStyle();
  const style = styles();

  const [songData, setSongData] = React.useState<Array<any>>([]);
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);
  const resetTrack = React.useRef(false);
  const [loader, setLoader] = React.useState({
    status: false,
    index: -1,
  });

  const {position} = useProgress();

  async function handleControl(itemId: any) {
    try {
      const track = await TrackPlayer.getCurrentTrack();
      const queue = await TrackPlayer.getQueue();

      console.log(itemId, 'itemId');

      const el = queue.slice(-1)[0].id;
      const el2 = songData.slice(-1)[0].id;

      if (el != el2) {
        resetTrack.current = true;
        await setAlbumDataToRedux();
      }

      const trackStatus = await TrackPlayer.getState();
      const trackSkipIndex = songData.findIndex(item => item.id == itemId);

      console.log(trackSkipIndex, 'trackSkipIndex');

      if (trackSkipIndex != track) {
        TrackPlayer.skip(trackSkipIndex);
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

  const setAlbumDataToRedux = async () => {
    const queue = await TrackPlayer.getQueue();
    const response = await GurukulMultiPartAudio(id);

    const el = queue.slice(-1)[0].id;
    const el2 = response.data.group_audios.slice(-1)[0].id;
    if (el == el2) {
      resetTrack.current = false;
    }

    if (
      response.resType === 'SUCCESS' &&
      response.data.group_audios.length > 0
    ) {
      const SongList: Array<SongType> = [];

      response.data.group_audios.forEach((audioObj: any) => {
        SongList.push({
          id: audioObj.id,
          title: audioObj.title,
          url: BASE_URL + audioObj.audio,
          description: audioObj.description,
        });
      });

      if (resetTrack.current == true) {
        console.log('helollllllllllllllllllllllllllllll');

        await TrackPlayer.reset();
        await addTracks(SongList);
      } else {
        dispatch(ADD_UPDATE_SONGS({songs: SongList}));
      }
    } else {
      Toast.show(response.message, 2);
    }
  };

  const setup = async () => {
    try {
      let isSetup = await setupPlayer();

      if (isSetup) {
        await setAlbumDataToRedux();
      }
      setIsPlayerReady(isSetup);
    } catch (e) {
      console.log('Player Setup Error', e);
    }
  };

  React.useMemo(() => {
    setup();
  }, []);

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
              if (track != null) {
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
  }, []);

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
          navigation.goBack();
        }}
        headerTitle={playListName}
      />
      <View style={[commonStyle.commonContentView, {flex: 1}]}>
        <SearchBar dataForSearch={songData} setSearchData={setSongData} />

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
    </ScreenWrapper>
  );
  /* JSX Return Start */
};
