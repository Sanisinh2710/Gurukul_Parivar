import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {
  AddressFormValidationSchemaType,
  SupportedFormInputTypes,
  UserAddress,
} from '../../../../types';
import {COLORS, countries} from '../../../../utils';
import {AddressFormValidationSchema} from '../../../../validations';
import {FormInput, Loader, PrimaryButton, SecondaryButton} from '../../../ui';
import {styles} from './style';

type AddressInfoProps = {
  initialValues: AddressFormValidationSchemaType;
  onSubmitEvent: (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => void;
};

export const AdressInfo = React.memo(
  ({initialValues, onSubmitEvent}: AddressInfoProps): React.JSX.Element => {
    const {t} = useTranslation();
    const style = styles();

    const [loader, setLoader] = React.useState<boolean>(false);

    const addressFormInputList: {
      name: keyof UserAddress;
      lable: string;
      placeholder: string;
      type: SupportedFormInputTypes;
      menuList?: any;
      customProps?: object;
    }[] = [
      {
        name: 'country_id',
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
        type: 'number',
      },
      {
        name: 'city',
        lable: t('addressInfo.CityVillageLbl'),
        placeholder: t('addressInfo.CityVillagePlaceholder'),
        type: 'text',
      },
      {
        name: 'address_type',
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

    const {fields, append, remove, replace} = useFieldArray({
      control,
      name: 'address_details',
    });

    React.useEffect(() => {
      setLoader(true);

      const timer = setTimeout(() => {
        if (initialValues) {
          replace(initialValues.address_details);
          setLoader(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }, [initialValues]);

    const [checkedArray, setCheckedArray] = React.useState(
      [
        ...initialValues?.address_details?.map(item => {
          return item?.communicationAddr;
        }),
      ] || [false],
    );

    const onSubmit = (data: AddressFormValidationSchemaType) => {
      if (data.address_details !== undefined) {
        let newData = [...data.address_details].map((item, index) => {
          item.country_id = 101;
          item.communicationAddr = checkedArray[index];
          return item;
        });
        onSubmitEvent([...newData], 'next');
      }
    };

    const leftOnSubmit = () => {
      onSubmitEvent(initialValues.address_details, 'skip');
    };

    return (
      <View>
        {loader ? (
          <Loader />
        ) : (
          <ScrollView
            contentContainerStyle={style.scrollViewContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            {fields.map((mainItem, mainindex) => {
              return (
                <View key={mainindex}>
                  {mainindex >= 1 && (
                    <View
                      style={style.cancelImgView}
                      onTouchEnd={() => remove(mainindex)}>
                      <Image source={AllIcons.Cancel} style={style.cancelImg} />
                    </View>
                  )}
                  <FlatList
                    scrollEnabled={false}
                    key={mainItem.id}
                    contentContainerStyle={[
                      style.flatListContainer,
                      mainindex >= 1 && style._flatListContainer,
                    ]}
                    showsVerticalScrollIndicator={false}
                    data={addressFormInputList}
                    renderItem={({item, index}) => (
                      <View>
                        <Controller
                          control={control}
                          name={`address_details.${mainindex}.${item.name}`}
                          render={({field: {onBlur, onChange, value}}) => {
                            return (
                              <FormInput
                                menuList={item.menuList}
                                type={item.type}
                                name={`address_details.${mainindex}.${item.name}`}
                                label={item.lable}
                                placeholder={item.placeholder}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                customProps={item.customProps}
                                error={errors?.address_details?.[mainindex]?.[
                                  item.name
                                ]?.message?.toString()}
                              />
                            );
                          }}
                        />
                        {(index + 1) % 5 === 0 ? (
                          <View key={mainItem.id} style={style.checkboxView}>
                            <View
                              style={[
                                style.checkboxInnerView,
                                {borderWidth: checkedArray[mainindex] ? 0 : 1},
                              ]}
                              onTouchEnd={() => {
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
                                  source={AllIcons.Checkbox}
                                  style={style.checkboxImg}
                                />
                              ) : null}
                            </View>
                            <Text style={style.checkboxText}>
                              {t('addressInfo.AddressCheckbox')}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    )}
                  />
                </View>
              );
            })}
            <SecondaryButton
              title={t('common.AddAddress')}
              onPress={() => {
                append({
                  country_id: 0,
                  address: '',
                  pincode: 0,
                  city: '',
                  address_type: '',
                  communicationAddr: false,
                });

                let newArr = JSON.parse(JSON.stringify(checkedArray));
                newArr.push(false);
                setCheckedArray(newArr);
              }}
              buttonColor={'transparent'}
              titleColor={COLORS.primaryColor}
              borderColor={COLORS.primaryColor}
              buttonStyle={style.secondaryButton}
            />
            <View style={style.submitButtonView}>
              <SecondaryButton
                title={t('common.SkipNow')}
                onPress={leftOnSubmit}
                buttonStyle={style.submitButtonStyle}
              />
              <PrimaryButton
                title={t('common.Save&Next')}
                onPress={handleSubmit(onSubmit)}
                buttonStyle={style.submitButtonStyle}
              />
            </View>
          </ScrollView>
        )}
      </View>
    );
  },
);
