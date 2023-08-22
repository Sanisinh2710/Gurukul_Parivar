import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  AddressFormValidationSchemaType,
  CompleteProfileFormValidationSchemaType,
  EduBusinessInfoValidationSchemaType,
  GurukulFormValidationSchemaType,
  LoginFormValidationSchemaType,
  PersonalInfoFormValidationSchemaType,
} from '../types';
import {mailRegex, nameRegex, passwordRegex, phoneRegex} from '../utils';

export const LoginFormValidationSchema =
  (): yup.ObjectSchema<LoginFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      email: yup
        .string()
        .trim()
        .required(t('common.EmptyError'))
        .matches(mailRegex, {message: t('personalInfo.EmailErr')}),
      password: yup
        .string()
        .trim()
        .required(t('common.EmptyError'))
        .matches(passwordRegex, {message: t('loginScreen.PassErr')}),
    });
  };

export const CompleteProfileFormValidationSchema =
  (): yup.ObjectSchema<CompleteProfileFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      profile: yup.mixed(),
      branch_id: yup.number().required(t('common.EmptyError')),
    });
  };

export const PersonalInfoFormValidationSchema =
  (): yup.ObjectSchema<PersonalInfoFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      gender: yup.string().trim().required(t('common.EmptyError')),
      full_name: yup
        .string()
        .trim()
        .required(t('common.EmptyError'))
        .matches(nameRegex, {message: t('personalInfo.NameErr')}),
      father_name: yup
        .string()
        .trim()
        .required(t('common.EmptyError'))
        .matches(nameRegex, {message: t('personalInfo.NameErr')}),
      dob: yup.string().trim().required(t('common.EmptyError')),
      blood_group: yup.string().required(t('common.EmptyError')),
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
    });
  };

export const AddressFormValidationSchema =
  (): yup.ObjectSchema<AddressFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      address_details: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number(),
            country_id: yup.string().required(t('common.EmptyError')),
            address: yup.string().trim().required(t('common.EmptyError')),
            pincode: yup.string().required(t('common.EmptyError')),
            city: yup.string().trim().required(t('common.EmptyError')),
            address_type: yup.string().trim().required(t('common.EmptyError')),
            is_preferred_communication: yup.boolean(),
          }),
        )
        .required(),
    });
  };

export const EduBusinessInfoFormValidationSchema =
  (): yup.ObjectSchema<EduBusinessInfoValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      education: yup.string().trim().required(t('common.EmptyError')),
      occupation: yup.string().trim().required(t('common.EmptyError')),
      occupation_type: yup.string().trim().required(t('common.EmptyError')),
      skills: yup
        .array()
        .min(1, t('common.EmptyError'))
        .required(t('common.EmptyError')),
      other: yup.string(),
    });
  };

export const GurukulFormValidationSchema =
  (): yup.ObjectSchema<GurukulFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      gurukulData: yup.array().of(
        yup.object().shape({
          branch_id: yup.string().trim().required(t('common.EmptyError')),
          attend: yup.string().trim().required(t('common.EmptyError')),
          standard_from: yup.string().trim().required(t('common.EmptyError')),
          standard_to: yup
            .string()
            .trim()
            .required(t('common.EmptyError'))
            .test({
              name: 'standard_to',
              skipAbsent: true,
              test(value, err) {
                let flag: boolean = false;
                if (parseInt(value) <= parseInt(this.parent.standard_from)) {
                  flag = true;
                }

                if (!flag) {
                  return true;
                } else {
                  return err.createError({
                    message: t('common.SelectValidStd'),
                  });
                }
              },
            }),
          ssc_year: yup
            .string()
            .trim()
            .notOneOf([yup.ref('hsc_year')], t('common.SelectValidYear'))
            .required(t('common.EmptyError')),
          hsc_year: yup
            .string()
            .trim()
            .notOneOf([yup.ref('ssc_year')], t('common.SelectValidYear'))
            .required(t('common.EmptyError'))
            .test({
              name: 'hsc_year',
              skipAbsent: true,
              test(value, err) {
                let flag: boolean = false;
                if (parseInt(value) >= parseInt(this.parent.ssc_year) + 2) {
                  flag = true;
                }

                if (flag) {
                  return true;
                } else {
                  return err.createError({
                    message: t('common.SelectValidYear'),
                  });
                }
              },
            }),
          known_saint: yup.string().trim().required(t('common.EmptyError')),
          known_haribhakta: yup
            .string()
            .trim()
            .required(t('common.EmptyError')),
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
          saint_from_family: yup.string().test({
            name: 'saint_from_family',
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
          relation: yup.string().test({
            name: 'relation',
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
