/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, View} from 'react-native';
import {
  EduBusinessInfoValidationSchemaType,
  SupportedFormInputTypes,
} from '../../../../types';
import {EduBusinessInfoFormValidationSchema} from '../../../../validations';
import {FormInput, Loader, PrimaryButton, SecondaryButton} from '../../../ui';
import {styles} from './style';

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

    const style = styles();
    const [loader, setLoader] = React.useState<boolean>(false);

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
        name: 'education',
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
          'BE',
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
        },
      },
      {
        name: 'occupation_type',
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
        name: 'other',
        lable: t('education/BusinessInfo.Other'),
        placeholder: t('education/BusinessInfo.OtherPlaceHolder'),
        type: 'textarea',
      },
    ];

    const {
      control,
      handleSubmit,
      setValue,
      formState: {errors},
    } = useForm<EduBusinessInfoValidationSchemaType>({
      defaultValues: initialValues,
      resolver: yupResolver(EduBusinessInfoFormValidationSchema()),
      mode: 'onBlur',
    });

    const onSubmit = (data: EduBusinessInfoValidationSchemaType) => {
      if (data !== undefined) {
        onSubmitEvent(data, 'next');
      }
    };

    const leftOnSubmit = () => {
      onSubmitEvent(initialValues, 'skip');
    };

    React.useEffect(() => {
      setLoader(true);

      const timer = setTimeout(() => {
        if (initialValues) {
          setValue('education', initialValues.education ?? '');
          setValue('occupation', initialValues.occupation ?? '');
          setValue('occupation_type', initialValues.occupation_type ?? '');
          setValue('skills', initialValues.skills ?? []);
          setValue('other', initialValues.other ?? '');
          setLoader(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }, [initialValues]);

    return (
      <>
        {loader ? (
          <Loader />
        ) : (
          <ScrollView
            contentContainerStyle={style.scrollViewContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <FlatList
              data={[...EduBusinessInfoFormInputList]}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={style.flatListContainer}
              scrollEnabled={false}
              renderItem={({item}) => {
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
            />
            <View style={style.submitButtonView}>
              <SecondaryButton
                title={t('common.SkipNow')}
                onPress={leftOnSubmit}
                buttonStyle={style.submitButtonStyle}
              />
              <PrimaryButton
                title={t('common.Save&Next')}
                onPress={handleSubmit(onSubmit)}
                buttonStyle={style.submitButtonStyle}
              />
            </View>
          </ScrollView>
        )}
      </>
    );
  },
);
