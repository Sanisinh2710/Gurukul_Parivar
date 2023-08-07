import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  AddressFormValidationSchemaType,
  CompleteProfileFormValidationSchemaType,
  LoginFormValidationSchemaType,
  PersonalInfoFormValidationSchemaType,
} from '../types';
import {mailRegex, nameRegex, phoneRegex} from '../utils';

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
      dob: yup.string().trim().required(t('common.EmptyError')),
      bloodGroup: yup.string().trim().required(t('common.EmptyError')),
      mobilenumInfo: yup.array().of(
        yup.object().shape({
          mobilenum: yup
            .string()
            .required(t('common.EmptyError'))
            .matches(phoneRegex, {message: t('common.MobileErr')}),
          whatsappNum: yup.boolean(),
          secondary: yup.boolean(),
          countryCode: yup.string(),
        }),
      ),
      emailInfo: yup.array().of(
        yup.object().shape({
          email: yup
            .string()
            .required(t('common.EmptyError'))
            .matches(mailRegex, {message: t('personalInfo.EmailErr')}),
          secondary: yup.boolean(),
        }),
      ),
    });
  };

export const AddressFormValidationSchema =
  (): yup.ObjectSchema<AddressFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      addressInfo: yup.array().of(
        yup.object().shape({
          id: yup.string(),
          country: yup.string().trim().required(t('common.EmptyError')),
          address: yup.string().trim().required(t('common.EmptyError')),
          pincode: yup.string().trim().required(t('common.EmptyError')),
          cityVillage: yup.string().trim().required(t('common.EmptyError')),
          typeofAddress: yup.string().trim().required(t('common.EmptyError')),
        }),
      ),
    });
  };
