/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, ScrollView, View, Image} from 'react-native';
import {FormInput, PrimaryButton, RadioLable} from '../../../ui';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {GurukulFormValidationSchemaType} from '../../../../types';
import {GurukulFormValidationSchema} from '../../../../validations';
import {GuruKulList} from '../../../../utils';
import {FlatList} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {styles} from './style';

type GurukulInfoProps = {
  initialValues: GurukulFormValidationSchemaType;
  onSubmitEvent: (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => void;
};

export const GurukulInfo = React.memo(
  ({initialValues, onSubmitEvent}: GurukulInfoProps): React.JSX.Element => {
    const {t} = useTranslation();
    const style = styles();

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

    const {fields, append, remove} = useFieldArray({
      control,
      name: 'gurukulData',
    });

    const gurukulFormInputList1: {
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

      onSubmitEvent(newData, 'next');
    };

    const onSubmitWithoutExstudent = () => {
      onSubmitEvent(initialValues, 'skip');
    };

    return (
      <ScrollView
        contentContainerStyle={style.scrollViewContainer}
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
                  {mainindex >= 1 && (
                    <View
                      style={[
                        style.removeBtnView,
                        watch().gurukulData?.at(mainindex)?.RelativeOfSaint !==
                          'Yes' && {marginTop: '10%'},
                      ]}
                      onTouchEnd={() => remove(mainindex)}>
                      <Image source={AllIcons.Cancel} style={style.removeImg} />
                    </View>
                  )}
                  <FlatList
                    scrollEnabled={false}
                    key={mainItem.id}
                    contentContainerStyle={style.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    data={gurukulFormInputList1}
                    renderItem={({item, index}) => (
                      <View>
                        {Array.isArray(item.mainType) ? (
                          <>
                            <FlatList
                              data={item.mainType}
                              numColumns={2}
                              columnWrapperStyle={style.flatListColumnWrap}
                              renderItem={arrayItem => {
                                return (
                                  <View style={style.arrayTypeFlatListView}>
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
                      contentContainerStyle={style.relativeFlatListContainer}
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
          buttonStyle={style.submitBtn}
        />
      </ScrollView>
    );
  },
);
