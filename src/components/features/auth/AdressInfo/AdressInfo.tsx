import {FlatList, View, Text, Image, ScrollView} from 'react-native';
import {styles} from './style';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {AddressFormValidationSchemaType} from '../../../../types';
import {AddressFormValidationSchema} from '../../../../validations';
import {FormInput, PrimaryButton, SecondaryButton} from '../../../ui';
import {COLORS, CustomFonts, countries} from '../../../../utils';
import {AllIcons} from '../../../../../assets/icons';

export const AdressInfo = React.memo(
  ({initialValues, onSubmitEvent}: any): React.JSX.Element => {
    const {t} = useTranslation();
    const style = styles();

    const addressFormINputList: {
      name: string;
      lable: string;
      placeholder: string;
      type:
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
    }[] = [
      {
        name: 'country',
        lable: t('addressInfo.CountryLbl'),
        placeholder: t('addressInfo.CountryPlaceHolder'),
        type: 'select',
        menuList: [
          ...countries.map(item => {
            return item.country;
          }),
        ],
      },
      {
        name: 'address',
        lable: t('addressInfo.AddressLbl'),
        placeholder: t('addressInfo.AddressPlaceholder'),
        type: 'text',
      },
      {
        name: 'pincode',
        lable: t('addressInfo.PincodeLbl'),
        placeholder: t('addressInfo.PincodePlaceholder'),
        type: 'text',
      },
      {
        name: 'cityVillage',
        lable: t('addressInfo.CityVillageLbl'),
        placeholder: t('addressInfo.CityVillagePlaceholder'),
        type: 'text',
      },
      {
        name: 'typeofAddress',
        lable: t('addressInfo.TypeofaddressLbl'),
        placeholder: '',
        type: 'radio',
        menuList: [
          {name: t('addressInfo.HomeField')},
          {name: t('addressInfo.NativeField')},
          {name: t('addressInfo.Work/BusinessField')},
        ],
        customProps: {
          wantFullSpace: false,
          customStyle: {height: 35, borderWidth: 0, borderRadius: 60},
        },
      },
      // {
      //   name: 'communicationAddr',
      //   lable: 'This address is my preferred communication address',
      //   type: 'checkbox',
      //   placeholder: '',
      // },
    ];

    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm({
      defaultValues: initialValues,
      resolver: yupResolver(AddressFormValidationSchema()),
      mode: 'onBlur',
    });

    const {fields, append, remove} = useFieldArray({
      control,
      name: 'addressInfo',
    });

    const [checkedArray, setCheckedArray] = React.useState<boolean[]>(
      [
        ...initialValues?.addressInfo?.map((item: {communicationAddr: any}) => {
          return item.communicationAddr;
        }),
      ] || [false],
    );

    const onSubmit = (data: AddressFormValidationSchemaType) => {
      console.log(data.addressInfo, 'in dadrese ');

      if (data.addressInfo !== undefined) {
        let newData = [...data.addressInfo].map((item, index) => {
          item.communicationAddr = checkedArray[index];
          return item;
        });
        onSubmitEvent([...newData]);
      } else {
        onSubmitEvent();
      }
    };

    return (
      <ScrollView
        contentContainerStyle={{paddingBottom: '50%'}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {fields.map((mainItem, mainindex) => {
          return (
            <FlatList
              scrollEnabled={false}
              key={mainItem.id}
              contentContainerStyle={{
                gap: 16,
                marginTop: '5%',
              }}
              ListHeaderComponent={() => {
                return (
                  mainindex >= 1 && (
                    <View
                      style={{height: 30, width: 30, alignSelf: 'flex-end'}}
                      onTouchEnd={() => remove(mainindex)}>
                      <Image
                        source={AllIcons.cancel}
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
              data={addressFormINputList}
              renderItem={({item, index}) => (
                <View>
                  <Controller
                    control={control}
                    name={`addressInfo.${mainindex}.${item.name}`}
                    render={({field: {onBlur, onChange, value}}) => {
                      return (
                        <FormInput
                          menuList={item.menuList}
                          type={item.type}
                          name={`addressInfo.${mainindex}.${item.name}`}
                          label={item.lable}
                          placeholder={item.placeholder}
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          customProps={item.customProps}
                          error={errors?.addressInfo?.[mainindex]?.[
                            item.name
                          ]?.message?.toString()}
                        />
                      );
                    }}
                  />
                  {(index + 1) % 5 === 0 ? (
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
                            // onChange(!value);
                            let newArr = JSON.parse(
                              JSON.stringify(checkedArray),
                            );

                            let returnArr = newArr.map(
                              (item: any, index: number) => {
                                return mainindex === index ? !item : false;
                              },
                            );

                            setCheckedArray(returnArr);
                          }}>
                          {checkedArray[mainindex] ? (
                            <Image
                              source={AllIcons.checkbox}
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
                          }}>
                          {/* This address is my preferred communication address */}
                          {'This address is my preferred communication address'}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              )}
            />
          );
        })}
        <SecondaryButton
          title={t('common.AddAddress')}
          onPress={() => {
            console.log('cldnhfikajn');
            append({
              country: '',
              address: '',
              pincode: '',
              cityVillage: '',
              typeofAddress: '',
            });

            let newArr = JSON.parse(JSON.stringify(checkedArray));
            newArr.push(false);
            setCheckedArray(newArr);
          }}
          buttonColor={'transparent'}
          titleColor={COLORS.primaryColor}
          borderColor={COLORS.primaryColor}
          buttonStyle={{marginBottom: '5%'}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SecondaryButton
            title={t('common.SkipNow')}
            onPress={onSubmit}
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
