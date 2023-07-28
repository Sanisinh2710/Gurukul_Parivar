import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import {CompleteProfileValidationSchemaType} from '../../../../types';
import {GuruKulList} from '../../../../utils';
import {CompleteProfileValidationSchema} from '../../../../validations';
import {FormInput, PrimaryButton} from '../../../ui';
import {styles} from './styles';

export const CompleteYourProfile = React.memo(
  ({initialValues, onSubmitEvent}: any) => {
    const {t, i18n} = useTranslation();
    const style = styles();

    const completeProfileInputList: {
      profilePic: {
        icon?: any;
        type: 'phone' | 'number' | 'text' | 'select' | 'photo';
        name: string;
        placeholder: string;
        label: string;
      };
      gurukulName: {
        icon?: any;
        type: 'phone' | 'number' | 'text' | 'select' | 'photo';
        name: string;
        placeholder: string;
        label: string;
      };
    } = {
      profilePic: {
        label: '',
        type: 'photo',
        name: 'profilePic',
        placeholder: t('uploadPhoto:PickPhotoBTN'),
      },
      gurukulName: {
        label: t('uploadPhoto:DropdownTitle'),
        type: 'select',
        name: 'gurukulName',
        placeholder: t('uploadPhoto:DropdownLable'),
      },
    };

    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm<CompleteProfileValidationSchemaType>({
      defaultValues: initialValues,
      resolver: yupResolver(CompleteProfileValidationSchema()),
      mode: 'onChange',
    });

    const onSubmit = (data: CompleteProfileValidationSchemaType) => {
      const formSubmitData = {
        profilePic: data.profilePic,
        gurukulName: data.gurukulName,
      };

      onSubmitEvent(formSubmitData);
    };

    return (
      <View style={{height: '100%'}}>
        <ScrollView>
          <View style={style.FirstSubtitleView}>
            <Text style={style.FirstSubtitle}>
              {t('uploadPhoto:FirstSubtitle')}
            </Text>
            <Text style={style.SecondSubtitle}>
              {t('uploadPhoto:SecondSubtitle')}
            </Text>
          </View>
          {/* PhotoPicker-------------------------------------- */}
          <Controller
            control={control}
            name={completeProfileInputList.profilePic.name}
            render={({field: {onBlur, onChange, value}}) => {
              return (
                <FormInput
                  type={completeProfileInputList.profilePic.type}
                  name={completeProfileInputList.profilePic.name}
                  label={completeProfileInputList.profilePic.label}
                  placeholder={completeProfileInputList.profilePic.placeholder}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={errors[
                    completeProfileInputList.profilePic.name
                  ]?.message?.toString()}
                />
              );
            }}
          />

          <View style={style.BottomView}>
            <Text style={style.BottomSubtitle1}>
              {t('uploadPhoto:BottomSubtitle1')}
            </Text>
            <Text style={style.BottomSubtitle2}>
              {t('uploadPhoto:BottomSubtitle2')}
            </Text>

            {/* Gurukul List DropDown------------------------------------------------- */}
            <Controller
              control={control}
              name={completeProfileInputList.gurukulName.name}
              render={({field: {onBlur, onChange, value}}) => {
                return (
                  <View style={{marginTop: 24}}>
                    <FormInput
                      dropDownList={[...GuruKulList]}
                      type={completeProfileInputList.gurukulName.type}
                      name={completeProfileInputList.gurukulName.name}
                      label={completeProfileInputList.gurukulName.label}
                      placeholder={
                        completeProfileInputList.gurukulName.placeholder
                      }
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={errors[
                        completeProfileInputList.gurukulName.name
                      ]?.message?.toString()}
                    />
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>

        {/* Submit button.................................. */}
        <View style={[style.NextBtn, {position: 'absolute', bottom: 100}]}>
          <PrimaryButton
            title={t('uploadPhoto:NextBtn')}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    );
  },
);
