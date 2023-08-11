import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootAuthStackParamList} from '../../../../types';
import {styles} from './styles';

export const QuizResult = ({
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
          onPress: () => {},
        }}
      />

      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        <ScrollView></ScrollView>
      </View>
    </ScreenWrapper>
  );
};
