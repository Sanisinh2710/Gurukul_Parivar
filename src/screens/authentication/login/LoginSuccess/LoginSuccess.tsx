import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {PrimaryButton, ScreenHeader} from '../../../../components';
import {LoginSuccessStackScreenProps} from '../../../../types';
import {styles} from './styles';

export const LoginSuccess = ({navigation}: LoginSuccessStackScreenProps) => {
  const commonStyle = CommonStyle();
  const style = styles();
  const {t, i18n} = useTranslation();

  return (
    <View style={commonStyle.commonContainer}>
      <View>
        <ScreenHeader
          showLeft={true}
          headerTitleAlign="center"
          leftOnPress={() => navigation.goBack()}
        />
      </View>
      <View style={style.container}>
        <View style={style.logoView}>
          <Image
            source={require('../../../../../assets/images/logo.png')}
            style={style.logo}
          />
        </View>
        <View>
          <Text style={style.title}>{t('loginSuccess:LoginSuccess')}</Text>
        </View>
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
  );
};
