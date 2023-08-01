import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  CompleteProfileFormValidationSchemaType,
  LoginFormValidationSchemaType,
} from '../types';
import {phoneRegex} from '../utils';

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
  (): yup.ObjectSchema<CompleteProfileFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      profilePic: yup.string(),
      gurukulName: yup
        .string()
        .trim()
        .required(`**Please select your Gurukul branch`),
    });
  };
