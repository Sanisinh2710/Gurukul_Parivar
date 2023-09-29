import React from 'react';
import {
  Loader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList, SongType} from '../../../../types';
import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {
  addTracks,
  resetTracks,
  setupPlayer,
} from '../../../../services/PlaybackService';

import { useIsFocused} from '@react-navigation/native';
import {GurkulAudioApi, GurukulMultiPartAudio} from '../../../../services';
import {BASE_URL} from '@env';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  ADD_UPDATE_SONGS,
  SET_ACTIVE_TRACKDATA,
  UPDATE_SETUP_MODE,
} from '../../../../redux/ducks/musicSlice';
import {SongUi} from './SongUi';

export const GurukulConnect = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const screenGoToAlbum = React.useRef(false);
  const resetTrack = React.useRef(false);

  const {allSongs, activeTrack, trackMode ,selectedCategories} = useAppSelector(
    state => state.music,
  );
  const dispatch = useAppDispatch();

  const [songData, setSongData] = React.useState<Array<any>>([...allSongs]);
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);
  const [trackAdd, setTrackAdd] = React.useState(false);
  const initialTrackChange = React.useRef(false);
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
        

        if (trackMode.albumId && trackPlayerStatus != State.Playing) {
          const albumSong: Array<SongType> = [];
          const response = await GurukulMultiPartAudio(trackMode.albumId);
         
          response.data.group_audios.forEach((item: any) => {
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


  const setDataToRedux = async (de?:boolean) => {
    try {
      const queue = await TrackPlayer.getQueue();
      const response = await GurkulAudioApi();
      
      if (queue.length <= 0) {
        const responseActive = await findActiveTrack();
        if (responseActive) {
          screenGoToAlbum.current = false;
        } else {
          screenGoToAlbum.current = true;
        }
      }

      console.log("Screen Go to album ==" , screenGoToAlbum);


      if (
        response.resType === 'SUCCESS' &&
        response.data.gurukul_audios.length > 0
      ) {
        const SongList: Array<SongType> = [];
     
        response.data.gurukul_audios.forEach((item: any) => {
    
          SongList.push({
            id: item.id,
            title: item.title,
            url: BASE_URL + item.audio,
            status: trackStatus == State.Playing ? true : false,
            description: item.description,
            is_multiple: item.is_multiple,
          });
        });
      
        if (screenGoToAlbum.current == true) {
          const resetResponse = await resetTracks();
          if (resetResponse) {
            const addResposne = await addTracks([...SongList.filter(item => item.is_multiple == false)]);
            if (addResposne == true) {
              setTrackAdd(true);
            }
          }
            dispatch(ADD_UPDATE_SONGS({songs: SongList}));
        } else {
          if(trackMode.setupMode == 'INITIAL' || trackMode.setupMode == 'NONE' || de == true)
           dispatch(ADD_UPDATE_SONGS({songs: SongList}));
        } 
      }
    } catch (e) {
      console.log(e, 'Set Data Error');
    }
  };

  const setAlbumDataToRedux = async (id?: number) => {
    const queue = await TrackPlayer.getQueue();
console.log("resetTrack==",resetTrack);

    if (id != undefined) {
      const response = await GurukulMultiPartAudio(id);
     
      if (queue.length <= 0) {
        resetTrack.current = true;
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
          const resetResponse = await resetTracks();
          if (resetResponse) {
            const addResposne = await addTracks(SongList);
            if (addResposne) {
              setTrackAdd(true);
            }
          }
          dispatch(ADD_UPDATE_SONGS({songs: SongList}));
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
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    try {
      switch (event.type) {
        case Event.PlaybackTrackChanged:
          
          if (event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);

            if (initialTrackChange.current == false) {
              dispatch(
                SET_ACTIVE_TRACKDATA({
                  activeTrackDataPayload: {
                    track: activeTrack,
                  },
                }),
              );
              initialTrackChange.current = true;
            }
            else {
              if(track != null)
              {
                dispatch(
                  SET_ACTIVE_TRACKDATA({
                    activeTrackDataPayload: {
                      track: track,
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
    } catch (e) {
      console.log(e, 'EVENT');
    }
  });

  React.useEffect(() => {
    if (allSongs.length > 0) {
      setSongData([...allSongs]);
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
        screenGoToAlbum={screenGoToAlbum
        }
        resetTrack={resetTrack}
        setDataToRedux={setDataToRedux}
        setAlbumDataToRedux={setAlbumDataToRedux}
        trackAdd={trackAdd}
      />
    </ScreenWrapper>
   
  );
  /* JSX Return Start */
};