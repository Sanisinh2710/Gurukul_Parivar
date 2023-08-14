import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Calendar,
  NoData,
  RadioLable,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {d, options} from '../../../../utils';
import {styles} from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CustomNavigate} from '../../../../components/ui/CustomNavigate/CustomNavigate';
import {useTranslation} from 'react-i18next';
import {DailyDarshanApi} from '../../../../services/ApiServices';
import {Loader} from '../../../../components';
import {AllImages} from '../../../../../assets/images';

export const DailyDarshan = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const commonStyle = CommonStyle();
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [selectedItem, setselectedItem] = React.useState('both');
  const [Data, setData] = React.useState<Array<String>>([]);
  const {t} = useTranslation();

  const style = styles();

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyDarshanApi(selectedDate, selectedItem);
      if (res.data.code === 200) {
        setTimeout(() => {
          setData(res.data.data.image_paths);
          setLoader(false);
        }, 200);
      }
    } catch (error) {}
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
          heading={''}
          list={[
            {name: 'both'},
            {name: t('DailyDarshan.Morning')},
            {name: t('DailyDarshan.Evening')},
          ]}
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
          // <ActivityIndicator
          //   size={50}
          //   style={{flex: 1}}
          //   color={COLORS.primaryColor}
          // />
          <Loader />
        ) : (
          <View style={{height: '85%'}}>
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
                          uri: `https://gurukul.taskgrids.com${item}`,
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
