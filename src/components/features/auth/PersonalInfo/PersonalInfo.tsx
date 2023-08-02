import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
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
      type: 'number' | 'select' | 'text' | 'phone' | 'photo' | 'radio';
      menuList?: {[key: string]: any; name: string; icon?: any}[];
      customProps?: object;
    }[] = [
      {
        name: 'gender',
        lable: t('personalInfo.Gender'),
        placeholder: '',
        type: 'radio',
        menuList: [
          {name: t('personalInfo.GenderOpt1')},
          {name: t('personalInfo.GenderOpt2')},
        ],
        customProps: {
          showHeading: true,
          wantFullSpace: true,
        },
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
          data={[...PerosnalInfoFormInputList]}
          renderItem={({item, index}) => {
            return (
              <Controller
                control={control}
                name={item.name}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <FormInput
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
