import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {PersonalInfoFormValidationSchemaType} from '../../../../types';
import {PersonalInfoFormValidationSchema} from '../../../../validations';
import {FormInput, PrimaryButton} from '../../../ui';
import {PersonalInfoStyle} from './styles';

type PersonalInfoProps = {
  initialValues: PersonalInfoFormValidationSchemaType;
  onSubmitEvent: any;
};

export const PersonalInfo = React.memo(
  ({initialValues, onSubmitEvent}: PersonalInfoProps): React.JSX.Element => {
    const {t} = useTranslation();

    const style = PersonalInfoStyle();

    const [primarycountryCodeSelect, setPrimaryCountryCodeSelect] =
      React.useState('');
    const [secondarycountryCodeSelect, setSecondaryCountryCodeSelect] =
      React.useState('');

    const PerosnalInfoForm1InputList: {
      name: string;
      lable: string;
      placeholder: string;
      icon?: any;
      type:
        | 'number'
        | 'select'
        | 'text'
        | 'phone'
        | 'photo'
        | 'radio'
        | 'date'
        | 'dob'
        | 'textarea';
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
      remove: emialremove,
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

              newItem.mobilenum = item.countryCode + item.mobilenum;
              newItem.secondary = item.secondary;
              newItem.whatsappNum = item.whatsappNum;
              newItem.countryCode = item.countryCode;

              return newItem;
            }) || [],
          emailInfo: data.emailInfo,
        };
        onSubmitEvent(formSubmitData);
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
    }, [primarycountryCodeSelect]);

    React.useEffect(() => {
      if (secondarycountryCodeSelect) {
        mobileupdate(1, {
          mobilenum: getValues()?.mobilenumInfo?.[1].mobilenum,
          whatsappNum: getValues()?.mobilenumInfo?.[1].whatsappNum,
          countryCode: secondarycountryCodeSelect,
          secondary: false,
        });
      }
    }, [secondarycountryCodeSelect]);

    return (
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '40%',
        }}>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 15}}
          data={[...PerosnalInfoForm1InputList]}
          renderItem={({item, index}) => {
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
          ListFooterComponent={() => {
            return (
              <View>
                {mobilefield.map((mainitem, mainindex) => {
                  return (
                    <View key={mainindex}>
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
                                      countryCodeSelect:
                                        primarycountryCodeSelect,
                                      setCountryCodeSelect:
                                        setPrimaryCountryCodeSelect,
                                    }
                                  : {
                                      countryCodeSelect:
                                        secondarycountryCodeSelect,
                                      setCountryCodeSelect:
                                        setSecondaryCountryCodeSelect,
                                    }
                              }
                              defaultPhoneCountryCode={
                                getValues()?.mobilenumInfo?.[mainindex]
                                  .countryCode
                              }
                              rightText={
                                mainindex === 0
                                  ? t('personalInfo.AddSecondaryNumber')
                                  : ''
                              }
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
                {emailfield.map((mainitem, mainindex) => {
                  return (
                    <View key={mainindex}>
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
            );
          }}
        />
        <PrimaryButton
          title={t('common.Save&Next')}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    );
  },
);
