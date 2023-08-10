import React from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Calendar,
  RadioLable,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {
  d,
  DailyDarshanAllImages,
  DailyDarshanEveningImages,
  DailyDarshanMorningImages,
  options,
} from '../../../../utils';
import {AllIcons} from '../../../../../assets/icons';
import {styles} from './styles';
import {RootStackParamList} from '../../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CustomNavigate} from '../../../../components/ui/CustomNavigate/CustomNavigate';
import {useTranslation} from 'react-i18next';

export const DailyDarshan = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const commonStyle = CommonStyle();
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [selectedItem, setselectedItem] = React.useState('');
  const {t} = useTranslation();

  const style = styles();

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
          customStyle={{borderRadius: 60, height: 40, borderWidth: 0}}
          selectedItem={selectedItem}
          setselectedItem={setselectedItem}
          heading={''}
          list={[
            {name: t('DailyDarshan.All')},
            {name: t('DailyDarshan.Morning')},
            {name: t('DailyDarshan.Evening')},
          ]}
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

        <View style={{height: '80%'}}>
          <FlatList
            data={
              selectedItem === t('DailyDarshan.All')
                ? DailyDarshanAllImages()
                : selectedItem === t('DailyDarshan.Morning')
                ? DailyDarshanMorningImages()
                : selectedItem === t('DailyDarshan.Evening')
                ? DailyDarshanEveningImages()
                : DailyDarshanAllImages()
            }
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            contentContainerStyle={{
              gap: 15,
              marginTop: '3%',
            }}
            renderItem={item => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={style.imageContainer}
                  onPress={() => {
                    navigation.navigate('dailyDarshanDetail', {
                      image: item.item.image,
                      date: selectedDate.toLocaleDateString('en-in', options),
                    });
                  }}>
                  <Image source={item.item.image} style={style.images} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
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
