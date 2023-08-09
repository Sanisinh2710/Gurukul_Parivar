import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, ScrollView, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {
  GurukulFormValidationSchemaType,
  SingleGurukulRecType,
  SupportedFormInputTypes,
} from '../../../../types';
import {GuruKulList} from '../../../../utils';
import {GurukulFormValidationSchema} from '../../../../validations';
import {FormInput, PrimaryButton, RadioLable} from '../../../ui';

type GurukulInfoProps = {
  initialValues: GurukulFormValidationSchemaType;
  onSubmitEvent: (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => void;
};

type GurukulInfoListType = {
  name: keyof SingleGurukulRecType;
  lable: string;
  placeholder: string;
  type: SupportedFormInputTypes;
  menuList?: any;
  customProps?: object;
  rightText?: string;
  rightTextOnPress?: (...event: any[]) => void;
};

export const GurukulInfo = React.memo(
  ({initialValues, onSubmitEvent}: GurukulInfoProps): React.JSX.Element => {
    const {t} = useTranslation();

    const [exstudent, setExstudent] = React.useState(
      initialValues.exGurukulStudent || '',
    );

    const {
      control,
      handleSubmit,
      watch,
      formState: {errors},
    } = useForm<GurukulFormValidationSchemaType>({
      defaultValues: initialValues,
      resolver: yupResolver(GurukulFormValidationSchema()),
      mode: 'onBlur',
    });

    const {fields, append, remove} = useFieldArray({
      control,
      name: 'gurukulData',
    });

    const gurukulFormInputList1: {
      name?: keyof SingleGurukulRecType;
      lable?: string;
      placeholder?: string;
      type?: SupportedFormInputTypes;
      mainType?: GurukulInfoListType[];
      menuList?: any;
      customProps?: object;
      rightText?: string;
      rightTextOnPress?: (...event: any[]) => void;
    }[] = [
      {
        name: 'gurukulBranch',
        lable: t('uploadPhoto.DropdownTitle'),
        placeholder: t('uploadPhoto.DropdownLable'),
        type: 'select',
        menuList: [...GuruKulList],
        rightText: t('gurukulInfo.AddGurukul'),
        rightTextOnPress: () => {
          append({
            gurukulBranch: '',
            attendGurukul: '',
            stdFrom: '',
            stdTo: '',
            sscYear: '',
            hscYear: '',
            knowSaintPersonally: '',
            knowHaribhakt: '',
            RelativeOfSaint: 'No',
            FromFamily: '',
            SaintName: '',
            YourRelation: '',
          });
        },
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
    ];

    const gurukulFormInputList2: {
      mainType?: any;
      name?: keyof SingleGurukulRecType;
      lable?: string;
      placeholder?: string;
      type?: SupportedFormInputTypes;
      menuList?: any;
      customProps?: object;
      rightText?: string;
    }[] = [
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

    const onSubmit = (data: GurukulFormValidationSchemaType) => {
      const newData = data;

      newData.exGurukulStudent = exstudent;
      newData.gurukulData = newData?.gurukulData?.map(item => {
        if (item.RelativeOfSaint === 'No') {
          item.FromFamily = '';
          item.SaintName = '';
          item.YourRelation = '';

          return item;
        } else {
          return item;
        }
      });

      onSubmitEvent(newData, 'next');
    };

    const onSubmitWithoutExstudent = () => {
      onSubmitEvent(initialValues, 'skip');
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
                <View key={mainindex}>
                  <FlatList
                    scrollEnabled={false}
                    key={mainItem.id}
                    contentContainerStyle={{
                      gap: 16,
                      paddingTop: '4%',
                      paddingBottom: '2%',
                    }}
                    ListHeaderComponent={() => {
                      return (
                        mainindex >= 1 && (
                          <View
                            style={{
                              height: 30,
                              width: 30,
                              alignSelf: 'flex-end',
                            }}
                            onTouchEnd={() => remove(mainindex)}>
                            <Image
                              source={AllIcons.Cancel}
                              style={{
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </View>
                        )
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    data={gurukulFormInputList1}
                    renderItem={({item}) => (
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
                                              rightText={
                                                arrayItem.item.rightText
                                              }
                                              rightTextOnPress={
                                                arrayItem.item.rightTextOnPress
                                              }
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
                                    rightTextOnPress={item?.rightTextOnPress}
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
                  {watch().gurukulData?.at(mainindex)?.RelativeOfSaint ===
                    'Yes' && (
                    <FlatList
                      data={gurukulFormInputList2}
                      scrollEnabled={false}
                      renderItem={arrayItem => {
                        return (
                          <Controller
                            control={control}
                            name={`gurukulData.${mainindex}.${arrayItem.item.name}`}
                            render={({field: {onBlur, onChange, value}}) => {
                              return (
                                <>
                                  <FormInput
                                    menuList={arrayItem.item.menuList}
                                    type={arrayItem.item.type}
                                    name={`gurukulData.${mainindex}.${arrayItem.item.name}`}
                                    rightText={arrayItem.item.rightText}
                                    label={arrayItem.item.lable}
                                    placeholder={arrayItem.item.placeholder}
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    customProps={arrayItem.item.customProps}
                                    error={errors?.gurukulData?.[mainindex]?.[
                                      arrayItem.item.name
                                    ]?.message?.toString()}
                                  />
                                </>
                              );
                            }}
                          />
                        );
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        ) : null}
        <PrimaryButton
          title={t('common.Complete')}
          onPress={
            exstudent === 'Yes'
              ? handleSubmit(onSubmit)
              : onSubmitWithoutExstudent
          }
          buttonStyle={{marginTop: '5%'}}
        />
      </ScrollView>
    );
  },
);
