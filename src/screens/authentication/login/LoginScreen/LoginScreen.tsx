import React from 'react';

import {BASE_URL} from '@env';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {AllIcons} from '../../../../../assets/icons';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {
  DropDownModel,
  FormInput,
  Loader,
  PrimaryButton,
  ScreenWrapper,
} from '../../../../components';
import {SET_USER_DATA} from '../../../../redux/ducks/userSlice';
import {useAppDispatch} from '../../../../redux/hooks';
import {
  GuestLoginGetApi,
  LoginApi,
  PersonalInfoGetDetailsApi,
  getAuthCredentialsForAutoFill,
  isProfilingDone,
  setAuthCredentialsForAutoFill,
  setAuthToken,
} from '../../../../services';
import {storage} from '../../../../storage';
import {
  CurrUserDataTypeNested,
  LoginFormValidationSchemaType,
  LoginScreenProps,
} from '../../../../types';
import {COLORS, Languages} from '../../../../utils';
import {LoginFormValidationSchema} from '../../../../validations';
import {LoginScreenstyle} from './style';

export const LoginScreen = ({
  navigation,
}: LoginScreenProps): React.JSX.Element => {
  const {t, i18n} = useTranslation();

  const commonStyle = CommonStyle();

  const style = LoginScreenstyle();

  const [isLoading, setIsloading] = React.useState(false);

  const [isApiLoading, setIsApiloading] = React.useState(false);

  const [disabled, setDisabled] = React.useState(true);

  const [modelVisible, setModelVisible] = React.useState<boolean>(false);

  const [language, setLanguage] = React.useState(Languages.gu);

  const [remeberMe, setRememberMe] = React.useState(
    getAuthCredentialsForAutoFill().resType === 'SUCCESS' &&
      getAuthCredentialsForAutoFill().userdata.email !== '' &&
      getAuthCredentialsForAutoFill().userdata.password !== ''
      ? true
      : false,
  );

  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: getAuthCredentialsForAutoFill().userdata.email ?? '',
      password: getAuthCredentialsForAutoFill().userdata.password ?? '',
    },
    resolver: yupResolver(LoginFormValidationSchema()),
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();

  React.useMemo(() => {
    setIsloading(true);

    const getLangCode = storage.getString('langCode');

    const auth_token = storage.getString('auth_token');

    const resetedPass = storage.getString('resetedPass');

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

      if (resetedPass) {
        const reseted_pass = JSON.parse(resetedPass);

        if (reseted_pass) {
        } else {
          if (auth_token) {
            navigation.replace('ProfileSignup');
          }
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    if (Object.keys(errors).length === 0 && watch().email && watch().password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watch()]);

  React.useEffect(() => {
    if (remeberMe) {
      const userData = {
        email: watch().email,
        password: watch().password,
      };

      const res = setAuthCredentialsForAutoFill(userData);
    }
  }, [remeberMe, watch()]);

  const onSubmit = React.useCallback(
    async (data: LoginFormValidationSchemaType) => {
      setIsApiloading(true);

      // Do something with email and than navigate to OTP Screen;
      const response = await LoginApi(data);

      setIsApiloading(false);

      if (response.resType === 'SUCCESS') {
        const resType = setAuthToken({
          primary_email: data.email,
          token: response?.data?.token,
          is_profile_updated: response?.data?.is_profile_updated,
        });
        if (resType === 'SUCCESS') {
          const isProfileSignupDone = isProfilingDone();

          if (isProfileSignupDone === 'SUCCESS') {
            const backenduserresponse = await PersonalInfoGetDetailsApi();

            if (backenduserresponse.resType === 'SUCCESS') {
              if (
                backenduserresponse.data.personal_details !== null &&
                backenduserresponse.data.personal_details !== undefined &&
                backenduserresponse.data.personal_details !== ''
              ) {
                let finalData = JSON.parse(
                  JSON.stringify(backenduserresponse.data.personal_details),
                );

                finalData.profile = `${BASE_URL}${backenduserresponse.data.personal_details?.profile}`;

                dispatch(SET_USER_DATA({userData: finalData, role: 'USER'}));
                navigation.replace('BottomNavBar');
              } else {
                navigation.replace('Success', {type: 'Login'});
              }
            } else {
              setIsApiloading(false);
              Toast.show(backenduserresponse.message, 2);
            }
          } else {
            navigation.replace('Success', {type: 'Login'});
          }
        } else {
          setIsApiloading(false);
          Toast.show(resType, 2);
        }
      } else {
        Toast.show(response.message, 2);
      }
    },
    [],
  );

  const remeberMeOnPress = () => {
    setRememberMe(!remeberMe);
  };

  const forgotPassOnPress = () => {
    // Redirect to forgetOtp screen:----------
    navigation.navigate('ForgotPassword');
  };

  const signUpOnPress = () => {
    navigation.navigate('Register');
  };

  const continueGuestOnPress = async () => {
    setIsloading(true);

    const response = await GuestLoginGetApi();
    if (response.resType === 'SUCCESS') {
      const resType = setAuthToken({
        primary_email: '',
        token: response?.data?.token,
        is_profile_updated: true,
      });

      if (resType === 'SUCCESS') {
        dispatch(
          SET_USER_DATA({
            userData: {} as CurrUserDataTypeNested,
            role: 'GUEST',
          }),
        );
        navigation.replace('BottomNavBar');
      } else {
        Toast.show(resType, 2);
      }
    } else {
      Toast.show(response.message, 2);
    }

    setIsloading(false);
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <ScreenWrapper>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.loginContainerStyle}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={-150}
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
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
                    {t('loginScreen.PleaseEnterEmailPass')}
                  </Text>
                </View>
              </View>

              {/* FormInputs:------------------------------------------------------------------------ */}
              <View key={'LoginFormInputs'} style={style.formInputsView}>
                <Controller
                  control={control}
                  name="email"
                  render={({field: {onBlur, onChange, value}}) => {
                    return (
                      <FormInput
                        type={'email'}
                        name={'email'}
                        label={t('loginScreen.EmailLBL')}
                        placeholder={t('loginScreen.EnterYourEmailPlaceholder')}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        editable={true}
                        error={errors['email']?.message?.toString()}
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({field: {onBlur, onChange, value}}) => {
                    return (
                      <FormInput
                        type={'password'}
                        name={'password'}
                        label={t('loginScreen.PasswordLBL')}
                        placeholder={t('loginScreen.EnterYourPassPlaceholder')}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        editable={true}
                        error={errors['password']?.message?.toString()}
                      />
                    );
                  }}
                />
              </View>
              <View style={style.FooterInputs}>
                <View
                  style={style.rememberMeViewStyle}
                  onTouchEnd={remeberMeOnPress}>
                  <View>
                    {remeberMe ? (
                      <View style={style.filledBoxView}>
                        <Image
                          source={AllIcons.CheckBoxOutline}
                          style={style.filledBoxTick}
                        />
                      </View>
                    ) : (
                      <View style={style.emptyBoxView} />
                    )}
                  </View>

                  <Text style={style.rememeberMeText}>
                    {t('loginScreen.RememberMe')}
                  </Text>
                </View>
                <Text onPress={forgotPassOnPress} style={style.forgotPassText}>
                  {t('ForgotPassword.ForgotPassword')}
                </Text>
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
                <View style={[style.footerTextsView]}>
                  <Text style={[style.footerText1]} onPress={signUpOnPress}>
                    {t('loginScreen.DontHaveAc')}{' '}
                    <Text style={[style.footerRedText]}>
                      {t('common.Signup').toLocaleLowerCase()}
                    </Text>
                  </Text>

                  <Text style={[style.footerText2]}>{t('common.OR')}</Text>

                  <Text
                    style={[style.footerText3]}
                    onPress={continueGuestOnPress}>
                    {t('common.ContinueAsGuest')}
                  </Text>
                </View>

                {/* <Text style={style.footerText}>
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
              </Text> */}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        {/* Language Model.................................................................. */}
        <DropDownModel
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
          inputList={[...Object.values(Languages)]}
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
