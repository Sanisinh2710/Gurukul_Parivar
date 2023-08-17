import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {GurukulBranchGetApi} from '../../../../services';
import {CompleteProfileFormValidationSchemaType} from '../../../../types';
import {CompleteProfileFormValidationSchema} from '../../../../validations';
import {FormInput, Loader, PrimaryButton} from '../../../ui';
import {styles} from './styles';

export const CompleteYourProfile = React.memo(
  ({isParentLoading, initialValues, onSubmitEvent}: any) => {
    const {t} = useTranslation();
    const style = styles();

    const [isLoading, setIsLoading] = React.useState(false);

    const [GurukulList, setGurukulList] = React.useState([]);

    React.useMemo(async () => {
      setIsLoading(true);
      const response = await GurukulBranchGetApi();
      if (response.resType === 'SUCCESS') {
        setGurukulList(response.data.branches);
      } else {
        Toast.show(response.message, 2);
      }
      setIsLoading(false);
    }, [initialValues]);

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
        name: 'profile',
        placeholder: t('uploadPhoto.PickPhotoBTN'),
      },
      gurukulName: {
        label: t('uploadPhoto.DropdownTitle'),
        type: 'select',
        name: 'branch_id',
        placeholder: t('uploadPhoto.DropdownLable'),
      },
    };

    const {
      control,
      setValue,
      handleSubmit,
      formState: {errors},
    } = useForm<CompleteProfileFormValidationSchemaType>({
      defaultValues: initialValues,
      resolver: yupResolver(CompleteProfileFormValidationSchema()),
      mode: 'onBlur',
    });

    React.useEffect(() => {
      if (initialValues) {
        Object.keys(initialValues).map((key, index) => {
          setValue(`${key}`, initialValues[key]);
        });
      }
    }, [initialValues]);

    const onSubmit = (data: CompleteProfileFormValidationSchemaType) => {
      const formSubmitData = {
        profile: data.profile || '',
        branch_id: data.branch_id || null,
      };

      onSubmitEvent(formSubmitData);
    };

    return (
      <>
        {isLoading || isParentLoading ? (
          <Loader screenHeight={'90%'} />
        ) : (
          <View style={style.mainView}>
            <ScrollView>
              <View style={style.FirstSubtitleView}>
                <Text style={style.FirstSubtitle}>
                  {t('uploadPhoto.FirstSubtitle')}
                </Text>
                <Text style={style.SecondSubtitle}>
                  {t('uploadPhoto.SecondSubtitle')}
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
                      placeholder={
                        completeProfileInputList.profilePic.placeholder
                      }
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
                  {t('uploadPhoto.BottomSubtitle1')}
                </Text>
                <Text style={style.BottomSubtitle2}>
                  {t('uploadPhoto.BottomSubtitle2')}
                </Text>

                {/* Gurukul List DropDown------------------------------------------------- */}
                <Controller
                  control={control}
                  name={completeProfileInputList.gurukulName.name}
                  render={({field: {onBlur, onChange, value}}) => {
                    return (
                      <View style={style.formInputView}>
                        <FormInput
                          menuList={[...GurukulList]}
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
            <View style={[style.NextBtn]}>
              <PrimaryButton
                title={t('uploadPhoto.NextBtn')}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        )}
      </>
    );
  },
);
