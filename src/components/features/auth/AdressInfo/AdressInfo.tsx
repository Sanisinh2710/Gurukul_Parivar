import React from 'react';

import {AllIcons} from '@assets';
import {FormInput, Loader, PrimaryButton, SecondaryButton} from '@components';
import {yupResolver} from '@hookform/resolvers/yup';
import {AddressDeleteApi, GetCountriesApi} from '@services';
import {
  AddressFormValidationSchemaType,
  SupportedFormInputTypes,
  UserAddress,
} from '@types';
import {COLORS} from '@utils';
import {AddressFormValidationSchema} from '@validations';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Alert, FlatList, Image, ScrollView, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {styles} from './style';

type AddressInfoProps = {
  initialValues: AddressFormValidationSchemaType;
  leftButtonProps?: {
    title: string;
    case: 'next' | 'skip' | 'exit';
  };
  rightButtonProps?: {
    title: string;
    case: 'next' | 'skip' | 'exit';
  };
  formData: {
    [key: string]: any;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >;
  onSubmitEvent: (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => void;
};

const TypeAddress = (t: any) => [
  {name: t('addressInfo.HomeField'), id: 'Home'},
  {name: t('addressInfo.NativeField'), id: 'Native'},
  {name: t('addressInfo.Work/BusinessField'), id: 'Work/Business'},
];

export const AdressInfo = React.memo(
  ({
    initialValues,
    formData,
    leftButtonProps,
    rightButtonProps,
    setFormData,
    onSubmitEvent,
  }: AddressInfoProps): React.JSX.Element => {
    const {t} = useTranslation();
    const style = styles();

    const [loader, setLoader] = React.useState<boolean>(false);

    const [countries, setCountries] = React.useState([]);
    const [checkedArray, setCheckedArray] = React.useState(
      [
        ...initialValues?.address_details?.map(item => {
          return item?.is_preferred_communication === null ||
            item?.is_preferred_communication === '' ||
            item?.is_preferred_communication === undefined
            ? false
            : item?.is_preferred_communication;
        }),
      ] || [false],
    );

    React.useMemo(async () => {
      const res = await GetCountriesApi();
      if (res.resType === 'SUCCESS') {
        setCountries(res.data.countries);
      }
    }, []);

    const addressFormInputList: {
      name: keyof UserAddress;
      lable: string;
      placeholder: string;
      type: SupportedFormInputTypes;
      menuList?: any;
      customProps?: object;
      required: boolean;
      wantPlaceholderAsLabelOnModal?: boolean;
    }[] = [
      {
        name: 'country_id',
        lable: t('addressInfo.CountryLbl'),
        placeholder: t('addressInfo.CountryPlaceHolder'),
        type: 'select',
        menuList: countries,
        required: true,
        wantPlaceholderAsLabelOnModal: true,
      },
      {
        name: 'address',
        lable: t('addressInfo.AddressLbl'),
        placeholder: t('addressInfo.AddressPlaceholder'),
        type: 'text',
        required: true,
      },
      {
        name: 'pincode',
        lable: t('addressInfo.PincodeLbl'),
        placeholder: t('addressInfo.PincodePlaceholder'),
        type: 'number',
        required: true,
      },
      {
        name: 'city',
        lable: t('addressInfo.CityVillageLbl'),
        placeholder: t('addressInfo.CityVillagePlaceholder'),
        type: 'text',
        required: true,
      },
      {
        name: 'ress_type',
        lable: t('addressInfo.TypeofaddressLbl'),
        placeholder: '',
        type: 'radio',
        menuList: TypeAddress(t),
        customProps: {
          wantFullSpace: false,
          customStyle: {height: 35, borderWidth: 0, borderRadius: 60},
        },
        required: true,
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
          setCheckedArray([
            ...initialValues?.address_details?.map(item => {
              return item?.is_preferred_communication === null ||
                item?.is_preferred_communication === '' ||
                item?.is_preferred_communication === undefined
                ? false
                : item?.is_preferred_communication;
            }),
          ]);

          replace([
            ...initialValues.address_details.map(item => {
              return {
                id: item.id,
                address: item.address,
                address_type: TypeAddress(t).find(
                  items => items.id === item.address_type,
                )?.name,
                city: item.city,
                country_id: item.country_id,
                pincode: item.pincode,
                is_preferred_communication:
                  item.is_preferred_communication ?? false,
              };
            }),
          ]);

          setLoader(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }, [initialValues]);

    const onSubmit = (data: AddressFormValidationSchemaType) => {
      if (data.address_details !== undefined) {
        let newData = [...data.address_details].map((item, index) => {
          item.is_preferred_communication = checkedArray[index];
          item.address_type = TypeAddress(t).find(
            items => items.name === item.address_type,
          )?.id;
          // item.country_id = parseInt(item.country_id);
          // item.pincode = parseInt(item.pincode);
          return item;
        });

        onSubmitEvent([...newData], 'next');
      }
    };

    const leftOnSubmitWithdata = (data: AddressFormValidationSchemaType) => {
      if (data.address_details !== undefined) {
        let newData = [...data.address_details].map((item, index) => {
          item.is_preferred_communication = checkedArray[index];
          item.address_type = TypeAddress(t).find(
            items => items.name === item.address_type,
          )?.id;
          // item.country_id = parseInt(item.country_id);
          // item.pincode = parseInt(item.pincode);
          return item;
        });

        onSubmitEvent([...newData], 'exit');
      }
    };

    const leftOnSubmit = () => {
      onSubmitEvent(initialValues.address_details, 'skip');
    };

    const handleRemoveAddress = (mainindex: any) => {
      if (
        initialValues?.address_details?.[mainindex]?.id !== undefined &&
        initialValues?.address_details?.[mainindex]?.id !== null &&
        initialValues?.address_details?.[mainindex]?.id !== ''
      ) {
        Alert.alert('Are you sure you want to delete this address..?', '', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const response = await AddressDeleteApi(
                initialValues?.address_details?.[mainindex]?.id,
              );

              if (response.resType === 'SUCCESS') {
                remove(mainindex);
                const newForm = JSON.parse(JSON.stringify(formData));

                newForm.address_details.splice(mainindex, 1);
                setFormData(newForm);

                Toast.show('Addres deleted successfully', Toast.SHORT);
              } else {
                Toast.show(response.message, Toast.SHORT);
              }
            },
          },
        ]);
      } else {
        remove(mainindex);
      }
    };

    const onclickCheckBox = (mainindex: any) => {
      let newArr = JSON.parse(JSON.stringify(checkedArray));

      let returnArr = newArr.map((item: any, index: number) => {
        return mainindex === index ? !item : false;
      });

      setCheckedArray(returnArr);
    };

    const addAdress = () => {
      append({
        country_id: '',
        address: '',
        pincode: '',
        city: '',
        address_type: '',
        is_preferred_communication: false,
      });

      let newArr = JSON.parse(JSON.stringify(checkedArray));
      newArr.push(false);
      setCheckedArray(newArr);
    };

    return (
      <View>
        {loader ? (
          <Loader screenHeight={'90%'} />
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
                      onTouchEnd={() => handleRemoveAddress(mainindex)}>
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
                                required={
                                  mainindex === 0 ? item.required : false
                                }
                                onChange={onChange}
                                customProps={item.customProps}
                                error={errors?.address_details?.[mainindex]?.[
                                  item.name
                                ]?.message?.toString()}
                                wantPlaceholderAsLabelOnModal={
                                  item.wantPlaceholderAsLabelOnModal
                                }
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
                              onTouchEnd={() => onclickCheckBox(mainindex)}>
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
              onPress={() => addAdress()}
              buttonColor={'transparent'}
              titleColor={COLORS.primaryColor}
              borderColor={COLORS.primaryColor}
              buttonStyle={style.secondaryButton}
            />
            <View style={style.submitButtonView}>
              <SecondaryButton
                title={
                  leftButtonProps ? leftButtonProps.title : t('common.SkipNow')
                }
                onPress={
                  leftButtonProps
                    ? handleSubmit(leftOnSubmitWithdata)
                    : leftOnSubmit
                }
                buttonStyle={style.submitButtonStyle}
              />
              <PrimaryButton
                title={
                  rightButtonProps
                    ? rightButtonProps.title
                    : t('common.Save&Next')
                }
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
