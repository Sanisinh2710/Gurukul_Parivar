import React from 'react';

import * as Progress from 'react-native-progress';

import {useTranslation} from 'react-i18next';
import {Dimensions, View} from 'react-native';
import {CommonStyle} from '../../../../assets/styles';
import {
  AdressInfo,
  CompleteYourProfile,
  PersonalInfo,
  ScreenHeader,
  ScreenWrapper,
} from '../../../components';
import {COLORS} from '../../../utils';

export const ProfileSignup = (): React.JSX.Element => {
  const commonStyle = CommonStyle();

  const [width, setwidth] = React.useState(20);

  const {t, i18n} = useTranslation();

  const [formStep, setFormStep] = React.useState(1);

  const [formData, setFormData] = React.useState({
    completeProfile: {
      profilePic: '',
      gurukulName: '',
    },
    personalInfo: {
      gender: '',
      fullname: '',
      fatherFullName: '',
      dob: '',
      bloodGroup: '',
      mobilenum: '',
      secondaryMobileNum: '',
      email: '',
      secondaryEmail: '',
    },
    addressInfo: [
      {
        country: '',
        address: '',
        pincode: '',
        cityVillage: '',
        typeofAddress: '',
        communicationAddr: false,
      },
    ],
  });

  const submitButton = (receivedData: any) => {
    if (formStep === 1) {
      let newFormData = JSON.parse(JSON.stringify(formData));

      newFormData.completeProfile = receivedData;

      setFormData(newFormData);
      setwidth(width + 20);
      setFormStep(formStep + 1);
    } else if (formStep === 2) {
      // console.log('form step greater than 2');
      let newFormData = JSON.parse(JSON.stringify(formData));

      newFormData.personalInfo = receivedData;
      setFormData(newFormData);
      setwidth(width + 20);
      setFormStep(formStep + 1);
    } else {
      let newFormData = JSON.parse(JSON.stringify(formData));

      newFormData.addressInfo = receivedData;
      setFormData(newFormData);
      setwidth(width + 20);
      setFormStep(formStep + 1);
    }
  };

  console.log(formData);

  const headerTitle = React.useMemo(() => {
    return formStep === 1
      ? t('uploadPhoto.HederText')
      : formStep === 2
      ? t('personalInfo.personalInfoHeader')
      : formStep === 3
      ? t('addressInfo.AddressHeader')
      : '';
  }, [formStep]);

  return (
    <ScreenWrapper>
      <Progress.Bar
        progress={width / 100}
        width={Dimensions.get('window').width}
        borderRadius={0}
        color={COLORS.primaryColor}
        unfilledColor={COLORS.unfilledProgressbar}
        borderWidth={0}
      />

      <ScreenHeader
        showLeft={true}
        headerTitle={headerTitle}
        headerTitleAlign="left"
        leftOnPress={() => {
          if (width > 20) {
            setwidth(width - 20);
            setFormStep(formStep - 1);
          }
        }}
      />
      <View style={commonStyle.commonContentView}>
        {formStep === 1 ? (
          <CompleteYourProfile
            initialValues={formData.completeProfile}
            onSubmitEvent={submitButton}
          />
        ) : formStep === 2 ? (
          <PersonalInfo
            initialValues={formData.personalInfo}
            onSubmitEvent={submitButton}
          />
        ) : (
          formStep === 3 && (
            <AdressInfo
              initialValues={{addressInfo: [...formData.addressInfo]}}
              onSubmitEvent={submitButton}
            />
          )
        )}
      </View>
    </ScreenWrapper>
  );
};
