import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Alert, FlatList, ScrollView, Text, View} from 'react-native';
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
import {COLORS, d} from '../../../../utils';

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
        }, 2000);
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
      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        {Data.length > 0 ? (
          <View
            style={{
              marginTop: '3%',
              gap: 10,
              paddingBottom: '30%',
            }}>
            <Text style={{color: COLORS.black}}>YouTube Live Katha</Text>
            <FlatList
              scrollEnabled={false}
              data={Data}
              renderItem={({item}) => (
                <View>
                  <YoutubePlayer
                    height={200}
                    play={playing}
                    videoId={item.url.split('=')[1]}
                    onChangeState={onStateChange}
                    webViewProps={{
                      containerStyle: {borderRadius: 15},
                    }}
                  />
                </View>
              )}
            />
          </View>
        ) : (
          <>{loader ? <Loader /> : <NoData />}</>
        )}
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
