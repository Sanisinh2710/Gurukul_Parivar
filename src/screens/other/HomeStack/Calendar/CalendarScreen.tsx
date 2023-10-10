import React from 'react';

import {CommonStyle} from '@assets';
import {
  CustomNavigate,
  DropDownModel,
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
  ShareDownload,
} from '@components';
import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CalendarGetApi} from '@services';
import {RootStackParamList} from '@types';
import {COLORS, d, options2, options3, weekDays} from '@utils';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {styles} from './styles';

export const CalendarScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const {t} = useTranslation();
  const commonstyle = CommonStyle();

  const {width, height} = Dimensions.get('window');

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
  const [viewEventModal, setEventModal] = React.useState(false);
  const [currentModalData, setCurrentModalData] = React.useState<{
    [key: string]: any;
  }>();

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
    if (sortedData.length > 0 && listIndex() >= 0) {
      setTimeout(() => {
        ref.current?.scrollToIndex({
          animated: true,
          index: listIndex(),
        });
      }, 500);
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
  const setModalData = (item: any) => {
    setEventModal(true);
    setCurrentModalData({
      date: new Date(item.date).toLocaleDateString('en-in', options3),
      title: item.title,
      description: item.description,
    });
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
          style.scrollViewStyle,
        ]}
        showsVerticalScrollIndicator={false}
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
          <View
            style={[
              style.calenderContainer,
              sortedData.length <= 0
                ? {
                    justifyContent: 'center',
                  }
                : {},
            ]}>
            {sortedData.length > 0 && (
              <View style={style.calenderEventView}>
                <FlatList
                  data={sortedData}
                  ref={ref}
                  nestedScrollEnabled={true}
                  contentContainerStyle={style.eventContentStyle}
                  showsVerticalScrollIndicator={false}
                  getItemLayout={(data, index) => {
                    return {
                      length: 79,
                      offset: 79 * index,
                      index,
                    };
                  }}
                  renderItem={({item, index}) => (
                    <Pressable
                      onPress={() => setModalData(item)}
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
                          {weekDays[new Date(item.date).getDay()]}
                        </Text>
                      </View>
                      <View style={style.contentContainer}>
                        <Text style={style.content1} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={style.content2} numberOfLines={2}>
                          {item.description}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                />
              </View>
            )}

            {Data.length > 0 && Data[0].image !== undefined && (
              <View
                style={[
                  style.calenderImageContainer,
                  sortedData.length <= 0
                    ? {
                        justifyContent: 'center',
                      }
                    : {
                        marginTop: '10%',
                      },
                ]}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('ImageZommer', {
                      images: [{url: `${BASE_URL}${Data[0].image}`}],
                    });
                  }}
                  style={style.calenderImageView}>
                  {imgLoad && (
                    <ActivityIndicator
                      size={30}
                      color={COLORS.primaryColor}
                      style={style.activityIndicator}
                    />
                  )}
                  <Image
                    source={{uri: `${BASE_URL}${Data[0].image}`}}
                    style={style.calenderImageStyle}
                    onLoadStart={() => setimgLoad(true)}
                    onLoadEnd={() => setimgLoad(false)}
                  />
                </Pressable>

                <ShareDownload
                  wallpaper={false}
                  imgURL={wallpaper && wallpaper}
                />
              </View>
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
      <DropDownModel
        viewPhoto={true}
        modelVisible={viewEventModal}
        setModelVisible={setEventModal}
        customModelchild={
          currentModalData && (
            <View style={style.dropDownView}>
              <View style={style.dropDownImageContainer}>
                <View style={style.modalDateContainer}>
                  <Text style={style.modalDateText}>
                    {currentModalData.date}
                  </Text>
                </View>
                <View style={style.modalTitleContainer}>
                  <Text style={style.modalTitle}>{currentModalData.title}</Text>
                </View>
                <View style={style.modalTimeContainer}>
                  <Text style={style.modalTime}>
                    {currentModalData.description}
                  </Text>
                </View>
              </View>
            </View>
          )
        }
        type={'simple'}
        modalHeight={'40%'}
      />
    </ScreenWrapper>
  );
};
