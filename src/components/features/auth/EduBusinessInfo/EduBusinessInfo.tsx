import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, View} from 'react-native';
import {
  EduBusinessInfoValidationSchemaType,
  SupportedFormInputTypes,
} from '../../../../types';
import {OccupationList, skillsList} from '../../../../utils';
import {EduBusinessInfoFormValidationSchema} from '../../../../validations';
import {FormInput, Loader, PrimaryButton, SecondaryButton} from '../../../ui';
import {styles} from './style';

type EduBusinessInfoProps = {
  initialValues: EduBusinessInfoValidationSchemaType;
  leftButtonProps?: {
    title: string;
    case: 'next' | 'skip' | 'exit';
  };
  rightButtonProps?: {
    title: string;
    case: 'next' | 'skip' | 'exit';
  };
  onSubmitEvent: (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => void;
};

export const EduBusinessInfo = React.memo(
  ({
    initialValues,
    leftButtonProps,
    rightButtonProps,
    onSubmitEvent,
  }: EduBusinessInfoProps): React.JSX.Element => {
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
      required: boolean;
      wantPlaceholderAsLabelOnModal?: boolean;
    }[] = [
      {
        name: 'education',
        lable: t('education/BusinessInfo.HighesteduLbl'),
        placeholder: t('education/BusinessInfo.HighesteduPlaceHolder'),
        type: 'select',
        menuList: [
          'Primary Education',
          'Secondary Education',
          'Diploma',
          'U.G.',
          'P.G.',
          'Ph.d.',
        ],
        required: true,
        customProps: {
          wantPlaceholderAsLabelOnModal: true,
          wantSearchBar: false,
        },
      },
      {
        name: 'occupation',
        lable: t('education/BusinessInfo.OccuTypePlaceHolder'),
        placeholder: '',
        type: 'radio',
        menuList: [{name: 'I am an employee'}, {name: 'I run a business'}],
        customProps: {
          showHeading: true,
          wantFullSpace: true,
        },
        required: true,
      },
      {
        name: 'occupation_type',
        lable: t('education/BusinessInfo.OccupationType'),
        placeholder: t('education/BusinessInfo.OccuTypePlaceHolder'),
        type: 'select',
        menuList: OccupationList,
        required: true,
        wantPlaceholderAsLabelOnModal: true,
      },
      {
        name: 'skills',
        lable: t('education/BusinessInfo.SKills'),
        placeholder: t('education/BusinessInfo.SKillsPlaceHolder'),
        type: 'multi-select',
        menuList: skillsList,
        required: true,
        wantPlaceholderAsLabelOnModal: true,
      },
      {
        name: 'other',
        lable: t('education/BusinessInfo.Other'),
        placeholder: t('education/BusinessInfo.OtherPlaceHolder'),
        type: 'textarea',
        required: false,
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

    const leftOnSubmitWithData = (
      data: EduBusinessInfoValidationSchemaType,
    ) => {
      if (data !== undefined) {
        onSubmitEvent(data, 'exit');
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
          <Loader screenHeight={'90%'} />
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
                          required={item.required}
                          error={errors[item.name]?.message?.toString()}
                          wantPlaceholderAsLabelOnModal={
                            item.wantPlaceholderAsLabelOnModal
                          }
                        />
                      );
                    }}
                  />
                );
              }}
            />
            <View style={style.submitButtonView}>
              <SecondaryButton
                title={
                  leftButtonProps ? leftButtonProps.title : t('common.SkipNow')
                }
                onPress={
                  leftButtonProps
                    ? handleSubmit(leftOnSubmitWithData)
                    : leftOnSubmit
                }
                buttonStyle={style.submitButtonStyle}
              />
              <PrimaryButton
                title={
                  rightButtonProps
                    ? rightButtonProps.title
                    : t('common.Save&Next')
                }
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
