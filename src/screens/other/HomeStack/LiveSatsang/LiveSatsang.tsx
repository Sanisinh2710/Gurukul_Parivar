import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Alert, Dimensions, FlatList, Text, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Calendar,
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {DailySatsangApi} from '../../../../services';
import {RootAuthStackParamList} from '../../../../types';
import {COLORS, CustomFonts, d, options} from '../../../../utils';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const LiveSatsang = ({
  navigation,
}: NativeStackScreenProps<RootAuthStackParamList>) => {
  // const style = styles();
  const {t} = useTranslation();
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const commonstyle = CommonStyle();

  console.log(Data);

  const [playing, setPlaying] = React.useState(false);

  const onStateChange = React.useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);
  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailySatsangApi(selectedDate);

      if (res.resType === 'SUCCESS') {
        setTimeout(() => {
          setData(res.data.live_satasang);
          setLoader(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedDate]);

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
            YouTube Live Katha
          </Text>
          {loader ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={['A', 'B', 'C', 'D']}
              contentContainerStyle={{gap: 10}}
              renderItem={({item, index}) => {
                return (
                  <View key={item + index}>
                    <ShimmerPlaceHolder
                      LinearGradient={LinearGradient}
                      visible={!loader}
                      style={{
                        height: 30,
                        width: '50%',
                        borderRadius: 12,
                        marginTop: 10,
                      }}
                    />
                    <ShimmerPlaceHolder
                      LinearGradient={LinearGradient}
                      visible={!loader}
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
            <FlatList
              data={Data}
              contentContainerStyle={{paddingBottom: '30%'}}
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

                  <YoutubePlayer
                    height={200}
                    play={playing}
                    videoId={
                      item.url.toString().includes('=')
                        ? item.url.split('=')[1]
                        : item.url.split('/')[3]
                    }
                    onChangeState={onStateChange}
                    webViewProps={{
                      containerStyle: {borderRadius: 15},
                    }}
                  />
                </View>
              )}
            />
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
