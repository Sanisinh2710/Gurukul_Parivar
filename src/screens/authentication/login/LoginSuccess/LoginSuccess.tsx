import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {PrimaryButton, ScreenHeader} from '../../../../components';
import {LoginSuccessStackScreenProps} from '../../../../types';
import {styles} from './styles';

export const LoginSuccess = ({navigation}: LoginSuccessStackScreenProps) => {
  const commonStyle = CommonStyle();
  const style = styles();
  const {t, i18n} = useTranslation();

  return (
    <SafeAreaView style={[commonStyle.commonContainer]}>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign="center"
        leftOnPress={() => navigation.goBack()}
      />

      <View
        style={[
          commonStyle.commonContentView,
          {
            flex: 0.85,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View style={style.logoView}>
          <Image source={AllImages.GurukulLogo} style={style.logo} />
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
            onPress={() => navigation.replace('ProfileSignup')}
            buttonStyle={{marginTop: 40}}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '30%',
          zIndex: -1,
        }}>
        <Image
          source={AllImages.Bgimage}
          style={{
            width: '100%',
            height: Dimensions.get('window').height * 0.3,
            resizeMode: 'cover',
          }}
        />
      </View>
    </SafeAreaView>
  );
};
