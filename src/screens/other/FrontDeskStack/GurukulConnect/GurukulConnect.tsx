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
import {RootStackParamList, SongControl} from '../../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {useTranslation} from 'react-i18next';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {addTracks, setupPlayer} from '../../../../services/PlaybackService';
import {COLORS, CustomFonts, SongList, downloadSong} from '../../../../utils';
import {styles} from './styles';
import {storage} from '../../../../storage';
import {useIsFocused} from '@react-navigation/native';
import {
  GurkulAudioApi,
  GurkulAudioCategoriesGetApi,
} from '../../../../services';
import Toast from 'react-native-simple-toast';
import {BASE_URL} from '@env';

async function handleControl(item: any) {
  try {
    const trackStatus = await TrackPlayer.getState();
    const track = await TrackPlayer.getCurrentTrack();
    if (item != track) {
      TrackPlayer.skip(item);
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

export const GurukulConnect = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const commonStyle = CommonStyle();
  const style = styles();
  const {t} = useTranslation();
  const [songControl, setSongControl] = React.useState<SongControl>({
    songIndex: -1,
    status: false,
  });
  const [songData, setSongData] = React.useState<Array<any>>(SongList);
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [loader, setLoader] = React.useState({
    status: false,
    index: -1,
  });

  const [categoryList, setCategoryList] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState<string[]>([]);
  const screenFocused = useIsFocused();

  const setup = async () => {
    try {
      let isSetup = await setupPlayer();

      console.log(isSetup);

      const queue = await TrackPlayer.getQueue();

      if (isSetup && queue.length <= 0) {
        const response = await GurkulAudioApi();
        const lastElementLocal = SongList.slice(-1);
        const lastElementResponse = response.data.gurukul_audios.slice(-1);
        if (
          response.resType === 'SUCCESS' &&
          response.data.gurukul_audios.length > 0
        ) {
          if (lastElementLocal[0].id != lastElementResponse[0].id) {
            response.data.gurukul_audios.forEach((audioObj: any) => {
              SongList.push({
                id: audioObj.id,
                title: audioObj.title,
                url: BASE_URL + audioObj.audio,
                description: audioObj.description,
                is_multiple: audioObj.is_multiple,
              });
            });
            await addTracks();
          } else {
            await addTracks();
          }
        } else {
          Toast.show(response.message, 2);
        }
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

  React.useMemo(async () => {
    try {
      if (screenFocused) {
        const trackStatus = await TrackPlayer.getState();
        const lastTrackInfo = storage.getString('lastTrack');
        if (lastTrackInfo != undefined) {
          const trackInfo = JSON.parse(lastTrackInfo);
          trackInfo.status = trackStatus == State.Playing ? true : false;
          setSongControl(trackInfo);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

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
              const cloneControl = {...songControl};
              if (track != null) {
                cloneControl.songId = track.id;
                cloneControl.songTitle = track.title;
                cloneControl.status =
                  trackStatus == State.Playing ? true : false;
                cloneControl.songIndex = event.nextTrack;
                setSongControl(cloneControl);
              }
            }
            break;
          case Event.PlaybackState:
            setSongControl({
              ...songControl,
              status:
                event.state == State.Playing || event.state == State.Buffering
                  ? true
                  : false,
            });
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
      storage.set('lastTrack', JSON.stringify(songControl));
      return true;
    });
    return () => listener.remove();
  }, [songControl]);

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
          storage.set('lastTrack', JSON.stringify(songControl));
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
        <SearchBar dataForSearch={SongList} setSearchData={setSongData} />

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
                        index == songControl.songIndex
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
                              index == songControl.songIndex &&
                              songControl.status == true
                                ? AllIcons.PauseSong
                                : AllIcons.PlaySong
                            }
                          />
                        </View>
                      </>
                    ) : (
                      <View style={{height: 24, width: 24}}>
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

      <TrackControl songControl={songControl} setSongControl={setSongControl} />

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
