import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  CompleteProfileValidationSchemaType,
  LoginValidationSchemaType,
} from '../types';
import {phoneRegex} from '../utils';

export const LoginValidationSchema =
  (): yup.ObjectSchema<LoginValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      mobileNumber: yup
        .string()
        .trim()
        .required(t('loginScreen:MobileEmptyErrMsg'))
        .matches(phoneRegex, {message: t('loginScreen:MobileErrMsg1')}),
    });
  };

export const CompleteProfileValidationSchema =
  (): yup.ObjectSchema<CompleteProfileValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      profilePic: yup
        .string()
        .trim()
        .required('**Please select your profile picture..!'),
      gurukulName: yup
        .string()
        .trim()
        .required(`**Please select your Gurukul branch`),
    });
  };
