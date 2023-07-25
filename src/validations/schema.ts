import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {LoginValidationSchemaType} from '../types';

export const LoginValidationSchema =
  (): yup.ObjectSchema<LoginValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      mobileNumber: yup
        .string()
        .trim()
        .required(t('loginScreen:MobileEmptyErrMsg'))
        .test({
          name: 'mobileNumber',
          skipAbsent: true,
          test(value: string, ctx) {
            if (value.includes(')')) {
              const phoneNumArr = value.split(')');
              const phonenum = phoneNumArr[1];
              if (phonenum.length < 10) {
                return ctx.createError({
                  message: t('loginScreen:MobileErrMsg1'),
                });
              }
            }
            if (value.length < 10) {
              return ctx.createError({
                message: t('loginScreen:MobileErrMsg1'),
              });
            }
            return true;
          },
        }),
      // .matches(phoneRegex, {message: t('loginScreen:MobileErrMsg1')}),
    });
  };
