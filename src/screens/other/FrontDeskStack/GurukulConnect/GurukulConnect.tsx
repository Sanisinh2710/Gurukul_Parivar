import React from 'react';
import {
  FlatList,
  Image,
  Text,
  AppState,
  View,
  Platform,
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
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {
  addTracks,
  resetAndAddTracks,
  setupPlayer,
} from '../../../../services/PlaybackService';
import {COLORS, downloadSong} from '../../../../utils';
import {styles} from './styles';
import {storage} from '../../../../storage';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {GurkulAudioApi, GurukulMultiPartAudio} from '../../../../services';
import Toast from 'react-native-simple-toast';
import {BASE_URL} from '@env';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  ADD_UPDATE_SONGS,
  SET_ACTIVE_TRACKDATA,
} from '../../../../redux/ducks/musicSlice';
import {SongUi} from './SongUi';

export const GurukulConnect = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const screenGoToAlbum = React.useRef(false);
  const resetTrack = React.useRef(false);

  const {
    allSongs,
    activeTrack,
    trackMode,
  } = useAppSelector(state => state.music);
  const dispatch = useAppDispatch();


  const [songData, setSongData] = React.useState<Array<any>>([...allSongs]);
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);

  const screenFocused = useIsFocused();
  const trackStatus = usePlaybackState();

  const findActiveTrack = async () => {
    try {
      const trackPlayerStatus = await TrackPlayer.getState();
      const response = await GurkulAudioApi();
      
      const findSong = response.data.gurukul_audios.filter(
        (item: any) => item.id == activeTrack?.id,
        );
        
        if (findSong.length == 0 || findSong[0].is_multiple) {
        console.log("\t\t\t-------------This is Find Active Track------------------------");

        screenGoToAlbum.current = false;
        if (trackMode.albumId && trackPlayerStatus != State.Playing) {
          const albumSong: Array<SongType> = [];
          const response = await GurukulMultiPartAudio(trackMode.albumId);
          response.data.group_audios
            .filter((song: any) => song.id == activeTrack?.id)
            .map((item: any) => {
              albumSong.push({
                id: item.id,
                title: item.title,
                url: BASE_URL + item.audio,
                status: false,
                description: item.description,
              });
            });
          response.data.group_audios
            .filter((song: any) => song.id != activeTrack?.id)
            .map((item: any) => {
              albumSong.push({
                id: item.id,
                title: item.title,
                url: BASE_URL + item.audio,
                status: false,
                description: item.description,
              });
            });
          
          await addTracks(albumSong);
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setDataToRedux = async () => {
    try {
      const queue = await TrackPlayer.getQueue();
      const response = await GurkulAudioApi();
    
      if (queue.length <= 0) {
        console.log("\t\t-----------set data to redux length = 0 -------------");
        const responseActive = await findActiveTrack();
       
        if (responseActive) {
          screenGoToAlbum.current = false;
        } else {
          screenGoToAlbum.current = true;
        }
      }

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

        if (screenGoToAlbum.current == true) {
             
                await addTracks(trackList);
                console.log("\t\t----------Song Added ----------");
              
        } else {
          dispatch(ADD_UPDATE_SONGS({songs: SongList}));
        }
      }
    } catch (e) {
      console.log(e, 'Set Data Error');
    }
  };

  const setAlbumDataToRedux = async (id?: number) => {
    const queue = await TrackPlayer.getQueue();

    if (id != undefined) {
      const response = await GurukulMultiPartAudio(id);
     
      if (queue.length <= 0) {
        resetTrack.current = true;
        // const el = queue.slice(-1)[0].id;
        // const dataSame = queue.filter(item => item.id == activeTrack.id);
        // if (dataSame.length > 0) {
        //   resetTrack.current = false;
        //   console.log('Same to Same');
        // }
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
            status: trackStatus == State.Playing ? true : false,
            description: audioObj.description,
          });
        });

        if (resetTrack.current == true) {
          await resetAndAddTracks(SongList);
          console.log('Add Album ');
          // dispatch(ADD_UPDATE_SONGS({songs: SongList}));
        } else {
          dispatch(ADD_UPDATE_SONGS({songs: SongList}));
        }
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
        screenGoToAlbum={
          trackMode.setupMode == 'ALBUM' ? resetTrack : screenGoToAlbum
        }
        setDataToRedux={setDataToRedux}
        setAlbumDataToRedux={setAlbumDataToRedux}
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
