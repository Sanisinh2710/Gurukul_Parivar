import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {CustomNavigate} from '../../../../components/ui/CustomNavigate/CustomNavigate';
import {ShareDownload} from '../../../../components/ui/ShareDownloadButton/ShareDownload';
import {RootAuthStackParamList} from '../../../../types';
import {COLORS, d, daysArray, options2} from '../../../../utils';
import {styles} from './styles';

export const CalendarScreen = ({
  navigation,
}: NativeStackScreenProps<RootAuthStackParamList>) => {
  const style = styles();
  const commonstyle = CommonStyle();
  const date = d.getDate().toString().padStart(2, '0');
  const day = daysArray[d.getDay()];
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
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

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Calendar'}
      />
      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        <ScrollView>
          <View>
            <Text style={style.title}>આજનો દિવસ રળીયામણો</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 64,
              flexDirection: 'row',
              marginVertical: '5%',
            }}>
            <View
              style={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                width: '20%',
                borderWidth: 1,
                borderColor: COLORS.primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                height: 64,
                backgroundColor: COLORS.primaryColor,
              }}>
              <Text style={style.date}>{date}</Text>
              <Text style={style.day}>{day}</Text>
            </View>
            <View
              style={{
                width: '80%',
                borderWidth: 0.25,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: 'white',
                paddingLeft: '5%',
                borderColor: 'rgba(172, 43, 49, 0.3)',
                justifyContent: 'center',
                height: 64,
              }}>
              <Text style={style.content1}>મુક્તાનંદ સ્વામીનો જન્મ દિવસ</Text>
              <Text style={style.content2}>૧૫,પૂર્ણિમા - શુક્લ પક્ષ </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 64,
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                width: '20%',
                borderWidth: 1,
                borderColor: COLORS.primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                height: 64,
                backgroundColor: COLORS.primaryColor,
              }}>
              <Text style={style.date}>{date}</Text>
              <Text style={style.day}>{day}</Text>
            </View>
            <View
              style={{
                width: '80%',
                borderWidth: 0.25,
                borderTopRightRadius: 10,
                backgroundColor: 'white',
                borderBottomRightRadius: 10,
                borderColor: 'rgba(172, 43, 49, 0.3)',
                justifyContent: 'center',
                height: 64,
                paddingLeft: '5%',
              }}>
              <Text style={style.content1}>મુક્તાનંદ સ્વામીનો જન્મ દિવસ</Text>
              <Text style={style.content2}>૧૫,પૂર્ણિમા - શુક્લ પક્ષ </Text>
            </View>
          </View>
          <View style={{marginTop: '15%'}}>
            <Image
              source={AllImages.CalendarImage}
              style={{height: 264, width: 345}}
            />
          </View>
          <ShareDownload wallpaper={false} />
        </ScrollView>
      </View>
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
