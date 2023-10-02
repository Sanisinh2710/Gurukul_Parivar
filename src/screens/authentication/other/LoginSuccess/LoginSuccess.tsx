import React from 'react';

import {useTranslation} from 'react-i18next';
import {Dimensions, Image, Text, View} from 'react-native';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {PrimaryButton, ScreenWrapper} from '../../../../components';
import {LoginSuccessStackScreenProps} from '../../../../types';
import {styles} from './styles';

export const LoginSuccess = ({
  navigation,
  route,
}: LoginSuccessStackScreenProps) => {
  const commonStyle = CommonStyle();
  const style = styles();
  const {t} = useTranslation();
  const type = route.params?.type;
  
  const navigateScreen = () =>{
    type === 'Login'
    ? navigation.replace('ProfileSignup')
    : type === 'Profile'
    ? navigation.replace('BottomNavBar')
    : navigation.replace('Login');
  }

  return (
    <ScreenWrapper>
      <View
        style={[
          commonStyle.commonContentView,
          {
            flex: type === 'Pass' ? 1 : 0.85,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          },
        ]}>
        <View style={style.logoView}>
          <Image
            source={type !== 'Pass' ? AllImages.GurukulLogo : AllImages.Reset}
            style={[style.logo, type === 'Pass' && {height: 64, width: 64}]}
          />
        </View>
        <Text style={[style.title, type === 'Pass' && {fontSize: 24}]}>
          {type === 'Login'
            ? t('loginSuccess.LoginSuccess')
            : type === 'Profile'
            ? t('loginSuccess.ProfileSuccess')
            : t('loginSuccess.ResetSuccess')}
        </Text>
        <View style={style.subtitleView}>
          {type !== 'Pass' ? (
            <Text style={style.subtitle}>
              {t('loginSuccess.SuccessSubtitle')}
            </Text>
          ) : null}
          <Text
            style={[
              style.subtitle,
              {textAlign: 'center'},
              // type === 'Pass' && {fontSize: 18},
            ]}>
            {type === 'Login'
              ? t('loginSuccess.SuccessSubtitle2')
              : type === 'Profile'
              ? t('loginSuccess.ProfileSuccessSubtitle2')
              : t('loginSuccess.ResetSuccessSubtitle')}
          </Text>
          <PrimaryButton
            title={
              type === 'Login'
                ? t('loginSuccess.LoginSuccessBTN')
                : type === 'Profile'
                ? t('loginSuccess.ProfileSuccessBTN')
                : t('loginSuccess.ResetSuccessBTN')
            }
            onPress={navigateScreen}
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
          zIndex: 1,
        }}>
        <Image
          source={AllImages.Bgimage}
          style={{
            width: '100%',
            opacity: 0.4,
            height: Dimensions.get('window').height * 0.3,
            resizeMode: 'cover',
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
