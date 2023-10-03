import React from 'react';

import {AllIcons, CommonStyle} from '@assets';
import {Calendar, NoData, ScreenHeader, ScreenWrapper} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DailySatsangApi} from '@services';
import {RootAuthStackParamList} from '@types';
import {COLORS, CustomFonts, d, options} from '@utils';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import YoutubePlayer from 'react-native-youtube-iframe';

export const LiveSatsang = ({
  navigation,
}: NativeStackScreenProps<RootAuthStackParamList>) => {
  const {t} = useTranslation();
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const commonstyle = CommonStyle();

  const [playing, setPlaying] = React.useState(false);
  const [videoLoad, setVideoLoad] = React.useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const onStateChange = React.useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const youtube_parser = (url: string) => {
    var rx =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

    let r = url.match(rx);
    return r?.[1];
  };

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailySatsangApi(selectedDate);

      if (res.resType === 'SUCCESS') {
        setTimeout(() => {
          setData(res.data.live_satasang);
          setLoader(false);
        }, 1000);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedDate]);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const res = await DailySatsangApi(selectedDate);

      if (res.resType === 'SUCCESS') {
        setData(res.data.live_satasang);
      }
    } catch (error) {
      console.log(error);
    }

    setRefreshing(false);
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('homeScreen.DailySatsang')}
        headerRight={{
          icon: AllIcons.Calendar,
          onPress: () => {
            setCalendarVisible(true);
          },
        }}
      />
      <View style={[commonstyle.commonContentView]}>
        <View
          style={{
            marginTop: '3%',
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.black,
            }}>
            {t('common.YouTubeLiveKatha')}
          </Text>

          {loader || refreshing ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={['A', 'B', 'C', 'D']}
              contentContainerStyle={{gap: 10}}
              renderItem={({item, index}) => {
                return (
                  <View key={item + index}>
                    <ShimmerPlaceHolder
                      LinearGradient={LinearGradient}
                      visible={refreshing ? !refreshing : !loader}
                      style={{
                        height: 30,
                        width: '50%',
                        borderRadius: 12,
                        marginTop: 10,
                      }}
                    />
                    <ShimmerPlaceHolder
                      LinearGradient={LinearGradient}
                      visible={refreshing ? !refreshing : !loader}
                      style={{
                        height: 200,
                        width: '100%',
                        borderRadius: 12,
                        marginTop: 10,
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : Data.length !== 0 ? (
            <>
              <FlatList
                data={Data}
                refreshControl={
                  <RefreshControl
                    colors={[COLORS.primaryColor, COLORS.green]}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                contentContainerStyle={{paddingBottom: '50%'}}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <View style={{marginVertical: '3%', gap: 15}}>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          ...CustomFonts.body.large14,
                          fontSize: 18,
                          color: COLORS.black,
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          ...CustomFonts.body.large14,
                          fontSize: 18,
                          color: COLORS.black,
                        }}>
                        {new Date(item.created_at).toLocaleString(
                          'en-US',
                          options,
                        )}
                      </Text>
                    </View>
                    <View>
                      {videoLoad === false && (
                        <View
                          style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            left: 0,
                            right: 0,
                            flex: 1,
                            height: 200,
                          }}>
                          <ActivityIndicator
                            size={30}
                            color={COLORS.primaryColor}
                          />
                        </View>
                      )}
                      <YoutubePlayer
                        height={200}
                        play={playing}
                        onReady={() => {
                          setVideoLoad(true);
                        }}
                        videoId={youtube_parser(item.url)}
                        onChangeState={onStateChange}
                        webViewProps={{
                          containerStyle: {borderRadius: 15},
                        }}
                      />
                    </View>
                  </View>
                )}
              />
            </>
          ) : (
            <View style={{width: '100%', height: '90%'}}>
              <NoData />
            </View>
          )}
        </View>

        <View>
          <Calendar
            setCalendarVisible={setCalendarVisible}
            calendarVisible={calendarVisible}
            selectedParentDate={selectedDate}
            setSelectedParentDate={setSelectedDate}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
