import React from 'react';

import {useTranslation} from 'react-i18next';
import {Dimensions, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {CommonStyle} from '../../../../assets/styles';
import {
  AdressInfo,
  CompleteYourProfile,
  EduBusinessInfo,
  GurukulInfo,
  PersonalInfo,
  ScreenHeader,
  ScreenWrapper,
} from '../../../components';
import {
  AddressInfoGetApi,
  AddressInfoPostApi,
  EducationInfoGetApi,
  EducationInfoPostApi,
  getAuthToken,
  setUserProfilingDone,
} from '../../../services';
import {ProfileSignupProps} from '../../../types';
import {COLORS} from '../../../utils';

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
        {
          mobilenum: getAuthToken().loginData.mobileNum,
          secondary: false,
          whatsappNum: true,
          countryCode: getAuthToken().loginData.countryCode,
        },
      ],
      emailInfo: [{email: '', secondary: false}],
    },
    address_details: [
      {
        country_id: 0,
        address: '',
        pincode: 0,
        city: '',
        address_type: '',
        communicationAddr: true,
      },
    ],
    edu_businessInfo: {
      education: '',
      occupation: '',
      occupation_type: '',
      skills: [],
      other: '',
    },
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

  React.useMemo(async () => {
    const CallBackButtonAxiosGet = async () => {
      if (formStep === 3) {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        const fetchData = await AddressInfoGetApi();
        if (fetchData.resType === 'SUCCESS') {
          if (fetchData.data.address_details !== null) {
            newFormData.address_details =
              fetchData.data.address_details.length >= 1
                ? fetchData.data.address_details
                : newFormData.address_details;
            setFormData(newFormData);
          }
        }
      }

      if (formStep === 4) {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        const fetchData = await EducationInfoGetApi();
        console.log(fetchData);

        if (fetchData.resType === 'SUCCESS') {
          if (fetchData.data.education_details !== undefined) {
            newFormData.edu_businessInfo =
              fetchData.data.data.education_details;
            setFormData(newFormData);
          }
        }
      }
    };

    await CallBackButtonAxiosGet();
  }, [formStep]);

  const submitButton = async (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => {
    if (formStep === 1) {
      let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

      newFormData.completeProfile = receivedData;

      setFormData(newFormData);
      setwidth(width + 20);
      setFormStep(formStep + 1);
    }
    if (formStep === 2) {
      if (typecase === 'next') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        newFormData.personalInfo = receivedData;
        setFormData(newFormData);
        setwidth(width + 20);
        setFormStep(formStep + 1);
      }
      if (typecase === 'exit') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        newFormData.personalInfo = receivedData;
        setFormData(newFormData);
        const resType = setUserProfilingDone(
          newFormData.personalInfo.mobilenumInfo.at(0)?.mobilenum,
        );

        if (resType === 'SUCCESS') {
          navigation.navigate('LoginSuccess', {type: 'Profile'});
        }
      }
    }
    if (formStep === 3) {
      if (typecase === 'next') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.address_details = receivedData;
          setFormData(newFormData);
          await AddressInfoPostApi(newFormData.address_details);
        }
        setwidth(width + 20);
        setFormStep(formStep + 1);
      }
      if (typecase === 'skip') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.address_details = receivedData;
          setFormData(newFormData);
        }
        setwidth(width + 20);
        setFormStep(formStep + 1);
      }
    }
    if (formStep === 4) {
      if (typecase === 'next') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.edu_businessInfo = receivedData;
          setFormData(newFormData);
          await EducationInfoPostApi(newFormData.edu_businessInfo);
        }
        setwidth(width + 20);
        setFormStep(formStep + 1);
      }

      if (typecase === 'skip') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.edu_businessInfo = receivedData;
          setFormData(newFormData);
        }
        setwidth(width + 20);
        setFormStep(formStep + 1);
      }
    }
    if (formStep === 5) {
      if (typecase === 'next') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.gurukulInfo = receivedData;

          setFormData(newFormData);
          const resType = setUserProfilingDone(
            newFormData.personalInfo.mobilenumInfo.at(0)?.mobilenum,
          );

          if (resType === 'SUCCESS') {
            navigation.navigate('LoginSuccess', {type: 'Profile'});
          }
        }
      }
      if (typecase === 'skip') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));
        if (receivedData !== undefined) {
          newFormData.gurukulInfo = receivedData;

          setFormData(newFormData);
          const resType = setUserProfilingDone(
            newFormData.personalInfo.mobilenumInfo.at(0)?.mobilenum,
          );

          if (resType === 'SUCCESS') {
            navigation.navigate('LoginSuccess', {type: 'Profile'});
          }
        }
      }
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
      ? t('education/BusinessInfo.EduHeader')
      : formStep === 5
      ? t('gurukulInfo.GurukulHeader')
      : '';
  }, [formStep, t]);

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

      <View style={[commonStyle.commonContentView]}>
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
            initialValues={{address_details: [...formData.address_details]}}
            onSubmitEvent={submitButton}
          />
        ) : formStep === 4 ? (
          <EduBusinessInfo
            initialValues={formData.edu_businessInfo}
            onSubmitEvent={submitButton}
          />
        ) : (
          formStep === 5 && (
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
