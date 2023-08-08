import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  AddressFormValidationSchemaType,
  CompleteProfileFormValidationSchemaType,
  GurukulFormValidationSchemaType,
  EduBusinessInfoValidationSchemaType,
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
      bloodGroup: yup.string().required(t('common.EmptyError')),
      mobilenumInfo: yup
        .array()
        .of(
          yup.object().shape({
            mobilenum: yup
              .string()
              .required(t('common.EmptyError'))
              .matches(phoneRegex, {message: t('common.MobileErr')}),
            whatsappNum: yup.boolean(),
            secondary: yup.boolean(),
            countryCode: yup.string(),
          }),
        )
        .required(),
      emailInfo: yup
        .array()
        .of(
          yup.object().shape({
            email: yup
              .string()
              .required(t('common.EmptyError'))
              .matches(mailRegex, {message: t('personalInfo.EmailErr')}),
            secondary: yup.boolean(),
          }),
        )
        .required(),
    });
  };

export const AddressFormValidationSchema =
  (): yup.ObjectSchema<AddressFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      addressInfo: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.string(),
            country: yup.string().trim().required(t('common.EmptyError')),
            address: yup.string().trim().required(t('common.EmptyError')),
            pincode: yup.string().trim().required(t('common.EmptyError')),
            cityVillage: yup.string().trim().required(t('common.EmptyError')),
            typeofAddress: yup.string().trim().required(t('common.EmptyError')),
            communicationAddr: yup.boolean(),
          }),
        )
        .required(),
    });
  };

export const EduBusinessInfoFormValidationSchema =
  (): yup.ObjectSchema<EduBusinessInfoValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      maxEduLevel: yup.string().trim().required(t('common.EmptyError')),
      occupation: yup.string().trim().required(t('common.EmptyError')),
      occupationType: yup.string().trim().required(t('common.EmptyError')),
      skills: yup
        .array()
        .min(1, t('common.EmptyError'))
        .required(t('common.EmptyError')),
      otherComment: yup.string().trim().required(t('common.EmptyError')),
    });
  };

export const GurukulFormValidationSchema =
  (): yup.ObjectSchema<GurukulFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      gurukulData: yup.array().of(
        yup.object().shape({
          gurukulBranch: yup.string().trim().required(t('common.EmptyError')),
          attendGurukul: yup.string().trim().required(t('common.EmptyError')),
          stdFrom: yup.string().trim().required(t('common.EmptyError')),
          stdTo: yup.string().trim().required(t('common.EmptyError')),
          sscYear: yup.string().trim().required(t('common.EmptyError')),
          hscYear: yup.string().trim().required(t('common.EmptyError')),
          knowSaintPersonally: yup
            .string()
            .trim()
            .required(t('common.EmptyError')),
          knowHaribhakt: yup.string().trim().required(t('common.EmptyError')),
          RelativeOfSaint: yup.string().trim().required(t('common.EmptyError')),
          FromFamily: yup.string().test({
            name: 'FromFamily',
            skipAbsent: true,
            test(value, ctx) {
              if (
                this.parent.RelativeOfSaint === 'Yes' &&
                (value?.trim() === '' ||
                  value?.trim() === null ||
                  value?.trim() === undefined)
              ) {
                return ctx.createError({
                  message: t('common.EmptyError'),
                });
              }
              return true;
            },
          }),
          SaintName: yup.string().test({
            name: 'SaintName',
            skipAbsent: true,
            test(value, ctx) {
              if (
                this.parent.RelativeOfSaint === 'Yes' &&
                (value?.trim() === '' ||
                  value?.trim() === null ||
                  value?.trim() === undefined)
              ) {
                return ctx.createError({
                  message: t('common.EmptyError'),
                });
              }
              return true;
            },
          }),
          YourRelation: yup.string().test({
            name: 'YourRelation',
            skipAbsent: true,
            test(value, ctx) {
              if (
                this.parent.RelativeOfSaint === 'Yes' &&
                (value?.trim() === '' ||
                  value?.trim() === null ||
                  value?.trim() === undefined)
              ) {
                return ctx.createError({
                  message: t('common.EmptyError'),
                });
              }
              return true;
            },
          }),
        }),
      ),
    });
  };
