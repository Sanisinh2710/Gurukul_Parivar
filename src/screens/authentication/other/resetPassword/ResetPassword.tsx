import React from 'react';

import {CommonStyle} from '@assets';
import {
  FormInput,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '@components';
import {yupResolver} from '@hookform/resolvers/yup';
import {SetPasswordApi, getAuthToken, isProfilingDone} from '@services';
import {
  ResetPasswordProps,
  ResetPasswordValidationSchemaType,
  SupportedFormInputTypes,
} from '@types';
import {COLORS} from '@utils';
import {ResetPasswordValidationSchema} from '@validations';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {ResetPasswordstyle} from './style';

export const ResetPassword = ({
  route,
  navigation,
}: ResetPasswordProps): React.JSX.Element => {
  const reset_pass = route.params?.reset_pass;

  const {t} = useTranslation();

  const commonStyle = CommonStyle();

  const style = ResetPasswordstyle();

  const [isApiLoading, setIsApiloading] = React.useState(false);

  const [disabled, setDisabled] = React.useState(true);

  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(ResetPasswordValidationSchema()),
    mode: 'onChange',
  });

  const ResetPasswordInputList: {
    name: string;
    lable: string;
    placeholder: string;
    type: SupportedFormInputTypes;
    required: boolean;
  }[] = [
    {
      name: 'password',
      lable: t('ResetPassword.PasswordLbl'),
      placeholder: t('ResetPassword.PasswordLblPlaceholder'),
      type: 'password',
      required: true,
    },
    {
      name: 'confirm_password',
      lable: t('ResetPassword.ConfirmPasswordLbl'),
      placeholder: t('ResetPassword.ConfirmPasswordPlaceholder'),
      type: 'password',
      required: true,
    },
  ];

  React.useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      watch().password &&
      watch().confirm_password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watch()]);

  const onSubmit = async (data: ResetPasswordValidationSchemaType) => {
    setIsApiloading(true);

    const response = await SetPasswordApi(data.password);

    if (response.resType === 'SUCCESS') {
      const {resType} = getAuthToken();

      if (resType === 'SUCCESS') {
        const isProfileSignupDone = isProfilingDone();
        setIsApiloading(false);

        if (isProfileSignupDone === 'ERROR') {
          navigation.replace('Success', {type: 'Login'});
        } else {
          navigation.replace('Success', {type: 'Pass'});
        }
      } else {
        setIsApiloading(false);
      }
    } else {
      Toast.show(response.message, Toast.SHORT);
    }

    setIsApiloading(false);
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
          <View key={'ResetPasswordHeader'} style={style.headerView}>
            <View style={style.welcomeTitleView}>
              <Text style={style.welcomeTitle1Text}>
                {t('ResetPassword.NewPassword')}
              </Text>
              <Text style={style.welcomeTitle2Text}>
                {t('ResetPassword.NewPasswordSubTitle')}
              </Text>
            </View>
          </View>

          {/* FormInputs:------------------------------------------------------------------------ */}

          <FlatList
            data={ResetPasswordInputList}
            renderItem={({item, index}) => (
              <View key={index} style={style.formInputsView}>
                <Controller
                  control={control}
                  name={item.name}
                  render={({field: {onBlur, onChange, value}}) => {
                    return (
                      <FormInput
                        type={item.type}
                        name={item.name}
                        label={item.lable}
                        placeholder={item.placeholder}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        editable={true}
                        error={errors[item.name]?.message?.toString()}
                      />
                    );
                  }}
                />
              </View>
            )}
          />

          {/* LoginFormFooter:------------------------------------------------------------------------ */}
          <View key={'ResetPasswordFormFooter'} style={style.footerView}>
            <PrimaryButton
              title={
                reset_pass
                  ? t('ResetPassword.ResetPasswordSubmitText')
                  : t('ResetPassword.ResetPasswordSubmitText2')
              }
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
