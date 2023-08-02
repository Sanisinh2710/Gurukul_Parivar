import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Calendar,
  RadioLable,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {
  CustomFonts,
  DailyDarshanAllImages,
  DailyDarshanEveningImages,
  DailyDarshanMorningImages,
} from '../../../../utils';
import {AllIcons} from '../../../../../assets/icons';
import {styles} from './styles';
const d = new Date();
const options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};
export const DailyDarshan = () => {
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);
  const commonStyle = CommonStyle();
  const [selectedDate, setSelectedDate] = React.useState<Date>(d);
  const [selectedItem, setselectedItem] = React.useState('');

  const style = styles();

  const getPreviousDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(selectedDate.getDate() - 1);
    return previousDate;
  };
  const getNextDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(selectedDate.getDate() + 1);
    return previousDate;
  };

  console.log(selectedDate, 'Calendar');

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        headerTitle={'Daily Darshan'}
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
          selectedItem={selectedItem}
          setselectedItem={setselectedItem}
          heading={''}
          list={[{name: 'All'}, {name: 'Morning'}, {name: 'Evening'}]}
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
              selectedItem === 'All'
                ? DailyDarshanAllImages()
                : selectedItem === 'Morning'
                ? DailyDarshanMorningImages()
                : selectedItem === 'Evening'
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
                    console.log('Daily Darshan Detail');
                  }}>
                  {/* <View> */}
                  <Image source={item.item.image} style={style.images} />
                  {/* </View> */}
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={style.navigationContainer}>
            <Pressable
              onPress={() => {
                const previousDate = getPreviousDate();
                setSelectedDate(previousDate);
              }}>
              <Image
                style={{height: 40, width: 40, transform: [{rotate: '90deg'}]}}
                source={AllIcons.RoundedArrow}
              />
            </Pressable>

            <Text
              style={{
                ...CustomFonts.header.small18,
                fontSize: 20,
                color: 'black',
                alignSelf: 'center',
              }}>
              {selectedDate !== undefined
                ? selectedDate.toLocaleDateString('en-in', options)
                : d.toLocaleDateString('en-in', options)}
            </Text>
            <Pressable
              onPress={() => {
                const NextDate = getNextDate();
                setSelectedDate(NextDate);
              }}>
              <Image
                style={{height: 40, width: 40, transform: [{rotate: '270deg'}]}}
                source={AllIcons.RoundedArrow}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};
