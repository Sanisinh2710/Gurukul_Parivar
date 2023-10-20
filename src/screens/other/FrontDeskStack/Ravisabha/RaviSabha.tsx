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
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {styles} from './styles';
import {Controller, useForm} from 'react-hook-form';
import {RaviSabhaSchema} from '@validations';
import {yupResolver} from '@hookform/resolvers/yup';
import {RavisabhaFeedback} from '@services';
import {CustomLocalDateSplitAndFormat} from '@utils';
import Toast from 'react-native-simple-toast';

export const RaviSabha = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {t} = useTranslation();
  const style = styles();
  const commonstyle = CommonStyle();

  const [loader, setLoader] = React.useState<boolean>(false);
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

  const onsubmit = async (data: RaviSabhaValidationSchemaType) => {
    setLoader(true);
    const newData = {
      date:
        CustomLocalDateSplitAndFormat(data.date, '/', '-', 'yyyy-mm-dd') || '',
      feedback: data.feedback,
    };
    const res = await RavisabhaFeedback(newData);
    setLoader(false);

    if (res.resType === 'SUCCESS') {
      Toast.show('Your feedback has been received', Toast.SHORT);
    } else if (res.resType === 'ERROR') {
      Toast.show(res.message, Toast.SHORT);
    }
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
      lable: t('Ravisabha.Date'),
      placeholder: t('Ravisabha.DateError'),
      type: 'ravisabha',
      required: true,
    },
    {
      name: 'feedback',
      lable: t('Ravisabha.Feedback'),
      placeholder: t('Ravisabha.FeedbackError'),
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
      <ScrollView
        contentContainerStyle={[
          commonstyle.commonContentView,
          {marginTop: '5%'},
        ]}>
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
        <PrimaryButton
          title={'Submit'}
          onPress={handleSubmit(onsubmit)}
          buttonStyle={{marginVertical: '8%'}}
          customWidget={loader ? <ActivityIndicator size={25} /> : undefined}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};
``;
