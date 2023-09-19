import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, ScrollView, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {
  GurukulBranchGetApi,
  SaintFromFamilyGetApi,
  SaintNameGetApi,
} from '../../../../services';
import {
  GurukulFormValidationSchemaType,
  SingleGurukulRecType,
  SupportedFormInputTypes,
} from '../../../../types';
import {getYearsArray} from '../../../../utils';
import {GurukulFormValidationSchema} from '../../../../validations';
import {FormInput, Loader, PrimaryButton, RadioLable} from '../../../ui';
import {styles} from './style';

type GurukulInfoProps = {
  initialValues: GurukulFormValidationSchemaType;
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

type GurukulInfoListType = {
  name: keyof SingleGurukulRecType;
  lable: string;
  placeholder: string;
  type: SupportedFormInputTypes;
  menuList?: any;
  customProps?: object;
  rightText?: string;
  rightTextOnPress?: (...event: any[]) => void;
  required?: boolean;
};

const attendOpt = (t: any) => [
  {name: t('gurukulInfo.StayGurukulOpt1'), id: 'HOSTEL'},
  {name: t('gurukulInfo.StayGurukulOpt2'), id: 'SCHOOL'},
  {name: t('gurukulInfo.StayGurukulOpt3'), id: 'BOTH'},
];

const GurukulRelativeList = (t: any) => [
  {name: t('gurukulInfo.FromFamilyOpt1'), id: 'Saint'},
  {name: t('gurukulInfo.FromFamilyOpt2'), id: 'Sankyayogi Bahen'},
];

export const GurukulInfo = React.memo(
  ({
    initialValues,
    leftButtonProps,
    rightButtonProps,
    onSubmitEvent,
  }: GurukulInfoProps): React.JSX.Element => {
    const {t} = useTranslation();
    const style = styles();

    const [loader, setLoader] = React.useState<boolean>(false);

    const [branches, setbranches] = React.useState([]);
    const [saints, setSaint] = React.useState([]);

    const [saintFromFamily, setSaintFromFamily] = React.useState([]);

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

    const {fields, append, remove, replace} = useFieldArray({
      control,
      name: 'gurukulData',
    });

    React.useMemo(async () => {
      if (
        GurukulRelativeList(t).find(
          items => items.name === watch().gurukulData?.at(0)?.FromFamily,
        )?.id === 'Saint'
      ) {
        const res = await SaintFromFamilyGetApi(0);
        setSaintFromFamily(res.data.saints);
      } else if (
        GurukulRelativeList(t).find(
          items => items.name === watch().gurukulData?.at(0)?.FromFamily,
        )?.id === 'Sankyayogi Bahen'
      ) {
        const res = await SaintFromFamilyGetApi(1);
        setSaintFromFamily(res.data.saints);
      }
    }, [watch().gurukulData?.at(0)?.FromFamily]);

    React.useMemo(() => {
      setLoader(true);
      const timer = setTimeout(async () => {
        if (branches.length === 0) {
          const res = await GurukulBranchGetApi();
          if (res.resType === 'SUCCESS') {
            setbranches(res.data.branches);
          }
        }

        if (saints.length === 0) {
          const res = await SaintNameGetApi();

          if (res.resType === 'SUCCESS') {
            setSaint(res.data.saints);
          }
        }

        if (initialValues) {
          setExstudent(initialValues.exGurukulStudent);
          let newData: any = JSON.parse(
            JSON.stringify(initialValues?.gurukulData?.[0]),
          );

          newData.attend = attendOpt(t).find(
            items => items.id === newData?.attend,
          )?.name;
          newData.FromFamily = GurukulRelativeList(t).find(
            items => items.id === newData.FromFamily,
          )?.name;
          replace(newData);
          setLoader(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }, [initialValues]);

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
      required?: boolean;
    }[] = [
      {
        name: 'branch_id',
        lable: t('uploadPhoto.DropdownTitle'),
        placeholder: t('uploadPhoto.DropdownLable'),
        type: 'select',
        menuList: branches,
        customProps: {
          wantPlaceholderAsLabelOnModal: true,
        },
        // rightText: t('gurukulInfo.AddGurukul'),
        rightTextOnPress: () => {
          append({
            branch_id: '',
            attend: '',
            standard_from: '',
            standard_to: '',
            ssc_year: '',
            hsc_year: '',
            known_saint: '',
            known_haribhakta: '',
            RelativeOfSaint: 'No',
            FromFamily: '',
            saint_from_family: '',
            relation: '',
          });
        },
        required: true,
      },
      {
        name: 'attend',
        lable: t('gurukulInfo.StayGurukul'),
        placeholder: '',
        type: 'radio',
        menuList: attendOpt(t),
        customProps: {
          wantFullSpace: false,
          customStyle: {borderRadius: 50, height: 35, borderWidth: 0},
        },
        required: true,
      },
      {
        mainType: [
          {
            name: 'standard_from',
            lable: t('gurukulInfo.StdFrom'),
            placeholder: t('gurukulInfo.Select'),
            type: 'select',
            menuList: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ],
            required: true,
            customProps: {
              wantSearchBar: false,
            },
          },
          {
            name: 'standard_to',
            lable: t('gurukulInfo.StdTo'),
            placeholder: t('gurukulInfo.Select'),
            type: 'select',
            menuList: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ],
            required: true,
            customProps: {
              wantSearchBar: false,
            },
          },
        ],
      },
      {
        mainType: [
          {
            name: 'ssc_year',
            lable: t('gurukulInfo.SSCYear'),
            placeholder: t('gurukulInfo.Select'),
            type: 'select',
            menuList: getYearsArray(),
            required: true,
          },
          {
            name: 'hsc_year',
            lable: t('gurukulInfo.HSCYear'),
            placeholder: t('gurukulInfo.Select'),
            type: 'select',
            menuList: getYearsArray(),
            required: true,
          },
        ],
      },
      {
        name: 'known_saint',
        lable: t('gurukulInfo.KnowSaint'),
        placeholder: t('gurukulInfo.Select'),
        type: 'select',
        menuList: saints,
        required: true,
      },
      {
        name: 'known_haribhakta',
        lable: t('gurukulInfo.KnowHaribhakta'),
        placeholder: t('gurukulInfo.KnowHaribhaktaPlaceholder'),
        type: 'text',
        required: true,
      },
      {
        name: 'RelativeOfSaint',
        lable: t('gurukulInfo.RelativeOfSaint'),
        placeholder: '',
        type: 'radio',
        menuList: [{name: 'Yes'}, {name: 'No'}],
        required: true,
      },
    ];

    const gurukulFormInputList2: {
      mainType?: any;
      name: keyof SingleGurukulRecType;
      lable?: string;
      placeholder?: string;
      type?: SupportedFormInputTypes;
      menuList?: any;
      customProps?: object;
      rightText?: string;
      required: boolean;
    }[] = React.useMemo(() => {
      return [
        {
          name: 'FromFamily',
          lable: t('gurukulInfo.FromFamily'),
          placeholder: '',
          type: 'radio',
          menuList: GurukulRelativeList(t),
          required: true,
        },
        {
          name: 'saint_from_family',
          lable: t('gurukulInfo.NameSaintlbl'),
          placeholder: t('gurukulInfo.NameSaint'),
          type: 'select',
          menuList: saintFromFamily,
          required: true,
        },
        {
          name: 'relation',
          lable: t('gurukulInfo.YourRelationLbl'),
          placeholder: t('gurukulInfo.YourRelation'),
          type: 'select',
          menuList: ['Father', 'Mother', 'Brother'],
          required: true,
        },
      ];
    }, [saintFromFamily]);

    const onSubmit = (data: GurukulFormValidationSchemaType) => {
      const newData = data;

      newData.exGurukulStudent = exstudent;
      newData.gurukulData = newData?.gurukulData?.map(item => {
        item.attend =
          attendOpt(t).find(items => items.name === item.attend)?.id ?? '';

        item.FromFamily = GurukulRelativeList(t).find(
          items => items.name === item.FromFamily,
        )?.id;
        if (item.RelativeOfSaint === 'No') {
          item.FromFamily = '';
          item.saint_from_family = '';
          item.relation = '';

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
      <>
        {loader ? (
          <Loader screenHeight={'90%'} />
        ) : (
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
              required={true}
            />
            {exstudent === 'Yes' ? (
              <View>
                {fields.map((mainItem, mainindex) => {
                  return (
                    <View key={mainindex}>
                      {mainindex >= 1 && (
                        <View
                          style={[style.removeBtnView]}
                          onTouchEnd={() => remove(mainindex)}>
                          <Image
                            source={AllIcons.Cancel}
                            style={style.removeImg}
                          />
                        </View>
                      )}
                      <FlatList
                        scrollEnabled={false}
                        key={mainItem.id}
                        contentContainerStyle={style.flatListContainer}
                        showsVerticalScrollIndicator={false}
                        data={gurukulFormInputList1}
                        renderItem={({item}) => (
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
                                                  menuList={
                                                    arrayItem.item.menuList
                                                  }
                                                  type={arrayItem.item.type}
                                                  name={`gurukulData.${mainindex}.${arrayItem.item.name}`}
                                                  rightText={
                                                    arrayItem.item.rightText
                                                  }
                                                  rightTextOnPress={
                                                    arrayItem.item
                                                      .rightTextOnPress
                                                  }
                                                  label={arrayItem.item.lable}
                                                  placeholder={
                                                    arrayItem.item.placeholder
                                                  }
                                                  required={
                                                    arrayItem.item.required
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
                                render={({
                                  field: {onBlur, onChange, value},
                                }) => {
                                  return (
                                    <>
                                      <FormInput
                                        menuList={item?.menuList}
                                        type={item?.type}
                                        name={`gurukulData.${mainindex}.${item?.name}`}
                                        rightText={item?.rightText}
                                        rightTextOnPress={
                                          item?.rightTextOnPress
                                        }
                                        label={item?.lable}
                                        placeholder={item?.placeholder}
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        required={item?.required}
                                        customProps={item?.customProps}
                                        error={
                                          item.name
                                            ? errors?.gurukulData?.[
                                                mainindex
                                              ]?.[
                                                item?.name
                                              ]?.message?.toString()
                                            : ''
                                        }
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
                          contentContainerStyle={
                            style.relativeFlatListContainer
                          }
                          renderItem={arrayItem => {
                            return (
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
                                        placeholder={arrayItem.item.placeholder}
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        required={arrayItem.item.required}
                                        customProps={arrayItem.item.customProps}
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
              title={
                rightButtonProps ? rightButtonProps.title : t('common.Complete')
              }
              onPress={
                exstudent === 'Yes'
                  ? handleSubmit(onSubmit)
                  : onSubmitWithoutExstudent
              }
              buttonStyle={style.submitBtn}
            />
          </ScrollView>
        )}
      </>
    );
  },
);
