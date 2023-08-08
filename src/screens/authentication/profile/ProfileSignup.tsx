/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import * as Progress from 'react-native-progress';
import {useTranslation} from 'react-i18next';
import {Dimensions, View} from 'react-native';
import {CommonStyle} from '../../../../assets/styles';
import {
  AdressInfo,
  CompleteYourProfile,
  GurukulInfo,
  PersonalInfo,
  ScreenHeader,
  ScreenWrapper,
} from '../../../components';
import {COLORS} from '../../../utils';
import {ProfileSignupProps} from '../../../types';

export const ProfileSignup = ({
  navigation,
}: ProfileSignupProps): React.JSX.Element => {
  const commonStyle = CommonStyle();

  const [width, setwidth] = React.useState(20);

  const {t} = useTranslation();

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
      mobilenumInfo: [
        {mobilenum: '', secondary: false, whatsappNum: true, countryCode: ''},
      ],
      emailInfo: [{email: '', secondary: false}],
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
    gurukulInfo: {
      exGurukulStudent: 'No',
      gurukulData: [
        {
          gurukulBranch: '',
          attendGurukul: '',
          stdFrom: '',
          stdTo: '',
          sscYear: '',
          hscYear: '',
          knowSaintPersonally: '',
          knowHaribhakt: '',
          RelativeOfSaint: 'No',
          FromFamily: '',
          SaintName: '',
          YourRelation: '',
        },
      ],
    },
  });

  const submitButton = (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => {
    if (formStep === 1) {
      let newFormData = JSON.parse(JSON.stringify(formData));

      newFormData.completeProfile = receivedData;

      setFormData(newFormData);
      setwidth(width + 20);
      setFormStep(formStep + 1);
    } else if (formStep === 2) {
      if (typecase === 'next') {
        let newFormData = JSON.parse(JSON.stringify(formData));

        newFormData.personalInfo = receivedData;
        setFormData(newFormData);
        setwidth(width + 20);
        setFormStep(formStep + 1);
      }
      if (typecase === 'exit') {
        let newFormData = JSON.parse(JSON.stringify(formData));

        newFormData.personalInfo = receivedData;
        setFormData(newFormData);
        navigation.navigate('LoginSuccess', {type: 'Profile'});
      }
    } else {
      let newFormData = JSON.parse(JSON.stringify(formData));

      if (receivedData !== undefined) {
        newFormData.addressInfo = receivedData;
        setFormData(newFormData);
      }
      setwidth(width + 20);
      setFormStep(formStep + 1);
    }
  };

  const headerTitle = React.useMemo(() => {
    return formStep === 1
      ? t('uploadPhoto.HederText')
      : formStep === 2
      ? t('personalInfo.personalInfoHeader')
      : formStep === 3
      ? t('addressInfo.AddressHeader')
      : formStep === 4
      ? t('gurukulInfo.GurukulHeader')
      : '';
  }, [formStep]);

  console.log(formData.personalInfo, 'whole state');

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
            initialValues={{
              gender: formData.personalInfo.gender,
              fullname: formData.personalInfo.fullname,
              fatherFullName: formData.personalInfo.fatherFullName,
              dob: formData.personalInfo.dob,
              bloodGroup: formData.personalInfo.bloodGroup,
              mobilenumInfo: [...formData.personalInfo.mobilenumInfo].map(
                item => {
                  let newItem: any = {};

                  newItem.mobilenum = item.mobilenum || '';
                  newItem.countryCode = item.countryCode;
                  newItem.secondary = item.secondary;
                  newItem.whatsappNum = item.whatsappNum;

                  return newItem;
                },
              ),
              emailInfo: formData.personalInfo.emailInfo,
            }}
            onSubmitEvent={submitButton}
          />
        ) : formStep === 3 ? (
          <AdressInfo
            initialValues={{addressInfo: [...formData.addressInfo]}}
            onSubmitEvent={submitButton}
          />
        ) : (
          formStep === 4 && (
            <GurukulInfo
              initialValues={formData.gurukulInfo}
              onSubmitEvent={submitButton}
            />
          )
        )}
      </View>
    </ScreenWrapper>
  );
};
