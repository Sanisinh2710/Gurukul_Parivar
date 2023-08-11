import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Calendar,
  RadioLable,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {d, options} from '../../../../utils';
import {AllIcons} from '../../../../../assets/icons';
import {styles} from './styles';
import {RootStackParamList} from '../../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CustomNavigate} from '../../../../components/ui/CustomNavigate/CustomNavigate';
import {useTranslation} from 'react-i18next';
import {DailyDarshanApi} from '../../../../services/ApiServices';
import {Loader} from '../../../../components';

export const DailyDarshan = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const commonStyle = CommonStyle();
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [selectedItem, setselectedItem] = React.useState('');
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
    } catch (error) {
      console.log('Error');
    }
  }, [selectedItem, selectedDate]);
  console.log(Data);
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
            {name: 'both'},
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
        {loader ? (
          // <ActivityIndicator
          //   size={50}
          //   style={{flex: 1}}
          //   color={COLORS.primaryColor}
          // />
          <Loader />
        ) : (
          <View style={{height: '80%'}}>
            {Data.length > 0 ? (
              <FlatList
                data={Data}
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
                          totalImages: Data.length,
                          image: item.item,
                          date: selectedDate.toLocaleDateString(
                            'en-in',
                            options,
                          ),
                        });
                      }}>
                      <Image
                        source={{
                          uri: `https://gurukul.taskgrids.com${item.item}`,
                        }}
                        style={style.images}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: 20}}>
                  No Data Found
                </Text>
              </View>
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
