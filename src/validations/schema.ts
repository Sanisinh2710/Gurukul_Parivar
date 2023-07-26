import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {LoginValidationSchemaType} from '../types';
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
