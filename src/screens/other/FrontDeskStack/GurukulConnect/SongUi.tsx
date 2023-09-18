import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  AppState,
  Platform,
} from 'react-native';
import {
  DropDownModel,
  NoData,
  ScreenHeader,
  SearchBar,
  TrackControl,
} from '../../../../components';
import {useDispatch} from 'react-redux';
import {SET_ACTIVE_TRACKDATA, UPDATE_SETUP_MODE} from '../../../../redux/ducks/musicSlice';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {styles} from './styles';
import {COLORS, downloadSong} from '../../../../utils';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {useAppSelector} from '../../../../redux/hooks';
import {useTranslation} from 'react-i18next';
import { Status } from '../Status';

type SongUiProp = {
  songData: Array<any>;
  setSongData: React.Dispatch<React.SetStateAction<any[]>>;
  screenGoToAlbum?: React.MutableRefObject<boolean>;
  playListName ? :string,
  navigation: NavigationProp<any>;
  goBack?: () => void;
  navigateScreen?: (
    playlistname: string,
    id: number,
    status: 'PLAYING'|'PAUSED' | 'BUFFERING' | 'OTHER',
  ) => void;
  setDataToRedux: () => Promise<void>;
  setAlbumDataToRedux: (id?:number) => Promise<void>;
};

export const SongUi = ({
  songData,
  setSongData,
  screenGoToAlbum,
  navigation,
  goBack,
  navigateScreen,
  playListName,
  setDataToRedux,
  setAlbumDataToRedux,
}: SongUiProp) => {
  const dispatch = useDispatch();
  const commonStyle = CommonStyle();
  const style = styles();
  const trackStatus = usePlaybackState();
  const {t} = useTranslation();
  const {allSongs, activeTrack, activeTrackPosition, selectedCategories,trackMode} =
    useAppSelector(state => state.music);
  const {position} = useProgress();

  const [loader, setLoader] = React.useState({
    status: false,
    index: -1,
  });
  const [selectedItem, setSelectedItem] = React.useState([]);
  const [modal, setModal] = React.useState(false);

  const handleControl = async (itemId: any) => {
    try {
      const queue = await TrackPlayer.getQueue();
      const isAlbum = queue.filter(item => item.id == itemId);
        console.log(isAlbum , "<--Is Album" , "\t\tItem-->" ,itemId);
      if (isAlbum.length == 0 && screenGoToAlbum != undefined) {
        screenGoToAlbum.current = true;
        if(trackMode.setupMode == 'ALBUM')
        {
          await setAlbumDataToRedux(trackMode.albumId);
        }
        else{
         await setDataToRedux();
        }
      }

      const track = await TrackPlayer.getCurrentTrack();
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

  const trackPlaying = React.useMemo((): 'PLAYING' | 'PAUSED' | 'BUFFERING' | 'IDLE' | 'OTHER' => {
    return trackStatus === State.Playing
      ? 'PLAYING'
      : trackStatus === State.Buffering
      ? 'BUFFERING' 
      : trackStatus == State.Paused 
      ? 'PAUSED'
      : trackStatus == 'idle' 
      ? 'IDLE'
      : 'OTHER';
  }, [trackStatus]);


  console.log(trackPlaying);
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    try {
      switch (event.type) {
        case Event.PlaybackTrackChanged:
          if (event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);

            console.log('Gurukul Connect Track Change..', track);
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
        default:
          break;
      }
    } catch (e) {
      console.log(e, 'EVENT');
    }
  });

  const ExitCallBack = React.useCallback(() => {
    const blurListner = AppState.addEventListener('blur', onBlurScreen);

    return () => {
      // Once the Screen gets blur Remove Event Listener
      blurListner.remove();
    };
  }, [activeTrack]);

  Platform.OS === 'ios' ? null : useFocusEffect(ExitCallBack);

  const onBlurScreen = () => {

    if (activeTrack) {
      dispatch(
        SET_ACTIVE_TRACKDATA({
          activeTrackDataPayload: {
            track: activeTrack,
            position: position,
          },
        }),
      );
      return true;
    }
  };

  return (
    <>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={async() => {
          if(trackMode.setupMode == 'ALBUM')
          {
            await setDataToRedux();
            dispatch(UPDATE_SETUP_MODE({
              setupMode : 'INITIAL',
            }))
          }
          else{
          navigation.goBack();
          dispatch(
            SET_ACTIVE_TRACKDATA({
              activeTrackDataPayload: {
                track: activeTrack,
                position: position,
              },
            }),
          );
          }
        }}
        headerTitle={playListName != undefined ? playListName:t('frontDesk.Connect')}
        headerRight={{
          icon: AllIcons.Filter,
          onPress: () => {
            setModal(true);
          },
        }}
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
                    <Text style={style.songArtist}>{item.description}</Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 6}}>
                    {item.is_multiple == false || item.is_multiple == undefined ? (
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
                              item.id == activeTrack?.id &&
                              trackPlaying == 'PLAYING'
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
                          setAlbumDataToRedux(item.id)
                          // navigation.navigate('albumSong', {
                          //   playListName: item.title,
                          //   id: item.id,
                          //   status: trackPlaying,
                          // });
                          if (screenGoToAlbum != undefined) {
                            screenGoToAlbum.current = false;
                            dispatch(UPDATE_SETUP_MODE({
                              setupMode : 'ALBUM',
                              albumId : item.id,
                              // setupMode : 'ALBUM',
                              // albumId : item.id,
                            }))
                          }
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

      {activeTrack!=undefined && <TrackControl activeTrackProp={activeTrack} status={trackPlaying} />}

      <DropDownModel
        modelVisible={modal}
        setModelVisible={setModal}
        modalHeight="70%"
        type="multi-select"
        inputList={['a', 'b', 'c']}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        wantResetButton={true}
        label="G-connect Categories"
      />
    </>
  );
};
