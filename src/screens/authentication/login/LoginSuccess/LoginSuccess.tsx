import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {PrimaryButton, ScreenHeader} from '../../../../components';
import {LoginSuccessStackScreenProps} from '../../../../types';
import {styles} from './styles';
import {CommonStyle} from '../../../../../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';

export const LoginSuccess = ({navigation}: LoginSuccessStackScreenProps) => {
  const commonStyle = CommonStyle();
  const style = styles();
  const {t, i18n} = useTranslation();

  return (
    <SafeAreaView style={commonStyle.commonContainer}>
      <ScreenHeader
        theme={undefined}
        showLeft={true}
        headerTitleAlign="center"
        leftOnPress={() => navigation.goBack()}
      />
      <View style={commonStyle.commonContentView}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={style.logoView}>
            <Image
              source={require('../../../../../assets/images/logo.png')}
              style={style.logo}
            />
          </View>
          <Text style={style.title}>{t('loginSuccess:LoginSuccess')}</Text>
          <View style={style.subtitleView}>
            <Text style={style.subtitle}>
              {t('loginSuccess:SuccessSubtitle')}
            </Text>
            <Text style={[style.subtitle, {textAlign: 'center'}]}>
              {t('loginSuccess:SuccessSubtitle2')}
            </Text>
            <PrimaryButton
              title={t('loginSuccess:LoginSuccessBTN')}
              onPress={() => navigation.replace('UploadPhoto')}
              buttonStyle={{marginTop: 40}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
