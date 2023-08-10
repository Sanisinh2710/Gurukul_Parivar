import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions, Image, ScrollView, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {AllIcons} from '../../../../../assets/icons';
import {AllImages} from '../../../../../assets/images';

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
        headerTitle={t('DailyQuiz.Heading')}
        headerRight={{
          icon: AllIcons.ChartQuiz,
          onPress: () => {},
        }}
      />
      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Image
              source={AllImages.Rectangle68}
              style={{
                height: Dimensions.get('window').height * 0.9,
                width: '100%',
              }}
            />
          </View>
          <View style={{marginTop: 20, paddingBottom: 10}}>
            <PrimaryButton
              onPress={() => {
                navigation.navigate('dailyQuizDetail');
              }}
              title={t('DailyQuiz.NxtBtn')}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
