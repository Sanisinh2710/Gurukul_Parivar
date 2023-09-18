import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {styles} from './styles';
import {TextInput} from 'react-native';
import {COLORS, daysArray, GurukulEventsList} from '../../../../utils';

export const GurukulEvents = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {t} = useTranslation();
  const [searchListData, setSearchListData] =
    React.useState<Array<{[key: string]: any}>>(GurukulEventsList);

  const style = styles();

  const commonstyle = CommonStyle();
  const searchEvent = (val: string) => {
    if (val) {
      setSearchListData(
        GurukulEventsList.filter(item => {
          return (
            item.title.toLowerCase().includes(val.toLowerCase()) ||
            item.date.includes(val)
          );
        }),
      );
    } else {
      setSearchListData(GurukulEventsList);
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Gurukul Events'}
        headerRight={{
          icon: AllIcons.Filter,
          onPress: () => {},
        }}
      />
      <View style={[commonstyle.commonContentView, {flex: 1, marginTop: 25}]}>
        <>
          <View style={style.modelSearchView}>
            <View style={style.iconView}>
              <Image source={AllIcons.Search} style={style.iconStyle} />
            </View>
            <TextInput
              // value={searchvalue}
              placeholder={t('common.Search')}
              placeholderTextColor={COLORS.lightModetextColor}
              style={[style.formTextInput, {width: '80%'}]}
              onChangeText={val => {
                searchEvent(val.trim());
              }}
            />
          </View>

          {searchListData.map((item, index) => {
            return (
              <View key={index} style={style.textBoxContainer}>
                <View style={style.dateContainer}>
                  <Text style={style.date}>{item.date}</Text>
                  <Text style={style.day}>
                    {daysArray[new Date().getDay()]}
                  </Text>
                </View>
                <View style={style.contentContainer}>
                  <Text style={style.content1}>{item.title}</Text>
                  <Text style={style.content2}>{item.content}</Text>
                </View>
              </View>
            );
          })}
        </>
      </View>
    </ScreenWrapper>
  );
};
