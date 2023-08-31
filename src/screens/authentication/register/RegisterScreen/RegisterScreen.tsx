import React from 'react';

import {BASE_URL} from '@env';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {FormInput, PrimaryButton, ScreenWrapper} from '../../../../components';
import {RegisterApi} from '../../../../services';
import {
  EmailValidationSchemaType,
  RootAuthStackParamList,
} from '../../../../types';
import {COLORS} from '../../../../utils';
import {EmailValidationSchema} from '../../../../validations';
import {RegisterScreenstyle} from './style';

export const RegisterScreen = ({
  navigation,
}: NativeStackScreenProps<
  RootAuthStackParamList,
  'Register'
>): React.JSX.Element => {
  const {t, i18n} = useTranslation();

  const commonStyle = CommonStyle();

  const style = RegisterScreenstyle();

  const [isApiLoading, setIsApiloading] = React.useState(false);

  const [disabled, setDisabled] = React.useState(true);

  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(EmailValidationSchema()),
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && watch().primary_email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watch()]);

  const onSubmit = React.useCallback(
    async (data: EmailValidationSchemaType) => {
      setIsApiloading(true);

      // Do something with email and than navigate to OTP Screen;
      const response = await RegisterApi(data.primary_email);

      setIsApiloading(false);

      if (response.resType === 'SUCCESS') {
        Toast.show('An OTP has been sent to your mail..!', Toast.SHORT);
        const timer = setTimeout(() => {
          navigation.navigate('OTP', {
            primary_email: data.primary_email,
          });
        }, 1000);

        return () => {
          clearTimeout(timer);
        };
      } else {
        Toast.show(response.message, 2);
      }
    },
    [],
  );

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '5%',
        }}>
        <View style={commonStyle.commonContentView}>
          {/* Header:------------------------------------------------------------------------ */}
          <View key={'LoginFormHeader'} style={style.headerView}>
            <View style={style.imgLogoView}>
              <Image source={AllImages.AppLogo} style={style.imgLogo} />
            </View>
            <View style={style.welcomeTitleView}>
              <Text style={style.welcomeTitle1Text}>
                {t('loginScreen.WelcomeTitle1')}
              </Text>
              <Text style={style.welcomeTitle2Text}>
                {t('loginScreen.WelcomeTitle2')}
              </Text>
              <Text style={style.welcomeSubtitleText}>
                {t('loginScreen.RegisterHeaderSubtitle')}
              </Text>
            </View>
          </View>

          {/* FormInputs:------------------------------------------------------------------------ */}
          <View key={'LoginFormInputs'} style={style.formInputsView}>
            <Controller
              control={control}
              name="primary_email"
              render={({field: {onBlur, onChange, value}}) => {
                return (
                  <FormInput
                    type={'email'}
                    name={'primary_email'}
                    label={t('loginScreen.EmailLBL')}
                    placeholder={t('loginScreen.EnterYourEmailPlaceholder')}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    editable={true}
                    error={errors['primary_email']?.message?.toString()}
                  />
                );
              }}
            />
          </View>

          {/* LoginFormFooter:------------------------------------------------------------------------ */}
          <View key={'LoginFormFooter'} style={style.footerView}>
            <Text style={style.footerText}>
              {t('loginScreen.FooterText1')}{' '}
              <Text
                style={style.footerRedText}
                onPress={() => Linking.openURL(`${BASE_URL}/term&condition`)}>
                {t('loginScreen.FT1')}
              </Text>{' '}
              {t('loginScreen.FooterText2').split(' ')[0]}
              <Text
                style={style.footerRedText}
                onPress={() => Linking.openURL(`${BASE_URL}/privacy-policy`)}>
                {' '}
                {t('loginScreen.FT2')}
              </Text>{' '}
              {t('loginScreen.FooterText2')
                .split(' ')
                .filter((val: any, index: number) => {
                  return index !== 0 && val;
                })
                .join(' ')}
            </Text>

            <PrimaryButton
              title={t('common.Signup')}
              customWidget={
                isApiLoading ? (
                  <>
                    <ActivityIndicator
                      size={25}
                      color={COLORS.darkModetextColor}
                    />
                  </>
                ) : undefined
              }
              onPress={handleSubmit(onSubmit)}
              disabled={disabled}
            />

            <Text style={[style.footerText, {alignSelf: 'center'}]}>
              {t('loginScreen.AlreadyHaveAc')}{' '}
              <Text
                style={[style.footerRedText]}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                {t('common.Signin').toLocaleLowerCase()}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
