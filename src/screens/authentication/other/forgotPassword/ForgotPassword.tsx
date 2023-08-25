import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {CommonStyle} from '../../../../../assets/styles';
import {
  FormInput,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RegisterApi} from '../../../../services';
import {
  EmailValidationSchemaType,
  ForgotPasswordProps,
} from '../../../../types';
import {COLORS} from '../../../../utils';
import {EmailValidationSchema} from '../../../../validations';
import {ForgotPasswordstyle} from './style';

export const ForgotPassword = ({
  navigation,
}: ForgotPasswordProps): React.JSX.Element => {
  const {t, i18n} = useTranslation();

  const commonStyle = CommonStyle();

  const style = ForgotPasswordstyle();

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

  const onSubmit = async (data: EmailValidationSchemaType) => {
    setIsApiloading(true);

    const response = await RegisterApi(data.primary_email, 'forgot');

    setIsApiloading(false);

    if (response.resType === 'SUCCESS') {
      Toast.show('An OTP has been sent to your mail..!', Toast.SHORT);
      const timer = setTimeout(() => {
        navigation.navigate('OTP', {
          primary_email: data.primary_email,
          reset_pass: true,
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      Toast.show(response.message, 2);
    }
  };

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
};
