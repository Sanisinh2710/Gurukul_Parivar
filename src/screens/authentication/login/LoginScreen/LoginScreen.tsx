import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyle} from '../../../../../assets/styles';
import {FormInput, PrimaryButton} from '../../../../components';
import {
  LoginValidationSchemaType,
  RootAuthStackParamList,
} from '../../../../types';
import {LoginValidationSchema} from '../../../../validations';
import {LoginScreenstyle} from './style';

export const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<
  RootAuthStackParamList,
  'MobileLogin'
>): React.JSX.Element => {
  const {t, i18n} = useTranslation();

  const commonStyle = CommonStyle();

  const style = LoginScreenstyle();

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(LoginValidationSchema()),
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginValidationSchemaType) => {
    console.log(data.mobileNumber);
    // Do something with mobile number and than navigate to OTP Screen;

    navigation.navigate('MobileLoginOTP');
  };

  return (
    <SafeAreaView style={[commonStyle.commonContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={commonStyle.commonContentView}>
        {/* Header:------------------------------------------------------------------------ */}
        <View key={'LoginFormHeader'} style={style.headerView}>
          <View style={style.imgLogoView}>
            <Image
              source={require('../../../../../assets/images/SGVP_Logo1.png')}
              style={style.imgLogo}
            />
          </View>
          <View style={style.welcomeTitleView}>
            <Text style={style.welcomeTitle1Text}>
              {t('loginScreen:WelcomeTitle1')}
            </Text>
            <Text style={style.welcomeTitle2Text}>
              {t('loginScreen:WelcomeTitle2')}
            </Text>
            <Text style={style.welcomeSubtitleText}>
              {t('loginScreen:WelcomeSubtitle')}
            </Text>
          </View>
        </View>

        {/* FormInputs:------------------------------------------------------------------------ */}
        <View key={'LoginFormInputs'} style={style.formInputsView}>
          <Controller
            control={control}
            name="mobileNumber"
            render={({field: {onBlur, onChange, value}}) => {
              return (
                <FormInput
                  type={'phone'}
                  name={'mobileNumber'}
                  label={t('loginScreen:MobileNumber')}
                  placeholder={t('loginScreen:EnterMobileNum')}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={errors['mobileNumber']?.message?.toString()}
                />
              );
            }}
          />
        </View>

        {/* LoginFormFooter:------------------------------------------------------------------------ */}
        <View key={'LoginFormFooter'} style={style.footerView}>
          <PrimaryButton
            title={t('common:Signin')}
            onPress={handleSubmit(onSubmit)}
          />
          <Text style={style.footerText}>
            {t('loginScreen:FooterText1')}{' '}
            <Text style={style.footerRedText}>{t('loginScreen:FT1')}</Text>{' '}
            {t('loginScreen:FooterText2').split(' ')[0]}
            <Text style={style.footerRedText}>
              {' '}
              {t('loginScreen:FT2')}
            </Text>{' '}
            {t('loginScreen:FooterText2')
              .split(' ')
              .filter((val, index) => {
                return index !== 0 && val;
              })
              .join(' ')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
