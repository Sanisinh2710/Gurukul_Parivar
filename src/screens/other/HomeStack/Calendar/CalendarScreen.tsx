import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Text, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  CustomNavigate,
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
  ShareDownload,
} from '../../../../components';
import {CalendarGetApi} from '../../../../services';
import {RootAuthStackParamList} from '../../../../types';
import {d, daysArray, options2} from '../../../../utils';
import {styles} from './styles';

export const CalendarScreen = ({
  navigation,
}: NativeStackScreenProps<RootAuthStackParamList>) => {
  const style = styles();
  const {t} = useTranslation();
  const commonstyle = CommonStyle();
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [wallpaper, setWallpaper] = React.useState('');
  const [loader, setLoader] = React.useState<boolean>(false);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const [todayEvent, setEvents] = React.useState<{[key: string]: any}[]>([]);

  const getPreviousDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setMonth(selectedDate.getMonth() - 1);
    return previousDate;
  };
  const handlePrev = () => {
    const previousDate = getPreviousDate();
    setSelectedDate(previousDate);
  };
  const getNextDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setMonth(selectedDate.getMonth() + 1);
    return previousDate;
  };
  const handleNext = () => {
    const NextDate = getNextDate();
    setSelectedDate(NextDate);
  };

  console.log(todayEvent);

  React.useMemo(async () => {
    setLoader(true);
    try {
      const newDate = new Date(
        `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}`,
      );
      const res = await CalendarGetApi(newDate);
      if (res.resType === 'SUCCESS') {
        setTimeout(() => {
          setData(res.data.calendar);
          setLoader(false);
        }, 200);
      }
    } catch (error) {}
  }, [selectedDate]);

  React.useEffect(() => {
    Data.map(item => setEvents(item.events));
    Data.length > 0 && setWallpaper(`${BASE_URL}${Data[0].image}`);
  }, [Data]);

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('homeScreen.Calendar')}
      />
      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        {loader ? (
          <Loader />
        ) : Data.length > 0 && Data[0].image !== undefined ? (
          <View>
            {todayEvent.filter(
              // event => event.date === d.toISOString().substring(0, 10),
              event => event.date === d.toISOString().substring(0, 10),
            ).length > 0 && (
              <>
                <View>
                  <Text style={style.title}>{t('common.TodayEventMsg')}</Text>
                </View>
                <ScrollView style={{height: '28%'}}>
                  {todayEvent
                    .filter(
                      event => event.date === d.toISOString().substring(0, 10),
                    )
                    .map((item, index) => (
                      <View key={index} style={style.textBoxContainer}>
                        <View style={style.dateContainer}>
                          <Text style={style.date}>
                            {item.date.split('-')[2]}
                          </Text>
                          <Text style={style.day}>
                            {daysArray[new Date(item.date).getDay()]}
                          </Text>
                        </View>
                        <View style={style.contentContainer}>
                          <Text style={style.content1}>{item.title}</Text>
                          <Text style={style.content2}>{item.description}</Text>
                        </View>
                      </View>
                    ))}
                </ScrollView>
              </>
            )}

            <View
              style={[
                {marginTop: '15%', alignSelf: 'center'},
                // todayEvent.filter(
                //   // event => event.date === d.toISOString().substring(0, 10),
                //   event => event.date === d.toISOString().substring(0, 10),
                // ).length === 0 && {
                //   marginTop: '50%',
                // },
              ]}>
              <Image
                source={{uri: `${BASE_URL}${Data[0].image}`}}
                style={{height: 264, width: 345}}
              />
              <ShareDownload
                wallpaper={false}
                imgURL={wallpaper && wallpaper}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              height: '90%',
            }}>
            <NoData />
          </View>
        )}
      </View>
      <CustomNavigate
        handleNextPress={handleNext}
        handlePrevPress={handlePrev}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        text={selectedDate.toLocaleDateString('en-US', options2)}
      />
    </ScreenWrapper>
  );
};
