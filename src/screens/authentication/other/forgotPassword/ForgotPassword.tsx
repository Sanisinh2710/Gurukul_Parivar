/* eslint-disable @typescript-eslint/no-unused-vars */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  EmailValidationSchemaType,
  ForgotPasswordProps,
  RootAuthStackParamList,
} from '../../../../types';
import {useTranslation} from 'react-i18next';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {EmailValidationSchema} from '../../../../validations';
import {LoginScreenstyle} from '../../login/LoginScreen/style';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Text,
  View,
} from 'react-native';
import {
  FormInput,
  Loader,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {COLORS} from '../../../../utils';
import {ForgotPasswordstyle} from './style';

export const ForgotPassword = ({
  navigation,
}: ForgotPasswordProps): React.JSX.Element => {
  const {t, i18n} = useTranslation();

  const commonStyle = CommonStyle();

  const style = ForgotPasswordstyle();

  const [isLoading, setIsloading] = React.useState(false);

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

  const onSubmit = (data: EmailValidationSchemaType) => {
    setIsApiloading(true);
    console.log(data);
    setIsApiloading(false);

    navigation.navigate('MobileLoginOTP');
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'position' : 'padding'}>
          <ScreenHeader
            showLeft={true}
            headerTitleAlign={'left'}
            leftOnPress={() => {
              navigation.goBack();
            }}
          />
          <View style={commonStyle.commonContentView}>
            {/* Header:------------------------------------------------------------------------ */}
            <View key={'ForgotPassword'} style={style.headerView}>
              <View style={style.welcomeTitleView}>
                <Text style={style.welcomeTitle1Text}>
                  {t('ForgotPassword.ForgotPassword')}
                </Text>
                <Text style={style.welcomeTitle2Text}>
                  {t('ForgotPassword.ForgotPasswordSubTitle')}
                </Text>
              </View>
            </View>

            {/* FormInputs:------------------------------------------------------------------------ */}
            <View key={'ForgotPasswordFormInputs'} style={style.formInputsView}>
              <Controller
                control={control}
                name="primary_email"
                render={({field: {onBlur, onChange, value}}) => {
                  return (
                    <FormInput
                      type={'email'}
                      name={'primary_email'}
                      label={t('personalInfo.EmailAddress')}
                      placeholder={t('personalInfo.EnterYourEmailPlaceholder')}
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
              <PrimaryButton
                title={t('otpScreen.SendOtp')}
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
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    );
  }
};
