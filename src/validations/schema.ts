import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  AddressFormValidationSchemaType,
  CompleteProfileFormValidationSchemaType,
  EduBusinessInfoValidationSchemaType,
  EmailValidationSchemaType,
  GurukulFormValidationSchemaType,
  LoginFormValidationSchemaType,
  PersonalInfoFormValidationSchemaType,
  ResetPasswordValidationSchemaType,
} from '../types';
import {mailRegex, nameRegex, passwordRegex, phoneRegex} from '../utils';

export const LoginFormValidationSchema =
  (): yup.ObjectSchema<LoginFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      email: yup
        .string()
        .trim()
        .required(t('FieldRequiredError.Email'))
        .matches(mailRegex, {message: t('personalInfo.EmailErr')}),
      password: yup.string().trim().required(t('FieldRequiredError.Password')),
      // .matches(passwordRegex, {message: t('loginScreen.PassErr')}),
    });
  };

export const EmailValidationSchema =
  (): yup.ObjectSchema<EmailValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      primary_email: yup
        .string()
        .trim()
        .required(t('FieldRequiredError.Email'))
        .matches(mailRegex, {message: t('personalInfo.EmailErr')}),
    });
  };

export const ResetPasswordValidationSchema =
  (): yup.ObjectSchema<ResetPasswordValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      password: yup
        .string()
        .trim()
        .required(t('FieldRequiredError.Password'))
        .matches(passwordRegex, {message: t('loginScreen.PassErr')}),
      confirm_password: yup
        .string()
        .trim()
        .required(t('FieldRequiredError.ConfirmPassword'))
        .oneOf([yup.ref('password')], t('ResetPassword.PassNotSameErr'))
        .matches(passwordRegex, {message: t('loginScreen.PassErr')}),
    });
  };

export const CompleteProfileFormValidationSchema =
  (): yup.ObjectSchema<CompleteProfileFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      profile: yup.mixed(),
      branch_id: yup.number().required(t('FieldRequiredError.GurukulBranch')),
    });
  };

export const PersonalInfoFormValidationSchema =
  (): yup.ObjectSchema<PersonalInfoFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      gender: yup.string().trim(),
      // .required(t('FieldRequiredError.Gender')),
      full_name: yup
        .string()
        .trim()
        .required(t('FieldRequiredError.FullName'))
        .matches(nameRegex, {message: t('personalInfo.NameErr')}),
      father_name: yup
        .string()
        .trim()
        // .required(t('FieldRequiredError.FatherName'))
        .matches(nameRegex, {message: t('personalInfo.NameErr')}),
      dob: yup.string().trim(),
      // .required(t('FieldRequiredError.DOB')),
      blood_group: yup.string().trim(),
      // .required(t('FieldRequiredError.BloodGroup')),
      emailInfo: yup
        .array()
        .of(
          yup.object().shape({
            email: yup
              .string()
              .trim()
              .test({
                name: 'email',
                skipAbsent: true,
                test(value, err) {
                  if (value === '' || value === undefined) {
                    return true;
                  } else if (!value?.match(mailRegex)) {
                    return err.createError({
                      message: t('personalInfo.EmailErr'),
                    });
                  } else {
                    return true;
                  }
                },
              }),
            // .required(t('FieldRequiredError.Email'))
            // .matches(mailRegex, {message: t('personalInfo.EmailErr')}),
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
              .trim()
              .test({
                name: 'mobilenum',
                skipAbsent: true,
                test(value, err) {
                  if (value === '' || value === undefined) {
                    return true;
                  } else if (!value?.match(phoneRegex)) {
                    return err.createError({
                      message: t('common.MobileErr'),
                    });
                  } else {
                    return true;
                  }
                },
              }),
            // .required(t('FieldRequiredError.MobileNumber'))
            // .matches(phoneRegex, {message: t('common.MobileErr')}),
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
            country_id: yup.string().required(t('FieldRequiredError.Country')),
            address: yup
              .string()
              .trim()
              .required(t('FieldRequiredError.Address')),
            pincode: yup.string().required(t('FieldRequiredError.Pincode')),
            city: yup.string().trim().required(t('FieldRequiredError.City')),
            address_type: yup
              .string()
              .trim()
              .required(t('FieldRequiredError.TypeOfAddress')),
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
      education: yup
        .string()
        .trim()
        .required(t('FieldRequiredError.EducationLevel')),
      occupation: yup
        .string()
        .trim()
        .required(t('FieldRequiredError.Occupation')),
      occupation_type: yup
        .string()
        .trim()
        .required(t('FieldRequiredError.OccupationType')),
      skills: yup
        .array()
        .min(1, t('FieldRequiredError.Skills'))
        .required(t('FieldRequiredError.Skills')),
      other: yup.string(),
    });
  };

export const GurukulFormValidationSchema =
  (): yup.ObjectSchema<GurukulFormValidationSchemaType> => {
    const {t} = useTranslation();
    return yup.object().shape({
      gurukulData: yup.array().of(
        yup.object().shape({
          branch_id: yup
            .string()
            .trim()
            .required(t('FieldRequiredError.GurukulBranch')),
          attend: yup
            .string()
            .trim()
            .required(t('FieldRequiredError.RadioOption')),
          standard_from: yup
            .string()
            .trim()
            .required(t('FieldRequiredError.Standard')),
          standard_to: yup
            .string()
            .trim()
            .required(t('FieldRequiredError.Standard'))
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
            .required(t('FieldRequiredError.SSCYear'))
            .notOneOf([yup.ref('hsc_year')], t('common.SelectValidYear')),
          hsc_year: yup
            .string()
            .trim()
            .required(t('FieldRequiredError.HSCYear'))
            .notOneOf([yup.ref('ssc_year')], t('common.SelectValidYear'))
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
          known_saint: yup
            .string()
            .trim()
            .required(t('FieldRequiredError.SelectSaint')),
          known_haribhakta: yup
            .string()
            .trim()
            .required(t('FieldRequiredError.Haribhakta')),
          RelativeOfSaint: yup
            .string()
            .trim()
            .required(t('FieldRequiredError.Relation')),
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
                  message: t('FieldRequiredError.RadioOption'),
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
                  message: t('FieldRequiredError.SelectSaint'),
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
                  message: t('FieldRequiredError.Relation'),
                });
              }
              return true;
            },
          }),
        }),
      ),
    });
  };
