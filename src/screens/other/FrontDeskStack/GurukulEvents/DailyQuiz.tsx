import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AllIcons } from '../../../../../assets/icons';
import { CommonStyle } from '../../../../../assets/styles';
import { ScreenHeader, ScreenWrapper } from '../../../../components';
import { RootStackParamList } from '../../../../types';
import { styles } from './styles';

export const DailyQuiz = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {t, i18n} = useTranslation();
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
        headerTitle={'Status'}
        headerRight={{
          icon: AllIcons.ChartQuiz,
          onPress: () => {},
        }}
      />
      <View
        style={[
          commonstyle.commonContentView,
          {flex: 1, marginTop: 25},
        ]}></View>
    </ScreenWrapper>
  );
};
