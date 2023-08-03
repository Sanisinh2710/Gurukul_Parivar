import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {PersonalInfoFormValidationSchemaType} from '../../../../types';
import {PersonalInfoFormValidationSchema} from '../../../../validations';
import {FormInput, PrimaryButton} from '../../../ui';
import {PersonalInfoStyle} from './styles';

export const PersonalInfo = React.memo(
  ({initialValues, onSubmitEvent}: any): React.JSX.Element => {
    const {t} = useTranslation();

    const style = PersonalInfoStyle();

    const PerosnalInfoFormInputList: {
      name: string;
      lable: string;
      placeholder: string;
      icon?: any;
      type:
        | 'number'
        | 'select'
        | 'text'
        | 'phone'
        | 'photo'
        | 'radio'
        | 'date'
        | 'dob'
        | 'textarea';
      menuList?: any;
      customProps?: object;
    }[] = [
      {
        name: 'gender',
        lable: t('personalInfo.Gender'),
        placeholder: '',
        type: 'radio',
        menuList: [
          {name: 'Male', icon: AllIcons.Male},
          {name: 'Female', icon: AllIcons.Female},
        ],
        customProps: {
          showHeading: true,
          wantFullSpace: true,
          customStyle: {
            justifyContent: 'flex-start',
            gap: 10,
          },
        },
      },
      {
        name: 'fullname',
        lable: t('personalInfo.FullNameLable'),
        placeholder: t('personalInfo.FullNamePlaceholder'),
        type: 'text',
      },
      {
        name: 'fatherFullName',
        lable: t('personalInfo.FatherNameLable'),
        placeholder: t('personalInfo.FatherNamePlaceholder'),
        type: 'text',
      },
      {
        name: 'dob',
        lable: t('personalInfo.DOB'),
        placeholder: 'DD/MM/YYYY',
        type: 'dob',
      },
      {
        name: 'bloodGroup',
        lable: t('personalInfo.BloodGroup'),
        placeholder: t('personalInfo.BloodGroupDropDown'),
        type: 'select',
        menuList: ['A-', 'A+', 'B-', 'B+', 'O-', 'O+'],
      },
    ];

    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm<PersonalInfoFormValidationSchemaType>({
      defaultValues: initialValues,
      resolver: yupResolver(PersonalInfoFormValidationSchema()),
      mode: 'onBlur',
    });

    const onSubmit = (data: PersonalInfoFormValidationSchemaType) => {
      const formSubmitData = {
        gender: data.gender || '',
        fullname: data.fullname || '',
        fatherFullName: data.fatherFullName || '',
        dob: data.dob || '',
        bloodGroup: data.bloodGroup || '',
        mobilenum: data.mobilenum || '',
        secondaryMobileNum: data.secondaryMobileNum || '',
        email: data.email || '',
        secondaryEmail: data.secondaryEmail || '',
      };

      onSubmitEvent(formSubmitData);
    };

    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 15}}
          data={[...PerosnalInfoFormInputList]}
          renderItem={({item, index}) => {
            return (
              <Controller
                control={control}
                name={item.name}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <FormInput
                      icon={item.icon}
                      type={item.type}
                      name={item.name}
                      label={item.lable}
                      placeholder={item.placeholder}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={errors[item.name]?.message?.toString()}
                      menuList={item.menuList}
                      customProps={item.customProps}
                    />
                  );
                }}
              />
            );
          }}
        />
        <PrimaryButton
          title={t('common.Save&Next')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    );
  },
);
