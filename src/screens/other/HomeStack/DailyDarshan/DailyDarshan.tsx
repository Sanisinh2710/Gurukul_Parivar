import React from 'react';

import {AllIcons, CommonStyle} from '@assets';
import {
  Calendar,
  CustomNavigate,
  Loader,
  NoData,
  RadioLable,
  ScreenHeader,
  ScreenWrapper,
  SimpleDropDown,
} from '@components';
import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DailyDarshanApi, GurukulBranchGetApi} from '@services';
import {RootStackParamList} from '@types';
import {COLORS, d, options} from '@utils';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {styles} from './styles';

const TimeArray = (t: any) => [
  {name: t('DailyDarshan.All'), id: 'both'},
  {name: t('DailyDarshan.Morning'), id: 'Morning'},
  {name: t('DailyDarshan.Evening'), id: 'Evening'},
];

export const DailyDarshan = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const commonStyle = CommonStyle();
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const [changeValue, setChangeValue] = React.useState();
  const {t} = useTranslation();

  const [selectedItem, setselectedItem] = React.useState(t('DailyDarshan.All'));
  const [GurukulList, setGurukulList] = React.useState<{[key: string]: any}[]>(
    [],
  );
  const [BranchName, setBranchName] = React.useState();
  const [DarshanImages, setDarshanImages] = React.useState([]);
  const [DarshanThumbImages, setDarshanThumbImages] = React.useState([]);

  const [refreshing, setRefreshing] = React.useState(false);
  const style = styles();

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
    if (GurukulList.length > 0) {
      const name = GurukulList.find(item => item.id == changeValue)?.name;
      setBranchName(name);
    }
  }, [changeValue, GurukulList]);

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyDarshanApi(
        selectedDate,
        TimeArray(t).find(item => item.name === selectedItem)?.id ?? 'both',
      );

      if (res.resType === 'SUCCESS') {
        setData(res.data);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedItem, selectedDate, BranchName]);

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
  const Image_Data = () => {
    if (Data.length > 0 && Data !== undefined) {
      let newImages = Data.filter(item => {
        if (item.branch === BranchName) {
          return item.image_paths;
        }
      })?.[0]?.image_paths;

      let thumbImages = Data.filter(item => {
        if (item.branch === BranchName) {
          return item.thumbnail;
        }
      })?.[0]?.thumbnail;

      setDarshanImages(newImages ?? []);
      setDarshanThumbImages(thumbImages ?? []);
    }
  };

  React.useEffect(() => {
    Image_Data();
  }, [Data, BranchName]);

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

      const res = await DailyDarshanApi(
        selectedDate,
        TimeArray(t).find(item => item.name === selectedItem)?.id ?? 'both',
      );

      if (res.resType === 'SUCCESS') {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }

    setRefreshing(false);
  };

  const navigateScreen = (index: number) => {
    navigation.navigate('dailyDarshanDetail', {
      totalImages: DarshanImages.length,
      data: DarshanImages,
      currentImageIndex: index,
      date: selectedDate.toLocaleDateString('en-in', options),
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
        headerTitle={t('DailyDarshan.Heading')}
        headerRight={{
          icon: AllIcons.Calendar,
          onPress: () => {
            setCalendarVisible(true);
          },
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          commonStyle.commonContentView,
          {
            height: '100%',
          },
        ]}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            colors={[COLORS.primaryColor, COLORS.green]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={style.dropDownContainer}>
          <View
            style={{
              marginTop: '5%',
            }}>
            <Text style={style.dropDownHeading}>
              {t('uploadPhoto.DropdownTitle')}
            </Text>

            <View style={style.dropdownStyle}>
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

        <RadioLable
          wantFullSpace={false}
          customStyle={style.radioLabelStyle}
          value={selectedItem}
          onChange={setselectedItem}
          list={TimeArray(t)}
          showHeading={false}
        />

        {loader ? (
          <Loader screenHeight={'70%'} />
        ) : (
          <View
            style={{
              paddingTop: '3%',
            }}>
            {Data.find(item => item.branch === BranchName) !== undefined &&
            DarshanThumbImages.length > 0 ? (
              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={DarshanThumbImages}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                }}
                style={{}}
                contentContainerStyle={style.imageFlatlistContentStyle}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          style.imageContainer,
                          {
                            borderRadius: 8,
                          },
                        ]}
                        onPress={() => {
                          navigateScreen(index);
                        }}>
                        <Image
                          source={{
                            uri: `${BASE_URL}${item}`,
                          }}
                          style={style.images}
                        />
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  height: '80%',
                }}>
                <NoData />
              </View>
            )}
          </View>
        )}
      </ScrollView>

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
