import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  AppState,
  Platform,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {
  DropDownModel,
  NoData,
  ScreenHeader,
  SearchBar,
  TrackControl,
} from '../../../../components';
import {batch, useDispatch} from 'react-redux';
import {
  ADD_UPDATE_CATEGORIES,
  ADD_UPDATE_SONGS,
  SET_ACTIVE_TRACKDATA,
  UPDATE_SETUP_MODE,
} from '../../../../redux/ducks/musicSlice';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {styles} from './styles';
import {COLORS, CustomFonts, downloadSong} from '../../../../utils';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {useAppSelector} from '../../../../redux/hooks';
import {useTranslation} from 'react-i18next';
import {
  GurkulAudioCategoriesGetApi,
  GurkulAudioGetFromCategoriesGetApi,
  resetTracks,
} from '../../../../services';
import {SongType} from '../../../../types';
import {BASE_URL} from '@env';
import { AnyAction } from '@reduxjs/toolkit';

type SongUiProp = {
  songData: Array<any>;
  setSongData: React.Dispatch<React.SetStateAction<any[]>>;
  screenGoToAlbum?: React.MutableRefObject<boolean>;
  trackAdd: boolean;
  navigation: NavigationProp<any>;
  resetTrack?:React.MutableRefObject<boolean>;
  goBack?: () => void;
  setDataToRedux: (de?:boolean) => Promise<void>;
  setAlbumDataToRedux: (id?: number) => Promise<void>;
};

