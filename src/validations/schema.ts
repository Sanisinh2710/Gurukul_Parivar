import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  CompleteProfileFormValidationSchemaType,
  LoginFormValidationSchemaType,
  PersonalInfoFormValidationSchemaType,
} from '../types';
import {nameRegex, phoneRegex} from '../utils';

export const LoginFormValidationSchema =
  (): yup.ObjectSchema<LoginFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      mobileNumber: yup
        .string()
        .trim()
        .required(t('loginScreen.MobileEmptyErrMsg'))
        .matches(phoneRegex, {message: t('loginScreen.MobileErrMsg1')}),
    });
  };

export const CompleteProfileFormValidationSchema =
  (): yup.ObjectSchema<CompleteProfileFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      profilePic: yup.string(),
      gurukulName: yup.string().trim().required(t('common.EmptyError')),
    });
  };

export const PersonalInfoFormValidationSchema =
  (): yup.ObjectSchema<PersonalInfoFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      gender: yup.string().trim().required(t('common.EmptyError')),
      fullname: yup
        .string()
        .trim()
        .required(t('common.EmptyError'))
        .matches(nameRegex, {message: t('personalInfo.NameErr')}),
      fatherFullName: yup
        .string()
        .trim()
        .required(t('common.EmptyError'))
        .matches(nameRegex, {message: t('personalInfo.NameErr')}),
      dob: yup
        .string()
        .trim()
        .required(t('common.EmptyError'))
        .test({
          name: 'dob',
          skipAbsent: true,
          test(value, ctx) {
            if (value) {
              console.log(value);
              // return ctx.createError({
              //   message: ''
              // })
            }
            return true;
          },
        }),
      bloodGroup: yup.string().trim().required(t('common.EmptyError')),
      mobilenum: yup.string().trim().required(t('common.EmptyError')),
      secondaryMobileNum: yup.string().trim(),
      email: yup
        .string()
        .trim()
        .required(t('common.EmptyError'))
        .matches(nameRegex, {message: t('personalInfo.EmailErr')}),
      secondaryEmail: yup.string().trim(),
    });
  };
