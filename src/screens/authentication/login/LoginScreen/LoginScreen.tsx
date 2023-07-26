import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyle} from '../../../../../assets/styles';
import {
  DropDownModel,
  FormInput,
  Loader,
  PrimaryButton,
} from '../../../../components';
import {
  LoginValidationSchemaType,
  RootAuthStackParamList,
} from '../../../../types';
import {Languages} from '../../../../utils';
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

  const [countryCodeSelect, setCountryCodeSelect] = React.useState('');

  const [modelVisible, setModelVisible] = React.useState<boolean>(false);

  const [language, setLanguage] = React.useState(Languages.gu);

  const [isLoading, setIsloading] = React.useState(false);

  const [disabled, setDisabled] = React.useState(true);

  React.useMemo(async () => {
    setIsloading(true);
    const getLangCode = await AsyncStorage.getItem('langCode');
    if (getLangCode) {
      const newLangcode = JSON.parse(getLangCode);

      if (newLangcode) {
        setModelVisible(false);
        setLanguage(Languages[newLangcode]);
      }
    } else {
      setModelVisible(true);
    }
    setIsloading(false);
  }, []);

  const {
    control,
    watch,
    reset,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(LoginValidationSchema()),
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (language) {
      for (let lang in Languages) {
        if (language === Languages[lang]) {
          i18n.changeLanguage(lang);
          AsyncStorage.setItem('langCode', JSON.stringify(lang));
          break;
        }
      }
    }
  }, [language]);

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && getValues('mobileNumber')) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watch()]);

  const onSubmit = (data: LoginValidationSchemaType) => {
    data.mobileNumber =
      countryCodeSelect.toString() + data.mobileNumber.toString();

    // Do something with mobile number and than navigate to OTP Screen;

    navigation.navigate('MobileLoginOTP');
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <SafeAreaView style={[commonStyle.commonContainer]}>
        <View style={commonStyle.commonContentView}>
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
                    state={{countryCodeSelect, setCountryCodeSelect}}
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
              disabled={disabled}
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
        </View>

        {/* Language Model.................................................................. */}
        <DropDownModel
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
          inputList={Object.values(Languages)}
          wantSearchBar={false}
          type={'radio'}
          localVal={language}
          setLocalVal={setLanguage}
          modalHeight={'45%'}
          label={t('loginScreen:SelectLangLabel')}
        />
      </SafeAreaView>
    );
  }
};