export const SongUi = ({
  songData,
  setSongData,
  resetTrack,
  screenGoToAlbum,
  navigation,
  trackAdd,
  setDataToRedux,
  setAlbumDataToRedux,
}: SongUiProp) => {
  const dispatch = useDispatch();
  const commonStyle = CommonStyle();
  const style = styles();
  const trackStatus = usePlaybackState();
  const {t} = useTranslation();
  const {activeTrack, trackMode, selectedCategories} = useAppSelector(
    state => state.music,
  );
  const {position} = useProgress();

  const [loader, setLoader] = React.useState({
    status: false,
    index: -1,
  });
  const [selectedItem, setSelectedItem] = React.useState(
    [...selectedCategories] ?? [],
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const [modal, setModal] = React.useState(false);
  const [categoryList, setCategoryList] = React.useState<Array<any>>([]);

  const handleControl = async (itemId: any) => {
    try {
 
        if (trackMode.setupMode == 'ALBUM') {
          if(resetTrack!=undefined && resetTrack?.current == false)
          {
            resetTrack.current = true;
            await setAlbumDataToRedux(trackMode.albumId);
          }
        } else {
          if(screenGoToAlbum!=undefined && screenGoToAlbum?.current == false)
          {
            screenGoToAlbum.current = true;
            await setDataToRedux();
          }
        }
      
      if (trackAdd == true) {
        const queue = await TrackPlayer.getQueue();
        const index = queue.findIndex(item => item.id == itemId);
        if (activeTrack?.id != itemId) {
          await TrackPlayer.skip(index , 0);
          await TrackPlayer.play();
         
        } else if (trackStatus == State.Playing) {
          await TrackPlayer.pause(); 
        } else {
          await TrackPlayer.play();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCatergoryData = async () => {
  
    if (
      selectedItem.length > 0 &&
      (trackMode.setupMode === 'INITIAL' ||
        trackMode.setupMode === 'FILTERED')
    ) {
      const response = await GurkulAudioGetFromCategoriesGetApi(selectedItem);
     
      if (
        response.resType === 'SUCCESS' &&
        response.data.gurukul_audios.length > 0
      ) {
        const categoryData: Array<SongType> = [];

        response.data.gurukul_audios.forEach((item: any) => {
          categoryData.push({
            id: item.id,
            title: item.title,
            url: BASE_URL + item.audio,
            status: trackStatus == State.Playing ? true : false,
            description: item.description,
            is_multiple: item.is_multiple,
          });
        });
        dispatch(
          ADD_UPDATE_SONGS({
            songs: categoryData,
          }),
        );
        dispatch(ADD_UPDATE_CATEGORIES({categories: selectedItem}));
        dispatch(UPDATE_SETUP_MODE({setupMode: 'FILTERED'}));
      }
    }

    if(selectedItem.length <= 0 && trackMode.setupMode =='FILTERED')
    {
      if(screenGoToAlbum != undefined)
      {
        screenGoToAlbum.current = false;
      }
      dispatch(UPDATE_SETUP_MODE({setupMode: 'INITIAL'}));
      dispatch(ADD_UPDATE_CATEGORIES({categories: selectedItem})); 
      await setDataToRedux(true);
    }

  };

  const trackPlaying = React.useMemo(():
    | 'PLAYING'
    | 'PAUSED'
    | 'BUFFERING'
    | 'IDLE'
    | 'OTHER' => {
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

  React.useEffect(() => {
    const fetchCatergory = async () => {
      const response = await GurkulAudioCategoriesGetApi();
      if (response.resType === 'SUCCESS') {
        setCategoryList(response.data.categories);
      }
    };

    fetchCatergory();
  }, []);

 
  React.useEffect(() => {
    fetchCatergoryData();
  }, [selectedItem ,trackMode.setupMode]);

 
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
      batch(() => {
        dispatch(
          SET_ACTIVE_TRACKDATA({
            activeTrackDataPayload: {
              track: activeTrack,
              position: position,
            },
          }),
        );
        dispatch(
          UPDATE_SETUP_MODE({
            setupMode: 'INITIAL',
          }),
        );
      });
      return true;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
     await setDataToRedux();
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };

  const onBackPress = async () =>{
    if (trackMode.setupMode == 'ALBUM') {
      if(selectedItem.length == 0 && screenGoToAlbum !=undefined)
      {             
        screenGoToAlbum.current = false;
        dispatch(
          UPDATE_SETUP_MODE({
            setupMode: 'INITIAL',
            albumName: undefined,
          }),
          );
          await setDataToRedux(true);
      }
      else{
        dispatch(
          UPDATE_SETUP_MODE({
            setupMode: 'FILTERED',
            albumName: undefined,
          }),
        );
      }
      
    } else {
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
  }

  const removeFilterData = (index:number) =>{
    let newValues: string[] = JSON.parse(
      JSON.stringify(selectedItem),
    );
    newValues.splice(index, 1);
    setSelectedItem(newValues);
  }

  const callDownload = async (index:number,item:any) =>{
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
  }

  const goToAlbum = async (item:AnyAction) =>{
    dispatch(
      UPDATE_SETUP_MODE({
        setupMode: 'ALBUM',
        albumId: item.id,
        albumName: item.title,
      }),
      );
      if (resetTrack != undefined) {
      resetTrack.current = false;
      }
      await setAlbumDataToRedux(item.id);
  }

  return (
    <>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={onBackPress}
        headerTitle={
          trackMode.setupMode == 'ALBUM' && trackMode.albumName != undefined
            ? trackMode.albumName
            : t('frontDesk.Connect')
        }
        headerRight={
          trackMode.setupMode != 'ALBUM'
            ? {
                icon: AllIcons.Filter,
                onPress: () => {
                  setModal(true);
                },
              }
            : undefined
        }
      />
      <ScrollView 
      refreshControl={
        <RefreshControl
            colors={[COLORS.primaryColor, COLORS.green]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
      }
      >
      <View style={[commonStyle.commonContentView, {flex: 1}]}>
        <SearchBar dataForSearch={songData} setSearchData={setSongData} />
        {Array.isArray(selectedItem) &&
            selectedItem.length > 0 &&
            trackMode.setupMode !== 'ALBUM' && (
              <View
                style={style.filterDataContainer}>
                {selectedItem.map((mainitem, index) => {
                  return (
                    <View
                      key={index}
                      style={style.filterDataView}>
                      <Text
                        style={style.filterDataText}>
                        {categoryList.find(item => item.id === mainitem)?.name}
                      </Text>
                      <View
                        onTouchEnd={() => removeFilterData(index)}
                        style={style.filterDataCancelImage}>
                        <Image
                          source={AllIcons.RoundCross}
                          style={style.filterImageStyle}
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
                  <View style={style.imageContainer}>
                    {item.is_multiple == false ||
                    item.is_multiple == undefined ? (
                      <>
                        <View
                          style={style.imageView}
                          onTouchEnd={() => callDownload(index,item)}>
                          {loader.status && loader.index == index ? (
                            <ActivityIndicator size={20} />
                          ) : (
                            <Image
                              style={style.imageStyle}
                              source={AllIcons.DownloadSong}
                            />
                          )}
                        </View>
                        <View
                          onTouchEnd={() => {
                            handleControl(item.id);
                          }}
                          style={style.imageView}>
                          <Image
                            style={style.imageStyle}
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
                        style={style.imageView}
                        onTouchEnd={() => goToAlbum(item)}>
                        <Image
                          style={style.imageStyle}
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
      </ScrollView>
      {activeTrack?.url != "" && <TrackControl status={trackPlaying} />}

      <DropDownModel
        modelVisible={modal}
        setModelVisible={setModal}
        modalHeight="70%"
        type="multi-select"
        inputList={categoryList}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        wantResetButton={true}
        wantApplyButton={true}
        label="G-connect Categories"
      />
    </>
  );
};
