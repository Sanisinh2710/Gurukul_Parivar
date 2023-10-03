import React from 'react';

import {CommonStyle} from '@assets';
import {PrimaryButton, ScreenHeader, ScreenWrapper} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';
import {CustomFonts} from '@utils';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {styles} from './styles';

export const QuizResult = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'QuizResult'>) => {
  const style = styles();
  const {t} = useTranslation();
  const commonstyle = CommonStyle();
  const Marks = route.params.marks;

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('DailyQuiz.Result')}
      />

      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              marginBottom: '5%',
            }}>
            <Progress.Circle
              size={128}
              indeterminate={false}
              animated={true}
              progress={Marks / 100}
              color={
                Marks >= 51 ? 'rgba(0, 166, 88, 1)' : 'rgba(255, 48, 48, 1)'
              }
              borderWidth={0}
              unfilledColor={'rgba(230, 230, 230, 1)'}
              thickness={18}
              showsText={true}
              fill={'none'}
              textStyle={style.progressText}
              formatText={() => <Text>{Math.floor(Marks)}</Text>}
            />
            <View style={{marginTop: '5%'}}>
              <Text
                style={{
                  ...CustomFonts.header.medium20,
                  fontSize: 30,
                  color: 'black',
                  textAlign: 'center',
                }}>
                {t('ResultModel.Title')}
              </Text>
              <Text
                style={{
                  marginTop: '2%',
                  ...CustomFonts.body.medium12,
                  fontSize: 17,
                  color: 'rgba(23,23,23,0.5)',
                  textAlign: 'center',
                }}>
                {t('ResultModel.Content')}
              </Text>
            </View>
          </View>
          <PrimaryButton
            title={t('ResultModel.BtnText')}
            onPress={() => navigation.navigate('status')}
          />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
