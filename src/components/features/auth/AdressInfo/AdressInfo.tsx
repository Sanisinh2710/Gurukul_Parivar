import {FlatList, ScrollView, View} from 'react-native';
import {styles} from './style';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {AddressFormValidationSchemaType} from '../../../../types';
import {AddressFormValidationSchema} from '../../../../validations';
import {FormInput, PrimaryButton, SecondaryButton} from '../../../ui';
import {countries} from '../../../../utils';

export const AdressInfo = React.memo(
  ({initialValues, onSubmitEvent}: any): React.JSX.Element => {
    const {t} = useTranslation();
    const style = styles();

    const addressFormINputList: {
      name: string;
      lable: string;
      placeholder: string;
      type: 'number' | 'select' | 'text' | 'phone' | 'photo' | 'radio';
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
    ];

    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm<AddressFormValidationSchemaType>({
      defaultValues: initialValues,
      resolver: yupResolver(AddressFormValidationSchema()),
      mode: 'onBlur',
    });

    const onSubmit = (data: AddressFormValidationSchemaType) => {
      //   console.log(data);
      const formSubmitData = {
        country: data.country || '',
        address: data.address || '',
        pincode: data.pincode || '',
        cityVillage: data.cityVillage || '',
        typeofAddress: data.typeofAddress,
      };

      onSubmitEvent(formSubmitData);
    };

    return (
      <View>
        <FlatList
          contentContainerStyle={{
            gap: 16,
            marginTop: '5%',
            marginBottom: '5%',
          }}
          data={addressFormINputList}
          renderItem={({item, index}) => (
            <Controller
              control={control}
              name={item.name}
              render={({field: {onBlur, onChange, value}}) => {
                return (
                  <FormInput
                    menuList={item.menuList}
                    type={item.type}
                    name={item.name}
                    label={item.lable}
                    placeholder={item.placeholder}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    customProps={item.customProps}
                    error={errors[item.name]?.message?.toString()}
                  />
                );
              }}
            />
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SecondaryButton
            title={t('common.SkipNow')}
            onPress={onSubmit}
            buttonStyle={{width: '47%'}}
          />
          <PrimaryButton
            title={t('common.Save&Next')}
            onPress={handleSubmit(onSubmit)}
            buttonStyle={{width: '47%'}}
          />
        </View>
      </View>
    );
  },
);
