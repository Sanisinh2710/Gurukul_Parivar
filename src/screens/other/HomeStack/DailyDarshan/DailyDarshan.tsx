import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
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
} from '../../../../components';
import {DailyDarshanApi} from '../../../../services/ApiServices';
import {RootStackParamList} from '../../../../types';
import {d, options} from '../../../../utils';
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
  const [Data, setData] = React.useState<Array<String>>([]);

  const {t} = useTranslation();

  const [selectedItem, setselectedItem] = React.useState(t('DailyDarshan.All'));

  const style = styles();

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyDarshanApi(
        selectedDate,
        TimeArray(t).find(item => item.name === selectedItem)?.id ?? 'both',
      );

      if (res.resType === 'SUCCESS') {
        if (res.resType === 'SUCCESS') {
          setTimeout(() => {
            setData(res.data.image_paths);
            setData(res.data.image_paths);
            setLoader(false);
          }, 200);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedItem, selectedDate]);

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

        <View>
          <Calendar
            setCalendarVisible={setCalendarVisible}
            calendarVisible={calendarVisible}
            // saveParentDate={saveDate}
            selectedParentDate={selectedDate}
            setSelectedParentDate={setSelectedDate}
          />
        </View>
        {loader ? (
          <Loader />
        ) : (
          <View style={{height: '90%'}}>
            {Data.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={Data}
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
                          totalImages: Data.length,
                          data: Data,
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
              <NoData />
            )}
          </View>
        )}
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
