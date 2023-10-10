import React from 'react';

import {AllIcons} from '@assets';
import {FormInput, Loader, PrimaryButton, SecondaryButton} from '@components';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  PersonalInfoFormValidationSchemaType,
  SupportedFormInputTypes,
} from '@types';
import {PersonalInfoFormValidationSchema} from '@validations';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import {PersonalInfoStyle} from './styles';

type PersonalInfoProps = {
  isParentLoading: boolean;
  initialValues: PersonalInfoFormValidationSchemaType;
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

export const PersonalInfo = React.memo(
  ({
    isParentLoading,
    initialValues,
    leftButtonProps,
    rightButtonProps,
    onSubmitEvent,
  }: PersonalInfoProps): React.JSX.Element => {
    const {t} = useTranslation();
    const personalInfoStyle = PersonalInfoStyle();
    const [primarycountryCodeSelect, setPrimaryCountryCodeSelect] =
      React.useState('');
    const [secondarycountryCodeSelect, setSecondaryCountryCodeSelect] =
      React.useState('');

    const [localLoading, setIsLocalLoading] = React.useState(false);

    const [checkedArray, setCheckedArray] = React.useState(
      [
        ...initialValues?.mobilenumInfo?.map(item => {
          return item.whatsappNum;
        }),
      ] || [false],
    );

    const [isArraySet, setIsArrayset] = React.useState(false);

    const PerosnalInfoForm1InputList: {
      name: keyof PersonalInfoFormValidationSchemaType;
      lable: string;
      placeholder: string;
      icon?: any;
      type: SupportedFormInputTypes;
      menuList?: any;
      customProps?: object;
      required: boolean;
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
        required: false,
      },
      {
        name: 'full_name',
        lable: t('personalInfo.FullNameLable'),
        placeholder: t('personalInfo.FullNamePlaceholder'),
        type: 'text',
        required: true,
      },
      {
        name: 'father_name',
        lable: t('personalInfo.FatherNameLable'),
        placeholder: t('personalInfo.FatherNamePlaceholder'),
        type: 'text',
        required: false,
      },
      {
        name: 'dob',
        lable: t('personalInfo.DOB'),
        placeholder: 'DD/MM/YYYY',
        type: 'dob',
        required: false,
      },
      {
        name: 'blood_group',
        lable: t('personalInfo.BloodGroup'),
        placeholder: t('personalInfo.BloodGroupDropDown'),
        type: 'select',
        menuList: ['A-', 'A+', 'B-', 'B+', 'O-', 'O+', 'AB+', 'AB-'],
        required: false,
        customProps: {
          wantPlaceholderAsLabelOnModal: true,
          wantSearchBar: false,
        },
      },
    ];

    const {
      control,
      handleSubmit,
      getValues,
      setValue,
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
      replace: mobilereplace,
    } = useFieldArray({
      control,
      name: 'mobilenumInfo',
    });

    const {
      fields: emailfield,
      append: emailappend,
      remove: emailremove,
      update: emailupdate,
      replace: emailreplace,
    } = useFieldArray({
      control,
      name: 'emailInfo',
    });

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

    React.useMemo(() => {
      if (initialValues) {
        setIsLocalLoading(true);

        if (initialValues.mobilenumInfo.length > 1) {
          if (mobilefield.length <= 1) {
            mobileappend(initialValues.mobilenumInfo[1]);
          }
        }
        if (initialValues.emailInfo.length > 1) {
          if (emailfield.length <= 1) {
            emailappend(initialValues.emailInfo[1]);
          }
        }
        setIsArrayset(true);
      }
    }, [initialValues]);

    React.useEffect(() => {
      if (isArraySet) {
        Object.keys(initialValues).map((key, index) => {
          if (key === 'mobilenumInfo') {
            const mobileArr = JSON.parse(
              JSON.stringify(initialValues.mobilenumInfo),
            );
            mobileArr.map((item, index) => {
              mobileupdate(index, item);
            });
          } else if (key === 'emailInfo') {
            const emailArr = initialValues.emailInfo;
            emailArr.map((item, index) => {
              emailupdate(index, item);
            });
          } else {
            setValue(key, initialValues[key]);
          }
        });

        setCheckedArray([
          ...initialValues?.mobilenumInfo?.map(item => {
            return item.whatsappNum;
          }),
        ]);
        setIsLocalLoading(false);
      }
    }, [initialValues, isArraySet]);

    const onSubmit = (data: PersonalInfoFormValidationSchemaType) => {
      if (data && data.emailInfo) {
        const formSubmitData = {
          gender: data.gender || '',
          full_name: data.full_name || '',
          father_name: data.father_name || '',
          dob: data.dob || '',
          blood_group: data.blood_group || '',
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

        onSubmitEvent(
          formSubmitData,
          rightButtonProps ? rightButtonProps.case : 'next',
        );
      }
    };

    const leftOnSubmit = (data: PersonalInfoFormValidationSchemaType) => {
      if (data && data.emailInfo) {
        const formSubmitData = {
          gender: data.gender || '',
          full_name: data.full_name || '',
          father_name: data.father_name || '',
          dob: data.dob || '',
          blood_group: data.blood_group || '',
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
        onSubmitEvent(
          formSubmitData,
          leftButtonProps ? leftButtonProps.case : 'exit',
        );
      }
    };

    const onClickCheckBox = (mainindex: any) => {
      let newArr = JSON.parse(JSON.stringify(checkedArray));
      let returnArr = newArr.map((item: any, index: number) => {
        return mainindex === index ? !item : false;
      });
      setCheckedArray(returnArr);
    };

    return (
      <>
        {isParentLoading || localLoading ? (
          <Loader screenHeight={'90%'} />
        ) : (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={personalInfoStyle.mainScrollviewContainer}>
            <>
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
                            required={item.required}
                          />
                        );
                      }}
                    />
                  );
                }}
              />
              <View style={personalInfoStyle.emailFieldMainView}>
                {emailfield.map((mainitem, mainindex) => {
                  return (
                    <View key={mainitem.id}>
                      {mainindex >= 1 && (
                        <View
                          style={personalInfoStyle.removeImgView}
                          onTouchEnd={() => emailremove(mainindex)}>
                          <Image
                            source={AllIcons.Cancel}
                            style={personalInfoStyle.removeImgStyle}
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
                              required={mainindex === 0 ? true : false}
                              editable={mainindex === 0 && value ? false : true}
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
                {mobilefield.map((mainitem, mainindex) => {
                  return (
                    <View key={mainitem.id}>
                      {mainindex >= 1 && (
                        <View
                          style={personalInfoStyle.removeImgView}
                          onTouchEnd={() => mobileremove(mainindex)}>
                          <Image
                            source={AllIcons.Cancel}
                            style={personalInfoStyle.removeImgStyle}
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
                                  ?.countryCode
                              }
                              rightText={
                                mainindex === 0
                                  ? t('personalInfo.AddSecondaryNumber')
                                  : ''
                              }
                              required={mainindex === 0 ? false : false}
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
                      <View style={personalInfoStyle.checkBoxOuterView}>
                        <View
                          style={[
                            personalInfoStyle.checkBoxMainView,
                            {
                              borderWidth: checkedArray[mainindex] ? 0 : 1,
                            },
                          ]}
                          onTouchEnd={() => onClickCheckBox(mainindex)}>
                          {checkedArray[mainindex] ? (
                            <Image
                              source={AllIcons.Checkbox}
                              style={personalInfoStyle.imageChecked}
                            />
                          ) : null}
                        </View>
                        <Text style={personalInfoStyle.whatsappTxtStyle}>
                          {t('personalInfo.MobileFieldCheckbox')}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View style={personalInfoStyle.bottomBtnView}>
                <SecondaryButton
                  title={
                    leftButtonProps
                      ? leftButtonProps.title
                      : t('common.Save&Exit')
                  }
                  onPress={handleSubmit(leftOnSubmit)}
                  buttonStyle={personalInfoStyle.commonBtnStyle}
                />
                <PrimaryButton
                  title={
                    rightButtonProps
                      ? rightButtonProps.title
                      : t('common.Save&Next')
                  }
                  onPress={handleSubmit(onSubmit)}
                  buttonStyle={personalInfoStyle.commonBtnStyle}
                />
              </View>
            </>
          </ScrollView>
        )}
      </>
    );
  },
);
