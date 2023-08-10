import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, TextInput, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootAuthStackParamList} from '../../../../types';
import {COLORS, CustomFonts} from '../../../../utils';
import {styles} from './styles';

export const LiveSatsang = ({
  navigation,
}: NativeStackScreenProps<RootAuthStackParamList>) => {
  const style = styles();
  const {t} = useTranslation();
  const commonstyle = CommonStyle();

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Live Satsang'}
        headerRight={{
          icon: AllIcons.Filter,
          onPress: () => {
            console.log('Hi');
          },
        }}
      />

      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        <ScrollView>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E6E6E6',
              borderRadius: 10,
              height: 50,
              marginTop: 12,
              paddingHorizontal: 15,
            }}>
            <Image source={AllIcons.Search} style={{height: 22, width: 22}} />
            <TextInput
              //   value={searchvalue}
              placeholder={t('common.Search')}
              placeholderTextColor={'rgba(23,23,23,0.3)'}
              style={{
                ...CustomFonts.body.large14,
                fontSize: 16,
                fontWeight: '400',
                width: '100%',
                color: COLORS.lightModetextColor,
                opacity: 1,
              }}
              onChangeText={val => {
                // setSearch(val);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
