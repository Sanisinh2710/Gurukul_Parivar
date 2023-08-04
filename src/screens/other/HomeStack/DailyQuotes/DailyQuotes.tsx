import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, Text, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {Calendar, ScreenHeader, ScreenWrapper} from '../../../../components';
import {CustomNavigate} from '../../../../components/ui/CustomNavigate/CustomNavigate';
import {ShareDownload} from '../../../../components/ui/ShareDownloadButton/ShareDownload';
import {RootStackParamList} from '../../../../types';
import {d, options} from '../../../../utils';
import {styles} from './styles';

export const DailyQuotes = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const {t} = useTranslation();
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
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
        <View>
          <Calendar
            setCalendarVisible={setCalendarVisible}
            calendarVisible={calendarVisible}
            // saveParentDate={saveDate}
            selectedParentDate={selectedDate}
            setSelectedParentDate={setSelectedDate}
          />
        </View>
        <View
          style={{
            height: Dimensions.get('window').height * 0.7,
            justifyContent: 'center',
          }}>
          <Image
            source={AllImages.DailyQuote}
            style={{
              height: Dimensions.get('window').height * 0.58,
              width: '100%',
              borderRadius: 10,
            }}
          />
        </View>

        <ShareDownload wallpaper={false} />
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
