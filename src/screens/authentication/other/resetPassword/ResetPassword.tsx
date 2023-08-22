/* eslint-disable @typescript-eslint/no-unused-vars */
import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
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
import {CommonStyle} from '../../../../../assets/styles';
import {
  FormInput,
  Loader,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {
  ResetPasswordProps,
  ResetPasswordValidationSchemaType,
  SupportedFormInputTypes,
} from '../../../../types';
import {COLORS} from '../../../../utils';
import {ResetPasswordValidationSchema} from '../../../../validations';
import {ResetPasswordstyle} from './style';

export const ResetPassword = ({
  navigation,
}: ResetPasswordProps): React.JSX.Element => {
  const {t, i18n} = useTranslation();

  const commonStyle = CommonStyle();

  const style = ResetPasswordstyle();

  const [isLoading, setIsloading] = React.useState(false);

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

  const onSubmit = (data: ResetPasswordValidationSchemaType) => {
    setIsApiloading(true);
    console.log(data);
    setIsApiloading(false);

    navigation.navigate('OTP');
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
                title={t('ResetPassword.ResetPasswordSubmitText')}
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
