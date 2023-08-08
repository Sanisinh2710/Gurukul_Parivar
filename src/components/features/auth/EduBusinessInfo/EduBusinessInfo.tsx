import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native';
import {
  EduBusinessInfoValidationSchemaType,
  SupportedFormInputTypes,
} from '../../../../types';
import {EduBusinessInfoFormValidationSchema} from '../../../../validations';
import {FormInput, PrimaryButton} from '../../../ui';

type EduBusinessInfoProps = {
  initialValues: EduBusinessInfoValidationSchemaType;
  onSubmitEvent: (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => void;
};

export const EduBusinessInfo = React.memo(
  ({initialValues, onSubmitEvent}: EduBusinessInfoProps): React.JSX.Element => {
    const {t} = useTranslation();

    const EduBusinessInfoFormInputList: {
      name: keyof EduBusinessInfoValidationSchemaType;
      lable: string;
      placeholder: string;
      icon?: any;
      type: SupportedFormInputTypes;
      menuList?: any;
      customProps?: object;
    }[] = [
      {
        name: 'maxEduLevel',
        lable: t('education/BusinessInfo.HighesteduLbl'),
        placeholder: t('education/BusinessInfo.HighesteduPlaceHolder'),
        type: 'select',
        menuList: [
          '8th',
          '9th',
          '10th',
          '12th',
          'Diploma',
          'U.G.',
          'P.G.',
          'Ph.d.',
        ],
      },
      {
        name: 'occupation',
        lable: t('education/BusinessInfo.OccuTypePlaceHolder'),
        placeholder: '',
        type: 'radio',
        menuList: [
          {name: t('education/BusinessInfo.Occupation1')},
          {name: t('education/BusinessInfo.Occupation2')},
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
        name: 'occupationType',
        lable: t('education/BusinessInfo.OccupationType'),
        placeholder: t('education/BusinessInfo.OccuTypePlaceHolder'),
        type: 'select',
        menuList: [
          'Developer',
          'Designer',
          'H.R. Executive',
          'C.E.O.',
          'C.T.O.',
        ],
      },
      {
        name: 'skills',
        lable: t('education/BusinessInfo.SKills'),
        placeholder: t('education/BusinessInfo.SKillsPlaceHolder'),
        type: 'multi-select',
        menuList: ['Music', 'Dancing', 'Games', 'Cricket'],
      },
      {
        name: 'otherComment',
        lable: t('education/BusinessInfo.Other'),
        placeholder: t('education/BusinessInfo.OtherPlaceHolder'),
        type: 'textarea',
      },
    ];

    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm<EduBusinessInfoValidationSchemaType>({
      defaultValues: initialValues,
      resolver: yupResolver(EduBusinessInfoFormValidationSchema()),
      mode: 'onBlur',
    });

    const onSubmit = (data: EduBusinessInfoValidationSchemaType) => {
      console.log(data, 'in edu');
    };

    return (
      <>
        <FlatList
          data={[...EduBusinessInfoFormInputList]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 19,
            gap: 15,
            paddingBottom: '40%',
          }}
          renderItem={({item, index}) => {
            return (
              <Controller
                control={control}
                name={item.name}
                render={({field: {onBlur, onChange, value}}) => {
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
                      menuList={item.menuList}
                      customProps={item.customProps}
                      error={errors[item.name]?.message?.toString()}
                    />
                  );
                }}
              />
            );
          }}
          ListFooterComponent={() => {
            return (
              <PrimaryButton
                title={t('common.Save&Next')}
                onPress={handleSubmit(onSubmit)}
              />
            );
          }}
        />
      </>
    );
  },
);
