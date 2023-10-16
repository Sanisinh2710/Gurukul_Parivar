import React from 'react';

import {CommonStyle} from '@assets';
import {
  FormInput,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  RaviSabhaValidationSchemaType,
  RootStackParamList,
  SupportedFormInputTypes,
} from '@types';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import {Controller, useForm} from 'react-hook-form';
import {RaviSabhaSchema} from '@validations';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const RaviSabha = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {t} = useTranslation();
  const style = styles();
  const commonstyle = CommonStyle();

  const [date, setDate] = React.useState<string>('');
  const [values, setValues] = React.useState({
    date: '',
    feedback: '',
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RaviSabhaValidationSchemaType>({
    defaultValues: values,
    resolver: yupResolver(RaviSabhaSchema()),
    mode: 'onBlur',
  });

  const onsubmit = (data: RaviSabhaValidationSchemaType) => {
    console.log(data);
  };

  const feedbackInputList: {
    name: keyof RaviSabhaValidationSchemaType;
    lable: string;
    placeholder: string;
    icon?: any;
    type: SupportedFormInputTypes;
    menuList?: any;
    customProps?: object;
    required: boolean;
  }[] = [
    {
      name: 'date',
      lable: 'Date',
      placeholder: 'Select a date',
      type: 'ravisabha',
      required: true,
    },
    {
      name: 'feedback',
      lable: 'Feedback',
      placeholder: 'Please provide your feedback',
      type: 'textarea',
      required: true,
    },
  ];
  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('frontDesk.Ravisabha')}
      />
      <ScrollView contentContainerStyle={commonstyle.commonContentView}>
        {feedbackInputList.map((item, index) => {
          return (
            <View style={{marginVertical: 5}} key={index}>
              <Controller
                control={control}
                name={item.name}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <FormInput
                      required={item.required}
                      icon={item.icon}
                      type={item.type}
                      name={item.name}
                      label={item.lable}
                      placeholder={item.placeholder}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={errors[item.name]?.message?.toString()}
                    />
                  );
                }}
              />
            </View>
          );
        })}
        <PrimaryButton title={'Submit'} onPress={handleSubmit(onsubmit)} />
      </ScrollView>
    </ScreenWrapper>
  );
};
``;
