/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, ScrollView, View} from 'react-native';
import {FormInput, PrimaryButton, RadioLable} from '../../../ui';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {GurukulFormValidationSchemaType} from '../../../../types';
import {GurukulFormValidationSchema} from '../../../../validations';
import {GuruKulList} from '../../../../utils';
import {FlatList} from 'react-native';

export const GurukulInfo = React.memo(
  ({initialValues, onSubmitEvent}: any): React.JSX.Element => {
    const {t} = useTranslation();

    const [exstudent, setExstudent] = React.useState(
      initialValues.exGurukulStudent || '',
    );

    const {
      control,
      handleSubmit,
      watch,
      getValues,
      formState: {errors},
    } = useForm<GurukulFormValidationSchemaType>({
      defaultValues: initialValues,
      resolver: yupResolver(GurukulFormValidationSchema()),
      mode: 'onBlur',
    });

    console.log(errors, 'errors');

    const {fields, append, remove} = useFieldArray({
      control,
      name: 'gurukulData',
    });

    const gurukulFormInputList: {
      mainType?: any;
      name?: string;
      lable?: string;
      placeholder?: string;
      type?:
        | 'number'
        | 'select'
        | 'text'
        | 'phone'
        | 'photo'
        | 'radio'
        | 'textarea'
        | 'date'
        | 'dob';

      menuList?: any;
      customProps?: object;
      rightText?: string;
    }[] = React.useMemo(() => {
      if (watch().gurukulData?.at(0)?.RelativeOfSaint === 'Yes') {
        return [
          {
            name: 'gurukulBranch',
            lable: t('uploadPhoto.DropdownTitle'),
            placeholder: t('uploadPhoto.DropdownLable'),
            type: 'select',
            menuList: [...GuruKulList],
            // rightText: t('gurukulInfo.AddGurukul'),
          },
          {
            name: 'attendGurukul',
            lable: t('gurukulInfo.StayGurukul'),
            placeholder: '',
            type: 'radio',
            menuList: [
              {name: t('gurukulInfo.StayGurukulOpt1')},
              {name: t('gurukulInfo.StayGurukulOpt2')},
              {name: t('gurukulInfo.StayGurukulOpt3')},
            ],
            customProps: {
              wantFullSpace: false,
              customStyle: {borderRadius: 50, height: 35, borderWidth: 0},
            },
          },
          {
            mainType: [
              {
                name: 'stdFrom',
                lable: t('gurukulInfo.StdFrom'),
                placeholder: t('gurukulInfo.Select'),
                type: 'select',
                menuList: ['1', '2', '3'],
              },
              {
                name: 'stdTo',
                lable: t('gurukulInfo.StdTo'),
                placeholder: t('gurukulInfo.Select'),
                type: 'select',
                menuList: ['1', '2', '3'],
              },
            ],
          },
          {
            mainType: [
              {
                name: 'sscYear',
                lable: t('gurukulInfo.SSCYear'),
                placeholder: t('gurukulInfo.Select'),
                type: 'select',
                menuList: ['1', '2', '3'],
              },
              {
                name: 'hscYear',
                lable: t('gurukulInfo.HSCYear'),
                placeholder: t('gurukulInfo.Select'),
                type: 'select',
                menuList: ['1', '2', '3'],
              },
            ],
          },
          {
            name: 'knowSaintPersonally',
            lable: t('gurukulInfo.KnowSaint'),
            placeholder: t('gurukulInfo.Select'),
            type: 'select',
            menuList: ['1', '2', '3'],
          },
          {
            name: 'knowHaribhakt',
            lable: t('gurukulInfo.KnowHaribhakta'),
            placeholder: t('gurukulInfo.KnowHaribhaktaPlaceholder'),
            type: 'text',
          },
          {
            name: 'RelativeOfSaint',
            lable: t('gurukulInfo.RelativeOfSaint'),
            placeholder: '',
            type: 'radio',
            menuList: [{name: 'Yes'}, {name: 'No'}],
          },
          {
            name: 'FromFamily',
            lable: t('gurukulInfo.FromFamily'),
            placeholder: '',
            type: 'radio',
            menuList: [
              {name: t('gurukulInfo.FromFamilyOpt1')},
              {name: t('gurukulInfo.FromFamilyOpt2')},
            ],
          },
          {
            name: 'SaintName',
            lable: t('gurukulInfo.NameSaintlbl'),
            placeholder: t('gurukulInfo.NameSaint'),
            type: 'select',
            menuList: ['1', '2', '3'],
          },
          {
            name: 'YourRelation',
            lable: t('gurukulInfo.YourRelationLbl'),
            placeholder: t('gurukulInfo.YourRelation'),
            type: 'select',
            menuList: ['1', '2', '3'],
          },
        ];
      } else {
        return [
          {
            name: 'gurukulBranch',
            lable: t('uploadPhoto.DropdownTitle'),
            placeholder: t('uploadPhoto.DropdownLable'),
            type: 'select',
            menuList: [...GuruKulList],
            // rightText: t('gurukulInfo.AddGurukul'),
          },
          {
            name: 'attendGurukul',
            lable: t('gurukulInfo.StayGurukul'),
            placeholder: '',
            type: 'radio',
            menuList: [
              {name: t('gurukulInfo.StayGurukulOpt1')},
              {name: t('gurukulInfo.StayGurukulOpt2')},
              {name: t('gurukulInfo.StayGurukulOpt3')},
            ],
            customProps: {
              wantFullSpace: false,
              customStyle: {borderRadius: 50, height: 35, borderWidth: 0},
            },
          },
          {
            mainType: [
              {
                name: 'stdFrom',
                lable: t('gurukulInfo.StdFrom'),
                placeholder: t('gurukulInfo.Select'),
                type: 'select',
                menuList: ['1', '2', '3'],
              },
              {
                name: 'stdTo',
                lable: t('gurukulInfo.StdTo'),
                placeholder: t('gurukulInfo.Select'),
                type: 'select',
                menuList: ['1', '2', '3'],
              },
            ],
          },
          {
            mainType: [
              {
                name: 'sscYear',
                lable: t('gurukulInfo.SSCYear'),
                placeholder: t('gurukulInfo.Select'),
                type: 'select',
                menuList: ['1', '2', '3'],
              },
              {
                name: 'hscYear',
                lable: t('gurukulInfo.HSCYear'),
                placeholder: t('gurukulInfo.Select'),
                type: 'select',
                menuList: ['1', '2', '3'],
              },
            ],
          },
          {
            name: 'knowSaintPersonally',
            lable: t('gurukulInfo.KnowSaint'),
            placeholder: t('gurukulInfo.Select'),
            type: 'select',
            menuList: ['1', '2', '3'],
          },
          {
            name: 'knowHaribhakt',
            lable: t('gurukulInfo.KnowHaribhakta'),
            placeholder: t('gurukulInfo.KnowHaribhaktaPlaceholder'),
            type: 'text',
          },
          {
            name: 'RelativeOfSaint',
            lable: t('gurukulInfo.RelativeOfSaint'),
            placeholder: '',
            type: 'radio',
            menuList: [{name: 'Yes'}, {name: 'No'}],
          },
          // {
          //   name: 'FromFamily',
          //   lable: t('gurukulInfo.FromFamily'),
          //   placeholder: '',
          //   type: 'radio',
          //   menuList: [
          //     {name: t('gurukulInfo.FromFamilyOpt1')},
          //     {name: t('gurukulInfo.FromFamilyOpt2')},
          //   ],
          // },
          // {
          //   name: 'SaintName',
          //   lable: t('gurukulInfo.NameSaintlbl'),
          //   placeholder: t('gurukulInfo.NameSaint'),
          //   type: 'select',
          //   menuList: ['1', '2', '3'],
          // },
          // {
          //   name: 'YourRelation',
          //   lable: t('gurukulInfo.YourRelationLbl'),
          //   placeholder: t('gurukulInfo.YourRelation'),
          //   type: 'select',
          //   menuList: ['1', '2', '3'],
          // },
        ];
      }
    }, [watch().gurukulData?.at(0)?.RelativeOfSaint]);

    const onSubmit = (data: GurukulFormValidationSchemaType) => {
      const newData = data;

      newData.exGurukulStudent = exstudent;
      newData.gurukulData = newData?.gurukulData?.map((item, index) => {
        if (item.RelativeOfSaint === 'No') {
          item.FromFamily = '';
          item.SaintName = '';
          item.YourRelation = '';

          return item;
        } else {
          return item;
        }
      });
      console.log(newData, 'in dadrese ');
    };

    return (
      <ScrollView
        contentContainerStyle={{paddingTop: '3%', paddingBottom: '30%'}}
        showsVerticalScrollIndicator={false}>
        <RadioLable
          heading={t('gurukulInfo.ExGurukulLbl')}
          wantFullSpace={true}
          showHeading={true}
          value={exstudent}
          onChange={setExstudent}
          list={[{name: 'Yes'}, {name: 'No'}]}
        />
        {exstudent === 'Yes' ? (
          <View>
            {fields.map((mainItem, mainindex) => {
              return (
                <FlatList
                  scrollEnabled={false}
                  key={mainItem.id}
                  contentContainerStyle={{
                    gap: 16,
                    paddingTop: '4%',
                    paddingBottom: '2%',
                  }}
                  showsVerticalScrollIndicator={false}
                  data={gurukulFormInputList}
                  renderItem={({item, index}) => (
                    <View>
                      {Array.isArray(item.mainType) ? (
                        <>
                          <FlatList
                            data={item.mainType}
                            numColumns={2}
                            columnWrapperStyle={{
                              justifyContent: 'space-between',
                            }}
                            renderItem={arrayItem => {
                              return (
                                <View
                                  style={{
                                    width: '48%',
                                  }}>
                                  <Controller
                                    control={control}
                                    name={`gurukulData.${mainindex}.${arrayItem.item.name}`}
                                    render={({
                                      field: {onBlur, onChange, value},
                                    }) => {
                                      return (
                                        <>
                                          <FormInput
                                            menuList={arrayItem.item.menuList}
                                            type={arrayItem.item.type}
                                            name={`gurukulData.${mainindex}.${arrayItem.item.name}`}
                                            rightText={arrayItem.item.rightText}
                                            label={arrayItem.item.lable}
                                            placeholder={
                                              arrayItem.item.placeholder
                                            }
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            customProps={
                                              arrayItem.item.customProps
                                            }
                                            error={errors?.gurukulData?.[
                                              mainindex
                                            ]?.[
                                              arrayItem.item.name
                                            ]?.message?.toString()}
                                          />
                                        </>
                                      );
                                    }}
                                  />
                                </View>
                              );
                            }}
                          />
                        </>
                      ) : (
                        <Controller
                          control={control}
                          name={`gurukulData.${mainindex}.${item?.name}`}
                          render={({field: {onBlur, onChange, value}}) => {
                            return (
                              <>
                                <FormInput
                                  menuList={item?.menuList}
                                  type={item?.type}
                                  name={`gurukulData.${mainindex}.${item?.name}`}
                                  rightText={item?.rightText}
                                  label={item?.lable}
                                  placeholder={item?.placeholder}
                                  value={value}
                                  onBlur={onBlur}
                                  onChange={onChange}
                                  customProps={item?.customProps}
                                  error={errors?.gurukulData?.[mainindex]?.[
                                    item?.name
                                  ]?.message?.toString()}
                                />
                              </>
                            );
                          }}
                        />
                      )}
                    </View>
                  )}
                />
              );
            })}
          </View>
        ) : null}
        <PrimaryButton
          title={t('common.Complete')}
          onPress={exstudent === 'Yes' ? handleSubmit(onSubmit) : () => {}}
          buttonStyle={{marginTop: '5%'}}
        />
      </ScrollView>
    );
  },
);
