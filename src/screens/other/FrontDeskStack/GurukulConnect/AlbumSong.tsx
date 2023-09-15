import React from 'react';
import {
  FlatList,
  Image,
  Text,
  AppState,
  View,
  ActivityIndicator,
  Platform,
  BackHandler,
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
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
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
} from '../../../../redux/ducks/musicSlice';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import { SongUi } from './SongUi';

export const AlbumSong = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'albumSong'>) => {
  const {playListName, id } = route.params;
  const resetTrack = React.useRef(false);
  const {allSongs, activeTrack, activeTrackPosition, selectedCategories} =
    useAppSelector(state => state.music);
  const dispatch = useAppDispatch();


  const [songData, setSongData] = React.useState<Array<any>>([...allSongs]);
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);
  // const [modal, setModal] = React.useState(false);
  // const [loader, setLoader] = React.useState({
  //   status: false,
  //   index: -1,
  // });
  const trackStatus = usePlaybackState();
  const screenFocused = useIsFocused();
  // const [selectedItem, setSelectedItem] = React.useState([]);
  // const {position} = useProgress();

  // const handleControl = async (itemId: any) => {
  //   try {
  //     const queue = await TrackPlayer.getQueue();
  //     const isAlbum = queue.filter(item => item.id == itemId);
  //     console.log(isAlbum, 'Is Album >><<>><>><>');
  //     if (isAlbum.length == 0) {
  //       resetTrack.current = true;
  //       await setDataToRedux();
  //     }

  //     const track = await TrackPlayer.getCurrentTrack();

  //     const trackSkipIndex = queue.findIndex(item => item.id == itemId);

  //     if (trackSkipIndex != track) {
  //       await TrackPlayer.skip(trackSkipIndex);
  //       await TrackPlayer.play();
  //     } else if (trackStatus == State.Playing) {
  //       await TrackPlayer.pause();
  //     } else {
  //       await TrackPlayer.play();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const setDataToRedux = async () => {
    const queue = await TrackPlayer.getQueue();
    const response = await GurukulMultiPartAudio(id);
    console.log("\t\t------>>>",queue,"Album Queue")
    
    if (queue.length <= 0) {
      resetTrack.current = true;
      // const el = queue.slice(-1)[0].id;
      // const dataSame = queue.filter(item => item.id == activeTrack.id);
      // if (dataSame.length > 0) {
      //   resetTrack.current = false;
      //   console.log('Same to Same');
      // }
    }
    
    console.log(resetTrack , "<--FF-->");
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
          status: trackStatus == State.Playing ? true : false,
          description: audioObj.description,
        });
      });

      if (resetTrack.current == true) {
        await TrackPlayer.reset();
        await addTracks(SongList);
        dispatch(ADD_UPDATE_SONGS({songs: SongList}));

      } else {
        dispatch(ADD_UPDATE_SONGS({songs: SongList}));
      }
    }
  };

  const setup = async () => {
    try {
      let isSetup = await setupPlayer();

      if (isSetup) {
        await setDataToRedux();
      }
      setIsPlayerReady(isSetup);
    } catch (e) {
      console.log('Player Setup Error', e);
    }
  };

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

  // useTrackPlayerEvents(
  //   [
  //     Event.PlaybackTrackChanged,
  //   ],
  //   async event => {
  //     try {
  //       switch (event.type) {
  //         case Event.PlaybackTrackChanged:
  //           if (event.nextTrack != null) {
  //             const track = await TrackPlayer.getTrack(event.nextTrack);

  //            console.log("Gurukul Connect Track Change..",track);
  //             if (track != null) {

  //               dispatch(
  //                 SET_ACTIVE_TRACKDATA({
  //                   activeTrackDataPayload: {
  //                     track: track,
  //                   },
  //                 }),
  //               );
  //             }
  //           }
  //           break;
  //         default:
  //           break;
  //       }
  //     } catch (e) {
  //       console.log(e, 'EVENT');
  //     }
  //   },
  // );

  // const trackPlaying = React.useMemo((): 'PLAYING' | 'BUFFERING' | 'OTHER' => {
  //   return trackStatus === State.Playing
  //     ? 'PLAYING'
  //     : trackStatus === State.Buffering
  //     ? 'BUFFERING'
  //     : 'OTHER';
  // }, [trackStatus]);

  // const ExitCallBack = React.useCallback(() => {
  //   const blurListner = AppState.addEventListener('blur', onBlurScreen);

  //   return () => {
  //     // Once the Screen gets blur Remove Event Listener
  //     blurListner.remove();
  //   };
  // }, [activeTrack]);

  // Platform.OS === 'ios' ? null : useFocusEffect(ExitCallBack);

  // const onBlurScreen = () => {
  //   console.log('Blur');
  //   if (activeTrack) {
  //     dispatch(
  //       SET_ACTIVE_TRACKDATA({
  //         activeTrackDataPayload: {
  //           track: activeTrack,
  //           position: position,
  //         },
  //       }),
  //     );
  //     return true;
  //   }
  // };


  if (!isPlayerReady) {
    return <Loader />;
  }


  /* JSX Return Start */
  return (
    <ScreenWrapper>
      <SongUi
        songData={songData}
        setSongData={setSongData}
        navigation={navigation}
        screenGoToAlbum={resetTrack}
        setDataToRedux={setDataToRedux}
        playListName={playListName}
      />
    </ScreenWrapper>
    // <ScreenWrapper>
    //   <ScreenHeader
    //     showLeft={true}
    //     headerTitleAlign={'left'}
    //     leftOnPress={() => {
    //       dispatch(
    //         SET_ACTIVE_TRACKDATA({
    //           activeTrackDataPayload: {
    //             track: activeTrack,
    //             position: position,
    //           },
    //         }),
    //       );
    //       navigation.goBack();
    //     }}
    //     headerTitle={t('frontDesk.Connect')}
    //     headerRight={{
    //       icon: AllIcons.Filter,
    //       onPress: () => {
    //         setModal(true);
    //       },
    //     }}
    //   />
    //   <View style={[commonStyle.commonContentView, {flex: 1}]}>
    //     <SearchBar dataForSearch={songData} setSearchData={setSongData} />

    //     <View style={{flex: 1}}>
    //       {songData.length > 0 ? (
    //         <FlatList
    //           data={songData}
    //           renderItem={({item, index}) => (
    //             <View
    //               key={index}
    //               style={[
    //                 style.songContainer,
    //                 {
    //                   borderColor:
    //                     item.id == activeTrack.id
    //                       ? 'rgba(172, 43, 49, 1)'
    //                       : 'rgba(172, 43, 49, 0.3)',
    //                 },
    //               ]}>
    //               <View>
    //                 <Text style={style.songTitle}>
    //                   {item.id}
    //                   {'. '}

    //                   {item.title}
    //                 </Text>
    //                 <Text style={style.songArtist}>{item.description}</Text>
    //               </View>
    //               <View style={{flexDirection: 'row', gap: 6}}>
    //                 {item.is_multiple == false ? (
    //                   <>
    //                     <View
    //                       style={{height: 24, width: 24}}
    //                       onTouchEnd={async () => {
    //                         setLoader({
    //                           status: true,
    //                           index: index,
    //                         });
    //                         const response = await downloadSong(
    //                           item.url,
    //                           item.title,
    //                         );
    //                         if (response == 'SUCCESS') {
    //                           setLoader({
    //                             status: false,
    //                             index: index,
    //                           });
    //                         } else {
    //                           setLoader({
    //                             status: false,
    //                             index: index,
    //                           });
    //                         }
    //                       }}>
    //                       {loader.status && loader.index == index ? (
    //                         <ActivityIndicator size={20} />
    //                       ) : (
    //                         <Image
    //                           style={{
    //                             width: '100%',
    //                             height: '100%',
    //                             resizeMode: 'contain',
    //                             tintColor: COLORS.primaryColor,
    //                           }}
    //                           source={AllIcons.DownloadSong}
    //                         />
    //                       )}
    //                     </View>
    //                     <View
    //                       onTouchEnd={async () => {
    //                         handleControl(item.id);
    //                       }}
    //                       style={{height: 24, width: 24}}>
    //                       <Image
    //                         style={{
    //                           width: '100%',
    //                           height: '100%',
    //                           resizeMode: 'contain',
    //                         }}
    //                         source={
    //                           item.id == activeTrack.id &&
    //                           trackPlaying == 'PLAYING'
    //                             ? AllIcons.PauseSong
    //                             : AllIcons.PlaySong
    //                         }
    //                       />
    //                     </View>
    //                   </>
    //                 ) : (
    //                   <View
    //                     style={{height: 24, width: 24}}
    //                     onTouchEnd={async() => {

    //                       navigation.navigate('albumSong', {
    //                         playListName: item.title,
    //                         id: item.id,
    //                         status : trackPlaying
    //                       });
    //                     }}>
    //                     <Image
    //                       style={{
    //                         width: '100%',
    //                         height: '100%',
    //                         resizeMode: 'contain',
    //                         tintColor: COLORS.primaryColor,
    //                       }}
    //                       source={AllIcons.AlbumRightArrow}
    //                     />
    //                   </View>
    //                 )}
    //               </View>
    //             </View>
    //           )}
    //         />
    //       ) : (
    //         <NoData />
    //       )}
    //     </View>
    //   </View>

    //   <TrackControl activeTrackProp={activeTrack} status={trackPlaying} />

    //   <DropDownModel
    //     modelVisible={modal}
    //     setModelVisible={setModal}
    //     modalHeight="70%"
    //     type="multi-select"
    //     inputList={['a', 'b', 'c']}
    //     selectedItem={selectedItem}
    //     setSelectedItem={setSelectedItem}
    //     wantResetButton={true}
    //     label="G-connect Categories"
    //   />
    // </ScreenWrapper>
  );
  /* JSX Return Start */
};
