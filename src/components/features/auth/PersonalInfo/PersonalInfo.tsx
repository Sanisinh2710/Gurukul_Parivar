import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {
  PersonalInfoFormValidationSchemaType,
  SupportedFormInputTypes,
} from '../../../../types';
import {COLORS, CustomFonts} from '../../../../utils';
import {PersonalInfoFormValidationSchema} from '../../../../validations';
import {FormInput, PrimaryButton, SecondaryButton} from '../../../ui';

type PersonalInfoProps = {
  initialValues: PersonalInfoFormValidationSchemaType;
  onSubmitEvent: (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => void;
};

export const PersonalInfo = React.memo(
  ({initialValues, onSubmitEvent}: PersonalInfoProps): React.JSX.Element => {
    const {t} = useTranslation();

    const [primarycountryCodeSelect, setPrimaryCountryCodeSelect] =
      React.useState('');
    const [secondarycountryCodeSelect, setSecondaryCountryCodeSelect] =
      React.useState('');

    const [checkedArray, setCheckedArray] = React.useState(
      [
        ...initialValues?.mobilenumInfo?.map(item => {
          return item.whatsappNum;
        }),
      ] || [true],
    );

    const PerosnalInfoForm1InputList: {
      name: keyof PersonalInfoFormValidationSchemaType;
      lable: string;
      placeholder: string;
      icon?: any;
      type: SupportedFormInputTypes;
      menuList?: any;
      customProps?: object;
    }[] = [
      {
        name: 'gender',
        lable: t('personalInfo.Gender'),
        placeholder: '',
        type: 'radio',
        menuList: [
          {name: 'Male', icon: AllIcons.Male},
          {name: 'Female', icon: AllIcons.Female},
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
        name: 'fullname',
        lable: t('personalInfo.FullNameLable'),
        placeholder: t('personalInfo.FullNamePlaceholder'),
        type: 'text',
      },
      {
        name: 'fatherFullName',
        lable: t('personalInfo.FatherNameLable'),
        placeholder: t('personalInfo.FatherNamePlaceholder'),
        type: 'text',
      },
      {
        name: 'dob',
        lable: t('personalInfo.DOB'),
        placeholder: 'DD/MM/YYYY',
        type: 'dob',
      },
      {
        name: 'bloodGroup',
        lable: t('personalInfo.BloodGroup'),
        placeholder: t('personalInfo.BloodGroupDropDown'),
        type: 'select',
        menuList: ['A-', 'A+', 'B-', 'B+', 'O-', 'O+'],
      },
    ];

    const {
      control,
      handleSubmit,
      getValues,
      formState: {errors},
    } = useForm<PersonalInfoFormValidationSchemaType>({
      defaultValues: initialValues,
      resolver: yupResolver(PersonalInfoFormValidationSchema()),
      mode: 'onBlur',
    });

    const {
      fields: mobilefield,
      append: mobileappend,
      remove: mobileremove,
      update: mobileupdate,
    } = useFieldArray({
      control,
      name: 'mobilenumInfo',
    });

    const {
      fields: emailfield,
      append: emailappend,
      remove: emailremove,
    } = useFieldArray({
      control,
      name: 'emailInfo',
    });

    const onSubmit = (data: PersonalInfoFormValidationSchemaType) => {
      if (data && data.mobilenumInfo && data.emailInfo) {
        const formSubmitData = {
          gender: data.gender || '',
          fullname: data.fullname || '',
          fatherFullName: data.fatherFullName || '',
          dob: data.dob || '',
          bloodGroup: data.bloodGroup || '',
          mobilenumInfo:
            [...data.mobilenumInfo].map((item: any, index: any) => {
              let newItem: any = {};

              newItem.mobilenum = item.mobilenum;
              newItem.secondary = item.secondary;
              newItem.whatsappNum = checkedArray[index];
              newItem.countryCode = item.countryCode;

              return newItem;
            }) || [],
          emailInfo: data.emailInfo,
        };
        onSubmitEvent(formSubmitData, 'next');
      }
    };

    const leftOnSubmit = (data: PersonalInfoFormValidationSchemaType) => {
      if (data && data.mobilenumInfo && data.emailInfo) {
        const formSubmitData = {
          gender: data.gender || '',
          fullname: data.fullname || '',
          fatherFullName: data.fatherFullName || '',
          dob: data.dob || '',
          bloodGroup: data.bloodGroup || '',
          mobilenumInfo:
            [...data.mobilenumInfo].map((item: any, index: any) => {
              let newItem: any = {};

              newItem.mobilenum = item.mobilenum;
              newItem.secondary = item.secondary;
              newItem.whatsappNum = checkedArray[index];
              newItem.countryCode = item.countryCode;

              return newItem;
            }) || [],
          emailInfo: data.emailInfo,
        };
        onSubmitEvent(formSubmitData, 'exit');
      }
    };

    React.useEffect(() => {
      if (primarycountryCodeSelect) {
        mobileupdate(0, {
          mobilenum: getValues()?.mobilenumInfo?.[0].mobilenum,
          whatsappNum: getValues()?.mobilenumInfo?.[0].whatsappNum,
          countryCode: primarycountryCodeSelect,
          secondary: false,
        });
      }
    }, [mobileupdate, primarycountryCodeSelect, getValues]);

    React.useEffect(() => {
      if (secondarycountryCodeSelect) {
        mobileupdate(1, {
          mobilenum: getValues()?.mobilenumInfo?.[1].mobilenum,
          whatsappNum: getValues()?.mobilenumInfo?.[1].whatsappNum,
          countryCode: secondarycountryCodeSelect,
          secondary: true,
        });
      }
    }, [getValues, mobileupdate, secondarycountryCodeSelect]);

    return (
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '30%',
        }}>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 15}}
          data={[...PerosnalInfoForm1InputList]}
          renderItem={({item}) => {
            return (
              <Controller
                control={control}
                name={item.name}
                render={({field: {onChange, onBlur, value}}) => {
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
        <View style={{gap: 15, marginTop: '5%'}}>
          {mobilefield.map((mainitem, mainindex) => {
            return (
              <View key={mainindex}>
                {mainindex >= 1 && (
                  <View
                    style={{height: 30, width: 30, alignSelf: 'flex-end'}}
                    onTouchEnd={() => mobileremove(mainindex)}>
                    <Image
                      source={AllIcons.Cancel}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </View>
                )}
                <Controller
                  control={control}
                  name={`mobilenumInfo.${mainindex}.mobilenum`}
                  render={({field: {onChange, onBlur, value}}) => {
                    return (
                      <FormInput
                        type={'phone'}
                        name={`mobilenumInfo.${mainindex}.mobilenum`}
                        label={t('personalInfo.MobileNumber')}
                        placeholder={t('common.EnterMobileNum')}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={errors?.mobilenumInfo?.[
                          mainindex
                        ]?.mobilenum?.message?.toString()}
                        state={
                          mainindex === 0
                            ? {
                                countryCodeSelect: primarycountryCodeSelect,
                                setCountryCodeSelect:
                                  setPrimaryCountryCodeSelect,
                              }
                            : {
                                countryCodeSelect: secondarycountryCodeSelect,
                                setCountryCodeSelect:
                                  setSecondaryCountryCodeSelect,
                              }
                        }
                        defaultPhoneCountryCode={
                          getValues()?.mobilenumInfo?.[mainindex].countryCode
                        }
                        rightText={
                          mainindex === 0
                            ? t('personalInfo.AddSecondaryNumber')
                            : ''
                        }
                        editable={mainindex === 0 ? false : true}
                        rightTextOnPress={
                          mainindex === 0
                            ? () => {
                                if (mobilefield.length <= 1) {
                                  mobileappend({
                                    mobilenum: '',
                                    secondary: true,
                                    whatsappNum: false,
                                    countryCode: '',
                                  });

                                  let newArr = JSON.parse(
                                    JSON.stringify(checkedArray),
                                  );
                                  newArr.push(false);
                                  setCheckedArray(newArr);
                                }
                              }
                            : () => {}
                        }
                      />
                    );
                  }}
                />
                <View
                  style={{
                    marginTop: '5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      marginBottom: '5%',
                    }}>
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        alignItems: 'center',
                        borderRadius: 5,
                        borderColor: COLORS.primaryColor,
                        borderWidth: checkedArray[mainindex] ? 0 : 1,
                      }}
                      onTouchEnd={() => {
                        let newArr = JSON.parse(JSON.stringify(checkedArray));
                        let returnArr = newArr.map(
                          (item: any, index: number) => {
                            return mainindex === index ? !item : false;
                          },
                        );
                        setCheckedArray(returnArr);
                      }}>
                      {checkedArray[mainindex] ? (
                        <Image
                          source={AllIcons.Checkbox}
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                        />
                      ) : null}
                    </View>
                    <Text
                      style={{
                        ...CustomFonts.body.medium12,
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 18.9,
                        color: COLORS.lightModetextColor,
                      }}>
                      {t('personalInfo.MobileFieldCheckbox')}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
          {emailfield.map((mainitem, mainindex) => {
            return (
              <View key={mainindex}>
                {mainindex >= 1 && (
                  <View
                    style={{height: 30, width: 30, alignSelf: 'flex-end'}}
                    onTouchEnd={() => emailremove(mainindex)}>
                    <Image
                      source={AllIcons.Cancel}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </View>
                )}
                <Controller
                  control={control}
                  name={`emailInfo.${mainindex}.email`}
                  render={({field: {onChange, onBlur, value}}) => {
                    return (
                      <FormInput
                        type={'email'}
                        name={`emailInfo.${mainindex}.email`}
                        label={t('personalInfo.EmailAddress')}
                        placeholder={t(
                          'personalInfo.EnterYourEmailPlaceholder',
                        )}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={errors?.emailInfo?.[
                          mainindex
                        ]?.email?.message?.toString()}
                        rightText={
                          mainindex === 0
                            ? t('personalInfo.AddSecondaryEmail')
                            : ''
                        }
                        rightTextOnPress={
                          mainindex === 0
                            ? () => {
                                if (emailfield.length <= 1) {
                                  emailappend({
                                    email: '',
                                    secondary: true,
                                  });
                                }
                              }
                            : () => {}
                        }
                      />
                    );
                  }}
                />
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '5%',
          }}>
          <SecondaryButton
            title={t('common.Save&Exit')}
            onPress={handleSubmit(leftOnSubmit)}
            buttonStyle={{
              width: '47%',
            }}
          />
          <PrimaryButton
            title={t('common.Save&Next')}
            onPress={handleSubmit(onSubmit)}
            buttonStyle={{width: '47%'}}
          />
        </View>
      </ScrollView>
    );
  },
);
