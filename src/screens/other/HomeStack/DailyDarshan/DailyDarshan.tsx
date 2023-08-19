import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {AllIcons} from '../../../../../assets/icons';

import {CommonStyle} from '../../../../../assets/styles';
import {
  Calendar,
  CustomNavigate,
  Loader,
  NoData,
  RadioLable,
  ScreenHeader,
  ScreenWrapper,
  SimpleDropDown,
} from '../../../../components';
import {
  DailyDarshanApi,
  GurukulBranchGetApi,
} from '../../../../services/ApiServices';
import {RootStackParamList} from '../../../../types';
import {COLORS, CustomFonts, d, options} from '../../../../utils';
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
  const [changeValue, setChangeValue] = React.useState(1);
  const {t} = useTranslation();

  const [selectedItem, setselectedItem] = React.useState(t('DailyDarshan.All'));
  const [GurukulList, setGurukulList] = React.useState<{[key: string]: any}[]>(
    [],
  );
  const [BranchName, setBranchName] = React.useState();
  const [DarshanImages, setDarshanImages] = React.useState([]);

  React.useMemo(async () => {
    const response = await GurukulBranchGetApi();
    if (response.resType === 'SUCCESS' && response.data.branches.length > 0) {
      setGurukulList(response.data.branches);
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

  const style = styles();

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
      let newImges = Data.filter(item => {
        if (item.branch === BranchName) {
          return item.image_paths;
        }
      })?.[0]?.image_paths;

      setDarshanImages(newImges ?? []);
    }
  };
  React.useEffect(() => {
    Image_Data();
  }, [Data, BranchName]);

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
      <View style={[commonStyle.commonContentView, {flex: 1}]}>
        <View style={{height: '8%', marginBottom: '16%'}}>
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
                marginTop: '2%',
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

        <RadioLable
          wantFullSpace={false}
          customStyle={{
            borderRadius: 60,
            height: 40,
            borderWidth: 0,
          }}
          value={selectedItem}
          onChange={setselectedItem}
          list={TimeArray(t)}
          showHeading={false}
        />

        {loader ? (
          <Loader />
        ) : (
          <View style={{height: '90%'}}>
            {Data.find(item => item.branch === BranchName) !== undefined &&
            DarshanImages.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={DarshanImages}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                contentContainerStyle={{
                  gap: 15,
                  marginTop: '3%',
                }}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={style.imageContainer}
                      onPress={() => {
                        navigation.navigate('dailyDarshanDetail', {
                          totalImages: DarshanImages.length,
                          data: DarshanImages,
                          image: item,
                          currentImageIndex: index,
                          date: selectedDate.toLocaleDateString(
                            'en-in',
                            options,
                          ),
                        });
                      }}>
                      <Image
                        source={{
                          uri: `${BASE_URL}${item}`,
                        }}
                        style={style.images}
                      />
                    </TouchableOpacity>
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
      </View>
      <View>
        <Calendar
          setCalendarVisible={setCalendarVisible}
          calendarVisible={calendarVisible}
          // saveParentDate={saveDate}
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
