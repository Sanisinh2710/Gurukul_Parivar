import React from 'react';

import {BASE_URL} from '@env';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {
  DropDownModel,
  FormInput,
  Loader,
  PrimaryButton,
  ScreenWrapper,
} from '../../../../components';
import {LoginByEmailApi} from '../../../../services';
import {storage} from '../../../../storage';
import {
  LoginFormValidationSchemaType,
  RootAuthStackParamList,
} from '../../../../types';
import {COLORS, Languages} from '../../../../utils';
import {LoginFormValidationSchema} from '../../../../validations';
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

  const [isLoading, setIsloading] = React.useState(false);

  const [isApiLoading, setIsApiloading] = React.useState(false);

  const [disabled, setDisabled] = React.useState(true);

  const [modelVisible, setModelVisible] = React.useState<boolean>(false);

  const [language, setLanguage] = React.useState(Languages.gu);

  const [countryCodeSelect, setCountryCodeSelect] = React.useState('');
  React.useMemo(() => {
    setIsloading(true);

    const getLangCode = storage.getString('langCode');

    const auth_token = storage.getString('auth_token');

    if (getLangCode) {
      const newLangcode = JSON.parse(getLangCode);

      if (newLangcode) {
        setModelVisible(false);
        setLanguage(Languages[newLangcode]);
      }
    } else {
      setModelVisible(true);
    }

    const timer = setTimeout(() => {
      setIsloading(false);
      if (auth_token) {
        navigation.replace('ProfileSignup');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(LoginFormValidationSchema()),
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (language) {
      for (let lang in Languages) {
        if (language === Languages[lang]) {
          i18n.changeLanguage(lang);
          storage.set('langCode', JSON.stringify(lang));
          break;
        }
      }
    }
  }, [language]);

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && watch().primary_email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watch()]);

  const onSubmit = React.useCallback(
    async (data: LoginFormValidationSchemaType) => {
      // data.countryCode = countryCodeSelect.split('(')[0].toString();

      setIsApiloading(true);
      // data.countryCode = countryCodeSelect || '+91(IN)';
      // data.mobileNumber = data.mobileNumber.toString();

      // Do something with mobile number and than navigate to OTP Screen;
      const response = await LoginByEmailApi(data.primary_email);

      setIsApiloading(false);

      if (response.resType === 'SUCCESS') {
        navigation.navigate('OTP', {
          primary_email: data.primary_email,
        });
      } else {
        Toast.show(response.message, 2);
      }
    },
    [],
  );

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'position' : 'padding'}>
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
                  {t('loginScreen.WelcomeSubtitle')}
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
                      label={t('personalInfo.EmailAddress')}
                      placeholder={t('personalInfo.EnterYourEmailPlaceholder')}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      editable={true}
                      error={errors['primary_email']?.message?.toString()}
                      state={{
                        countryCodeSelect,
                        setCountryCodeSelect,
                      }}
                    />
                  );
                }}
              />
            </View>

            {/* LoginFormFooter:------------------------------------------------------------------------ */}
            <View key={'LoginFormFooter'} style={style.footerView}>
              <PrimaryButton
                title={t('common.Signin')}
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
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Language Model.................................................................. */}
        <DropDownModel
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
          inputList={Object.values(Languages)}
          wantSearchBar={false}
          type={'radio'}
          selectedItem={language}
          setSelectedItem={setLanguage}
          modalHeight={'45%'}
          label={t('loginScreen.SelectLangLabel')}
        />
      </ScreenWrapper>
    );
  }
};