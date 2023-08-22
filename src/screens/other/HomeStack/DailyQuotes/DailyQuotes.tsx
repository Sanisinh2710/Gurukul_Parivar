import React from 'react';

import {BASE_URL} from '@env';
import Clipboard from '@react-native-clipboard/clipboard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import Carousel from 'react-native-snap-carousel';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Calendar,
  CustomNavigate,
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
  ShareDownload,
  SimpleDropDown,
} from '../../../../components';
import {DailyQuotesApi, GurukulBranchGetApi} from '../../../../services';
import {RootStackParamList} from '../../../../types';
import {COLORS, CustomFonts, d, options} from '../../../../utils';
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
  const [changeValue, setChangeValue] = React.useState(1);
  const [GurukulList, setGurukulList] = React.useState<{[key: string]: any}[]>(
    [],
  );
  const [BranchName, setBranchName] = React.useState();
  const [DailyQuotes, setDailQuotes] = React.useState<{[key: string]: any}[]>(
    [],
  );

  const [itemIndex, setItemIndex] = React.useState(0);

  React.useMemo(async () => {
    const response = await GurukulBranchGetApi();
    if (response.resType === 'SUCCESS' && response.data.branches.length > 0) {
      setGurukulList(response.data.branches);
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

  const {width: screenWidth} = Dimensions.get('window');
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
      <View style={[commonStyle.commonContentView, {flex: 1}]}>
        <View style={{height: '8%', marginBottom: '8%'}}>
          <View
            style={{
              marginTop: '5%',
            }}>
            <Text
              style={{
                ...CustomFonts.body.large14,
                color: COLORS.lightModetextColor,
                fontSize: 15,
              }}>
              {t('uploadPhoto.DropdownTitle')}
            </Text>

            <View
              style={{
                backgroundColor: 'rgba(172,43,49,0.05)',
                paddingHorizontal: '2%',
                borderWidth: 1,
                borderColor: 'rgba(172, 43, 49, 0.1)',
                borderRadius: 12,
              }}>
              <SimpleDropDown
                placeholder="Select Gurukul Branch"
                label="Gurukul"
                dropDownList={GurukulList}
                type={'simple'}
                value={changeValue}
                onChange={setChangeValue}
                onBlur={function (...event: any[]): void {
                  throw new Error('Function not implemented.');
                }}
                setFocused={function (
                  value: React.SetStateAction<boolean>,
                ): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
          </View>
        </View>
        {loader ? (
          <Loader />
        ) : (
          <>
            {Data.length > 0 ? (
              <>
                {Data.find((item: any) => item.branch == BranchName) ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '3%',
                    }}>
                    <Carousel
                      sliderWidth={screenWidth}
                      slideStyle={{
                        height: Dimensions.get('window').height * 0.6,
                        borderRadius: 20,
                      }}
                      onSnapToItem={index => {
                        setItemIndex(index);
                      }}
                      itemWidth={Dimensions.get('window').width * 0.8}
                      data={DailyQuotes}
                      renderItem={({item}) => (
                        <View
                          style={{
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                          }}>
                          <View style={{flex: 1, width: '100%'}}>
                            <Image
                              source={{
                                uri: `${BASE_URL}${item.image}`,
                              }}
                              style={style.image}
                            />
                          </View>
                          <View>
                            <Text
                              style={style.quote}
                              selectable={true}
                              onLongPress={() => handleClipBoard(item.quote)}
                              selectionColor={'red'}>
                              {item.quote}
                            </Text>
                          </View>
                        </View>
                      )}
                    />
                    <ShareDownload
                      wallpaper={false}
                      imgURL={DailyQuotes?.[itemIndex]?.image}
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
      <View>
        <Calendar
          setCalendarVisible={setCalendarVisible}
          calendarVisible={calendarVisible}
          selectedParentDate={selectedDate}
          setSelectedParentDate={setSelectedDate}
        />
      </View>
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
