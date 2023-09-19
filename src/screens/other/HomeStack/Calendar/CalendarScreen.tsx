import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  CustomNavigate,
  ImageZoomer,
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
  ShareDownload,
} from '../../../../components';
import {CalendarGetApi} from '../../../../services';
import {RootStackParamList} from '../../../../types';
import {COLORS, d, daysArray, options2} from '../../../../utils';
import {styles} from './styles';

export const CalendarScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const {t} = useTranslation();
  const commonstyle = CommonStyle();

  const [imgLoad, setimgLoad] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [refreshing, setRefreshing] = React.useState(false);
  const [wallpaper, setWallpaper] = React.useState('');
  const [loader, setLoader] = React.useState<boolean>(false);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const [todayEvent, setEvents] = React.useState<{[key: string]: any}[]>([]);
  const [sortedData, setSortedData] = React.useState<{[key: string]: any}[]>(
    [],
  );

  const [zoomImageModalVisible, setZoomModalVisiable] =
    React.useState<boolean>(false);
  const ref = React.useRef<FlatList>(null);
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
    if (Data.length > 0) {
      const newData = [...Data];
      const eventData = newData.map(item => {
        return item.events;
      });
      setEvents(eventData[0]);
      setWallpaper(`${BASE_URL}${Data[0].image}`);
    } else {
      setEvents([]);
    }
  }, [Data]);

  React.useMemo(() => {
    if (todayEvent.length > 0) {
      let sortDate = [...todayEvent];
      let finalSort = sortDate.sort((a, b) => {
        let date = new Date(a.date);
        let date2 = new Date(b.date);
        return date > date2 ? 1 : date < date2 ? -1 : 0;
      });
      setSortedData(finalSort);
    } else {
      setSortedData([]);
    }
  }, [todayEvent]);
  const listIndex = () => {
    return sortedData.findIndex(
      event => event.date >= d.toISOString().substring(0, 10),
    );
  };
  React.useEffect(() => {
    if (sortedData.length > 0 && listIndex() !== -1) {
      ref.current?.scrollToIndex({
        animated: true,
        index: listIndex(),
      });
    }
  }, [sortedData]);

  const onRefresh = async () => {
    setRefreshing(true);
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
        headerTitle={t('homeScreen.Calendar')}
      />
      <ScrollView
        contentContainerStyle={[
          commonstyle.commonContentView,
          {flex: 1, alignItems: 'center', justifyContent: 'center'},
        ]}
        scrollEnabled={false}
        horizontal
        refreshControl={
          <RefreshControl
            colors={[COLORS.primaryColor, COLORS.green]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        nestedScrollEnabled={true}>
        {loader ? (
          <Loader />
        ) : (Data.length > 0 && Data[0].image !== undefined) ||
          sortedData.length > 0 ? (
          <View>
            {sortedData.length > 0 && (
              <View style={{height: '22%', marginTop: 20}}>
                <FlatList
                  data={sortedData}
                  ref={ref}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{
                    gap: 15,
                  }}
                  showsVerticalScrollIndicator
                  getItemLayout={(data, index) => {
                    return {
                      length: 79,
                      offset: 79 * index,
                      index,
                    };
                  }}
                  renderItem={({item, index}) => (
                    <View
                      key={index.toString()}
                      style={[
                        style.textBoxContainer,
                        item.date < d.toISOString().substring(0, 10) && {
                          opacity: 0.8,
                        },
                      ]}>
                      <View
                        style={[
                          style.dateContainer,
                          item.date < d.toISOString().substring(0, 10) && {
                            backgroundColor: '#b3898b',
                            borderColor: '#b3898b',
                          },
                        ]}>
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
                  )}
                />
              </View>
            )}

            {Data.length > 0 && Data[0].image !== undefined && (
              <>
                <View
                  style={[
                    {marginTop: '25%', alignSelf: 'center'},
                    sortedData.length <= 0 && {
                      marginTop: '50%',
                    },
                  ]}>
                  <View
                    onTouchEnd={() => setZoomModalVisiable(true)}
                    style={{
                      height: 264,
                      width: 345,
                      borderRadius: 12,
                    }}>
                    {imgLoad && (
                      <ActivityIndicator
                        size={30}
                        color={COLORS.primaryColor}
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0,
                        }}
                      />
                    )}
                    <Image
                      source={{uri: `${BASE_URL}${Data[0].image}`}}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 12,
                        resizeMode: 'cover',
                      }}
                      onLoadStart={() => setimgLoad(true)}
                      onLoadEnd={() => setimgLoad(false)}
                    />
                  </View>
                </View>
                <ImageZoomer
                  images={[{url: `${BASE_URL}${Data?.[0].image}`}]}
                  zoomModalVisible={zoomImageModalVisible}
                  setZoomModalVisiable={setZoomModalVisiable}
                />
                <ShareDownload
                  wallpaper={false}
                  imgURL={wallpaper && wallpaper}
                />
              </>
            )}
          </View>
        ) : (
          <View
            style={{
              height: '90%',
            }}>
            <NoData />
          </View>
        )}
      </ScrollView>
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
