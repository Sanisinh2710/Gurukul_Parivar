import React from 'react';

import {AllIcons, AllImages, CommonStyle} from '@assets';
import {PrimaryButton, ScreenHeader, ScreenWrapper} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, View} from 'react-native';
import {styles} from './styles';

export const DailyQuiz = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {t} = useTranslation();
  const style = styles();
  const commonstyle = CommonStyle();
  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('DailyQuiz.Heading')}
        headerRight={{
          icon: AllIcons.ChartQuiz,
          onPress: () => {
            navigation.navigate('status');
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.contentStyle}>
        <View style={[commonstyle.commonContentView, {flex: 1}]}>
          <View style={style.imageContainer}>
            <Image source={AllImages.Rectangle68} style={style.image} />
          </View>

          <View style={style.buttonWrapper}>
            <PrimaryButton
              onPress={() => {
                navigation.replace('dailyQuizDetail');
              }}
              title={t('DailyQuiz.NxtBtn')}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
