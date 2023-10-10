import React from 'react';

import {AllIcons, CommonStyle} from '@assets';
import {
  Calendar,
  Carousel,
  CustomNavigate,
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
  ShareDownload,
  SimpleDropDown,
} from '@components';
import {BASE_URL} from '@env';
import Clipboard from '@react-native-clipboard/clipboard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DailyQuotesApi, GurukulBranchGetApi} from '@services';
import {RootStackParamList} from '@types';
import {COLORS, d, options} from '@utils';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {styles} from './styles';

export const DailyQuotes = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const {t} = useTranslation();
  const [Data, setData] = React.useState<{[key: string]: any}>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [changeValue, setChangeValue] = React.useState();
  const [GurukulList, setGurukulList] = React.useState<{[key: string]: any}[]>(
    [],
  );
  const [BranchName, setBranchName] = React.useState();
  const [DailyQuotes, setDailQuotes] = React.useState<{[key: string]: any}[]>(
    [],
  );

  const [itemIndex, setItemIndex] = React.useState(0);

  const [imgLoad, setImgLoad] = React.useState<boolean[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useMemo(async () => {
    const response = await GurukulBranchGetApi();
    if (response.resType === 'SUCCESS' && response.data.branches.length > 0) {
      setGurukulList(response.data.branches);
      setChangeValue(response.data.branches?.[0]?.id);
    } else {
      Toast.show(response.message, 2);
    }
  }, []);

  React.useEffect(() => {
    if (GurukulList.length > 0 && GurukulList !== undefined) {
      const name = GurukulList.find(item => item.id == changeValue)?.name;
      setBranchName(name);
    }
  }, [changeValue, GurukulList]);

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyQuotesApi(selectedDate);

      if (res.resType === 'SUCCESS' && res.data.length > 0) {
        setTimeout(() => {
          setData(res.data);
          setLoader(false);
        }, 200);
      } else {
        setLoader(false);
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedDate, BranchName]);

  const getPreviousDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(selectedDate.getDate() - 1);
    return previousDate;
  };
  const handlePrev = () => {
    const previousDate = getPreviousDate();
    setSelectedDate(previousDate);
  };
  const getNextDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(selectedDate.getDate() + 1);
    return previousDate;
  };
  const handleNext = () => {
    const NextDate = getNextDate();
    setSelectedDate(NextDate);
  };

  const commonStyle = CommonStyle();

  const Image_Data = () => {
    if (Data.length > 0 && Data !== undefined) {
      let newImges = Data.filter((item: any) => {
        return item.branch == BranchName;
      })?.[0]?.daily_quotes;
      if (newImges != undefined || newImges != null || newImges != '') {
        setDailQuotes(newImges);
      } else {
        setDailQuotes([]);
      }
    }
  };

  React.useEffect(() => {
    Image_Data();
  }, [Data, BranchName]);

  const handleClipBoard = (item: any) => {
    const clip = Clipboard.setString(item);
    Toast.show('Quote copied to your Clipborad..!', Toast.SHORT);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await GurukulBranchGetApi();
      if (response.resType === 'SUCCESS' && response.data.branches.length > 0) {
        setGurukulList(response.data.branches);
        setChangeValue(response.data.branches?.[0]?.id);
      } else {
        Toast.show(response.message, 2);
      }

      const res = await DailyQuotesApi(selectedDate);

      if (res.resType === 'SUCCESS' && res.data.length > 0) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }

    setRefreshing(false);
  };

  const LoadStart = (index: number) => {
    let clone = [...imgLoad];
    clone[index] = true;
    setImgLoad(clone);
  };

  const LoadEnd = (index: number) => {
    let clone = [...imgLoad];
    clone[index] = false;
    setImgLoad(clone);
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('DailyQuote.Heading')}
        headerRight={{
          icon: AllIcons.Calendar,
          onPress: () => {
            setCalendarVisible(true);
          },
        }}
      />
      <ScrollView
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          height: '100%',
        }}
        refreshControl={
          <RefreshControl
            colors={[COLORS.primaryColor, COLORS.green]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={[commonStyle.commonContentView, {flex: 1}]}>
          <View style={style.dropDownContainer}>
            <View
              style={{
                marginTop: '5%',
              }}>
              <Text style={style.dropDownHeading}>
                {t('uploadPhoto.DropdownTitle')}
              </Text>

              <View style={style.dropDownStyle}>
                <SimpleDropDown
                  label={t('uploadPhoto.DropdownTitle')}
                  placeholder={t('uploadPhoto.DropdownLable')}
                  dropDownList={GurukulList}
                  type={'simple'}
                  value={changeValue}
                  onChange={setChangeValue}
                  onBlur={() => {}}
                  setFocused={() => {}}
                  wantPlaceholderAsLabelOnModal={true}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 0.85}}>
            {loader ? (
              <Loader screenHeight={'100%'} />
            ) : (
              <>
                {Data.length > 0 ? (
                  <>
                    {Data.find((item: any) => item.branch == BranchName) ? (
                      <View style={style.quoteContainer}>
                        <Carousel
                          itemWidth={Dimensions.get('window').width * 0.91}
                          itemGap={10}
                          data={DailyQuotes}
                          onSnapToItem={index => {
                            setItemIndex(index);
                          }}
                          renderItem={({item, index}) => {
                            return (
                              <View style={style.carouselView}>
                                <Pressable
                                  style={{flex: 1, width: '100%'}}
                                  onPress={() => {
                                    navigation.navigate('ImageZommer', {
                                      images: [
                                        {url: `${BASE_URL}${item.image}`},
                                      ],
                                    });
                                  }}>
                                  {imgLoad[index] && (
                                    <ActivityIndicator
                                      size={30}
                                      color={COLORS.primaryColor}
                                      style={style.activityIndicator}
                                    />
                                  )}
                                  <Image
                                    source={{
                                      uri: `${BASE_URL}${item.image}`,
                                    }}
                                    style={style.image}
                                    onLoadStart={() => LoadStart(index)}
                                    onLoadEnd={() => LoadEnd(index)}
                                  />
                                </Pressable>
                                <View>
                                  <Text
                                    style={style.quote}
                                    selectable={true}
                                    onLongPress={() =>
                                      handleClipBoard(item.quote)
                                    }
                                    selectionColor={'red'}>
                                    {item.quote}
                                  </Text>
                                </View>
                              </View>
                            );
                          }}
                        />
                        <ShareDownload
                          wallpaper={Platform.OS === 'android' ? false : false}
                          imgURL={`${BASE_URL}${DailyQuotes?.[itemIndex]?.image}`}
                        />
                      </View>
                    ) : (
                      <NoData />
                    )}
                  </>
                ) : (
                  <NoData />
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <Calendar
        setCalendarVisible={setCalendarVisible}
        calendarVisible={calendarVisible}
        selectedParentDate={selectedDate}
        setSelectedParentDate={setSelectedDate}
      />
      <CustomNavigate
        text={
          selectedDate !== undefined
            ? selectedDate.toLocaleDateString('en-in', options)
            : d.toLocaleDateString('en-in', options)
        }
        handlePrevPress={handlePrev}
        handleNextPress={handleNext}
      />
    </ScreenWrapper>
  );
};
